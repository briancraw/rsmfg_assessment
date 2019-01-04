/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, November 2018
  
  Revision Comments:
  11/12/2018 - Initial version.
*/
#ifndef ASSESSMENT_H
#define ASSESSMENT_H

#define EN_ASSESSMENT1 true
#define EN_ASSESSMENT2 true
#define EN_ASSESSMENT3 true

float a1aResult = 0.0;
float a1bResult = 0.0;
float a2Result = 0.0;
float a3Result = 0.0;

bool a1aActive = false;
bool a1bActive = false;
bool a2Active = false;
bool a3Active = false;

bool a1aStop = false;
bool a1bStop = false;
bool a2Stop = false;
bool a3Stop = false;

float runAssessment1A();
float runAssessment1B();
float runAssessment2();
float runAssessment3();

void clearResults();
#endif
