/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/

var {ipcRenderer, remote} = require('electron');
var rdyForResults = false;

var port;
var SerialPort = require('serialport');
var parsers = SerialPort.parsers;

function connectToTable() {
  connectToTablePromise()
    .then(function(r) {
      clearNotConnected();
      console.log("Connected to Assessment Table Port " + r.portName);
      TABLE_CONNECTED = true;
    })
    .catch(function (r) {
      console.log(r.message);
      reportNotConnected();
    });
} // connectToTable()

function connectToTablePromise() {
    return new Promise(function(resolve, reject) {
      let portName = null;
      console.log("connectToTablePromise: ");
      SerialPort.list(function (err, ports) {
        ports.forEach(function(port) {
          console.log("Port " + port.comName + ", Vendor " + port.vendorId + ", Manufacturer " + port.manufacturer);
          if ((port.vendorId == '2341') || (typeof port.manufacturer !== 'undefined' && port.manufacturer.includes("Arduino LLC"))) {
            portName = port.comName;
            console.log("PORT " + portName + " DETECTED");
          }
        });

        if (portName != null) {
          port = new SerialPort(portName, {
            baudRate: 9600
          });
          const parser = new parsers.Readline({ delimiter: '\n' });

          parser.on('data', parseSerial);
          port.pipe(parser);

          port.on("open", showPortOpen);
          port.on("close", showPortClose);
          port.on('error', function(err) {
            console.log('SerialPort Error: ', err.message)
          });

          let serialInfo = {connected: true, portName: portName, ports: ports};
          resolve(serialInfo);
        } else {
          let reason = new Error("Failed to Connect!");
          reject(reason);
        }
      });
    });
} // connectToTablePromise()

ipcRenderer.on('connectToAssessmentTable', (event, arg) => {
  connectToTable();
});


function sendSerial(command) {
  console.log("Sending "+command);
  port.write(command + '\r');
}

function showPortClose() {
console.log("USB Connection Lost: ");
reportNotConnected();
}

function showError(error) {
console.log("Serial port error: " + error);
}

function showPortOpen() {
console.log("USB Port Succesfully Opened");
}


function serialDebugBox(text) {
  let formDiv = document.createElement("DIV");
  let formLabel = document.createElement("LABEL");
  formLabel.className = "fill-box-desc-txt"
  formLabel.innerHTML = text+":";
  formDiv.appendChild(formLabel);
  let formInput = document.createElement("INPUT");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("id", text+"_box");
  formInput.className = "selections";
  formDiv.appendChild(formInput);
  wc.appendChild(formDiv);

  formInput.addEventListener('change', function (e) {
    sendSerial(e.target.value);
  });
}
