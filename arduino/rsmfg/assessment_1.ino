/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

  Description:
  Contains code to run through assesment_1.

  This assessment requires the user to assemble a puzzle in the correct order.
  Each piece, when fit into the correct position, makes contact and pulls its
  corresponding pin low.

  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "assessment.h"
#include "pins.h"
#include "button.h"
#include "serial.h"

/*
 * runAssessment1B()
 * Lights A1A LED and iterates over checking sensor values while 
 * waiting for the button to be pressed or a timeout to occur.
 */
int runAssessment1A() {
  int puzzlePinVals[] = {LOW};
  int puzzleButtonVal = HIGH;
  int i = 0;
  float score = 0.0;
  char * buffer;
  
  a1aActive = true;
  Serial.println("Start of Assessment 1A");

  if (HEADLESS) {
    delay(50);
    return (3);
  }

  digitalWrite(ASSESS_1_PUZZLE_BTN_LED_1, HIGH);

  while (puzzleButtonVal == HIGH && a1aStop == false) {
    buffer = readSerial();
    if (commandReady) { exec(buffer); }
    a1aResult = 0;

    // read the state of the 3 puzzle sensors:
    for (i = 0; i < assessment1NumPuzzlePins; i++) {
      puzzlePinVals[i] = digitalReadWithDebounce(assessment1PuzzlePins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      if (puzzlePinVals[i] == assessment1PuzzlePinExpVals[i]) {
        a1aResult++;
        DEBUGNOLN("PUZZLE PIN ");
        DEBUGNOLN(assessment1PuzzlePins[i]);
        DEBUGNOLN(" : ");
        DEBUG(assessment1PuzzlePinExpVals[i]);
      }
    } // loop through assembly pins

    // check assembly button
    puzzleButtonVal = digitalReadWithDebounce(ASSESS_1_PUZZLE_BTN_1, DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);

    if (puzzleButtonVal == LOW) {
      flashLED(ASSESS_1_PUZZLE_BTN_LED_1, 3, 200);
    }
  } // while (puzzleButtonVal == HIGH)

  if (a1aStop == true) {
    DEBUG("A1A STOP DETECTED!");
  }
  
  digitalWrite(ASSESS_1_PUZZLE_BTN_LED_1, LOW);
  a1aActive = false;
  
  return (a1aResult);
} //runAssessment1A

/*
 * runAssessment1B()
 * Lights A1B LED and iterates over checking sensor values while 
 * waiting for the button to be pressed or a timeout to occur.
 */
int runAssessment1B() {
  int assemblyPinVals[] = {LOW};
  int assemblyButtonVal = HIGH;
  int i = 0;
  //int numCorrect = 0;
  float score = 0.0;
  char * buffer;

  a1bActive = true;
  
  Serial.println("Start of Assessment 1B");

  if (HEADLESS) {
    delay(50);
    return (4);
  }
  
  // optionally start a timer
  // if interrupt from timer fires then stop test and issue a fail
  
  digitalWrite(ASSESS_1_BTN_LED_1, HIGH);
  
  while (assemblyButtonVal == HIGH && a1bStop == false) {
    buffer = readSerial();
    if (commandReady) { exec(buffer); }
    a1bResult = 0;

    // read the state of the puzzle sensors:
    for (i = 0; i < assessment1NumAssemblyPins; i++) {
      assemblyPinVals[i] = digitalReadWithDebounce(assessment1AssemblyPins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      if (assemblyPinVals[i] == LOW) {
        DEBUGNOLN("ASSEMBLY PIN ");
        DEBUGNOLN(assessment1AssemblyPins[i]);
        DEBUG(" PRESSED ");
        a1bResult++;
      }
    } // loop through assembly pins

    // check assembly button
    assemblyButtonVal = digitalReadWithDebounce(ASSESS_1_BTN_1, DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);

    if (assemblyButtonVal == LOW) {
      flashLED(ASSESS_1_BTN_LED_1, 3, 200);
    }
  } // while (assemblyButtonVal == LOW)

  if (a1bStop == true) {
    DEBUG("A1B STOP DETECTED!");
  }

  digitalWrite(ASSESS_1_BTN_LED_1, LOW);
  a1bActive = false;
  return (a1bResult);
} //runAssessment1B

