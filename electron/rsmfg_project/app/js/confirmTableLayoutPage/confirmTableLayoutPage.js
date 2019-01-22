
function confirmTableLayoutPage() {
  resetWCAll();

  t = createElementAndText("P", "Does your Assessment Table appear as in the picture below?", "instruction-text", wc);
  t.setAttribute("style", "text-align: center");

  let btnDiv = document.createElement("DIV");
  btnDiv.className = "form-button-div";
  let btn = document.createElement("BUTTON");
  btn.setAttribute("id", "YES"+"_button");
  btn.setAttribute("onclick", "assessment1StartPage()");
  btn.setAttribute("style", "margin: 5px");
  btn.className = "form-button";
  t = document.createTextNode("YES");
  btn.appendChild(t);
  btnDiv.appendChild(btn);

  btn = document.createElement("BUTTON");
  btn.setAttribute("id", "NO"+"_button");
  btn.setAttribute("onclick", "resetTableMessage()");
  btn.className = "form-button";
  t = document.createTextNode("NO");
  btn.appendChild(t);

  btnDiv.appendChild(btn);
  wc.appendChild(btnDiv);

  let img = document.createElement("IMG");
  img.setAttribute("src", "img/layout.jpg");
  img.setAttribute("style", "width:45%");
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
