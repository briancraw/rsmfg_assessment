/*
  Initiates Assessment 3
*/
function startAssessment3() {
  resetWCAll();

  //  let t = createElementAndText("P", "Assessment Test #2 in Progress...", "instruction-text", infoHeading);
  //  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  createCountdownTimer(A3_TIMER);
  infoHeading.appendChild(document.createElement("HR"));

  let t = createElementAndText("P", "Open the packet labeled \"Work Instruction Assessment 3\" \
                                     located above the Assessment Table and  and follow the given instructions.",
                           "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  //infoHeading.appendChild(document.createElement("HR"));

  //createButton("startTableAssessment3()", "NEXT", wc);
  startTableAssessment3();
//  processState(CMDS.SA2);
} // function startAssessment3() {

function startTableAssessment3() {
  //resetWC();
//  let t = createElementAndText("P", "Assessment Test #1 in Progress...", "instruction-text", infoHeading);
//  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

//  t = createElementAndText("P", "Follow the directions in the instruction packet to complete Table Assessment 3.",
//                           "instruction-text", infoHeading);
  //t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  if (NO_TABLE) {
    processState(CMDS.SA3);
  } else {
    sendSerial(CMDS.SA3);
  }
}
