/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

function assessment1StartPage() {
  resetWCAll();

  let ol = document.createElement("OL");
  let l = document.createElement("LI");
  let t = createElementAndText("P", "This test consists of three timed skill assessments.", "instruction-text", l)
  t.setAttribute("style", "line-height: 2");
  let aul = document.createElement("UL");
  aul.setAttribute("style", "text-align: left");
  t = createElementAndText("LI", "Assessment 1 is "+A1_TIME_IN_MINUTES+" minutes", "instructions-text", aul);
  t = createElementAndText("LI", "Assessment 2 is "+A2_TIME_IN_MINUTES+" minutes", "instructions-text", aul);
  t = createElementAndText("LI", "Assessment 3 is "+A3_TIME_IN_MINUTES+" minutes", "instructions-text", aul);
  l.appendChild(aul);
  ol.appendChild(l);
  l = document.createElement("LI");
  t = createElementAndText("P", 'Detailed instructions are located above the Assessment Table.',
                                 "instruction-text", l)

  t.setAttribute("style", "line-height: 2");
  ol.appendChild(l);
  l = document.createElement("LI");
  t = createElementAndText("P", "Click START below to begin Assessment 1.", "instruction-text", l)
  t.setAttribute("style", "line-height: 2");
  ol.appendChild(l);
  wc.appendChild(ol);

  t = createElementAndText("P", "Click the START button when you are ready", "instruction-text", wc)
  t.setAttribute("style", "font-size: 20px; font-weight: bold; line-height: 2; color:red; text-align:center");
  createButton("startAssessment1()", "START", wc);
} // assessment1StartPage

function startAssessment1() {
  resetWCAll();

  createCountdownTimer(A1_TIMER);
  processState(CMDS.SA1A);

  let t = createElementAndText("P", "The instructions for \"Work Instruction Assessment 1\" are\
                                     located above the Assessment Table.",
                           "instruction-text", infoHeading);

  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.appendChild(document.createElement("HR"));

  assessment1Questions();
} // startAssessment1

function assessment1Questions() {
  resetWC();
//  Enter the calculated value in the box and click NEXT to proceed to the next question.",
  t = createElementAndText("P", "Follow the Assessment #1 \"Step 1 - Bill of Material\" instructions.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px");
  t = createElementAndText("P", "Enter the calculated value in the box and click NEXT to proceed to the next question.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px");
  preformContent.appendChild(document.createElement("BR"));
  BOMQuestion();
} // assessment1Questions

function BOMQuestion() {
  createSelectTextElement("Total Material Cost($)  ", formName);
  createFormField("BOM", formEntry);

  wc.appendChild(document.createElement("BR"));
  createButton("measurementQuestion()", "NEXT", wc);
} // BOMQuestions

function measurementQuestion() {
  console.log("measurementQuestion");
  resetWC();
  infoHeading.innerHTML = "";
  let t = createElementAndText("P", "Follow the Assessment #1 \"Step 2 - Measurements\" instructions.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.appendChild(document.createElement("HR"));

  preformContent.innerHTML = '<p class="instruction-text">Enter the length and two width measurements below.  \
                                 The drop-down box is used to select the measurement to the nearest one \
                                 eigth of an inch.<br>For example: If the measurement were 5 7/8 inches then 5 would \
                                 be entered into the first box and 7/8 would be selected from the drop-down.</p>';

  let fractions = ["", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8"];

  createSelectTextElement("Length = ", formName);
  let inputDiv = document.createElement("DIV");
  createFormField("len", inputDiv);
  formEntry.appendChild(inputDiv);
  let ff = document.getElementById('len_box');
  ff.setAttribute("style", "width:50px; display: inline");
  createSelectMenu("len_fractions", fractions, inputDiv);
  ff = document.getElementById('len_fractions_select');
  ff.setAttribute("style", "display: inline");
  t = document.createTextNode(" inches");
  inputDiv.appendChild(t);

  createSelectTextElement("Width 1 = ", formName);
  inputDiv = document.createElement("DIV");
  createFormField("width1", inputDiv);
  formEntry.appendChild(inputDiv);
  ff = document.getElementById('width1_box');
  ff.setAttribute("style", "width:50px;  display:inline");
  createSelectMenu("width1_fractions", fractions, inputDiv);
  ff = document.getElementById('width1_fractions_select');
  ff.setAttribute("style", "display:inline");
  t = document.createTextNode(" inches");
  inputDiv.appendChild(t);

  createSelectTextElement("Width 2  = ", formName);
  inputDiv = document.createElement("DIV");
  createFormField("width2", inputDiv);
  formEntry.appendChild(inputDiv);
  ff = document.getElementById('width2_box');
  ff.setAttribute("style", "width:50px; display:inline");
  createSelectMenu("width2_fractions", fractions, inputDiv);
  ff = document.getElementById('width2_fractions_select');
  ff.setAttribute("style", "display: inline");
  t = document.createTextNode(" inches");
  inputDiv.appendChild(t);

  wc.appendChild(document.createElement("BR"));

  createButton('startTableAssessment1A()', "NEXT", wc);
} //measurementQuestion

function startTableAssessment1A() {
  resetWC();

  infoHeading.innerHTML = "";
  infoHeading.appendChild(document.createElement("HR"));
  let t = createElementAndText("P", "Follow the Assessment #1 \"Step 3 - Placement\" instructions.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

  if (NO_TABLE) {
    processState(CMDS.SA1A);
  } else {
    sendSerial(CMDS.SA1A);
  }
} // startTableAssessment1A()

function startTableAssessment1B() {
  resetWC();

  infoHeading.innerHTML = '';
  infoHeading.appendChild(document.createElement("HR"));
  let t = createElementAndText("P", "Follow the Assessment #1 \"Step 4 - Assembly\" instructions.",
                               "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
} // startTableAssessment1B()
