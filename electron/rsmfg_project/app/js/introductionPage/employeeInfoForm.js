/*
  Builds the welcome and location selection page.
*/

function employeeInfoForm() {
  sessionStorage[firstName] = "";
  sessionStorage[lastName] = "";
  sessionStorage[ssn] = "";
  sessionStorage[date] = "";
  sessionStorage[employeeNum] = "";

//  let fcName = document.getElementById("form-name");
//  fcName.innerHTML = "";
//  let fcEntry = document.getElementById("form-entry");
//  fcEntry.innerHTML = "";
  formName.innerHTML = "";
  formEntry.innerHTML = "";

  createSelectTextElement(firstName+":", formName);
  createFormField(firstName, formEntry);
  createSelectTextElement(lastName+":", formName);
  createFormField(lastName, formEntry);
  createSelectTextElement(ssn+":", formName);
  createFormField(ssn, formEntry);
  createSelectTextElement(date+":", formName);
  createFormField(date, formEntry);
  createSelectTextElement(employeeNum+":", formName);
  createFormField(employeeNum, formEntry);
} // employeeInfoForm

function validateEntries() {
  let form_incomplete = false;
  let form_invalid = false;
  let dateRegExp = /(\d?\d)\/(\d?\d)\/(\d\d\d\d)/;

  // validate each entry
  if (isBlank(sessionStorage[firstName])) {
    form_incomplete = true;
    sessionStorage[firstName] = "";
    let e = document.getElementById(firstName+"_selectText");
  }

  if (isBlank(sessionStorage[lastName])) {
    form_incomplete = true;
    sessionStorage[lastName] = "";
  }

  if (isBlank(sessionStorage[ssn])) {
    form_incomplete = true;
    sessionStorage[ssn] = "";
  }

  if (isBlank(sessionStorage[date])) {
    form_incomplete = true;
    sessionStorage[date] = "";
  } else if (!dateRegExp.test(sessionStorage[date])) {
    form_invalid = true;
    infoHeading.innerHTML = "Date must be in the format MM/DD/YYYY"
    infoHeading.style.color = "red";
    document.getElementById("window-content").style.backgroundColor = "lightgray";
    sessionStorage[date] = "";
  }

  if (isBlank(sessionStorage[employeeNum])) {
    form_incomplete = true;
  }

  if (form_incomplete) {
    infoHeading.innerHTML = "All entries must be complete before proceeding!"
    infoHeading.style.color = "red";
    document.getElementById("window-content").style.backgroundColor = "lightgray";
  } else if (!form_invalid){
    infoHeading.style.color = "black";
    document.getElementById("window-content").style.backgroundColor = "";
    confirmTableLayoutPage();
  }
} // validateEntries
