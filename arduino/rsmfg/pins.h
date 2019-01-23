/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Description:
  Define all the pin configuration information for each Assessment
  
  Revision Comments:
  08/15/2018 - Initial version.
*/
#ifndef PINS_H
#define PINS_H

// ASSESSMENT 1 PINS
#define ASSESS_1_PUZZLE_1 22
#define ASSESS_1_PUZZLE_1_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_1_EXP_VAL LOW
#define ASSESS_1_PUZZLE_2 24
#define ASSESS_1_PUZZLE_2_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_2_EXP_VAL HIGH
#define ASSESS_1_PUZZLE_3 26
#define ASSESS_1_PUZZLE_3_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_3_EXP_VAL LOW
#define ASSESS_1_PUZZLE_4 28
#define ASSESS_1_PUZZLE_4_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_4_EXP_VAL HIGH
#define ASSESS_1_PUZZLE_5 30
#define ASSESS_1_PUZZLE_5_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_5_EXP_VAL HIGH
#define ASSESS_1_PUZZLE_6 32
#define ASSESS_1_PUZZLE_6_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_6_EXP_VAL LOW
#define ASSESS_1_ASSEMBLY_1 34
#define ASSESS_1_ASSEMBLY_1_MODE INPUT_PULLUP
#define ASSESS_1_ASSEMBLY_2 36
#define ASSESS_1_ASSEMBLY_2_MODE INPUT_PULLUP
#define ASSESS_1_ASSEMBLY_3 38
#define ASSESS_1_ASSEMBLY_3_MODE INPUT_PULLUP
#define ASSESS_1_ASSEMBLY_4 40
#define ASSESS_1_ASSEMBLY_4_MODE INPUT_PULLUP

#define ASSESS_1_PUZZLE_BTN_1 42
#define ASSESS_1_PUZZLE_BTN_1_MODE INPUT_PULLUP
#define ASSESS_1_PUZZLE_BTN_LED_1 44
#define ASSESS_1_PUZZLE_BTN_LED_1_MODE OUTPUT

#define ASSESS_1_BTN_1 46
#define ASSESS_1_BTN_1_MODE INPUT_PULLUP
#define ASSESS_1_BTN_LED_1 48
#define ASSESS_1_BTN_LED_1_MODE OUTPUT

const int assessment1InputPins[12] = {ASSESS_1_PUZZLE_1, ASSESS_1_PUZZLE_2, ASSESS_1_PUZZLE_3,
                                      ASSESS_1_PUZZLE_4, ASSESS_1_PUZZLE_5, ASSESS_1_PUZZLE_6,
                                      ASSESS_1_ASSEMBLY_1, ASSESS_1_ASSEMBLY_2, ASSESS_1_ASSEMBLY_3,
                                      ASSESS_1_ASSEMBLY_4,
                                      ASSESS_1_PUZZLE_BTN_1,
                                      ASSESS_1_BTN_1};
const int assessment1NumInputPins = sizeof(assessment1InputPins)/sizeof(int);

const int assessment1AssemblyPins[4] = {ASSESS_1_ASSEMBLY_1, ASSESS_1_ASSEMBLY_2, ASSESS_1_ASSEMBLY_3,
                                        ASSESS_1_ASSEMBLY_4};
const int assessment1NumAssemblyPins = sizeof(assessment1AssemblyPins)/sizeof(int);
const int assessment1PuzzlePins[3] = {ASSESS_1_PUZZLE_1, ASSESS_1_PUZZLE_3,
                                      ASSESS_1_PUZZLE_6};
const int assessment1PuzzlePinExpVals[3] = {ASSESS_1_PUZZLE_1_EXP_VAL, ASSESS_1_PUZZLE_3_EXP_VAL,
                                            ASSESS_1_PUZZLE_6_EXP_VAL};
                                         
const int assessment1NumPuzzlePins = sizeof(assessment1PuzzlePins)/sizeof(int);
const int assessment1OutputPins[2] = {ASSESS_1_PUZZLE_BTN_LED_1, ASSESS_1_BTN_LED_1};
const int assessment1NumOutputPins = sizeof(assessment1OutputPins)/sizeof(int);
const int assessment1ButtonPins[2] = {ASSESS_1_PUZZLE_BTN_1, ASSESS_1_BTN_1};
const int assessment1NumButtonPins = sizeof(assessment1ButtonPins)/sizeof(int);

