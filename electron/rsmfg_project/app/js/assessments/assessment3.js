/*
  Initiates Assessment 3
*/
function startAssessment3() {
  resetWCAll();

  createCountdownTimer(A3_TIMER);
  infoHeading.appendChild(document.createElement("HR"));

  let t = createElementAndText("P", "Open the packet labeled \"Work Instruction Assessment 3\" \
                                     located above the Assessment Table and  and follow the given instructions.",
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
} // startTableAssessment3
