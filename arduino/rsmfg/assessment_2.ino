/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Description:
  Contains code to run through assesment 2.
  
  This assessment requires the user to thread in a series of various size
  screws into the board.  Each screw should makes contact with an embedded contact at
  the bottom of the threaded hole.  The metal plate is grounded causing the contact
  to be pulled low.
  
  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "assessment.h"
#include "serial.h"
#include "pins.h"
#include "button.h"

/*
 * runAssessment2()
 * Lights A2 LED and iterates over checking sensor values while 
 * waiting for the button to be pressed or a timeout to occur.
 */
int runAssessment2() {
  int i = 0;
  int pinVals[assessment2NumScrewPins];
  int buttonVal = HIGH;
  //int numCorrect = 0;
  float score = 0.0;
  char * buffer;

  a2Active = true;

  Serial.println("Start of Assessment 2");

  if (HEADLESS) {
    delay(300000);
    return (25.678);
  }

  digitalWrite(ASSESS_2_BTN_LED_1, HIGH);

  while (buttonVal == HIGH && a2Stop == false) {
    buffer = readSerial();
    if (commandReady) { exec(buffer); }
    a2Result = 0;

    // loop through and read the state of each pin
    for (i = 0; i < assessment2NumScrewPins; i++) {
      pinVals[i] = digitalReadWithDebounce(assessment2ScrewPins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      if (pinVals[i] == HIGH) {
        digitalWrite(assessment2ScrewLedPins[i], LOW);
      } else {
        a2Result++;
        digitalWrite(assessment2ScrewLedPins[i], HIGH);  
        DEBUGNOLN("PIN ");
        DEBUGNOLN(assessment2ScrewPins[i]);
        DEBUG(" PRESSED ");
      }
    } // check each screw 

    // check button
    buttonVal = digitalReadWithDebounce(assessment2ButtonPins[0], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
    if (buttonVal == LOW) {
      flashLED(ASSESS_2_BTN_LED_1, 3, 200);
      DEBUG("Assessment 2 button pressed");
    }
  } // while

  if (a2Stop == true) {
    DEBUG("A2 STOP DETECTED!");
  }

  for (i = 0; i < assessment2NumScrewPins; i++) { 
    digitalWrite(assessment2ScrewLedPins[i], LOW);
  }
  
  digitalWrite(ASSESS_2_BTN_LED_1, LOW);
  Serial.println("End of Assessment 2");
  a2Active = false;
  
  return a2Result;
} // runAssessment2

