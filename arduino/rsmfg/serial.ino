/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

  Revision Comments:
  08/15/2018 - Initial version.
*/
#include "rsmfg.h"
#include "assessment.h"
#include <stdio.h>
#include <avr/pgmspace.h>

static bool do_echo = false;

/* Execute a complete command. */
static void exec(char *cmdline)
{
  char *command = strsep(&cmdline, " ");
  //static char buffer[BUF_LENGTH];
  char buffer[BUF_LENGTH];
  char resultStr[7];
  
  if (strcmp_P(command, PSTR("RST")) == 0) {
    Serial.println("RST"); // echo command back
    clearResults();
  } else if (strcmp_P(command, PSTR("GFW")) == 0) {
    Serial.println("GFW");
    Serial.println(VERSION);
  } else if (strcmp_P(command, PSTR("SA1A")) == 0) {
    if (!a1aActive) {
      Serial.println("SA1A"); // echo command back
      a1aStop = false;
      ta1aResult = runAssessment1A();
      if (a1aStop == true) {
        sprintf(buffer, "ST1A: %d", a1aResult);
      } else {
        sprintf(buffer, "SA1A: %d", a1aResult);
      }
      Serial.println(buffer);
      a1aActive = false;
    }
  } else if (strcmp_P(command, PSTR("SA1B")) == 0) {
    if (!a1bActive) {
      Serial.println("SA1B"); // echo command back
      a1bStop = false;
      ta1bResult = runAssessment1B();
      if (a1bStop == true) {
        sprintf(buffer, "ST1B: %d", a1bResult);
      } else {
        sprintf(buffer, "SA1B: %d", a1bResult);
      }
      Serial.println(buffer);
      a1bActive = false;
    }
  } else if (strcmp_P(command, PSTR("SA2")) == 0) {
    if (!a2Active) {
      Serial.println("SA2"); // echo command back
      a2Stop = false;
      ta2Result = runAssessment2();
      if (a2Stop == true) {
      Serial.println("A2 STOP");
        sprintf(buffer, "ST2: %d", a2Result);
      } else {
        sprintf(buffer, "SA2: %d", a2Result);
      }
      Serial.println(buffer);
      a2Active = false;
    }
  } else if (strcmp_P(command, PSTR("SA3")) == 0) {
    if (!a3Active) {
      Serial.println("SA3"); // echo command back
      a3Stop = false;
      ta3Result = runAssessment3();
      if (a3Stop == true) {
        sprintf(buffer, "ST3: %d", a3Result);
      } else {
        sprintf(buffer, "SA3: %d", a3Result);
      }
      Serial.println(buffer);
      a3Active = false;
    }
  } else if (strcmp_P(command, PSTR("ST1A")) == 0) {
    a1aStop = true;
    sprintf(buffer, "ST1A: %d", a1aResult);
    Serial.println(buffer); // echo command back
  } else if (strcmp_P(command, PSTR("ST1B")) == 0) {
    a1bStop = true;
    sprintf(buffer, "ST1B: %d", a1bResult);
    Serial.println(buffer); // echo command back
  } else if (strcmp_P(command, PSTR("ST2")) == 0) {
    a2Stop = true;
    sprintf(buffer, "ST2: %d", a2Result);
    Serial.println(buffer); // echo command back
  } else if (strcmp_P(command, PSTR("ST3")) == 0) {
    a3Stop = true;
    ta3Result = runAssessment3();
    sprintf(buffer, "ST3: %d", a3Result);
    Serial.println(buffer); // echo command back
  }  else if (strcmp_P(command, PSTR("GR1A")) == 0) {
    Serial.println("GR1A"); // echo command back
    sprintf(buffer, "GR1A: %d", a1aResult);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR1B")) == 0) {
    Serial.println("GR1B"); // echo command back
    sprintf(buffer, "GR1B: %d", a1bResult);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR2")) == 0) {
    Serial.println("GR2"); // echo command back
    sprintf(buffer, "GR2: %d", a2Result);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR3")) == 0) {
    Serial.println("GR3"); // echo command back
    sprintf(buffer, "GR3: %d", a3Result);
    Serial.println(buffer);
  }else {
    Serial.print(F("Error: Unknown command: "));
    Serial.println(command);
  }
} // exec()

char * readSerial () {
  /* Process incoming commands. */
  static char buffer[BUF_LENGTH];
  static int length = 0;
  commandReady = false;
  
  while (Serial.available()) {// && commandReady == false) {
    int data = Serial.read();
    if (data == '\b' || data == '\177') {  // BS and DEL
      if (length) {
        length--;
        if (do_echo) Serial.write("\b \b");
      }
    }
    else if (data == '\r') {
      if (do_echo) Serial.write("\r\n");    // output CRLF
      buffer[length] = '\0';
      if (length) commandReady = true;
      //if (length) exec(buffer);
      length = 0;
    }
    else if (length < BUF_LENGTH - 1) {
      buffer[length++] = data;
      if (do_echo) Serial.write(data);
    }
  }

  return buffer;
} // readSerial