// ASSESSMENT 2 PINS
#define ASSESS_2_SCREW_LED_1 23
#define ASSESS_2_SCREW_LED_1_MODE OUTPUT
#define ASSESS_2_SCREW_LED_2 25
#define ASSESS_2_SCREW_LED_2_MODE OUTPUT
#define ASSESS_2_SCREW_LED_3 27
#define ASSESS_2_SCREW_LED_3_MODE OUTPUT
#define ASSESS_2_SCREW_LED_4 29
#define ASSESS_2_SCREW_LED_4_MODE OUTPUT
#define ASSESS_2_SCREW_LED_5 31
#define ASSESS_2_SCREW_LED_5_MODE OUTPUT
#define ASSESS_2_SCREW_LED_6 33
#define ASSESS_2_SCREW_LED_6_MODE OUTPUT
#define ASSESS_2_SCREW_LED_7 35
#define ASSESS_2_SCREW_LED_7_MODE OUTPUT
#define ASSESS_2_SCREW_1 37
#define ASSESS_2_SCREW_1_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_2 39
#define ASSESS_2_SCREW_2_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_3 41
#define ASSESS_2_SCREW_3_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_4 43
#define ASSESS_2_SCREW_4_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_5 45
#define ASSESS_2_SCREW_5_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_6 47
#define ASSESS_2_SCREW_6_MODE INPUT_PULLUP
#define ASSESS_2_SCREW_7 49
#define ASSESS_2_SCREW_7_MODE INPUT_PULLUP

#define ASSESS_2_BTN_1 51
#define ASSESS_2_BTN_1_MODE INPUT_PULLUP
#define ASSESS_2_BTN_LED_1 53
#define ASSESS_2_BTN_LED_1_MODE OUTPUT

const int assessment2InputPins[8] = {ASSESS_2_SCREW_1, ASSESS_2_SCREW_2, ASSESS_2_SCREW_3,
                                     ASSESS_2_SCREW_4, ASSESS_2_SCREW_5, ASSESS_2_SCREW_6,
                                     ASSESS_2_SCREW_7,
                                     ASSESS_2_BTN_1};
const int assessment2NumInputPins = sizeof(assessment2InputPins)/sizeof(int);
const int assessment2OutputPins[8] = {ASSESS_2_SCREW_LED_1, ASSESS_2_SCREW_LED_2, ASSESS_2_SCREW_LED_3,
                                      ASSESS_2_SCREW_LED_4, ASSESS_2_SCREW_LED_5, ASSESS_2_SCREW_LED_6,
                                      ASSESS_2_SCREW_LED_7,
                                      ASSESS_2_BTN_LED_1};
const int assessment2NumOutputPins = sizeof(assessment2OutputPins)/sizeof(int);
const int assessment2ButtonPins[1] = {ASSESS_2_BTN_1};
const int assessment2NumButtonPins = sizeof(assessment2ButtonPins)/sizeof(int);
const int assessment2ScrewPins[7] = {ASSESS_2_SCREW_1, ASSESS_2_SCREW_2, ASSESS_2_SCREW_3,
                                     ASSESS_2_SCREW_4, ASSESS_2_SCREW_5, ASSESS_2_SCREW_6,
                                     ASSESS_2_SCREW_7};
const int assessment2NumScrewPins = sizeof(assessment2ScrewPins)/sizeof(int);
const int assessment2ScrewLedPins[7] = {ASSESS_2_SCREW_LED_1, ASSESS_2_SCREW_LED_2, ASSESS_2_SCREW_LED_3,
                                        ASSESS_2_SCREW_LED_4, ASSESS_2_SCREW_LED_5, ASSESS_2_SCREW_LED_6,
                                        ASSESS_2_SCREW_LED_7};
const int assessment2NumScrewLedPins = sizeof(assessment2ScrewLedPins)/sizeof(int);

// ASSESSMENT 3 PINS
#define ASSESS_3_PWM_R 2
#define ASSESS_3_PWM_R_MODE OUTPUT
#define ASSESS_3_PWM_R_VAL 40
#define ASSESS_3_PWM_B 3
#define ASSESS_3_PWM_B_MODE OUTPUT
#define ASSESS_3_PWM_B_VAL 80
#define ASSESS_3_PWM_Y 4
#define ASSESS_3_PWM_Y_MODE OUTPUT
#define ASSESS_3_PWM_Y_VAL 120
#define ASSESS_3_PWM_W 5
#define ASSESS_3_PWM_W_MODE OUTPUT
#define ASSESS_3_PWM_W_VAL 160
#define ASSESS_3_PWM_K 6
#define ASSESS_3_PWM_K_MODE OUTPUT
#define ASSESS_3_PWM_K_VAL 200

