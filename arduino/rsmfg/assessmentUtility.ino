/*
  Copyright (C) 2018, ???????, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

  Description:
  Contains code to run through assesment_1.

  This assessment requires the user to assemble a puzzle in the correct order.
  Each piece, when fit into the correct position, makes contact and pulls its
  corresponding pin low.

  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "assessment.h"

void clearResults() {
  a1aResult = 0.0;
  a1bResult = 0.0;
  a2Result = 0.0;
  a3Result = 0.0;

  a1aActive = false;
  a1bActive = false;
  a2Active = false;
  a3Active = false;

  a1aStop = false;
  a1bStop = false;
  a2Stop = false;
  a3Stop = false;

  return;
}

