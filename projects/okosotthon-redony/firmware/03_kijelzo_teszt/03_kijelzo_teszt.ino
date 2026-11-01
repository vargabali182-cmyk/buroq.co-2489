// 03_kijelzo_teszt.ino
// Kijelző + forgatógomb + gombok + BME280 ellenőrzése.
//
// Könyvtár: U8g2 (Library Manager, szerző: oliver)
// Arduino IDE: ESP32S3 Dev Module, USB CDC On Boot: Disabled, PSRAM: OPI PSRAM.
//
// Bekötés:
//   Kijelző: VCC->3V3, GND->GND, SDA->8, SCL->9, TRA->4, TRB->5, PSH->6, CON->7, BAK->16
//   BME280:  VIN->3V3 (a másik), GND->GND, SDA->17, SCL->18
//
// Ha a képernyőn szemét van, vagy 2 pixellel el van csúszva, írd át lent a
// USE_SH1106 értékét 0-ra (akkor SSD1306 vezérlőt próbál).

#include <Wire.h>
#include <U8g2lib.h>

#define USE_SH1106 1  // 1,3"-os kijelzőn szinte mindig SH1106

constexpr int PIN_OLED_SDA = 8;
constexpr int PIN_OLED_SCL = 9;
constexpr int PIN_BME_SDA  = 17;
constexpr int PIN_BME_SCL  = 18;
constexpr int PIN_ENC_A    = 4;
constexpr int PIN_ENC_B    = 5;
constexpr int PIN_PSH      = 6;
constexpr int PIN_CON      = 7;
constexpr int PIN_BAK      = 16;

#if USE_SH1106
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
#else
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
#endif

// ---- Forgatógomb (megszakítással, hogy egy lépést se hagyjon ki) ----
volatile int32_t encPos = 0;
volatile uint8_t encState = 0;

void IRAM_ATTR encISR() {
  static const int8_t tbl[16] = {0, -1, 1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, -1, 0};
  uint8_t s = (digitalRead(PIN_ENC_A) << 1) | digitalRead(PIN_ENC_B);
  encState = ((encState << 2) | s) & 0x0F;
  encPos += tbl[encState];
}

// ---- I2C ----
static int scanBus(TwoWire &bus, const char *name, uint8_t *firstFound) {
  int n = 0;
  *firstFound = 0;
  Serial.printf("I2C scan (%s): ", name);
  for (uint8_t a = 1; a < 127; a++) {
    bus.beginTransmission(a);
    if (bus.endTransmission() == 0) {
      Serial.printf("0x%02X ", a);
      if (!*firstFound) *firstFound = a;
      n++;
    }
  }
  Serial.println(n ? "" : "SEMMI");
  return n;
}

static uint8_t readReg(TwoWire &bus, uint8_t addr, uint8_t reg) {
  bus.beginTransmission(addr);
  bus.write(reg);
  if (bus.endTransmission(false) != 0) return 0;
  if (bus.requestFrom(addr, (uint8_t)1) != 1) return 0;
  return bus.read();
}

static uint8_t bmeAddr = 0, bmeId = 0;
static bool oledOk = false;

static const char *bmeName(uint8_t id) {
  switch (id) {
    case 0x60: return "BME280 (OK)";
    case 0x58: return "BMP280 (nincs para!)";
    case 0x56:
    case 0x57: return "BMP280 minta";
    default:   return "ismeretlen";
  }
}

