# Okosotthon – redőnyvezérlő (ESP32-S3 + CC1101)

Saját, privát redőnyvezérlő: egy központi ESP32-S3, 433 MHz-es CC1101 rádió, helyi OLED-menü
encoderrel és gombokkal, később telefonos app. Az eredeti távirányítók maradnak használhatók.

> **Állapot (2026-11-01):** a redőnyvezérlés **még nem működik**. A hardver nagy része megvan,
> de a legelső rádiós teszten akadtunk el, mert a soros port nem mutatta a saját üzeneteinket.
> Ez a doksi a meglévő tervet viszi tovább, nem tervez újra semmit.

---

## 0. Most mit csinálj (rövid verzió)

1. **Arduino IDE → Tools → USB CDC On Boot: `Disabled`.** Töltsd fel a
   [`firmware/01_serial_test`](firmware/01_serial_test/01_serial_test.ino) programot, és nézd a
   Serial Monitort 115200 baudon. Ha látod a `=== ... 01 soros teszt ===` sort, az 1. lépés kész.
2. **USB-t KIHÚZOD**, aztán bekötöd a CC1101-et az [1. táblázat](#1-végleges-lábkiosztás) szerint
   (8 db anya–anya Dupont, az antennát is csavard rá).
3. USB vissza, feltöltöd a [`firmware/02_cc1101_test`](firmware/02_cc1101_test/02_cc1101_test.ino)
   programot. Ha `VERSION = 0x14` és `OK: CC1101 elindult`, a 2. lépés kész.
4. Megnyomod a redőny távirányítóját az antenna közelében: `JEL!` soroknak kell jönniük.
   Ez már a 3. lépés eleje.

OLED-et és BME280-at **most ne** kösd be. Előbb legyen meg a rádió, és amúgy is forrasztani kell őket.

---

## 1. Végleges lábkiosztás

Az eredeti tervben **a GPIO10 kétszer szerepelt**: a CC1101 CSN-je és a BACK gomb is ide ment.
Javítás: **a CC1101 marad a GPIO10–13-on** (ez az ESP32-S3 alapértelmezett SPI-lábkiosztása),
**a BACK gomb átkerül a GPIO16-ra.** Minden más maradt, ahogy volt.

### CC1101 (most kötöd be)

| CC1101 láb | ESP32-S3 láb | Megjegyzés |
|---|---|---|
| GND  | GND     | bármelyik GND |
| VCC  | **3V3** | **SOHA ne 5V-ra!** A CC1101 3,3 V-os, az 5V megöli |
| GDO0 | GPIO14  | |
| CSN  | GPIO10  | SPI chip select |
| SCK  | GPIO12  | SPI órajel |
| MOSI | GPIO11  | ESP → rádió |
| MISO | GPIO13  | rádió → ESP (a modulon néha `MISO/GDO1` a felirat) |
| GDO2 | GPIO15  | |

### Kijelző és hőmérő (beforrasztás után)

Hogy semmit ne kelljen elosztani, **a kijelző és a hőmérő külön I²C buszt kap**
(az ESP32-S3-nak kettő van), és **a lapon lévő két 3V3 láb közül mindkettő kap egyet**.

**Kijelző (FRONT-ROT-OLED13) → ESP32-S3**

| Kijelző láb | ESP32-S3 láb |
|---|---|
| VCC | 3V3 (az egyik) |
| GND | GND |
| SDA | GPIO8 |
| SCL | GPIO9 |
| TRA (A / CLK) | GPIO4 |
| TRB (B / DT) | GPIO5 |
| PSH (PUSH / SW) | GPIO6 |
| CON (CONFIRM) | GPIO7 |
| BAK (BACK) | **GPIO16** (régen GPIO10 volt, ütközött a CC1101 CSN-nel) |

**Hőmérő (BME280) → ESP32-S3**

| BME280 láb | ESP32-S3 láb |
|---|---|
| VIN / VCC | 3V3 (a másik) |
| GND | GND (egy másik GND láb) |
| SDA / SDI | GPIO17 |
| SCL / SCK | GPIO18 |
| CSB (ha van) | nem kell bekötni |
| SDO (ha van) | nem kell bekötni |

Minden anya–anya Dupont, egyenesen, breadboard nélkül. Kódban: kijelző `Wire` (8/9), BME280 `Wire1` (17/18).
A gombok és az encoder `INPUT_PULLUP`-pal mennek: a gomb a lábat GND-re húzza, ha megnyomod.

**Ha a CC1101 is be van kötve:** három eszköz kér 3V3-at, de csak két 3V3 láb van. Ilyenkor az egyik 3V3
lábat vidd a breadboard piros sínjére (a GND-t a kékre), és arról kapja a tápot kettő az eszközök közül.

### Ezekhez a lábakhoz ne nyúlj

| Láb | Miért |
|---|---|
| GPIO0, 3, 45, 46 | strapping lábak, a bootolást befolyásolják |
| GPIO19, 20 | natív USB (az „USB” feliratú port) |
| GPIO26–37 | flash és **OPI PSRAM** (N16R8-on foglaltak, ha bekötsz rájuk valamit, lefagy/nem bootol) |
| GPIO43, 44 | UART0 TX/RX = a „COM” port, ezen jön a Serial Monitor |
| GPIO48 (vagy 38) | a lap RGB LED-je |

Szabad tartalék lábak későbbre (kapu, garázs, relé stb.): **GPIO21, 39, 40, 41, 42, 47.** (A GPIO17/18 a BME280-é.)

---

## 2. Fizikai bekötés: hogyan dugd össze

- **Mindig áramtalanítva köss!** USB-kábel ki, bekötöd, ellenőrzöd, és csak utána jöhet vissza az USB.
- **CC1101 → ESP32: anya–anya Dupont, egyenesen, breadboard nélkül.** A CC1101 V2.0 2×4-es tüskesorát
  nem lehet breadboardba dugni, mert a két sor ugyanabba az oszlopba esik, és a lábak összezárnak.
  Ezért vettük az anya–anya kábeleket.
- Az **ESP32-S3 lapot se erőltesd a breadboardba**, ha nem fontos. Széles, egy 830-as breadboardon
  az egyik oldalon alig marad szabad lyuk. Most a tüskéire közvetlenül is ráhúzhatod a Dupontot.
- **Ne a CC1101 modul lábsorrendjére hagyatkozz emlékezetből**, olvasd le a feliratot a panelről.
  Klónonként változik, melyik sarokban van az 1-es láb.
- **Az antennát csavard fel**, mielőtt bármit adnál. Antenna nélkül adni rossz ötlet. Vételnél nem
  árt neki, csak süket lesz.
- A Dupont-kábel legyen rövid (10–20 cm). A hosszú, lötyögő kábel SPI-n hülyeségeket okoz.
- Ellenőrzés bekötés után, USB nélkül: 8 kábel, **VCC a 3V3-on van (nem 5V-on)**, és egyik láb sincs eggyel elcsúszva.

---

## 3. 1. lépés: a soros port megjavítása

### Mi volt a hiba

A te lapodon két USB-C port van:

- **COM**: egy USB–UART chipen át az ESP32 **UART0**-jára megy (GPIO43/44). Windowson ez a COM3.
- **USB**: az ESP32-S3 saját, natív USB-je (GPIO19/20).

Ha **USB CDC On Boot = Enabled**, akkor a `Serial` a **natív USB portra** van irányítva, nem a COM-ra.
A bootolási üzeneteket (`ESP-ROM:esp32s3-20210327 ...`) a ROM mindig az UART0-ra írja, ezért ezeket
láttad a COM3-on. A `Serial.println()` viszont a másik portra ment, ahol nem volt kábel.
**Pontosan ezt a tünetet láttad**, és szinte biztos, hogy ez az oka.

A kimenet `entry 0x403c88b8`-nél ért véget, és utána nem jött hibaüzenet (`Guru Meditation`, reboot loop).
Ebből az látszik, hogy a program valószínűleg rendben elindult, csak a kiírás ment rossz helyre.

### Arduino IDE beállítások (Tools menü)

| Beállítás | Érték |
|---|---|
| Board | ESP32S3 Dev Module |
| Port | COM3 |
| **USB CDC On Boot** | **Disabled** |
| USB Mode | Hardware CDC and JTAG (COM-on mindegy) |
| Flash Size | 16MB (128Mb) |
| Flash Mode | QIO 80MHz |
| **PSRAM** | **OPI PSRAM** (N16R8 = 8 MB oktális PSRAM) |
| Partition Scheme | 16M Flash (3MB APP/9.9MB FATFS) – vagy maradhat az alapértelmezett |
| Upload Speed | 921600 (ha hibázik, 115200) |

### Teszt

1. Nyisd meg: `firmware/01_serial_test/01_serial_test.ino`
2. Upload.
3. Serial Monitor, **115200 baud**. Ha a monitor csak feltöltés után nyílt meg, nyomd meg a lapon a **RST** gombot.

**Jó eredmény:**

```
=== Max OS / okosotthon - 01 soros teszt ===
Chip:        ESP32-S3 rev 0, 2 mag
CPU:         240 MHz
Flash:       16 MB
PSRAM:       8192 KB (OK)
USB CDC On Boot: Disabled -> Serial = COM port. Ez igy jo.
Ha ezt latod, a soros kommunikacio MUKODIK. Johet a 02_cc1101_test.
el vagyok: 0
el vagyok: 1
...
```

A sketch ráadásul akkor is kiír a COM-ra, ha a CDC On Boot véletlenül Enabled maradt
(ilyenkor a `Serial0`-n át), és szól, hogy állítsd át. A lap RGB LED-je másodpercenként kéken villan,
így soros port nélkül is látod, hogy fut a program.

**Ha még mindig csak a ROM-üzenet jön:**

- Biztosan újrafordítottál, és újra feltöltötted a beállítás átállítása után? (A Tools-beállítás csak fordításkor érvényesül.)
- Jó a baud? Monitor és sketch is 115200.
- Kipróbálod a másik portot? Kábel az **USB** feliratú portba, `USB CDC On Boot: Enabled`, és ott
  egy új COM-szám jelenik meg. Ha így megy, az is jó, csak akkor mindig ezt a kombinációt használd.
- Ha `PSRAM: (NINCS!)`: a PSRAM legyen OPI. Ha QSPI-re van állítva, N16R8-on összeomolhat.
- Ha reboot loop van (`rst:0xc` vagy `Guru Meditation` ismétlődik), másold be a teljes kimenetet, és megnézzük.

---

## 4. 2. lépés: a CC1101 felismerése

**Előfeltétel:** az 1. lépés működik.

1. USB ki → CC1101 bekötése az [1. táblázat](#cc1101-most-kötöd-be) szerint → antenna fel → USB vissza.
2. Library Manager: a **RadioLib** legyen fent (ez már megvan).
3. Nyisd meg: `firmware/02_cc1101_test/02_cc1101_test.ino` → Upload → Serial Monitor 115200.

**Jó eredmény:**

```
[A] Nyers SPI olvasas
  PARTNUM = 0x00 (vart: 0x00)
  VERSION = 0x14 (vart: 0x14, klonokon 0x04 vagy 0x17)
  -> OK: a CC1101 valaszol SPI-n.

[B] RadioLib inicializalas
  OK: CC1101 elindult, 433.92 MHz

[C] Vetel 433.92 MHz-en. Nyomd meg a redony taviranyitojat ...
[RX] alapzaj: min -104 / max -96 dBm, ujrainditas: 0
JEL!  -42 dBm |#####################
JEL!  -45 dBm |###################
```

Az `[A]` rész a RadioLibtől függetlenül, közvetlenül olvassa ki a chipet. Ha itt rossz az érték, akkor
**a bekötéssel van baj, nem a kóddal.**

### Hibafa

| Amit látsz | Valószínű ok | Mit csinálj |
|---|---|---|
| `VERSION = 0xFF` | MISO nincs bekötve, CSN rossz lábon, vagy nincs táp | Nézd meg a MISO→13 és CSN→10 kábelt, VCC→3V3, GND→GND |
| `VERSION = 0x00` | nincs táp, MISO GND-re ér, vagy SCK/MOSI fel van cserélve | VCC és GND ellenőrzése, SCK→12, MOSI→11 |
| össze-vissza érték, minden RST után más | laza vagy túl hosszú kábel | nyomkodd meg a Dupontokat, cseréld rövidebbre |
| `[A]` jó, de `radio.begin: HIBA, kod = -2` | ritka; RadioLib nem ismeri az adott verziót | másold be a kimenetet |
| `[C]` fut, de a távirányítóra nincs `JEL!` | nem 433,92 MHz-es a távirányító, vagy nincs antenna | nézd meg a távirányító hátulját vagy elemtartóját (433 / 868 MHz?), antenna fent van-e |
| `ujrainditas` nagy szám, `[egyeb]` | a chip nem marad vételben | másold be a kimenetet |

---

## 5. Állapot-ellenőrzőlista

- [x] Alkatrészek megérkeztek: ESP32-S3 N16R8, CC1101 + SMA antenna, OLED+encoder, BME280, breadboard, Dupont
- [ ] A második ESP32-S3 rendelése **nem igazolt**. Nézd meg a rendelési visszaigazolást.
- [x] Arduino IDE + ESP32 core 3.3.12 + RadioLib
- [x] Feltöltés COM3-on (flash verify OK)
- [ ] **1. Soros kommunikáció**: `01_serial_test` kimenete látszik
- [ ] **2. CC1101**: `VERSION = 0x14`, `radio.begin` OK
- [ ] 3. Távirányító jelvizsgálata: `JEL!` jön gombnyomásra, utána a nyers jel rögzítése és dekódolása
- [ ] 4. Adás és vétel próbája (visszajátszás, előbb a redőny közelében, kis teljesítménnyel)
- [ ] 5. OLED + encoder beforrasztása, bekötése (GPIO8/9, 4/5/6, 7, **16**) – teszt: `03_kijelzo_teszt`
- [ ] 6. BME280 beforrasztása, bekötése (saját I²C: GPIO17/18)
- [ ] 7. Helyi vezérlőmenü
- [ ] 8. Telefonos app és távoli elérés
- [ ] 9. Az eredeti távirányítók tesztje a végleges rendszer mellett

---

## 6. Forrasztás (5–6. lépéshez, nem sürgős)

Az OLED és a BME280 tüskesor nélkül jött. Amikor odaérsz:

- A tüskesort a **rövid végével** dugd a panelbe, a hosszú vég lefelé nézzen. Ha breadboardba tűzöd
  a tüskesort, és arra teszed a panelt, egyenes lesz.
- Pákahegy kb. 330–350 °C, minden láb 2–3 másodperc. A jó forrasztás fényes kis kúp, nem gömb.
- A **BME280** CSB és SDO lábát (ha van) nem kell bekötni, a modul magától I²C módban indul.
- Figyelem: sok olcsó „BME280” valójában **BMP280**, amin nincs páratartalom-mérés. Az I²C-teszt
  kiírja majd a chip ID-t (`0x60` = BME280, `0x58` = BMP280).

---

## 7. Kijelző és hőmérő teszt

`firmware/03_kijelzo_teszt` – kell hozzá az **U8g2** könyvtár (Library Manager).

Jó eredmény a Serial Monitoron:

```
I2C scan (kijelzo, SDA=8 SCL=9): 0x3C
  -> Kijelzo megvan: 0x3C
I2C scan (homero, SDA=17 SCL=18): 0x76
  -> Homero megvan: cim 0x76, chip ID 0x60 = BME280 (OK)
```

A kijelzőn: felirat, `Encoder:` szám (forgatásra változik), három doboz PSH / CON / BAK
(lenyomásra kitöltődik), a hőmérő típusa, alul egy futó csík.

| Amit látsz | Mit csinálj |
|---|---|
| `kijelzo ... SEMMI` | VCC/GND, SDA↔SCL felcserélve?, forrasztás |
| a scan 0x3C-t talál, de a kijelző sötét vagy szemetes | a sketch elején `USE_SH1106` → `0` |
| az encoder rossz irányba számol | TRA és TRB kábelt cseréld meg |
| egy kattanásra 2-t vagy fél lépést ugrik | szólj, átállítom a lépésosztót |
| gomb nem reagál | az adott kábel / forrasztás |
| `chip ID 0x58 = BMP280` | ez BMP280: hőmérséklet és légnyomás megy, páratartalom nincs |

---

## 8. Mi jön a 2. lépés után

Ha a `JEL!` sorok megjönnek gombnyomásra, a következő sketch a CC1101-et **direkt (aszinkron) OOK
módba** teszi, és rögzíti a távirányító impulzusidőit (fel/le mikroszekundumban). Ebből derül ki:

- milyen kódolású (fix kód vagy rolling code),
- egyszerűen visszajátszható-e, vagy a protokollt kell megvalósítani.

**Biztonsági szabály:** adni csak saját redőnyre, kis teljesítménnyel, a közelben próbálunk.

---

## Fájlok

```
projects/okosotthon-redony/
├── README.md                              ← ez a fájl
└── firmware/
    ├── 01_serial_test/01_serial_test.ino  ← 1. lépés: soros port
    ├── 02_cc1101_test/02_cc1101_test.ino  ← 2. lépés: CC1101 SPI + RSSI
    └── 03_kijelzo_teszt/03_kijelzo_teszt.ino ← kijelző, encoder, gombok, BME280 felismerés
```
