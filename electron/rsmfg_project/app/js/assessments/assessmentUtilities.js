const {getCurrentWindow, globalShortcut} = require('electron').remote;

function captureTime(assessment) {
  switch (assessment) {
    case ASSESSMENTS.A1A:
      if (remainingTime.total <= 0) {
        scores.a1.a1a.tableTime = A1_TIMER;
      } else {
        scores.a1.a1a.tableTime = A1_TIMER - remainingTime.total;
      }
      break;
    case ASSESSMENTS.A1B:
      if (remainingTime.total <= 0) {
        scores.a1.a1b.tableTime = A1_TIMER;
      } else {
        scores.a1.a1b.tableTime = A1_TIMER - remainingTime.total - scores.a1.a1a.tableTime;
      }
      break;
      case ASSESSMENTS.A1:
        if (remainingTime.total <= 0) {
          scores.a1.tableTime = A1_TIMER;
        } else {
          scores.a1.tableTime = scores.a1.a1b.tableTime + scores.a1.a1b.tableTime;
        }
        scores.a1.questionTime = A1_TIMER - remainingTime.total;
       break;
    case ASSESSMENTS.A2:
      if (remainingTime.total <= 0) {
        scores.a2.tableTime = A2_TIMER;
      } else {
        scores.a2.tableTime = A2_TIMER - remainingTime.total;
      }
      break;
    case ASSESSMENTS.A3:
      if (remainingTime.total <= 0) {
        scores.a3.tableTime = A3_TIMER;
      } else {
        scores.a3.tableTime = A3_TIMER - remainingTime.total;
      }
      break;
    default:
  }
} // captureTime

function calculateA1Score() {
  let score = 0.0;
  let numAnswers = 8;
  if (sessionStorage["BOM"] == bomAnswer) {
    score = score + 100;
  }
  if (sessionStorage["depth"] == depthAnswer) {
    if (sessionStorage["depth_fractions"] == depth_fractionsAnswer) {
      score = score + 100;
    }
  }
  if (sessionStorage["len"] == lenAnswer) {
    if (sessionStorage["len_fractions"] == len_fractionsAnswer) {
      score = score + 100;
    }
  }
  if (sessionStorage["width"] == widthAnswer) {
    if (sessionStorage["width_fractions"] == width_fractionsAnswer) {
      score = score + 100;
    }
  }
  console.log("SCORE5: " + score);

  score = score + scores.a1.a1a.tableScore;
  console.log("SCORE6: " + score);

  score = score + scores.a1.a1b.tableScore;
  console.log("SCORE7: " + score);

  score = score + getTimeScore(scores.a1.a1a.tableTime);
  console.log("SCORE8: " + score);
  score = score + getTimeScore(scores.a1.a1b.tableTime);
  console.log("SCORE9: " + score);

  return (score/numAnswers);
}


function calculateA2Score() {
  let score = 0.0;
  let numAnswers = 5;
  if (sessionStorage["leftPocketCount"] == leftPocketCountAnswer) {
    score = score + 100;
  }
  if (sessionStorage["centerPocketCount"] == centerPocketCountAnswer) {
    score = score + 100;
  }
  if (sessionStorage["rightPocketCount"] == rightPocketCountAnswer) {
    score = score + 100;
  }
  console.log("SCORE10: " + score);
  score = score + scores.a2.tableScore;
  console.log("SCORE11: " + score);
  score = score + getTimeScore(scores.a2.tableTime);
  console.log("SCORE12: " + score);

  return (score/numAnswers);
}

function calculateA3Score() {
  let score = 0.0;
  let numAnswers = 2;

  score = score + scores.a3.tableScore;
  console.log("SCORE13: " + score);

  score = score + getTimeScore(scores.a3.tableTime);
  console.log("SCORE14: " + score);

  return (score/numAnswers);
}

function getTimeScore(val) {
  if (val < 180000) { // 3 minutes
    return 100;
  } else if (val < 360000) { // 6 minutes
    return 50;
  } else if (val < 540000) { // 9 minutes
    return 33.33;
  } else if (val < 600000) { // 10 minutes
    return 10;
  } else {
    return 0;
  }
}

/*
function getTimeScoreA2A3(val) {
  if (val < 225000) { // 3.75 minutes
    return 100;
  } else if (val < 450000) { // 7.5 minutes
    return 50;
  } else if (val < 675000) { // 11.25 minutes
    return 33.33;
  } else if (val < 900000) { // 15 minutes
    return 10;
  } else {
    return 0;
  }
}
*/

function calculateScores() {
  // A1 Total
  scores.a1.total = calculateA1Score();
  scores.a2.total = calculateA2Score();
  scores.a3.total = calculateA3Score();

  console.log ("A1.TOTAL: " + scores.a1.total);
  console.log ("A2.TOTAL: " + scores.a2.total);
  console.log ("A3.TOTAL: " + scores.a3.total);

  console.log("SCORES: " + JSON.stringify(scores));


} // calculateScore

function assessmentsComplete() {
  //wc.innerHTML = "";
  resetWCAll();
  calculateScores();
  let t = createElementAndText("DIV", "Assessment Test Complete!", "instruction-text", wc);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  let hl = document.createElement('BR');
  hl.setAttribute("style", "margin-top: 10px; margin-bottom: 10px");
  wc.appendChild(hl);

  t = createElementAndText("DIV", "Below are the scores for each Assessment:", "instruction-text", wc);
  hl = document.createElement('BR');
  hl.setAttribute("style", "margin-top: 10px; margin-bottom: 10px");
  wc.appendChild(hl);

  t = createElementAndText("DIV" ,"Assessment 1: " + scores.a1.total.toFixed(2), "instruction-text", wc);
  t = createElementAndText("DIV" ,"Assessment 2: " + scores.a2.total.toFixed(2), "instruction-text", wc);
  t = createElementAndText("DIV" ,"Assessment 3: " + scores.a3.total.toFixed(2), "instruction-text", wc);

  //sendResultsToQualtrics();

  createButton("restartAssessment()", "Done", wc);
    //let yesButton = document.getElementById("YES_button");
    //yesButton.setAttribute("style", "margin-bottom: 5px");
    //createButton("alertNoCertify()", "NO", wc);
} // assessmentsComplete

var reload = ()=>{
  getCurrentWindow().reload()
}

function restartAssessment() {
  reload();
}

/*
function alertNoCertify() {
  let alertDiv = document.createElement("DIV");
  alertDiv.className = "alert";
  let alertSpan = document.createElement("SPAN");
  alertSpan.className = "closebtn";
  alertSpan.setAttribute("onclick", "this.parentElement.style.display='none';");
  alertSpan.innerHTML = "&times;";
  alertDiv.appendChild(alertSpan);
  let t = document.createTextNode("The Assessment is not valid until the certification is accepted!");
  alertDiv.appendChild(t);
  alertDiv.setAttribute("style", "font-size: 20px; font-weight: bold");
  infoHeading.appendChild(alertDiv);
} // alertNoCertify
*/
