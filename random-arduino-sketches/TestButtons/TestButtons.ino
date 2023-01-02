/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Button
*/

// constants won't change. They're used here to set pin numbers:
const int buttonUp = 2;     // the number of the pushbutton pin
const int buttonDown = 3;     // the number of the pushbutton pin
const int buttonLeft = 4;     // the number of the pushbutton pin
const int buttonRight = 5;     // the number of the pushbutton pin
const int buttonSelect = 6;     // the number of the pushbutton pin
const int buttonShoot = 7;     // the number of the pushbutton pin

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {
  Serial.begin(9600);
}

void loop() {
  // read the state of the pushbutton value:
  int buttonUpState = digitalRead(buttonUp);
  int buttonLeftState = digitalRead(buttonLeft);
  int buttonRightState = digitalRead(buttonRight);
  int buttonDownState = digitalRead(buttonDown);
  int buttonSelectState = digitalRead(buttonSelect);
  int buttonShootState = digitalRead(buttonShoot);
  if (buttonUpState == HIGH) {
    Serial.println("up");
  }
  if (buttonLeftState == HIGH) {
    Serial.println("left");
  }
  if (buttonRightState == HIGH) {
    Serial.println("right");
  }
  if (buttonDownState == HIGH) {
    Serial.println("down");
  }
//  if (buttonSelectState == HIGH) {
//    Serial.println("select");
//  }
  if (buttonShootState == HIGH) {
    Serial.println("shoot");
  }
}
