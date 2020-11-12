/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

function startAssessment3() {
  resetWCAll();

  createCountdownTimer(A3_TIMER);
  infoHeading.appendChild(document.createElement("HR"));

  let t = createElementAndText("P", "Follow the \"Work Instruction Assessment 3\" instructions\
                                     located above the Assessment Table.",
                           "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

  startTableAssessment3();
} // startAssessment3()

function startTableAssessment3() {
  if (NO_TABLE) {
    processState(CMDS.SA3);
  } else {
    sendSerial(CMDS.SA3);
  }
}

function displayA3Status() {
  let b = createElementAndText("button", "W1", "button button_red", wc);
  b.setAttribute("id", "w1");
  wc.appendChild(b);
  b = createElementAndText("button", "W2", "button button_red", wc);
  b.setAttribute("id", "w2");
  wc.appendChild(b);
  b = createElementAndText("button", "W3", "button button_red", wc);
  b.setAttribute("id", "w3");
  wc.appendChild(b);
  b = createElementAndText("button", "W4", "button button_red", wc);
  b.setAttribute("id", "w4");
  wc.appendChild(b);
  b = createElementAndText("button", "W5", "button button_red", wc);
  b.setAttribute("id", "w5");
  wc.appendChild(b);
}

function updateA3Status(id, val) {
   let b = document.getElementById(id);
   b.className = "button " + "button_"+val;
}