void setup() {
  Serial.begin(115200);
  delay(1500);
  Serial.println("\n\n=== Max OS / okosotthon - 03 kijelzo teszt ===");

  pinMode(PIN_ENC_A, INPUT_PULLUP);
  pinMode(PIN_ENC_B, INPUT_PULLUP);
  pinMode(PIN_PSH, INPUT_PULLUP);
  pinMode(PIN_CON, INPUT_PULLUP);
  pinMode(PIN_BAK, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PIN_ENC_A), encISR, CHANGE);
  attachInterrupt(digitalPinToInterrupt(PIN_ENC_B), encISR, CHANGE);

  // Kijelző busz: Wire (8/9), hőmérő busz: Wire1 (17/18)
  Wire.begin(PIN_OLED_SDA, PIN_OLED_SCL);
  Wire1.begin(PIN_BME_SDA, PIN_BME_SCL);

  uint8_t oledAddr;
  scanBus(Wire, "kijelzo, SDA=8 SCL=9", &oledAddr);
  oledOk = (oledAddr == 0x3C || oledAddr == 0x3D);
  if (oledOk) {
    Serial.printf("  -> Kijelzo megvan: 0x%02X\n", oledAddr);
  } else {
    Serial.println("  -> NINCS kijelzo! Nezd: VCC->3V3, GND, SDA->8, SCL->9 (nincs-e felcserelve?), forrasztas.");
  }

  scanBus(Wire1, "homero, SDA=17 SCL=18", &bmeAddr);
  for (uint8_t a : {(uint8_t)0x76, (uint8_t)0x77}) {
    uint8_t id = readReg(Wire1, a, 0xD0);
    if (id) { bmeAddr = a; bmeId = id; break; }
  }
  if (bmeId) {
    Serial.printf("  -> Homero megvan: cim 0x%02X, chip ID 0x%02X = %s\n", bmeAddr, bmeId, bmeName(bmeId));
  } else {
    Serial.println("  -> NINCS homero! Nezd: VIN->3V3, GND, SDA->17, SCL->18. Ha igy sem: CSB->3V3, SDO->GND.");
  }

  u8g2.setI2CAddress((oledAddr ? oledAddr : 0x3C) * 2);
  u8g2.begin();
  u8g2.setBusClock(400000);

  Serial.println("\nForgasd a gombot, nyomkodd a PSH / CON / BAK gombokat.\n");
}

void loop() {
  static int32_t lastPos = INT32_MIN;
  static uint8_t lastBtns = 0xFF;
  static uint32_t frame = 0;

  int32_t pos = encPos;
  bool psh = digitalRead(PIN_PSH) == LOW;
  bool con = digitalRead(PIN_CON) == LOW;
  bool bak = digitalRead(PIN_BAK) == LOW;
  uint8_t btns = psh | (con << 1) | (bak << 2);

  if (pos != lastPos || btns != lastBtns) {
    Serial.printf("Encoder: %ld (kattanas: %ld)   PSH:%s CON:%s BAK:%s\n",
                  (long)pos, (long)(pos / 4),
                  psh ? "LE" : "-", con ? "LE" : "-", bak ? "LE" : "-");
    lastPos = pos;
    lastBtns = btns;
  }

  char line[32];
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x12_tf);
  u8g2.drawStr(0, 10, "Max OS kijelzo teszt");

  snprintf(line, sizeof(line), "Encoder: %ld", (long)(pos / 4));
  u8g2.drawStr(0, 24, line);

  // gombok: lenyomva = fehér doboz
  const char *names[3] = {"PSH", "CON", "BAK"};
  bool states[3] = {psh, con, bak};
  for (int i = 0; i < 3; i++) {
    int x = i * 42;
    if (states[i]) {
      u8g2.drawBox(x, 28, 38, 13);
      u8g2.setDrawColor(0);
      u8g2.drawStr(x + 10, 38, names[i]);
      u8g2.setDrawColor(1);
    } else {
      u8g2.drawFrame(x, 28, 38, 13);
      u8g2.drawStr(x + 10, 38, names[i]);
    }
  }

  if (bmeId) snprintf(line, sizeof(line), "Homero: %s", bmeId == 0x60 ? "BME280 OK" : "BMP280");
  else       snprintf(line, sizeof(line), "Homero: nincs");
  u8g2.drawStr(0, 53, line);

  // mozgó csík: látszik, hogy él
  int x = frame % 128;
  u8g2.drawHLine(0, 63, x);
  u8g2.sendBuffer();
  frame += 4;

  delay(30);
}
