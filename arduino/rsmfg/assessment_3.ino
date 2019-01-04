/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Description:
  Contains code to run through assesment 3.
  
  This assessment consists of a series of buttons, switches, and wire segments.
  1.) The switches must be turned on in the order shown on the tablet. 
  2.) The wire segments must be connected.
  3.) The green button must be pushed. This initiates a check of the wire segments.  
      If they are connected correctly the user will be instructed to dissassemble
      the wire segments.
  4.) User must hold down button A1 and turn rotary switch A1 to the left.
  5.) User must hold down button A2 and turn rotary switch A2 to the right.
  6.) If all steps occurr correctly the assessment is passed.
  
  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "assessment.h"
#include "pins.h"

float runAssessment3() {
  int i = 0;
  int pwmValue = 0;
//bool validDutyCycleDetected[assessment3NumInputPins] = {0, 0, 0, 0, 0};
  bool matchingPWMsDetected = false;
  int buttonVal;
  int rockerVals[assessment3NumRockerPins];
  int numCorrect = 0;
  char * buffer;
  float score = 0.0;

  a3Active = true;

  Serial.println("Start of Assessment 3");

  if (HEADLESS) {
    delay(300000);
    return (99.99);
  }
  
  // setup PWMs
  for (i = 0; i < assessment3NumOutputPWMPins; i++) {
    analogWrite(assessment3OutputPWMPins[i], assessment3OutputPinPWMCycle[i]);
  }

  digitalWrite(ASSESS_3_BTN_LED_1, HIGH);

  while (buttonVal == HIGH && a3Stop == false) {  
    buffer = readSerial();
    if (commandReady) { exec(buffer); }
    numCorrect = 0;

    for (i = 0; i < assessment3NumRockerPins; i++) {
      rockerVals[i] = digitalReadWithDebounce(assessment3RockerPins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      //DEBUGNOLN("ROCKER ");
      //DEBUGNOLN(assessment3RockerPins[i]);
      //DEBUGNOLN(" VAL ");
      //DEBUGNOLN(rockerVals[i]);  
      //DEBUGNOLN(" EXP: ");
      //DEBUG(assessment3RockerVals[i]);
      
      if (rockerVals[i] == assessment3RockerVals[i]) {
        numCorrect++;
      }
    } // check rocker values

    for (i = 0; i < assessment3NumInputPWMPins; i++) {
      pwmValue = pulseIn(assessment3InputPWMPins[i], HIGH, pinValueTimeout);
      // compare read value to all PWM outputs and look for a match
      //   r -> Ry
      //   b -> Rr 
      //   y -> Rw
      //   w -> Rb
      //   k -> Rk

  DEBUGNOLN(i);
  DEBUGNOLN(": PWM VALUE: ");
  DEBUG(pwmValue);
      if (i == R && ((assessment3InputPinPWMValue[Y] <= (pwmValue*1.1)) && 
                     (assessment3InputPinPWMValue[Y] >= (pwmValue*0.9)))) {
        DEBUG("R GOOD");
        numCorrect++;
      }
      if (i == B && ((assessment3InputPinPWMValue[R] <= (pwmValue*1.1)) && 
                     (assessment3InputPinPWMValue[R] >= (pwmValue*0.9)))) {
        DEBUG("B GOOD");
        numCorrect++;
      }
      if (i == Y && ((assessment3InputPinPWMValue[W] <= (pwmValue*1.1)) && 
                     (assessment3InputPinPWMValue[W] >= (pwmValue*0.9)))) {
        DEBUG("Y GOOD");
        numCorrect++;
      }
      if (i == W && ((assessment3InputPinPWMValue[B] <= (pwmValue*1.1)) && 
                     (assessment3InputPinPWMValue[B] >= (pwmValue*0.9)))) {
        DEBUG("W GOOD");
        numCorrect++;
      }
      if (i == K && ((assessment3InputPinPWMValue[K] <= (pwmValue*1.1)) && 
                     (assessment3InputPinPWMValue[K] >= (pwmValue*0.9)))) {
        DEBUG("K GOOD");
        numCorrect++;
      }
    } // check cables

    // check button
    buttonVal = digitalReadWithDebounce(ASSESS_3_BTN_1, DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
    if (buttonVal == LOW) {
      flashLED(ASSESS_3_BTN_LED_1, 3, 200);
      DEBUG("Assessment 3 button pressed");
    }

    if (a3Stop == true) {
      DEBUG("A3 STOP DETECTED!");
    }
  } // while
  
  a3Active = false;
  digitalWrite(ASSESS_3_BTN_LED_1, LOW);
  Serial.println("End of Assessment 3");
  score = ((float)numCorrect/(float)(assessment3NumInputPWMPins+assessment3NumRockerPins))*100;
  return score;
}

