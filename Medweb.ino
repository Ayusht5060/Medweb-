#include <OneWire.h>
#include <DallasTemperature.h>
#include "DHT.h"

 
#define DHTPIN 2
#define DHTTYPE DHT22
#define ONE_WIRE_BUS 3
#define MQ135_PIN A0
#define PH_PIN A1
#define DO_PIN A2

 
DHT dht(DHTPIN, DHTTYPE);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature ds18b20(&oneWire);

void setup() {
  Serial.begin(9600);
  dht.begin();
  ds18b20.begin();
}

void loop() {
 
  float airTemp = dht.readTemperature();
  float humidity = dht.readHumidity();

 
  ds18b20.requestTemperatures();
  float liquidTemp = ds18b20.getTempCByIndex(0);

 
  int mq135Value = analogRead(MQ135_PIN);

 
  int phRaw = analogRead(PH_PIN);
  float voltagePH = phRaw * (5.0 / 1023.0);
  float pHValue = 7 + ((2.5 - voltagePH) / 0.18); // Example calibration

 
  int doRaw = analogRead(DO_PIN);
  float voltageDO = doRaw * (5.0 / 1023.0);
  float DOppm = voltageDO * 20; // Example scaling
 
  Serial.println("=== SIRI Environment Data ===");
  Serial.print("Air Temp (°C): "); Serial.println(airTemp);
  Serial.print("Humidity (%): "); Serial.println(humidity);
  Serial.print("Liquid Temp (°C): "); Serial.println(liquidTemp);
  Serial.print("CO2 Sensor Value: "); Serial.println(mq135Value);
  Serial.print("pH: "); Serial.println(pHValue);
  Serial.print("DO (mg/L): "); Serial.println(DOppm);
  Serial.println("==============================");

  delay(2000);
}
 