#define ASSESS_3_INPUT_R 7
#define ASSESS_3_INPUT_R_MODE INPUT_PULLUP
#define ASSESS_3_INPUT_B 8
#define ASSESS_3_INPUT_B_MODE INPUT_PULLUP
#define ASSESS_3_INPUT_Y 9
#define ASSESS_3_INPUT_Y_MODE INPUT_PULLUP
#define ASSESS_3_INPUT_W 10
#define ASSESS_3_INPUT_W_MODE INPUT_PULLUP
#define ASSESS_3_INPUT_K 11
#define ASSESS_3_INPUT_K_MODE INPUT_PULLUP

#define ASSESS_3_ROCKER_1 A12
#define ASSESS_3_ROCKER_1_MODE INPUT_PULLUP
#define ASSESS_3_ROCKER_2 A13
#define ASSESS_3_ROCKER_2_MODE INPUT_PULLUP
#define ASSESS_3_ROCKER_3 A14
#define ASSESS_3_ROCKER_3_MODE INPUT_PULLUP
#define ASSESS_3_ROCKER_4 A15
#define ASSESS_3_ROCKER_4_MODE INPUT_PULLUP

#define ASSESS_3_BTN_1 12
#define ASSESS_3_BTN_1_MODE INPUT_PULLUP
#define ASSESS_3_BTN_LED_1 13
#define ASSESS_3_BTN_LED_1_MODE OUTPUT

const int R = 0;
const int B = 1;
const int Y = 2;
const int W = 3;
const int K = 4;

const int assessment3InputPins[10] = {ASSESS_3_INPUT_R, ASSESS_3_INPUT_B, ASSESS_3_INPUT_Y,
                                     ASSESS_3_INPUT_W, ASSESS_3_INPUT_K,
                                     ASSESS_3_ROCKER_1, ASSESS_3_ROCKER_2, ASSESS_3_ROCKER_3, 
                                     ASSESS_3_ROCKER_4,
                                     ASSESS_3_BTN_1};
const int assessment3NumInputPins = sizeof(assessment3InputPins)/sizeof(int);
const int assessment3OutputPins[6] = {ASSESS_3_PWM_R, ASSESS_3_PWM_B, ASSESS_3_PWM_Y,
                                      ASSESS_3_PWM_W, ASSESS_3_PWM_K,
                                      ASSESS_3_BTN_LED_1};
const int assessment3NumOutputPins = sizeof(assessment3OutputPins)/sizeof(int);
const int assessment3InputPWMPins[5] = {ASSESS_3_INPUT_R, ASSESS_3_INPUT_B, ASSESS_3_INPUT_Y,
                                        ASSESS_3_INPUT_W, ASSESS_3_INPUT_K};
const int assessment3NumInputPWMPins = sizeof(assessment3InputPWMPins)/sizeof(int);
const int assessment3OutputPWMPins[5] = {ASSESS_3_PWM_R, ASSESS_3_PWM_B, ASSESS_3_PWM_Y,
                                         ASSESS_3_PWM_W, ASSESS_3_PWM_K};
const int assessment3NumOutputPWMPins = sizeof(assessment3OutputPins)/sizeof(int);
const int assessment3RockerPins[4] = {ASSESS_3_ROCKER_1, ASSESS_3_ROCKER_2, ASSESS_3_ROCKER_3, 
                                     ASSESS_3_ROCKER_4};
const int assessment3NumRockerPins = sizeof(assessment3RockerPins)/sizeof(int);
const int assessment3RockerVals[4] = {LOW, HIGH, LOW, LOW};
//const int assessment3NumButtonPins = sizeof(assessment3ButtonPins)/sizeof(int);
const int assessment3OutputPinPWMCycle[5] = {32, 64, 192, 128, 160};
const int assessment3InputPinPWMValue[5] = {256, 512, 768, 1024, 1280};
const int pinValueTimeout = 20000;

// Function prototypess
void initializePins();
int digitalReadWithDebounce(int pin, int debounceDelay, int numSamples);
void flashLED(int pinNum, int numFlashes, int delayInMS);
#endif

