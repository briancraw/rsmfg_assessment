/*
  Copyright (C) 2018, ???????, All rights reserved
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


bool initializeLink() {
  return true;
}

bool sendResult(int assessmentNum, bool result) {
  return true;
}

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
    //resetFunc();
  } else if (strcmp_P(command, PSTR("GFW")) == 0) {
    Serial.println("GFW");
    Serial.println(VERSION);
  } else if (strcmp_P(command, PSTR("SA1A")) == 0) {
    if (!a1aActive) {
      Serial.println("SA1A"); // echo command back
      a1aStop = false;
      a1aResult = runAssessment1A();
      //a1aResult = 75.0;
      dtostrf(a1aResult, 4, 2, resultStr);
      if (a1aStop == true) {
        sprintf(buffer, "ST1A: %s", resultStr);
      } else {
        sprintf(buffer, "SA1A: %s", resultStr);
      }
      Serial.println(buffer);
      a1aActive = false;
    }
  } else if (strcmp_P(command, PSTR("SA1B")) == 0) {
    if (!a1bActive) {
      Serial.println("SA1B"); // echo command back
      a1bStop = false;
      a1bResult = runAssessment1B();
      dtostrf(a1bResult, 4, 2, resultStr);
      if (a1bStop == true) {
        sprintf(buffer, "ST1B: %s", resultStr);
      } else {
        sprintf(buffer, "SA1B: %s", resultStr);
      }
      Serial.println(buffer);
      a1bActive = false;
    }
  } else if (strcmp_P(command, PSTR("SA2")) == 0) {
    if (!a2Active) {
      Serial.println("SA2"); // echo command back
      a2Stop = false;
      a2Result = runAssessment2();
      dtostrf(a2Result, 4, 2, resultStr);
      if (a2Stop == true) {
        sprintf(buffer, "ST2: %s", resultStr);
      } else {
        sprintf(buffer, "SA2: %s", resultStr);
      }
      Serial.println(buffer);
      a2Active = false;
    }
  } else if (strcmp_P(command, PSTR("SA3")) == 0) {
    if (!a3Active) {
      Serial.println("SA3"); // echo command back
      a3Stop = false;
      a3Result = runAssessment3();
      dtostrf(a3Result, 4, 2, resultStr);
      if (a3Stop == true) {
        sprintf(buffer, "ST3: %s", resultStr);
      } else {
        sprintf(buffer, "SA3: %s", resultStr);
      }
      Serial.println(buffer);
      a3Active = false;
    }
  } else if (strcmp_P(command, PSTR("ST1A")) == 0) {
    Serial.println("ST1A"); // echo command back
    a1aStop = true;
  } else if (strcmp_P(command, PSTR("ST1B")) == 0) {
    Serial.println("ST1B"); // echo command back
    a1bStop = true;
  } else if (strcmp_P(command, PSTR("ST2")) == 0) {
    Serial.println("ST2"); // echo command back
    a2Stop = true;
  } else if (strcmp_P(command, PSTR("ST3")) == 0) {
    Serial.println("ST3"); // echo command back
    a3Stop = true;
  }  else if (strcmp_P(command, PSTR("GR1A")) == 0) {
    Serial.println("GR1A"); // echo command back
    dtostrf(a1aResult, 4, 2, resultStr);
    sprintf(buffer, "GR1A: %d", a1aResult);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR1B")) == 0) {
    Serial.println("GR1B"); // echo command back
    dtostrf(a1bResult, 4, 2, resultStr);
    sprintf(buffer, "GR1B: %d", a1bResult);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR2")) == 0) {
    Serial.println("GR2"); // echo command back
    dtostrf(a2Result, 4, 2, resultStr);
    sprintf(buffer, "GR2: %d", a2Result);
    Serial.println(buffer);
  } else if (strcmp_P(command, PSTR("GR3")) == 0) {
    Serial.println("GR3"); // echo command back
    dtostrf(a3Result, 4, 2, resultStr);
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

//String readSerial () {
//  int byteCount;
//  //char cmd[BSIZE] = {'0', '0', '0', '\0'};
//  String cmd = "000";
//  bool lineFound = false;
//  int serialIndex = 0;
//
////  byteCount = Serial.readBytesUntil('\n', cmd, BSIZE);
//
//  while (Serial.available() > 0) {
//    cmd = Serial.readString();
//
////    //Read a character as it comes in:
////    //currently this will throw away anything after the buffer is full or the \n is detected
////
////    char charBuffer = Serial.read();
////
////    if (charBuffer == '\n') {
////      cmd[serialIndex] = 0; // terminate the string
////      lineFound = (serialIndex > 0); // only good if we sent more than an empty line
////      serialIndex = 0; // reset for next line of data
////            //Serial.println("1");
////
////    }
////    else if (charBuffer == '\r') {
////      // Just ignore the Carrage return, were only interested in new line
////    }
////    else if (serialIndex < BSIZE && lineFound == false) {
////      //Serial.println("3");
////      /*Place the character in the string buffer:*/
////      cmd[serialIndex++] = charBuffer; // auto increment index
////    }
//  }// End of While
//
//  /*
//    while (Serial.available() > 0) {
//    char incomingCharacter = serial.read();
//    switch (incomingCharacter) {
//     case ‘+’:
//      pwmValue = pwmValue + 5;
//      If (pwmValue >= pwmMax)
//         pwmValue = pwmMax;
//      break;
//
//     case ‘-’:
//      pwmValue = pwmValue - 5;
//      If (pwmValue <= 0)
//         pwmValue = 0;
//      break;
//    }
//    }
//    while (Serial.available()) {
//    r = Serial.readString();
//    }
//  */
//
//  return cmd;
//}

int transmitData () {

}

