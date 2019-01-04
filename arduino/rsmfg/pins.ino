/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Description:
  Code to initialize and manage pins
   
  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "pins.h"
#include <EnableInterrupt.h>

void initializePins() {
  int i = 0;
  
  // go through the pin configurations and setup all the I/O
  
  if (EN_ASSESSMENT1) {
    //pinMode(ASSESS_1_PIN_LED, ASSESS_1_PIN_LED_MODE);
    //pinMode(ASSESS_1_PIN_1, ASSESS_1_PIN_1_MODE);

    // assessment 1 pin initialization
    for (i = 0; i < assessment1NumInputPins; i++) {
      pinMode(assessment1InputPins[i], INPUT_PULLUP);
    }
    for (i = 0; i < assessment1NumOutputPins; i++) {
      pinMode(assessment1OutputPins[i], OUTPUT);
    }
   // for (i = 0; i < assessment1NumButtonPins; i++) {
   //   pinMode(assessment1ButtonPins[i], INPUT_PULLUP);
   // }
  }

  if (EN_ASSESSMENT2) {
    // assessment 2 pin initialization
    for (i = 0; i < assessment2NumInputPins; i++) {
      pinMode(assessment2InputPins[i], INPUT_PULLUP);
    }
    for (i = 0; i < assessment2NumOutputPins; i++) {
      pinMode(assessment2OutputPins[i], OUTPUT);
    }
    //for (i = 0; i < assessment2NumButtonPins; i++) {
    //  pinMode(assessment2ButtonPins[i], INPUT_PULLUP);
    //}
  }
    
  if (EN_ASSESSMENT3) {
    // assessment 3 pin initialization
    for (i = 0; i < assessment3NumInputPins; i++) {
      pinMode(assessment3InputPins[i], INPUT_PULLUP);
    }
    for (i = 0; i < assessment3NumOutputPins; i++) {
      pinMode(assessment3OutputPins[i], OUTPUT);
    }
    //for (i = 0; i < assessment3NumButtonPins; i++) {
    //  pinMode(assessment3ButtonPins[i], INPUT_PULLUP);
    //}
  }
} // initializePins

int digitalReadWithDebounce (int pin, int debounceDelay, int numSamples) {
  int n = 0;
  long lastDebounceTime = 0;  // the last time the output pin was toggled
  int readPinVal[2] = {LOW, LOW};
  int pinVal = LOW;
  
  readPinVal[0] = digitalRead(pin);
  delay(debounceDelay);
  readPinVal[1] = digitalRead(pin);

  if (readPinVal[0] == readPinVal[1]) {
    pinVal = readPinVal[0];
  } else {
    for (n = 0; n < numSamples; n++) {
      delay(debounceDelay);
      readPinVal[0] = digitalRead(pin);
      delay(debounceDelay);
      readPinVal[1] = digitalRead(pin);
      if (readPinVal[0] == readPinVal[1]) {
        pinVal = readPinVal[0];
        break;
      }
      n++;
    } // for numSamples
  }

  return pinVal;
} // digitalReadWithDebounce

 
void setupInterrupts() {
  //noInterrupts();   
  //interrupts();
} // setupInterrupts

void flashLED(int pinNum, int numFlashes, int delayInMS) {
   int i = 0;
   for (i = 0; i < numFlashes; i++) {
     digitalWrite(pinNum, HIGH);
     delay(delayInMS);
     digitalWrite(pinNum, LOW);
     delay(delayInMS);
   } 
} // flashLED



