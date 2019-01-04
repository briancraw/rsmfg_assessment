/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

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
  //Serial.setTimeout(500);

  // print startup message
  Serial.print("Starting RSMFG skills assessment test version ");
  Serial.println(VERSION);
  
  // configure pins
  DEBUG("Configuring pins...");
  initializePins();
  DEBUG("Pins configured");

  // setup interrupts
  //DEBUG("Setting up interrupts...");
  //setupInterrupts();
  //DEBUG("Done setting up interrrupts");
} // setup

void(*resetFunc)(void) = 0; // declare reset function at address 0x0

void loop() {
  char *buffer;
  buffer = readSerial();
  if (commandReady == true) { exec(buffer); }
} // loop

