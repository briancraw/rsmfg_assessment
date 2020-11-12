/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

function startAssessment2() {
  resetWCAll();

  createCountdownTimer(A2_TIMER);

  let t = createElementAndText("P", "The instructions for \"Work Instruction Assessment 2\" are\
                                     located above the Assessment Table.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.appendChild(document.createElement("HR"));

  t = createElementAndText("P", "Sort the screws as described in the Assessment #2 \"Step 1 - Sorting\" instructions. Click NEXT to continue.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px; text-align:center");
  preformContent.appendChild(document.createElement("BR"));
  createButton("assessment2Questions()", "NEXT", wc);
} // function startAssessment2() {

function assessment2Questions() {
  resetWC();

  let t = createElementAndText("P", "Inspect the screws as described in the Assessment #2 \"Step 2 - Inspection\" instructions.  \
                                     Fill in the answers below and click NEXT to continue.",
                                    "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px; text-align:center");
  preformContent.appendChild(document.createElement("BR"));

  createSelectTextElement("Pocket #1", formName);
  createFormField("leftPocketCount", formEntry);
  createSelectTextElement("Pocket #2", formName);
  createFormField("centerPocketCount", formEntry);
  createSelectTextElement("Pocket #3", formName);
  createFormField("rightPocketCount", formEntry);

  createButton("startTableAssessment2()", "NEXT", wc);
} // assessment2Questions

function startTableAssessment2() {
  resetWC();

  infoHeading.innerHTML = '';
  infoHeading.appendChild(document.createElement("HR"));
  t = createElementAndText("P", "Follow the Assessment #2 \"Step 3 - Placement\" instructions.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

  if (NO_TABLE) {
    processState(CMDS.SA2);
  } else {
    sendSerial(CMDS.SA2);
  }
} // startTableAssessment2
