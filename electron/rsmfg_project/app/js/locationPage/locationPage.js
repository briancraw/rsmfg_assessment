/*
  Builds the welcome and location selection page.
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
