/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Description:
  Define all the pin configuration information here.
  Each "test" on the skill table is given a unique number.  Each pin associated with 
  that test uses the test name as a prefix for its pin names
  
  Revision Comments:
  08/15/2018 - Initial version.
*/
#ifndef PINS_H
#define PINS_H

// ASSESSMENT 1 PINS
#define ASSESS_1_PIN_LED 1
#define ASSESS_1_PIN_LED_MODE OUTPUT

#define ASSESS_1_PIN_1 36
#define ASSESS_1_PIN_1_MODE INPUT_PULLUP
#define ASSESS_1_PIN_2 37
#define ASSESS_1_PIN_2_MODE INPUT_PULLUP
#define ASSESS_1_PIN_3 38
#define ASSESS_1_PIN_3_MODE INPUT_PULLUP
#define ASSESS_1_PIN_4 39
#define ASSESS_1_PIN_4_MODE INPUT_PULLUP
#define ASSESS_1_PIN_5 40
#define ASSESS_1_PIN_5_MODE INPUT_PULLUP
#define ASSESS_1_PIN_6 41
#define ASSESS_1_PIN_6_MODE INPUT_PULLUP
#define ASSESS_1_PIN_7 42
#define ASSESS_1_PIN_7_MODE INPUT_PULLUP
#define ASSESS_1_PIN_8 43
#define ASSESS_1_PIN_8_MODE INPUT_PULLUP
#define ASSESS_1_PIN_9 44
#define ASSESS_1_PIN_9_MODE INPUT_PULLUP
#define ASSESS_1_PIN_10 45
#define ASSESS_1_PIN_10_MODE INPUT_PULLUP

#define ASSESS_1_BUTTON_1 46
#define ASSESS_1_BUTTON_2 47

const int assessment1InputPins[10] = {36, 37, 38, 39, 40, 41, 42, 43, 44, 45};
const int assessment1NumInputPins = sizeof(assessment1InputPins)/sizeof(int);
const int assessment1OutputPins[0] = {};
const int assessment1NumOutputPins = sizeof(assessment1OutputPins)/sizeof(int);
const int assessment1ButtonPins[2] = {46, 47};
const int assessment1NumButtonPins = sizeof(assessment1ButtonPins)/sizeof(int);

// ASSESSMENT 2 PINS
#define ASSESS_2_PIN_1 21
#define ASSESS_2_PIN_1_MODE OUTPUT
#define ASSESS_2_PIN_2 22
#define ASSESS_2_PIN_2_MODE OUTPUT
#define ASSESS_2_PIN_3 23
#define ASSESS_2_PIN_3_MODE OUTPUT
#define ASSESS_2_PIN_4 24
#define ASSESS_2_PIN_4_MODE OUTPUT
#define ASSESS_2_PIN_5 25
#define ASSESS_2_PIN_5_MODE OUTPUT
#define ASSESS_2_PIN_6 26
#define ASSESS_2_PIN_6_MODE OUTPUT
#define ASSESS_2_PIN_7 27
#define ASSESS_2_PIN_7_MODE OUTPUT
#define ASSESS_2_PIN_1 28
#define ASSESS_2_PIN_1_MODE INPUT_PULLUP
#define ASSESS_2_PIN_2 29
#define ASSESS_2_PIN_2_MODE INPUT_PULLUP
#define ASSESS_2_PIN_3 30
#define ASSESS_2_PIN_3_MODE INPUT_PULLUP
#define ASSESS_2_PIN_4 31
#define ASSESS_2_PIN_4_MODE INPUT_PULLUP
#define ASSESS_2_PIN_5 32
#define ASSESS_2_PIN_5_MODE INPUT_PULLUP
#define ASSESS_2_PIN_6 33
#define ASSESS_2_PIN_6_MODE INPUT_PULLUP
#define ASSESS_2_PIN_7 34
#define ASSESS_2_PIN_7_MODE INPUT_PULLUP
#define ASSESS_2_PIN_7 35
#define ASSESS_2_PIN_7_MODE INPUT_PULLUP 

#define ASSESS_2_BUTTON_1 35

const int assessment2InputPins[7] = {28, 29, 30, 31, 32, 33, 34};
//const int assessment2InputPins[1] = {28};
const int assessment2NumInputPins = sizeof(assessment2InputPins)/sizeof(int);
const int assessment2OutputPins[7] = {21, 22, 23, 24, 25, 26, 27};
const int assessment2NumOutputPins = sizeof(assessment2OutputPins)/sizeof(int);
const int assessment2ButtonPins[1] = {35};
const int assessment2NumButtonPins = sizeof(assessment2ButtonPins)/sizeof(int);

// ASSESSMENT 3 PINS
#define ASSESS_3_PIN_1 2
#define ASSESS_3_PIN_1_MODE OUTPUT
#define ASSESS_3_PIN_1_PWM_VAL 40
#define ASSESS_3_PIN_2 3
#define ASSESS_3_PIN_2_MODE OUTPUT
#define ASSESS_3_PIN_2_PWM_VAL 80
#define ASSESS_3_PIN_3 4
#define ASSESS_3_PIN_3_MODE OUTPUT
#define ASSESS_3_PIN_3_PWM_VAL 120
#define ASSESS_3_PIN_4 5
#define ASSESS_3_PIN_4_MODE OUTPUT
#define ASSESS_3_PIN_4_PWM_VAL 160
#define ASSESS_3_PIN_5 6
#define ASSESS_3_PIN_5_MODE OUTPUT
#define ASSESS_3_PIN_5_PWM_VAL 200

#define ASSESS_3_BUTTON_1 12

const int assessment3InputPins[5] = {7, 8, 9, 10, 11};
const int assessment3NumInputPins = sizeof(assessment3InputPins)/sizeof(int);
const int assessment3OutputPins[5] = {2, 3, 4, 5, 6};
const int assessment3NumOutputPins = sizeof(assessment3OutputPins)/sizeof(int);
const int assessment3ButtonPins[1] = {12};
const int assessment3NumButtonPins = sizeof(assessment3ButtonPins)/sizeof(int);
const int assessment3OutputPinPWMCycle[5] = {32, 64, 192, 128, 160};
const int assessment3InputPinPWMValue[5] = {256, 512, 768, 1024, 1280};
const int pinValueTimeout = 20000;

// Function prototypess
void initializePins();
int digitalReadWithDebounce(int pin, int debounceDelay, int numSamples);

#endif

