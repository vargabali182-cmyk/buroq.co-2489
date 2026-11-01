// 01_serial_test.ino
// 1. lépés: ESP32-S3 soros kommunikáció ellenőrzése.
//
// Kábel: az ESP32-S3 "COM" feliratú USB-C csatlakozójában (Windowson COM3).
// Arduino IDE:  Tools -> USB CDC On Boot: Disabled   (EZ A LÉNYEG)
// Serial Monitor: 115200 baud.
//
// Akkor is működik, ha a CDC On Boot véletlenül Enabled maradt: ilyenkor a
// szöveget a Serial0-ra (UART0 = COM port) is kiírja, és szól, hogy állítsd át.

#include <Arduino.h>

#if ARDUINO_USB_CDC_ON_BOOT
  // Serial = natív USB (a másik, "USB" feliratú port), Serial0 = UART0 (COM port)
  #define LOGF(...) do { Serial.printf(__VA_ARGS__); Serial0.printf(__VA_ARGS__); } while (0)
#else
  // Serial = UART0 = COM port
  #define LOGF(...) Serial.printf(__VA_ARGS__)
#endif

static uint32_t counter = 0;

static void setLed(uint8_t r, uint8_t g, uint8_t b) {
#ifdef RGB_BUILTIN
  rgbLedWrite(RGB_BUILTIN, r, g, b);  // a lap RGB LED-je (GPIO48, egyes lapokon GPIO38)
#else
  (void)r; (void)g; (void)b;
#endif
}

void setup() {
  Serial.begin(115200);
#if ARDUINO_USB_CDC_ON_BOOT
  Serial0.begin(115200);
#endif
  delay(1500);  // legyen időd megnyitni a Serial Monitort

  LOGF("\n\n=== Max OS / okosotthon - 01 soros teszt ===\n");
  LOGF("Chip:        %s rev %d, %d mag\n", ESP.getChipModel(), ESP.getChipRevision(), ESP.getChipCores());
  LOGF("CPU:         %lu MHz\n", (unsigned long)ESP.getCpuFreqMHz());
  LOGF("Flash:       %lu MB\n", (unsigned long)(ESP.getFlashChipSize() / (1024UL * 1024UL)));
  LOGF("PSRAM:       %lu KB %s\n", (unsigned long)(ESP.getPsramSize() / 1024UL),
       psramFound() ? "(OK)" : "(NINCS! -> Tools: PSRAM = OPI PSRAM)");
#if ARDUINO_USB_CDC_ON_BOOT
  LOGF("USB CDC On Boot: ENABLED -> a COM porton csak a Serial0 miatt latod ezt.\n");
  LOGF("                 Allitsd Disabled-re, kulonben a Serial.println() a masik USB portra megy!\n");
#else
  LOGF("USB CDC On Boot: Disabled -> Serial = COM port. Ez igy jo.\n");
#endif
  LOGF("Ha ezt latod, a soros kommunikacio MUKODIK. Johet a 02_cc1101_test.\n\n");
}

void loop() {
  LOGF("el vagyok: %lu\n", (unsigned long)counter++);

  // villogás, hogy soros port nélkül is lásd: fut a program
  setLed(0, 0, 20);
  delay(100);
  setLed(0, 0, 0);
  delay(900);
}
