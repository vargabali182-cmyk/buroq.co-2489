// 02_cc1101_test.ino
// 2. lépés: CC1101 felismerése SPI-n + RSSI-figyelés 433.92 MHz-en.
//
// Előfeltétel: a 01_serial_test működik (látod a saját szövegeidet a Serial Monitorban).
// Könyvtár: RadioLib (Library Manager).
// Arduino IDE: ESP32S3 Dev Module, USB CDC On Boot: Disabled, PSRAM: OPI PSRAM.
//
// Mit csinál:
//   A) Nyers SPI-vel kiolvassa a CC1101 PARTNUM és VERSION regiszterét.
//      Ebből RadioLib nélkül is látszik, hogy a bekötés jó-e.
//   B) RadioLib-bel inicializálja a rádiót 433.92 MHz-re.
//   C) Vételre állítja, és kiírja a jelerősséget (RSSI). Ha megnyomod a redőny
//      távirányítóját a közelben, ugrania kell (kb. -100 dBm -> -30..-60 dBm).
//      Ez még NEM dekódolás, csak annak a bizonyítéka, hogy a rádió hallja a távirányítót.

#include <SPI.h>
#include <RadioLib.h>

// ---- Bekötés (lásd projects/okosotthon-redony/README.md) ----
constexpr int PIN_CC_SCK  = 12;
constexpr int PIN_CC_MISO = 13;
constexpr int PIN_CC_MOSI = 11;
constexpr int PIN_CC_CS   = 10;  // CSN
constexpr int PIN_CC_GDO0 = 14;
constexpr int PIN_CC_GDO2 = 15;

constexpr float FREQ_MHZ        = 433.92;
constexpr float RX_BW_KHZ       = 203.0;  // széles, hogy a kicsit elhangolt távirányítót is hallja
constexpr int   RSSI_JEL_KUSZOB = -75;    // e fölött "JEL!"-et ír

CC1101 radio = new Module(PIN_CC_CS, PIN_CC_GDO0, RADIOLIB_NC, PIN_CC_GDO2);

// ---- Nyers SPI a diagnosztikához ----
static SPISettings ccSpi(1000000, MSBFIRST, SPI_MODE0);
static bool lastChipReady = true;

// CC1101 status regiszter olvasása (0x30..0x3D, burst bittel = 0xC0)
static uint8_t ccReadStatus(uint8_t addr) {
  SPI.beginTransaction(ccSpi);
  digitalWrite(PIN_CC_CS, LOW);
  // A CC1101 akkor kész, ha CSN után a MISO (SO) LOW-ra megy.
  uint32_t t0 = micros();
  while (digitalRead(PIN_CC_MISO) == HIGH && (micros() - t0) < 5000) {}
  lastChipReady = (digitalRead(PIN_CC_MISO) == LOW);
  SPI.transfer(addr | 0xC0);
  uint8_t v = SPI.transfer(0x00);
  digitalWrite(PIN_CC_CS, HIGH);
  SPI.endTransaction();
  return v;
}

// Errata: változó status regisztert kétszer egyezőre kell olvasni
static uint8_t ccReadStatusStable(uint8_t addr) {
  uint8_t a = ccReadStatus(addr), b = ccReadStatus(addr);
  for (int i = 0; i < 5 && a != b; i++) { a = b; b = ccReadStatus(addr); }
  return b;
}

static const char *marcName(uint8_t s) {
  switch (s & 0x1F) {
    case 0x01: return "IDLE";
    case 0x0D: return "RX";
    case 0x11: return "RX_OVERFLOW";
    case 0x13: return "TX";
    case 0x16: return "TX_UNDERFLOW";
    default:   return "egyeb";
  }
}

