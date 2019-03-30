/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018
  
  Revision Comments:
  08/15/2018 - Initial version.
*/
#ifndef RSMFG_H
#define RSMFG_H

#define DEBUG true
#define HEADLESS false
#define BLINK_MODE false
#define DEBUG_A3 false
#define VERSION "1.0.1"
#define BAUD 9600

#define PASS true
#define FAIL false

#define DEBOUNCE_DELAY 5
#define NUM_DEBOUNCE_SAMPLES 2

#ifdef DEBUG
 #define DEBUG(x)  Serial.println (x)
 #define DEBUGNOLN(x)  Serial.print (x)
#else
 #define DEBUG(x)
 #define DEBUGNOLN(x)
#endif

#define BUF_LENGTH 128  /* Buffer for the incoming command. */
bool commandReady = false;

extern void (*resetFunc)(void);

#endif

