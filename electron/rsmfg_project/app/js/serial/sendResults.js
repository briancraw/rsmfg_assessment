/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

const request = require('request');
var responseObject;

function sendResultsToQualtrics() {

  return new Promise(function(resolve, reject) {
  var sessionId;
  let apiToken = "JIhVfX3JOiEV0ZX6J4YOmzvdH2P2IErW99Oz1sEp";
  let surveyId = "SV_9nOLL07nZ2JBdKR";
  let baseUrl = "https://employbridge.az1.qualtrics.com/API/v3/surveys/" + surveyId + "/sessions";
  //baseUrl = "http://httpstat.us/404";
  let successful = false;

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
    if (r.status == 201) {
      return r.json();
    }
  })
  .then(function(r) {
      sessionId = r.result.sessionId;
      console.log("Session ID: " + sessionId);

      baseUrl = "https://employbridge.az1.qualtrics.com/API/v3/surveys/" + surveyId + "/sessions/" + sessionId;

      data = {
        "advance": true,
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

      let result = r.json().then(function(r) {console.log("Update Session Result: "+ JSON.stringify(r));});
      resolve(result);
    } else if (r.status == 404) {
      reject(reason);
    }
  })
  .catch(function(e) {
    let reason = "There was an error with the fetch: " + e;
    reject(reason);
  });
});
} //sendResultsToQualtrics
