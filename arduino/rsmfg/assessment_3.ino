/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
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

/*
 * runAssessment3()
 * Lights A3 LED and iterates over checking sensor values while 
 * waiting for the button to be pressed or a timeout to occur.
 */
int runAssessment3() {
  int i = 0;
  int j = 0;
  int pwmValue = 0;
  bool matchingPWMsDetected = false;
  int buttonVal = HIGH;
  int rockerVals[assessment3NumRockerPins];
  char * buffer;
  float score = 0.0;

  a3Active = true;

  Serial.println("Start of Assessment 3");

//const int assessment3InputPinPWMValue[5] = {256, 512, 768, 1024, 1280};
  if (HEADLESS) {
    i = 1;
    j = 0;
    
    while(j < 2) {
      delay(1000);
      DEBUGNOLN(i); DEBUGNOLN(":PWM:"); DEBUG("green");
      delay(1000);
      DEBUGNOLN(i); DEBUGNOLN(":PWM:"); DEBUG("red");
      if (i == 5) {
        i = 1;
      } else {
        i++;
      }
      j++;
    }
    //delay(30);
    return (9);
  }
  
  // setup PWMs
  for (i = 0; i < assessment3NumOutputPWMPins; i++) {
    analogWrite(assessment3OutputPWMPins[i], assessment3OutputPinPWMCycle[i]);
  }

  digitalWrite(ASSESS_3_BTN_LED_1, HIGH);

  while (buttonVal == HIGH && a3Stop == false) {
    a3Result = 0;
    buffer = readSerial();
    if (commandReady) { exec(buffer); }
    
    for (i = 0; i < assessment3NumRockerPins; i++) {
      rockerVals[i] = digitalReadWithDebounce(assessment3RockerPins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      
      if (rockerVals[i] == assessment3RockerVals[i]) {
        a3Result++;
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

      if (0) {
        DEBUGNOLN(i);
        DEBUGNOLN(":PWM:");
        DEBUG(pwmValue);
      }

      if (i == R) {
        if ((assessment3InputPinPWMValue[Y] <= (pwmValue*1.1)) && 
            (assessment3InputPinPWMValue[Y] >= (pwmValue*0.9))) {
          DEBUGNOLN(1); DEBUGNOLN(":PWM:"); DEBUG("green");
          a3Result++;
        } else {
          DEBUGNOLN(1); DEBUGNOLN(":PWM:"); DEBUG("red");              
        }
      }
      if (i == B) {
        if ((assessment3InputPinPWMValue[R] <= (pwmValue*1.1)) && 
            (assessment3InputPinPWMValue[R] >= (pwmValue*0.9))) {
          DEBUGNOLN(2); DEBUGNOLN(":PWM:"); DEBUG("green");
          a3Result++;
        } else {
          DEBUGNOLN(2); DEBUGNOLN(":PWM:"); DEBUG("red");
        }
      }
      if (i == Y) {
        if ((assessment3InputPinPWMValue[W] <= (pwmValue*1.1)) && 
            (assessment3InputPinPWMValue[W] >= (pwmValue*0.9))) {
          DEBUGNOLN(3); DEBUGNOLN(":PWM:"); DEBUG("green");
          a3Result++;
        } else {
          DEBUGNOLN(3); DEBUGNOLN(":PWM:"); DEBUG("red");
        }
      }
      if (i == W) {
        if ((assessment3InputPinPWMValue[B] <= (pwmValue*1.1)) && 
            (assessment3InputPinPWMValue[B] >= (pwmValue*0.9))) {
          DEBUGNOLN(4); DEBUGNOLN(":PWM:"); DEBUG("green");
          a3Result++;
        } else {
          DEBUGNOLN(4); DEBUGNOLN(":PWM:"); DEBUG("red");        
        }
      }
      if (i == K) {
        if ((assessment3InputPinPWMValue[K] <= (pwmValue*1.1)) && 
            (assessment3InputPinPWMValue[K] >= (pwmValue*0.9))) {
          DEBUGNOLN(5); DEBUGNOLN(":PWM:"); DEBUG("green");
          a3Result++;
        } else {
          DEBUGNOLN(5); DEBUGNOLN(":PWM:"); DEBUG("red");
        }
      }
    } // check cables
    
    buttonVal = readA3Button();
    if (a3Stop == true) {
      DEBUG("A3 STOP DETECTED!");
    }
  } // while button not pushed
  
  a3Result = 0;

  for (i = 0; i < assessment3NumRockerPins; i++) {
    rockerVals[i] = digitalReadWithDebounce(assessment3RockerPins[i], DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
      
    if (rockerVals[i] == assessment3RockerVals[i]) {
      a3Result++;
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
    DEBUGNOLN(": 1PWM VALUE: ");
    DEBUG(pwmValue);
  
    if (i == R && ((assessment3InputPinPWMValue[Y] <= (pwmValue*1.1)) && 
                   (assessment3InputPinPWMValue[Y] >= (pwmValue*0.9)))) {
      DEBUG("R GOOD");
      a3Result++;
    }
    if (i == B && ((assessment3InputPinPWMValue[R] <= (pwmValue*1.1)) && 
                   (assessment3InputPinPWMValue[R] >= (pwmValue*0.9)))) {
      DEBUG("B GOOD");
      a3Result++;
    }
    if (i == Y && ((assessment3InputPinPWMValue[W] <= (pwmValue*1.1)) && 
                   (assessment3InputPinPWMValue[W] >= (pwmValue*0.9)))) {
      DEBUG("Y GOOD");
      a3Result++;
    }
    if (i == W && ((assessment3InputPinPWMValue[B] <= (pwmValue*1.1)) && 
                   (assessment3InputPinPWMValue[B] >= (pwmValue*0.9)))) {
      DEBUG("W GOOD");
      a3Result++;
    }
    if (i == K && ((assessment3InputPinPWMValue[K] <= (pwmValue*1.1)) && 
                   (assessment3InputPinPWMValue[K] >= (pwmValue*0.9)))) {
      DEBUG("K GOOD");
      a3Result++;
    }
  }// check cables

  a3Active = false;
  digitalWrite(ASSESS_3_BTN_LED_1, LOW);
  Serial.println("End of Assessment 3");
 
  return (a3Result);
} //runAssessment3()

/*
 * readA3Button()
 * returns the results of the A3 button value
 */
int readA3Button() {
  int buttonVal;
  // check button
  buttonVal = digitalReadWithDebounce(ASSESS_3_BTN_1, DEBOUNCE_DELAY, NUM_DEBOUNCE_SAMPLES);
  if (buttonVal == LOW) {
    flashLED(ASSESS_3_BTN_LED_1, 3, 200);
    DEBUG("Assessment 3 button pressed");
  }
  return buttonVal;
} // readA3Button

