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
  let score = 0;
  let numAnswers = 8;
  if (sessionStorage["BOM"] == bomAnswer) {
    score = score + 5;
  }
  console.log("SCORE1: " + score);

  if (sessionStorage["width1"] == width1Answer) {
    if (sessionStorage["width1_fractions"] == width1_fractionsAnswer) {
      score = score + 1;
    }
  }
  console.log("SCORE2: " + score);

  if (sessionStorage["width2"] == width2Answer) {
    if (sessionStorage["width2_fractions"] == width2_fractionsAnswer) {
      score = score + 1;
    }
  }
  console.log("SCORE3: " + score);

  if (sessionStorage["len"] == lenAnswer) {
    if (sessionStorage["len_fractions"] == len_fractionsAnswer) {
      score = score + 1;
    }
  }
  console.log("SCORE4: " + score);

  // A1A has 3 available points
  score = score + scores.a1.a1a.tableScore;
  console.log("SCORE5: " + score);

  // A1B has 4 available points
  score = score + scores.a1.a1b.tableScore;
  console.log("SCORE6: " + score);

  //let a1aTimeScore = getTimeScore(scores.a1.a1a.tableTime);
  //console.log ("A1A Time " + scores.a1.a1a.tableTime + ", " +  a1aTimeScore);
  //a1aTimeScore = 0.3 * (a1aTimeScore/100) * A1A_TOTAL_AVAIL_PTS;
  //console.log ("A1A Time Score " + a1aTimeScore);
  //score = score + a1aTimeScore;
//  score = score + getTimeScore(scores.a1.a1a.tableTime);
  //console.log("SCORE7: " + score);

  //let a1bTimeScore = getTimeScore(scores.a1.a1b.tableTime);
  //console.log ("A1B Time " + scores.a1.a1b.tableTime + ", " + a1bTimeScore);
  //a1bTimeScore = 0.3 * (a1bTimeScore/100) * A1B_TOTAL_AVAIL_PTS;
  //console.log ("A1B Time Score " + a1bTimeScore);
  //score = score + a1bTimeScore;

  let a1TotalTime = scores.a1.a1b.tableTime+scores.a1.a1a.tableTime
  let a1TimeScore = getTimeScore(a1TotalTime);
  console.log ("A1 Time " + a1TotalTime + ", " + a1TimeScore);
  a1TimeScore = (a1TimeScore/100) * A1_TOTAL_TIME_PTS;
  console.log ("A1 Time Score " + a1TimeScore);
  score = score + a1TimeScore;
//score = score + getTimeScore(scores.a1.a1b.tableTime);
  console.log("SCORE8: " + score);

  //return (score/numAnswers);
  return score;
} // calculateA1Score

function calculateA2Score() {
  let score = 0;
//  let numAnswers = 5;
  if (sessionStorage["leftPocketCount"] == leftPocketCountAnswer) {
    score = score + 1;
  }
  if (sessionStorage["centerPocketCount"] == centerPocketCountAnswer) {
    score = score + 1;
  }
  if (sessionStorage["rightPocketCount"] == rightPocketCountAnswer) {
    score = score + 1;
  }
  console.log("SCORE10: " + score);
  // A2 has 7 available points
  score = score + scores.a2.tableScore;
  console.log("SCORE11: " + score);
  let a2TimeScore = getTimeScore(scores.a2.tableTime);
  console.log ("A2 Time " + scores.a2.tableTime + ", " +  a2TimeScore);
  a2TimeScore = (a2TimeScore/100) * A2_TOTAL_TIME_PTS;
  console.log ("A2 Time Score " + a2TimeScore);
  score = score + a2TimeScore;
  //score = score + getTimeScore(scores.a2.tableTime);
  console.log("SCORE12: " + score);

  //return (score/numAnswers);
  return score;
} // calculateA2Score

function calculateA3Score() {
  let score = 0;
  //let numAnswers = 2;

  // A3 has 9 available points
  score = score + scores.a3.tableScore;
  console.log("SCORE13: " + score);
  let a3TimeScore = getTimeScore(scores.a3.tableTime);
  console.log ("A3 Time " + scores.a3.tableTime + ", " +  a3TimeScore);
  a3TimeScore = (a3TimeScore/100) * A3_TOTAL_TIME_PTS;
  console.log ("A3 Time Score " + a3TimeScore);
  score = score + a3TimeScore;
  //score = score + getTimeScore(scores.a3.tableTime);
  console.log("SCORE14: " + score);

  //return (score/numAnswers);
  return score;
} // calculateA3Score

function getTimeScore(val) {
  if (val < MINUTE*3) { // 3 minutes
    return 100;
  } else if (val < MINUTE*6) { // 6 minutes
    return 50;
  } else if (val < MINUTE*9) { // 9 minutes
    return 33.33;
  } else if (val < MINUTE*10) { // 10 minutes
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
  scores.a1.total = (calculateA1Score()/(A1_TOTAL_ASSESS_PTS + A1_TOTAL_TIME_PTS))*100;
  scores.a2.total = (calculateA2Score()/(A2_TOTAL_ASSESS_PTS + A2_TOTAL_TIME_PTS))*100;
  scores.a3.total = (calculateA3Score()/(A3_TOTAL_ASSESS_PTS + A3_TOTAL_TIME_PTS))*100;

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

  t = createElementAndText("DIV", "Below are your scores.", "instruction-text", wc);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  hl = document.createElement('BR');
  hl.setAttribute("style", "margin-top: 10px; margin-bottom: 10px");
  wc.appendChild(hl);

  t = createElementAndText("DIV" ,"Assessment 1:  " + scores.a1.total.toFixed(2) + "%", "instruction-text", wc);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  t = createElementAndText("DIV" ,"Assessment 2:  " + scores.a2.total.toFixed(2) + "%", "instruction-text", wc);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");
  t = createElementAndText("DIV" ,"Assessment 3:  " + scores.a3.total.toFixed(2) + "%", "instruction-text", wc);
  t.setAttribute("style", "font-size: 22px; font-weight: bold; text-align: center");

  //sendResultsToQualtrics();
  hl = document.createElement('BR');
  hl.setAttribute("style", "margin-top: 10px; margin-bottom: 10px");
  wc.appendChild(hl);
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
