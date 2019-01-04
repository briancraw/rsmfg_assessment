/*
  Initiates Assessment 1
*/
function assessment1StartPage() {
  resetWCAll();

  let ol = document.createElement("OL");
  let l = document.createElement("LI");
  let t = createElementAndText("P", "This test consists of three timed skill assessments.", "instruction-text", l)
  t.setAttribute("style", "line-height: 2");
  let aul = document.createElement("UL");
  aul.setAttribute("style", "text-align: left");
  t = createElementAndText("LI", "Assessment 1 is 10 minutes", "instructions-text", aul);
  t = createElementAndText("LI", "Assessment 2 is 10 minutes", "instructions-text", aul);
  t = createElementAndText("LI", "Assessment 3 is 10 minutes", "instructions-text", aul);
  l.appendChild(aul);
  ol.appendChild(l);
  l = document.createElement("LI");
  t = createElementAndText("P", 'Detailed instructions are contained in the packets labeled \
                                 "Work Instruction Assessment 1, 2, or 3" attached to the Assessment Table.',
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

  let t = createElementAndText("P", "Open the packet labeled \"Work Instruction Assessment 1\" \
                                 located above the Assessment Table and follow the given instructions.",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  infoHeading.appendChild(document.createElement("HR"));

  //createButton("assessment1Questions()", "NEXT", wc);
  assessment1Questions();
} // startAssessment1


function assessment1Questions() {
  resetWC();
  //preformContent.innerHTML = "";
//  document.getElementById('clockdivclone').style.display = "inline-block";
  //document.getElementById('clockdivclone').style.display = "none";

  let t = createElementAndText("P", "Review the Bill of Materials, determine the total cost of materials,\
                                     enter it in the box, and click NEXT to proceed to the next question.",
                               "instruction-text", preformContent);
  t.setAttribute("style", "font-size: 18px");
  preformContent.appendChild(document.createElement("BR"));
  BOMQuestion();
} // assessment1Questions

function BOMQuestion() {
  console.log("BOMQUestion0");
  let table = document.createElement("TABLE");
  let rows = 7;
  let cols = 4;
  let r, c;
  let tr, td, th, type;

  table.innerHTML = '\
      <tr>\
        <th id="r0" colspan=4 class="theader-row">BILL OF MATERIALS - PART NUMBER 1689</th>\
      </tr>\
      <tr>\
        <th>ITEM</th>\
        <th>QUANTITY</th>\
        <th>DESCRIPTION</th>\
        <th>COST/EACH</th>\
      </tr>\
      <tr><td>1</td><td>2</td><td>WHITE PUZZLE BLOCK 8"</td><td>$1.50</td></tr>\
      <tr><td>2</td><td>1</td><td>WHITE PUZZLE BLOCK 6"</td><td>$0.75</td></tr>\
      <tr><td>3</td><td>2</td><td>3/8" X 4" BOLT</td><td>$0.35</td></tr>\
      <tr><td>4</td><td>2</td><td>3/8" X 1.5" WASHER</td><td>$0.15</td></tr>\
      <tr><td>5</td><td>2</td><td>3/8" X .875" WASHER</td><td>$0.03</td></tr>\
      <tr><td>6</td><td>2</td><td>3/8" NUT</td><td>$0.05</td></tr>'

  table.setAttribute("align", "center");
  table.setAttribute("text-align", "center");

  preformContent.appendChild(table);
  preformContent.appendChild(document.createElement("BR"));

  createSelectTextElement("Total Material Cost($)  ", formName);
  createFormField("BOM", formEntry);

  wc.appendChild(document.createElement("BR"));

//  createButton("startTableAssessment1A()", "NEXT", wc);
  createButton("measurementQuestion()", "NEXT", wc);
} // BOMQuestions

function startTableAssessment1A() {
  resetWC();
  infoHeading.innerHTML = "";
//  let t = createElementAndText("P", "Assessment Test #1 in Progress...", "instruction-text", infoHeading);
//  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
let t = createElementAndText("P", "Follow the instructions from step #2 in the packet labeled \"Work Instruction Assessment 1\".",
                         "instruction-text", infoHeading);
t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  //t = createElementAndText("P", "Follow the directions in the instruction packet to complete Table Assessment 1A.",
  //                         "instruction-text", infoHeading);
  //t.setAttribute("style", "font-size: 18px; font-weight: bold; text-align: center");
  //processState(CMDS.SA1A);
  sendSerial(CMDS.SA1A);
}

function measurementQuestion() {
  console.log("measurementQuestion");
  resetWC();
infoHeading.innerHTML = "";
  let t = createElementAndText("P", "Continue to follow the instructions from the packet labeled \"Work Instruction Assessment 1\".",
                           "instruction-text", infoHeading);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

  preformContent.innerHTML = '<p class="instruction-text">Measure the length, width, and depth of the Assembly from Assessment 1B \
                                 and record the results below.  Measurements should be taken in inches to the nearest eigth of an inch.  \
                                 The drop-down box is used to select the measurement to the nearest one \
                                 eigth of an inch.<br><br>For example: If the measurement were 5 7/8 inches then 5 would \
                                 be entered into the first box and 7/8 would be selected from the drop-down.</p><br>';

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

  createSelectTextElement("Width  = ", formName);
  inputDiv = document.createElement("DIV");
  createFormField("width", inputDiv);
  formEntry.appendChild(inputDiv);
  ff = document.getElementById('width_box');
  ff.setAttribute("style", "width:50px;  display:inline");
  createSelectMenu("width_fractions", fractions, inputDiv);
  ff = document.getElementById('width_fractions_select');
  ff.setAttribute("style", "display:inline");
  t = document.createTextNode(" inches");
  inputDiv.appendChild(t);

  createSelectTextElement("Depth  = ", formName);
  inputDiv = document.createElement("DIV");
  createFormField("depth", inputDiv);
  formEntry.appendChild(inputDiv);
  ff = document.getElementById('depth_box');
  ff.setAttribute("style", "width:50px; display:inline");
  createSelectMenu("depth_fractions", fractions, inputDiv);
  ff = document.getElementById('depth_fractions_select');
  ff.setAttribute("style", "display: inline");
  t = document.createTextNode(" inches");
  inputDiv.appendChild(t);

  wc.appendChild(document.createElement("BR"));

//  createButton('processState("A1Q_DONE")', "NEXT", wc);
//createButton('sendSerial(CMDS.SA1B)', "NEXT", wc);
createButton('startTableAssessment1A()', "NEXT", wc);
} //measurementQuestion

function startTableAssessment1B() {
  resetWC();
//  let t = createElementAndText("P", "Assessment Test #1 in Progress...", "instruction-text", infoHeading);
//  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
infoHeading.innerHTML = '';
let t = createElementAndText("P", "Continue on to step #3 in the instructions from the packet labeled \"Work Instruction Assessment 1\".",
                         "instruction-text", infoHeading);
t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  if (NO_TABLE) {
    processState(CMDS.SA1B);
  } else {
    sendSerial(CMDS.SA1B);
  }//  sendSerial(CMDS.SA1B);
} // startTableAssessment1B()
