var port;
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
let portName = null;
var {ipcRenderer, remote} = require('electron');
var rdyForResults = false;

ipcRenderer.on('connectToAssessmentTable', (event, arg) => {
  connectToTablePromise
  .then(function(r) {
    console.log("Connected to Assessment Table Port " + r.portName);
  })
  .catch(function (r) {
    console.log(r.message);
  });
});

const connectToTablePromise = new Promise(function(resolve, reject) {
  SerialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log("Port " + port.comName + ", Vendor " + port.vendorId + ", Manufacturer " + port.manufacturer);
      if (typeof port.manufacturer !== 'undefined' && port.manufacturer.includes("Arduino LLC")) {
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
      //parser.on('data', processState);

      port.pipe(parser);

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


function sendSerial(command) {
  console.log("Sending "+command);
  port.write(command + '\r');
}

function serialDebugBox(text) {
  //let wc = document.getElementsByClassName("window-content");
  //let element = wc;

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
