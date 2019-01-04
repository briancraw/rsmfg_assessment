
// make the serial connection
connectToTablePromise
  .then(function(r) {
    console.log("Connected to Assessment Table Port " + r.portName);
  })
  .catch(function (r) {
    console.log(r.message);
  });

if (SERIAL_DEBUG == true) {
  serialDebugBox("Serial CMD");
} else {
  introductionPage();
//createCountdownTimer(25000);
//setTimeout("startNewTimer()", 10000);
}

//function startNewTimer() {
//  clearInterval(timeinterval);
//  createCountdownTimer(10000);
//}
