/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

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
  let points = 0;

  if (sessionStorage["BOM"] == bomAnswer) {
    score = score + 5;
    points = 5;
  }
  console.log("A1 BOM SCORE: " + points + " of 5,  TOTAL: " + score);
  points = 0;

  if (sessionStorage["len"] == lenAnswer) {
    if (sessionStorage["len_fractions"] == len_fractionsAnswer) {
      score = score + 1;
      points = 1;
    }
  }
  console.log("A1 LEN SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  if (sessionStorage["width1"] == width1Answer) {
    if (sessionStorage["width1_fractions"] == width1_fractionsAnswer) {
      score = score + 1;
      points = 1;
    }
  }
  console.log("A1 WIDTH1 SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  if (sessionStorage["width2"] == width2Answer) {
    if (sessionStorage["width2_fractions"] == width2_fractionsAnswer) {
      score = score + 1;
      points = 1;
    }
  }
  console.log("A1 WIDTH2 SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  // A1A has 3 available points
  score = score + scores.a1.a1a.tableScore;
  console.log("A1 PUZZLE SCORE: " + scores.a1.a1a.tableScore + " of 3, TOTAL: " + score);

  // A1B has 4 available points
  score = score + scores.a1.a1b.tableScore;
  console.log("A1 ASSEMBLY SCORE: " +  scores.a1.a1b.tableScore + " of 4, TOTAL: " + score);

  let a1TotalTime = scores.a1.a1b.tableTime+scores.a1.a1a.tableTime
  let a1TimeScore = getTimeScore(a1TotalTime, A1_TIMER);
  a1TimeScore = (a1TimeScore/100) * A1_TOTAL_TIME_PTS;
  score = score + a1TimeScore;
  console.log ("A1 TIME SCORE: " + a1TimeScore + " of " + A1_TOTAL_TIME_PTS + ", TOTAL " + score);

  return score;
} // calculateA1Score

function calculateA2Score() {
  let score = 0;
  let  points = 0;

  if (sessionStorage["leftPocketCount"] == leftPocketCountAnswer) {
    score = score + 1;
    points = 1;
  }
  console.log("A2 POCKET #1 SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  if (sessionStorage["centerPocketCount"] == centerPocketCountAnswer) {
    score = score + 1;
    points = 1;
  }
  console.log("A2 POCKET #2 SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  if (sessionStorage["rightPocketCount"] == rightPocketCountAnswer) {
    score = score + 1;
    points = 1;
  }
  console.log("A2 POCKET #3 SCORE: " + points + " of 1, TOTAL: " + score);
  points = 0;

  // A2 has 7 available points
  score = score + scores.a2.tableScore;
  console.log("A2 TABLE SCORE: " +  scores.a2.tableScore + " of 7, TOTAL: " + score);

  let a2TimeScore = getTimeScore(scores.a2.tableTime, A2_TIMER);
  a2TimeScore = (a2TimeScore/100) * A2_TOTAL_TIME_PTS;
  score = score + a2TimeScore;
  console.log("A2 TIME SCORE: " + a2TimeScore + " of " + A2_TOTAL_TIME_PTS + ", TOTAL: " + score);

  return score;
} // calculateA2Score

function calculateA3Score() {
  let score = 0;

  // A3 has 9 available points
  score = score + scores.a3.tableScore;
  console.log("A3 TABLE SCORE: " + scores.a3.tableScore + " of 9, TOTAL: " + score);
  let a3TimeScore = getTimeScore(scores.a3.tableTime, A3_TIMER);
  a3TimeScore = (a3TimeScore/100) * A3_TOTAL_TIME_PTS;
  score = score + a3TimeScore;
  console.log("A3 TIME SCORE: " + a3TimeScore + " of " + A3_TOTAL_TIME_PTS + ", TOTAL: " + score);

  return score;
} // calculateA3Score

// 100-70% of time = 100% of score
// 70-40% of time = 50% of score
// 40-10% of time = 33.33% of score
// 10-0% of time = 10% of score
// <=0% of time = 0% of score
// time: time in minutes it took user to complete assessment
// allowed_time: total time allowed for assessment
function getTimeScore(time, allowed_time) {
  if (time < (0.3*allowed_time)) {
    console.log("TIME: "+time+": "+(0.3*allowed_time));
    return 100;
  } else if (time < (0.6*allowed_time)) {
    return 50;
  } else if (time < (0.9*allowed_time)) {
    return 33.33;
  } else if (time < allowed_time) {
    return 10;
  } else {
    return 0;
  }
} // getTimeScore

/*
function getTimeScore(val) {
  if (val < MINUTE*1.5) { // 1.5 minutes
    return 100;
  } else if (val < MINUTE*3) { // 3 minutes
    return 50;
  } else if (val < MINUTE*4.5) { // 4.5 minutes
    return 33.33;
  } else if (val < MINUTE*5) { // 5 minutes
    return 10;
  } else {
    return 0;
  }
} // getTimeScore
*/

function calculateScores() {
  // A1 Total
  let a1score = calculateA1Score();
  let a2score = calculateA2Score();
  let a3score = calculateA3Score();
  scores.a1.total = Math.round((a1score/(A1_TOTAL_ASSESS_PTS + A1_TOTAL_TIME_PTS))*100);
  scores.a2.total = Math.round((a2score/(A2_TOTAL_ASSESS_PTS + A2_TOTAL_TIME_PTS))*100);
  scores.a3.total = Math.round((a3score/(A3_TOTAL_ASSESS_PTS + A3_TOTAL_TIME_PTS))*100);

  console.log ("A1.TOTAL (" + a1score + "/" + (A1_TOTAL_ASSESS_PTS + A1_TOTAL_TIME_PTS) + "): " + scores.a1.total);
  console.log ("A2.TOTAL (" + a2score + "/" + (A2_TOTAL_ASSESS_PTS + A2_TOTAL_TIME_PTS) + "): " + scores.a2.total);
  console.log ("A3.TOTAL (" + a3score + "/" + (A3_TOTAL_ASSESS_PTS + A3_TOTAL_TIME_PTS) + "): " + scores.a3.total);
  //console.log("SCORES: " + JSON.stringify(scores));
} // calculateScores

function displayScores() {
  resetWCAll();

  displayUploadInProgress();

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
} // displayScores

function displayUploadInProgress() {
    let t = createElementAndText("DIV", "Results upload in progress...", "instruction-text", topHeading);
    t.setAttribute("style", "font-size: 24px; font-weight: bold; text-align: center");
}

function assessmentsComplete() {
  //resetWCAll();
  calculateScores();
  sendResults();
  displayScores();
} // assessmentsCompleted

var reload = ()=>{
  getCurrentWindow().reload()
}

function restartAssessment() {
  reload();
}
