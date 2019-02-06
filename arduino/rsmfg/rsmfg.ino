/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

  Description:
  Contains the setup and loop functions.
  Initializes the serial link and wait for serial commands. 
  
  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "rsmfg.h"
#include "pins.h"
#include "serial.h"

void setup() {
  // initialize Serial communication
  Serial.begin(BAUD);
  while (!Serial) {};

  // print startup message
  Serial.print("Starting RSMFG skills assessment test version ");
  Serial.println(VERSION);
  
  // configure pins
  DEBUG("Configuring pins...");
  initializePins();
  DEBUG("Pins configured");
  //pinMode(LED_BUILTIN, OUTPUT);
} // setup

void(*resetFunc)(void) = 0; // declare reset function at address 0x0

void loop() {  
  //digitalWrite(LED_BUILTIN, HIGH);
  //delay(1000);
  //digitalWrite(LED_BUILTIN, LOW);
  //delay(1000);
  char *buffer;
  buffer = readSerial();
  if (commandReady == true) { exec(buffer); }
} // loop

