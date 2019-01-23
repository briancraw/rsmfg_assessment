/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, November 2018

  Description:
  Contains global variables and function prototypes.
  
  Revision Comments:
  11/12/2018 - Initial version.
*/

#ifndef ASSESSMENT_H
#define ASSESSMENT_H

#define EN_ASSESSMENT1 true
#define EN_ASSESSMENT2 true
#define EN_ASSESSMENT3 true

int a1aResult = 0;
int a1bResult = 0;
int a2Result = 0;
int a3Result = 0;
int ta1aResult = 0;
int ta1bResult = 0;
int ta2Result = 0;
int ta3Result = 0;

bool a1aActive = false;
bool a1bActive = false;
bool a2Active = false;
bool a3Active = false;

bool a1aStop = false;
bool a1bStop = false;
bool a2Stop = false;
bool a3Stop = false;

int runAssessment1A();
int runAssessment1B();
int runAssessment2();
int runAssessment3();

void clearResults();
#endif
