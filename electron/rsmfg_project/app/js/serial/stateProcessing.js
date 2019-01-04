
var currentState = STATES.IDLE;
var nextState = STATES.IDLE;

var a1Timeout = false;
var a2Timeout = false;
var a3Timeout = false;

const responseRegExp = /(?<cmd>\w+): (?<resp>.*)/;

var scores = {
  a1 : {
    total : 0.0,
    tableScore : 0.0,
    tableTime : 0.0,
    questionsScore : 0.0,
    a1BOMScore : 0.0,
    a1a1MeasurementScore : 0.0,
    questionsTime : 0.0,
    a1a : {
      tableScore : 0.0,
      tableTime : 0
    },
    a1b : {
      tableScore : 0.0,
      tableTime : 0,
    },
  },
  a2 : {
    total : 0.0,
    tableScore : 0.0,
    tableTime : 0.0,
    questionsScore : 0.0,
    questionsTime : 0.0,
  },
  a3 : {
    total : 0.0,
    tableScore : 0.0,
    tableTime : 0.0,
    questionsScore : 0.0,
    questionsTime : 0.0,
  }
} // scores

function parseSerial(data) {
  console.log("Received: " + data);
  processState(data);
}

function processState(data) {
  let match;
  let d = data.trim();
  console.log(currentState + ": " + d);
  nextState = currentState;

  switch (currentState) {
    case STATES.IDLE:
      //currentState = processIdleState(d, currentState);
      if (d == CMDS.SA1A) {
        console.log("HERE0");
        clearResults(scores);
        a1Timeout = false;
        a2Timeout = false;
        a3Timeout = false;
        currentState = STATES.A1A_ACTIVE;
        if (NO_TABLE) {
          processState(CMDS.SA1A);
        } else {
          sendSerial(CMDS.SA1A);
        }
      } else if (d == CMDS.RST) {
        console.log("Assessment Table has been reset");
      }
      break;
    case STATES.A1A_ACTIVE:
      if (d == CMDS.SA1A) {
        console.log("HERE0.5");
        if (NO_TABLE) {
          processState("SA1A: 75.0");
        }
      //  createCountdownTimer(A1_TIMER);
      //  document.getElementById('clockdivclone').style.display = "none";
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.SA1A) {
        captureTime(ASSESSMENTS.A1A);
        //calculateScore(ASSESSMENTS.A1A, match.groups.resp);
        scores.a1.a1a.tableScore = parseFloat(match.groups.resp);
        currentState = STATES.A1B_ACTIVE;
        console.log("HERE1 " + scores.a1.a1a.tableScore);
        sendSerial(CMDS.SA1B);
        //startTableAssessment1A();
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.ST1A) {
        // if timeout occurred during A1A then skip A1B table and questions
        // and move on to A2
        captureTime(ASSESSMENTS.A1A);
        captureTime(ASSESSMENTS.A1B);
        scores.a1.a1a.tableScore = parseFloat(match.groups.resp);
        scores.a1.a1b.tableScore = 0;
        console.log("HERE2 " + scores.a1.a1a.tableScore);
        //calculateScore(ASSESSMENTS.A1A, match.groups.resp);
        //calculateScore(ASSESSMENTS.A1B, 0);
        //calculateScore(ASSESSMENTS.A1);
        currentState = STATES.A2_ACTIVE;
        sendSerial(CMDS.SA2);
      }
      break;
    case STATES.A1B_ACTIVE:
      if (d == CMDS.SA1B) {
        if (NO_TABLE) {
          processState("SA1B: 5.0");
        }
        // do nothing. timer is already running
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.SA1B) {
        clearInterval(timeinterval);
        captureTime(ASSESSMENTS.A1B);
        captureTime(ASSESSMENTS.A1);
        scores.a1.a1b.tableScore = parseFloat(match.groups.resp);
        console.log("HERE3 " + scores.a1.a1b.tableScore);

        //calculateScore(ASSESSMENTS.A1B, match.groups.resp);
        //calculateScore(ASSESSMENTS.A1);
        currentState = STATES.A2_ACTIVE;
        startAssessment2();
//        processState(CMDS.SA2);
//        assessment1Questions();
//} else if (d == "A1Q_DONE") {
  //      clearInterval(timeinterval);
  //      captureTime(ASSESSMENTS.A1);
  //      // calculate A1B and total A1 scores
  //      //calculateScore(ASSESSMENTS.A1B;
  //      //calculateScore(ASSESSMENTS.A1);
  //      currentState = STATES.A2_ACTIVE;
  //      sendSerial(CMDS.SA2);
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.ST1B) {
        console.log("HERE4");
        captureTime(ASSESSMENTS.A1B);
        captureTime(ASSESSMENTS.A1);
        scores.a1.a1b.tableScore = parseFloat(match.groups.resp);
        //calculateScore(ASSESSMENTS.A1B, match.groups.resp);
        //calculateScore(ASSESSMENTS.A1);
        currentState = STATES.A2_ACTIVE;
        startAssessment2();
//      sendSerial(CMDS.SA2);
      }
      break;
    case STATES.A2_ACTIVE:
      if (d == CMDS.SA2) {
  //      startAssessment2();
        //createCountdownTimer(A2_TIMER);
        //createCountdownTimer(1500);
        if (NO_TABLE) {
          processState("SA2: 100.00");
        }
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.SA2) {
        console.log("HERE5");
        clearInterval(timeinterval);
        // process Assessment 2 questions then stop the timer
        captureTime(ASSESSMENTS.A2);
        scores.a2.tableScore = parseFloat(match.groups.resp);
        //calculateScore(ASSESSMENTS.A2, match.groups.resp);
        currentState = STATES.A3_ACTIVE;
        startAssessment3();
//        assessment2Questions();
//} else if (d == "A2Q_DONE") {
  //      // calculate total A2 scores
  //      clearInterval(timeinterval);
  //      captureTime(ASSESSMENTS.A2);
  //      // calc total A2 score
  //  //    calculateScore(ASSESSMENTS.A2, match.groups.resp);
  //      currentState = STATES.A3_ACTIVE;
  //      sendSerial(CMDS.SA3);
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.ST2) {
        console.log("HERE5.5");
        captureTime(ASSESSMENTS.A2);
        scores.a2.tableScore = parseFloat(match.groups.resp);
        //calculateScore(ASSESSMENTS.A2, match.groups.resp);
        currentState = STATES.A3_ACTIVE;
//        sendSerial(CMDS.SA3);
        startAssessment3();
      }
      break;
    case STATES.A3_ACTIVE:
      if (d == CMDS.SA3) {
      //  createCountdownTimer(A3_TIMER);
        //createCountdownTimer(5000);
        if (NO_TABLE) {
          processState("SA3: 80.01");
        }
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.SA3) {
        console.log("HERE6");
        clearInterval(timeinterval);
        captureTime(ASSESSMENTS.A3);
        scores.a3.tableScore = parseFloat(match.groups.resp);
        //calculateScore(ASSESSMENTS.A3, match.groups.resp);
        // send results to server
        assessmentsComplete();
        currentState = STATES.COMPLETE;
        if (NO_TABLE) {
          processState(CMDS.RST);
        } else {
          sendSerial(CMDS.RST);
        }
      } else if ((match = responseRegExp.exec(d)) && match.groups.cmd == CMDS.ST3) {
        console.log("HERE6.5");
        captureTime(ASSESSMENTS.A3);
        // calc total A3 score
        scores.a3.tableScore = parseFloat(match.groups.resp);
        //calculateScore(ASSESSMENTS.A3);
        assessmentsComplete();
        currentState = STATES.COMPLETE;
        if (NO_TABLE) {
          processState(CMDS.RST);
        } else {
          sendSerial(CMDS.RST);
        }
      }
      break;
    case STATES.COMPLETE:
      if (d == CMDS.RST) {
        console.log("HERE7");
        currentState = STATES.IDLE;
      }
      break;
    default:
  }
} // processState

function timeoutHandler() {
  console.log("TIMER HAS EXPIRED!");

    switch (currentState) {
      case STATES.A1A_ACTIVE:
        a1Timeout = true;
        sendSerial(CMDS.ST1A);
        break;
      case STATES.A1B_ACTIVE:
        a1Timeout = true;
        sendSerial(CMDS.ST1B);
        break;
      case STATES.A2_ACTIVE:
        a2Timeout = true;
        sendSerial(CMDS.ST2);
        break;
      case STATES.A3_ACTIVE:
        a3Timeout = true;
        sendSerial(CMDS.ST3);
        break;
      default:
    }

} // timeoutHandler

function clearResults(scores) {
  //console.log("CR: " + JSON.stringify(scores));
  for (const score in scores) {
    if (scores.hasOwnProperty(score)) {
      if (typeof scores[score] === 'object' && scores[score] !== null) {
        clearResults(scores[score]);
      } else {
        scores[score] = 0.0;
        //console.log("CLEARING " + score);
      }
    }
  }
} // clearResults
