
function confirmTableLayoutPage() {
  resetWCAll();

  t = createElementAndText("P", "Please inspect your Assessment Table.  If the setup does not match the picture \
                    below please see your branch representative!", "instruction-text", wc);
  t.setAttribute("style", "text-align: center");
  let br = document.createElement("BR");
  wc.appendChild(br);
  t = createElementAndText("P", "Does your Assessment Table appear as in the picture below?", "instruction-text", wc);
  t.setAttribute("style", "text-align: center");
  //br = document.createElement("BR");
  //wc.appendChild(br);

  createButton("assessment1StartPage()", "YES", wc);
  let yesButton = document.getElementById("YES_button");
  yesButton.setAttribute("style", "margin-bottom: 5px");
  createButton("resetTableMessage()", "NO", wc);

  //topHeading.innerHTML = "<img src=\"img/Inspection.jpg\" style=\"width:50%\">";
  let img = document.createElement("IMG");
  img.setAttribute("src", "img/Inspection.jpg");
  img.setAttribute("style", "width:50%");
  wc.appendChild(img);
  footer.innerHTML = "";
} // confirmTableLayoutPage

function resetTableMessage() {
  let alertDiv;
  alertDiv = document.getElementById("alertMessage");
  if (alertDiv == null) {
    alertDiv = document.createElement("DIV");
  } else {
    alertDiv.innerHTML = "";
    alertDiv.setAttribute("style", "display=show");
  }
  //let alertDiv = document.createElement("DIV");
  alertDiv.className = "alert";
  alertDiv.setAttribute("id", "alertMessage");
  let alertSpan = document.createElement("SPAN");
  alertSpan.className = "closebtn";
  alertSpan.setAttribute("onclick", "this.parentElement.style.display='none';");
  alertSpan.innerHTML = "&times;";
  alertDiv.appendChild(alertSpan);
  let t = document.createTextNode("Please have the branch representative reset the table to appear as in the image and then click YES");
  alertDiv.appendChild(t);
  infoHeading.appendChild(alertDiv);
} // resetTableMessage
