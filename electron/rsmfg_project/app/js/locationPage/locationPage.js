/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

function locationPage() {
  //let locations = getLocations();
  let locationKeys = Object.keys(locations);

  topHeading.innerHTML = "Thanks you for choosing ResourceMFG! Please select your site location below.";

  let fcName = document.getElementById("form-name");
  let fcEntry = document.getElementById("form-entry");

  createSelectTextElement("State", fcName);
  createSelectMenu("State", locationKeys, fcEntry);

  createSelectTextElement("Branch", fcName);
  createSelectMenu("Branch", locations[locationKeys[0]], fcEntry);

  // Create NEXT button
  let footer = document.getElementById("footer");
  createButton("employeeInfoPage()", "Next", footer);
  //createButton("assessment1StartPage()", "Next", footer);

} // locationPage


function dropdownFunction(bid) {
  document.getElementById(bid).classList.toggle("show");
} // dropdownFunction

function getLocations() {
  let locations = {
                "Kentucky":["Lexington", "Richmond", "Louisville"],
                "Indiana":["Bloomington", "Evansville", "Indianapolis"]
              };
  return locations;
}