static void printErr(const char *what, int state) {
  Serial.printf("  %s: HIBA, kod = %d", what, state);
  if (state == RADIOLIB_ERR_CHIP_NOT_FOUND) Serial.print("  (CHIP_NOT_FOUND -> bekotes/tap)");
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  delay(1500);
  Serial.println("\n\n=== Max OS / okosotthon - 02 CC1101 teszt ===");
  Serial.printf("Labak: SCK=%d MISO=%d MOSI=%d CSN=%d GDO0=%d GDO2=%d, tap: 3V3\n",
                PIN_CC_SCK, PIN_CC_MISO, PIN_CC_MOSI, PIN_CC_CS, PIN_CC_GDO0, PIN_CC_GDO2);

  pinMode(PIN_CC_CS, OUTPUT);
  digitalWrite(PIN_CC_CS, HIGH);
  SPI.begin(PIN_CC_SCK, PIN_CC_MISO, PIN_CC_MOSI, -1);
  delay(10);

  // ---- A) nyers SPI ----
  Serial.println("\n[A] Nyers SPI olvasas");
  uint8_t partnum = ccReadStatus(0x30);
  uint8_t version = ccReadStatus(0x31);
  Serial.printf("  PARTNUM = 0x%02X (vart: 0x00)\n", partnum);
  Serial.printf("  VERSION = 0x%02X (vart: 0x14, klonokon 0x04 vagy 0x17)\n", version);
  if (!lastChipReady) Serial.println("  ! A MISO CSN utan sem ment LOW-ra -> MISO/CSN/tap gyanus");

  bool spiOk = (version == 0x14 || version == 0x04 || version == 0x17);
  if (spiOk) {
    Serial.println("  -> OK: a CC1101 valaszol SPI-n.");
  } else if (version == 0xFF) {
    Serial.println("  -> 0xFF: MISO nincs bekotve / CSN rossz labon / nincs tap (VCC-GND?).");
  } else if (version == 0x00) {
    Serial.println("  -> 0x00: nincs tap, MISO GND-re er, vagy SCK/MOSI felcserelve.");
  } else {
    Serial.println("  -> Furcsa ertek: laza vagy tul hosszu kabel. Nyomkodd meg a Dupont-okat.");
  }

  // ---- B) RadioLib ----
  Serial.println("\n[B] RadioLib inicializalas");
  int state = radio.begin(FREQ_MHZ);
  if (state != RADIOLIB_ERR_NONE) {
    printErr("radio.begin", state);
    Serial.println("\nMegallok. Javitsd a bekotest, aztan RST gomb.");
    while (true) delay(1000);
  }
  Serial.printf("  OK: CC1101 elindult, %.2f MHz\n", FREQ_MHZ);

  state = radio.setRxBandwidth(RX_BW_KHZ);
  if (state != RADIOLIB_ERR_NONE) printErr("setRxBandwidth", state);
  state = radio.setOOK(true);  // a legtobb redony taviranyito OOK/ASK
  if (state != RADIOLIB_ERR_NONE) printErr("setOOK", state);

  // ---- C) vetel + RSSI ----
  state = radio.startReceive();
  if (state != RADIOLIB_ERR_NONE) {
    printErr("startReceive", state);
    while (true) delay(1000);
  }
  Serial.println("\n[C] Vetel 433.92 MHz-en. Nyomd meg a redony taviranyitojat 1-2 m-re az antennatol!");
  Serial.printf("    (\"JEL!\" sor jon, ha az RSSI > %d dBm)\n\n", RSSI_JEL_KUSZOB);
}

void loop() {
  static uint32_t lastHeartbeat = 0;
  static int minRssi = 0, maxRssi = -200;
  static uint32_t rearms = 0;

  uint8_t marc = ccReadStatusStable(0x35) & 0x1F;
  if (marc != 0x0D) {
    // zajra elkapott "csomag" vagy tulcsordulas utan visszaallitjuk vetelre
    radio.startReceive();
    rearms++;
    delay(5);
  } else {
    int8_t raw = (int8_t)ccReadStatusStable(0x34);
    int rssi = raw / 2 - 74;
    if (rssi < minRssi) minRssi = rssi;
    if (rssi > maxRssi) maxRssi = rssi;

    if (rssi > RSSI_JEL_KUSZOB) {
      int bars = constrain((rssi + 100) / 3, 0, 30);
      Serial.printf("JEL! %4d dBm |", rssi);
      for (int i = 0; i < bars; i++) Serial.print('#');
      Serial.println();
    }
  }

  if (millis() - lastHeartbeat > 2000) {
    lastHeartbeat = millis();
    Serial.printf("[%s] alapzaj: min %d / max %d dBm, ujrainditas: %lu\n",
                  marcName(marc), minRssi, maxRssi, (unsigned long)rearms);
    minRssi = 0;
    maxRssi = -200;
    rearms = 0;
  }
  delay(20);
}
