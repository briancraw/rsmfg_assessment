function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
} // getTimeRemaining


function createCountdownTimer(timeoutInMilliseconds) {
  let clockDiv = document.getElementById('clockdiv');
  clearInterval(timeinterval);

  if (clockDiv === null) {
    console.log ("CREATING CLOCKDIV FOR FIRST TIME " + clockDiv);
    //postformContent.innerHTML = "";
    clockDiv = document.createElement("DIV");
    clockDiv.setAttribute("id", "clockdiv");
    clockDiv.innerHTML = "";
    footer.appendChild(document.createElement("HR"));
    footer.appendChild(clockDiv);
    clockDivClone = clockDiv.cloneNode(true);
    clockDivClone.id = 'clockdivclone';
    infoHeading.appendChild(clockDivClone);
  }

  remainingTime.total = 0;
  remainingTime.minutes = 0;
  remainingTime.seconds = 0;

  let deadline = new Date(Date.parse(new Date()) + timeoutInMilliseconds);
  initializeClock([clockDiv, clockDivClone], deadline);
//  initializeClock(clockDivClone, deadline);
} // createCountdownTimer


function initializeClock(clocks, endtime) {
  function updateClock() {
    remainingTime = getTimeRemaining(endtime);
    for (let c = 0; c < clocks.length; c++) {
      clocks[c].innerHTML = ('0' + remainingTime.minutes).slice(-2)+":"+('0' + remainingTime.seconds).slice(-2);
      if (remainingTime.total <= 0) {
        clearInterval(timeinterval);
        timeoutHandler();
      } else if (remainingTime.minutes < 2) {
        //let clockDiv = document.getElementById("clockdiv");
        clocks[c].setAttribute("style", "color: red");
      }
    }
  } // updateClock
  updateClock();
  timeinterval = setInterval(updateClock, 1000);
} // initializeClock
