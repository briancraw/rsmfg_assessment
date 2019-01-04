var NO_TABLE = false;
var SERIAL_DEBUG = false;
var A1_TIMER = 600000; // 10 minutes
var A2_TIMER = 600000; // 10 minues;
var A3_TIMER = 600000; // 10 minues;
var MINUTE = 60000; // 1 minute;

const ASSESSMENTS = {
  A1: "A1",
  A1A: "A1A",
  A1B: "A1B",
  A2 : "A2",
  A3 : "A3",
};

const CMDS = {
  SA1A: "SA1A",
  SA1B: "SA1B",
  SA2: "SA2",
  SA3: "SA3",
  ST1A: "ST1A",
  ST1B: "ST1B",
  ST2: "ST2",
  ST3: "ST3",
  GR1A: "GR1A",
  GR1B: "GR1B",
  GR2: "GR2",
  GR3: "GR3",
  RS1A: "RS1A",
  RS1B: "RS1B",
  RS2: "RS2",
  RS3: "RS3",
  GFW: "GFW",
  RST: "RST",
};

const STATES = {IDLE       : "IDLE",
                A1A_START  : "A1A_START",
                A1A_ACTIVE : "A1A_ACTIVE",
                A1B_DONE   : "A1A_DONE",
                A1B_START  : "A1B_START",
                A1B_ACTIVE : "A1B_ACTIVE",
                A1B_DONE   : "A1B_DONE",
                A2_START   : "A2_START",
                A2_ACTIVE  : "A2_ACTIVE",
                A2_DONE    : "A2_DONE",
                A3_START   : "A3_START",
                A3_ACTIVE  : "A3_ACTIVE",
                A3_DONE    : "A3_DONE",
                COMPLETE   : "COMPLETE"
              };

var timeinterval;
var remainingTime = {
  'total': 0,
  'minutes': 0,
  'seconds': 0
};
var waiting = true;
var firstName = "First Name";
var lastName = "Last Name";
var ssn = "Last 4 digits of SSN";
var date = "Date (MM/DD/YYYY)";
var employeeNum = "Employee Number";

sessionStorage[firstName] = "";
sessionStorage[lastName] = "";
sessionStorage[ssn] = "";
sessionStorage[date] = "";
sessionStorage[employeeNum] = "";

sessionStorage["BOM"] = "";
sessionStorage["depth"] = "";
sessionStorage["depth_fractions"] = "";
sessionStorage["len"] = "";
sessionStorage["len_fraction"] = "";
sessionStorage["width"] = "";
sessionStorage["width_fractions"] = "";
bomAnswer = "4.91";
depthAnswer = "2";
depth_fractionsAnswer = "3/4";
lenAnswer = "6";
len_fractionsAnswer = "";
widthAnswer = "3"
width_fractionsAnswer = "";

sessionStorage["leftPocketCount"] = "";
sessionStorage["centerPocketCount"] = "";
sessionStorage["rightPocketCount"] = "";
leftPocketCountAnswer = "7";
centerPocketCountAnswer = "3";
rightPocketCountAnswer = "2";

var topHeading = document.getElementById("top-heading");
var infoHeading = document.getElementById("info-heading");
var wc = document.getElementById("window-content");
var preformContent = document.getElementById("preform-content");
var postformContent = document.getElementById("postform-content");
var formName = document.getElementById("form-name");
var formEntry = document.getElementById("form-entry");
var footer = document.getElementById("footer");
