//Libraries
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>

// Declare variables variables
#define REDPIN 14
#define GREENPIN 16
#define BUZZERPIN 12
#define TEMPVOUT A0

int lcdColumns = 16;
int lcdRows = 2;
WiFiClient wifiClient;

LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);

void setup() {
    Serial.begin(9600);

    Serial.println("**************************************");
    Serial.println("******      Smart TenpTaKer     ******");
    Serial.println("**************************************");

    // Setup LEDs
    pinMode(REDPIN, OUTPUT);
    pinMode(GREENPIN, OUTPUT);
    pinMode(BUZZERPIN, OUTPUT);

    // Setup LCD
    lcd.begin(5,4);
    lcd.init();
    lcd.backlight();   

    // Setup WiFi
     WiFi.begin("RCA-WiFi", "rca@2019");

}

void loop() {
  
  // Read Temperature
  int analogValue = analogRead(TEMPVOUT);
  float celsius = (analogValue * (3.3 / 1024.0) * 100);

  Serial.print("Current temperature=   ");
  Serial.println((String)celsius);

  String postData="";
  String my_device = "340722SPE0432022";
  postData = "device="+my_device+"&distance="+(String)celsius;
  
if(celsius < 35 ){
    // Turn on GREEN LED
    digitalWrite(GREENPIN, HIGH);
    // Turn off GREEN LED
    digitalWrite(REDPIN, LOW);
    // Turn off BUZZER
    digitalWrite(BUZZERPIN, LOW);

    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print((String)celsius + " celsius");   

    
  }else{
    // Turn off GREEN LED
    digitalWrite(GREENPIN, LOW);
    // Turn on RED LED
    digitalWrite(REDPIN, HIGH);
    // Turn on BUZZER
    digitalWrite(BUZZERPIN, HIGH);

    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print((String)celsius + " celsius");  

    sendData(80, "192.168.1.150", "/iot/" , postData); 
  }

  delay(2000);
  
}

void sendData(const int httpPort, const char* host,const char* filepath , String data){
  
  wifiClient.connect(host, httpPort); 

  wifiClient.println("POST "+(String)filepath+" HTTP/1.1");
  wifiClient.println("Host: " + (String)host);
  wifiClient.println("User-Agent: ESP8266/1.0");
  wifiClient.println("Content-Type: application/x-www-form-urlencoded");
  wifiClient.println("Content-Length: " +(String)data.length());
  wifiClient.println();
  wifiClient.print(data);

  Serial.println("Response: " + wifiClient.readStringUntil('\n'));

}
