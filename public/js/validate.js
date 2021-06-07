var email = document.getElementById("InputEmail2");
var pwd = document.getElementById("InputPassword2");
var pwdre = document.getElementById("InputPassword3");
var erorReenter = document.getElementById("PasswordHelp3");
var booktitle = document.getElementById("InputTitle");
var authorname = document.getElementById("InputAuthorName");
var genre = document.getElementById("InputGenre");
var cover = document.getElementById("InputImageBook");

var language = document.getElementById("InputLanguage");
var dob = document.getElementById("Inputdob");
var about = document.getElementById("InputAbout");
var authorImage = document.getElementById("InputImageAuthor");
var regexp = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/;

var strongPwd = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/;

var mediumPwd = /(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).{6,}/;

var poorPwd = /((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))/;
var titleReg = /^([A-Za-z\s]+)$/;
var authornameReg = /^([A-Za-z\.\s]+)$/;
var genreReg = /^([A-Za-z\s]+)$/;

var dobReg = /^([0-2][0-9]|(3)[0-1])(\s)(((0)[0-9])|((1)[0-2]))(\s)\d{4}$/;
var languageReg = /^([A-Za-z\s,]+)$/;
var erorE = document.getElementById("emailHelp2");
var erorP = document.getElementById("PasswordHelp2");
var setAction = document.getElementById("set");
let eye = document.getElementById("btnPwdToggle");
function validateEmail() {
  if (regexp.test(email.value)) {
    erorE.innerHTML = "<b>Valid mail<b>";
    erorE.style.color = "green";
    return true;
  }
  else if (email.value == "") {
    erorE.innerHTML = "Enter your E-mail id";
    erorE.style.color = "#6c757d";
    (document.getElementById("field")).style.visibility = "visible";
    return false;
  }
  else {
    erorE.innerHTML = "<b> Invalid mail <b>";
    erorE.style.color = "red";
    return false;
  }
}
function validatePassword() {

  if (pwd.value == "") {
    erorP.innerHTML = "Must be 8-20 characters long. ";
    erorP.style.color = "#6c757d";
    pwd.style.backgroundColor = "#fff";
    pwd.style.border = "1px solid #ced4da";
    (document.getElementById("btnPwdToggle")).style.border = "1px solid #ced4da";
    eye.style.borderLeft = "0 none transparent";
    (document.getElementById("field")).style.visibility = "visible";

    return false;
  }
  else if (strongPwd.test(pwd.value)) {
    erorP.innerHTML = "<b>Password strength: Strong<b>";
    erorP.style.color = "green";
    pwd.style.border = "2px solid green";
    pwd.style.borderRight = "0 none transparent";
    (document.getElementById("btnPwdToggle")).style.border = "2px solid green";
    eye.style.borderLeft = "0 none transparent";
    return true;
  }
  else if (mediumPwd.test(pwd.value)) {

    erorP.innerHTML = "<b>Password strength: Medium <b>";
    erorP.style.color = "orange";
    pwd.style.border = "2px solid orange";
    pwd.style.borderRight = "0 none transparent";
    (document.getElementById("btnPwdToggle")).style.border = "2px solid orange";
    eye.style.borderLeft = "0 none transparent";
    return false;
  }
  else if (poorPwd.test(pwd.value)) {
    erorP.innerHTML = "<b>Password strength: Poor<b>";
    erorP.style.color = "red";
    pwd.style.border = "2px solid red";
    pwd.style.borderRight = "0 none transparent";
    (document.getElementById("btnPwdToggle")).style.border = "2px solid red";
    eye.style.borderLeft = "0 none transparent";
    return false;
  }
  else if (pwd.value.trim() == "") {
    (document.getElementById("field")).style.visibility = "visible";
    return false;
  }
}
function re_enterPassword() {
  if (pwdre.value == pwd.value) {
    erorReenter.innerHTML = " Re-enter the password ";
    erorReenter.style.color = "#6c757d";
    return true;
  }
  else if (pwdre.value.trim() == "") {
    (document.getElementById("field")).style.visibility = "visible";
  }
  else {
    erorReenter.innerHTML = "<b>Invalid Password<b>";
    erorReenter.style.color = "red";
    (document.getElementById("field")).style.visibility = "hidden";
    return false;
  }
}
function pwdToggle(btn, ob) {
  ob = document.getElementById(ob);
  ob.type = ob.type === 'text' ? 'password' : 'text';
  // console.log(ob,btn.children);
  btn.children[0].setAttribute('name',
    (ob.type === 'text') ? 'eye-outline' : 'eye-off-outline')

}
function formlogin() {
  var loginEmail = document.getElementById("InputEmail1");
  var loginPassword = document.getElementById("InputPassword1");
  var loginerror = document.getElementById("passwordHelp1");
  if (regexp.test(loginEmail.value) && strongPwd.test(loginPassword.value)) {
    setAction.setAttribute("action", "login/getin");
    loginerror.innerHTML = "";
    return true;
  }
  else {
    loginerror.innerHTML = "Invalid User name or Password";
    return false;
  }
}
function formloginerror() {
  var loginEmail = document.getElementById("InputEmail1");
  var loginPassword = document.getElementById("InputPassword1");
  var loginerror = document.getElementById("passwordHelp1");
  if (regexp.test(loginEmail.value) && strongPwd.test(loginPassword.value)) {
    // setAction.setAttribute("action", "login/getin");
    loginerror.innerHTML = "";
    return true;
  }
  else {
    loginerror.innerHTML = "Invalid User name or Password";
    return false;
  }
}
function check() {
  if (validateEmail() && validatePassword() && re_enterPassword()) {
    setAction.setAttribute('action', 'signup/getin');
    (document.getElementById("field")).style.visibility = "hidden";
    erorReenter.innerHTML = " Re-enter the password";
    erorReenter.style.color = "#6c757d";
    return true;
  }
  else {
    return false;
  }
}
function checkerror() {
  if (validateEmail() && validatePassword() && re_enterPassword()) {
    // setAction.setAttribute('action', 'signup/getin');
    (document.getElementById("field")).style.visibility = "hidden";
    erorReenter.innerHTML = " Re-enter the password";
    erorReenter.style.color = "#6c757d";
    
    return true;
  }
  else {
    return false;
  }
}
function addauthorcheck() {
  if (authornameReg.test(authorname.value.trim()) && languageReg.test(language.value.trim()) && (about.value.trim() != "") && dobReg.test(dob.value.trim()) && authorImage.value.trim() != "") {
    
    setAction.setAttribute("action", "/addauthor/admin");
    (document.getElementById("field")).style.visibility = "hidden";
    (document.getElementById("field")).innerHTML = "";
    console.log(author);
    return true;
  }
  else if (authorname.value.trim() == "" || language.value.trim() == "" || about.value.trim() == "" || dob.value.trim() == "" || authorImage.value.trim() == "") {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "*Fields cannot be empty";
    return false;
  }
  else if (!dobReg.test(dob.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Enter Date of birth in correct format";
    return false;
  }
  else if (!authornameReg.test(authorname.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Author name field other than ' . ' ";
    return false;
  }
  else if (!languageReg.test(language.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in language field other than ' , ' ";
    return false;
  }
  else {
    return false
  }
}
function updateauthorcheck() {
  if (authornameReg.test(authorname.value.trim()) && languageReg.test(language.value.trim()) && (about.value.trim() != "") && dobReg.test(dob.value.trim()) && authorImage.value.trim() != "") {
    
    // setAction.setAttribute("action", "/addauthor/admin");
    (document.getElementById("field")).style.visibility = "hidden";
    (document.getElementById("field")).innerHTML = "";
    
    return true;
  }
  else if (authorname.value.trim() == "" || language.value.trim() == "" || about.value.trim() == "" || dob.value.trim() == "" || authorImage.value.trim() == "") {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "*Fields cannot be empty";
    return false;
  }
  else if (!dobReg.test(dob.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Enter Date of birth in correct format";
    return false;
  }
  else if (!authornameReg.test(authorname.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Author name field other than ' . ' ";
    return false;
  }
  else if (!languageReg.test(language.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in language field other than ' , ' ";
    return false;
  }
  else {
    return false
  }
}
function addbookcheck() {
  if (titleReg.test(booktitle.value.trim()) && authornameReg.test(authorname.value.trim()) && genreReg.test(genre.value.trim()) && cover.value.trim() != "") {
    setAction.setAttribute("action", "/addbook/admin");
    (document.getElementById("field")).style.visibility = "hidden";
    (document.getElementById("field")).innerHTML = "";
    return true;
  }
  else if (booktitle.value.trim() == "" || authorname.value.trim() == "" || genre.value.trim() == "" || cover.value.trim() == "" ) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "*Fields cannot be empty";
    return false;
  }
  else if (!titleReg.test(booktitle.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Title field";
    return false;
  }
  else if (!authornameReg.test(authorname.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Author name field other than ' . ' ";
    return false;
  }
  else if (!genreReg.test(genre.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Genre field";
    return false;
  }
  else {

    return false;
  }
}
function updatebookcheck() {
  if (titleReg.test(booktitle.value.trim()) && authornameReg.test(authorname.value.trim()) && genreReg.test(genre.value.trim()) && cover.value.trim() != "") {
    // setAction.setAttribute("action", "/addbook/admin");
    (document.getElementById("field")).style.visibility = "hidden";
    (document.getElementById("field")).innerHTML = "";
    return true;
  }
  else if (booktitle.value.trim() == "" || authorname.value.trim() == "" || genre.value.trim() == "" || cover.value.trim() == "" ) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "*Fields cannot be empty";
    return false;
  }
  else if (!titleReg.test(booktitle.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Title field";
    return false;
  }
  else if (!authornameReg.test(authorname.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Author name field other than ' . ' ";
    return false;
  }
  else if (!genreReg.test(genre.value.trim())) {
    (document.getElementById("field")).style.visibility = "visible";
    (document.getElementById("field")).innerHTML = "Special characters are not allowed in Genre field";
    return false;
  }
  else {

    return false;
  }
}
