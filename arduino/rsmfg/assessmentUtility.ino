/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, August 2018

  Description:
  Contains utilities common to all Assessments.

  Revision Comments:
  08/15/2018 - Initial version.
*/

#include "assessment.h"

/*
 * clearResults()
 * Clears each assessments result variables.
 * Sets active and stop variables to false.
 */
void clearResults() {
  a1aResult = 0;
  a1bResult = 0;
  a2Result = 0;
  a3Result = 0;

  a1aActive = false;
  a1bActive = false;
  a2Active = false;
  a3Active = false;

  a1aStop = false;
  a1bStop = false;
  a2Stop = false;
  a3Stop = false;

  return;
} // clearResults()

