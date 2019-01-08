/*
  Initiates Assessment 2
*/
function startAssessment2() {
  resetWCAll();

//  let t = createElementAndText("P", "Assessment Test #2 in Progress...", "instruction-text", infoHeading);
//  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  createCountdownTimer(A2_TIMER);

  let t = createElementAndText("P", "Open the packet labeled \"Work Instruction Assessment 2\" \
                                 located above the Assessment Table and follow the given instructions.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.appendChild(document.createElement("HR"));

  t = createElementAndText("P", "Sort the screws as described in step #1 in the instructions. Click NEXT to continue.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px; text-align:center");
  preformContent.appendChild(document.createElement("BR"));
  createButton("assessment2Questions()", "NEXT", wc);

  //createButton("assessment2Questions()", "NEXT", wc);
  //assessment2Questions();
//  processState(CMDS.SA2);
} // function startAssessment2() {


function assessment2Questions() {
  resetWC();

  //preformContent.innerHTML = "";
  // document.getElementById('clockdivclone').style.display = "inline-block";

  let t = createElementAndText("P", "Inspect the screws as described in step #2 in the instructions.  Fill in the answers below and click NEXT to continue.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px; text-align:center");
  preformContent.appendChild(document.createElement("BR"));

  createSelectTextElement("Left Pocket ", formName);
  createFormField("leftPocketCount", formEntry);
  createSelectTextElement("Center Pocket ", formName);
  createFormField("centerPocketCount", formEntry);
  createSelectTextElement("Right Pocket ", formName);
  createFormField("rightPocketCount", formEntry);

  createButton("startTableAssessment2()", "NEXT", wc);
} // assessment2Questions

function startTableAssessment2() {
  resetWC();
//  let t = createElementAndText("P", "Assessment Test #1 in Progress...", "instruction-text", infoHeading);
//  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.innerHTML = '';
  infoHeading.appendChild(document.createElement("HR"));
  t = createElementAndText("P", "Follow the instructions from step #3 in the instruction packet label \"Work Instruction Assessment 2\".",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  //infoHeading.appendChild(document.createElement("HR"));

  if (NO_TABLE) {
    processState(CMDS.SA2);
  } else {
    sendSerial(CMDS.SA2);
  }
}
