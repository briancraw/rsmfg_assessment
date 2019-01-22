const request = require('request');
var responseObject;

function sendResultsToQualtrics() {
  var sessionId;
  let apiToken = "JIhVfX3JOiEV0ZX6J4YOmzvdH2P2IErW99Oz1sEp";
  let surveyId = "SV_9nOLL07nZ2JBdKR";
  let baseUrl = "https://employbridge.az1.qualtrics.com/API/v3/surveys/" + surveyId + "/sessions";

  let headers = {
    "x-api-token": apiToken,
    "Content-Type": "application/json"
  };

  let data = {
    "language": "EN",
    "embeddedData": {
      "First":sessionStorage[firstName],
      "Last":sessionStorage[lastName],
      "SSN":sessionStorage[ssn],
      "EmployeeNumber":sessionStorage[employeeNum],
      "AssemblyScore":scores.a1.total.toString(),
      "InspectionScore":scores.a2.total.toString(),
      "TroubleshootingScore":scores.a3.total.toString()
    }
  };

  let createSessionParams = {
    headers: headers,
    uri: baseUrl,
    json: true,
    body: JSON.stringify(data),
    method: 'POST'
  };

  fetch(baseUrl, createSessionParams)
  // create user session
  .then(function(r) {
    console.log("create r.status: " + r.status);
    if (r.status == 201) {return r.json();}//return r.text();}
  })
  .then(function(r) {
    sessionId = r.result.sessionId;
    console.log("Session ID: " + sessionId);

    baseUrl = "https://employbridge.az1.qualtrics.com/API/v3/surveys/" + surveyId + "/sessions/" + sessionId;

    data = {
      "advance": true,
      /*  "responses": {
      "QID1": {
      "1": {"selected": true}
    },
    "QID2": {
    "2": {"selected": true}
  }
}
*/
};

let updateSessionParams = {
  headers: headers,
  uri: baseUrl,
  json: true,
  body: JSON.stringify(data),
  method: 'POST'
};

return fetch(baseUrl, updateSessionParams);
})
.then(function (r) {
  console.log("update r.status: " + r.status);

  if (r.status == 200) {
    console.log("Update Session request was successful");
    return r.json().then(function(r) {console.log("Update Session Result: "+ JSON.stringify(r));});
  }
})
.catch(function(e) {
  console.log("There was an error with the fetch: " + e);
});

} //sendResultsToQualtrics
