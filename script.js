// promena forme izmedju login i register
var form_register = document.getElementById("formregister");
form_register.addEventListener("click", changereg);
function changereg() {
  login.setAttribute("class", "hidden");
  email.removeAttribute("class");
  register.removeAttribute("class");
  form_login.style.color = "darkgray";
  form_register.style.color = "white";
  username.value = "";
  email.value = "";
  password.value = "";
  error.innerHTML = "";
  username.style.borderColor = "#3498db";
  email.style.borderColor = "#3498db";
  password.style.borderColor = "#3498db";
}
var form_login = document.getElementById("formlogin");
form_login.addEventListener("click", changelogin);
function changelogin() {
  login.removeAttribute("class");
  email.setAttribute("class", "hidden");
  register.setAttribute("class", "hidden");
  form_register.style.color = "darkgray";
  form_login.style.color = "white";
}

// registrovanje

var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var login = document.getElementById("login");
var register = document.getElementById("register");
var error = document.getElementById("error");
var user = {};
var users = [];
var loggeduser = {};
//

register.addEventListener("click", function () {
  var name = username.value.trim();
  var mail = email.value.trim();
  var pass = password.value.trim();
  //username
  
  if (name == "") {
    error.innerHTML += `Username field empty!<br>`;
    username.style.borderColor = "red";
    var namecheck = false;
  } else if (name.length < 3) {
    error.innerHTML += `Username too short! (minimum 3 letters)<br>`;
    username.style.borderColor = "red";
    var namecheck = false;
  } else if (name.length > 15) {
    error.innerHTML += `Username too long! (maximum 15 letters)<br>`;
    username.style.borderColor = "red";
    var namecheck = false;
  } else {
    username.style.borderColor = "lime";
    var namecheck = true;
  }
  var userdata = getdata();
  if (userdata != null) {
    for (i = 0; i < userdata.length; i++) {
      if (userdata[i].name == name) {
        error.innerHTML += `Username taken!<br>`;
        username.style.borderColor = "red";
        var namecheck = false;
      }
    }
  }
  //email
  if (mail == "") {
    error.innerHTML += `Email field empty!<br>`;
    email.style.borderColor = "red";
    var mailcheck = false;
  } else if (
    mail.includes("@") == false ||
    mail.includes(".") == false ||
    mail.includes(" ")
  ) {
    error.innerHTML += `Email format not correct!<br>`;
    email.style.borderColor = "red";
    var mailcheck = false;
  } else {
    email.style.borderColor = "lime";
    var mailcheck = true;
  }
  //password
  var number = 0;
  var capitalletter = 0;
  var smallletter = 0;
  for (i = 0; i < pass.length; i++) {
    if (pass[i] >= "0" && pass[i] <= "9") {
      number++;
    } else if (
      pass[i].toUpperCase() == pass[i] &&
      pass[i].toLowerCase() != pass[i]
    ) {
      capitalletter++;
    } else if (
      pass[i].toUpperCase() != pass[i] &&
      pass[i].toLowerCase() == pass[i]
    ) {
      smallletter++;
    }
  }
  if (pass == "") {
    error.innerHTML += `Password field empty!<br>`;
    password.style.borderColor = "red";
    var passwordcheck = false;
  } else if (pass.includes(" ")) {
    error.innerHTML += `Password musn't contain a space!<br>`;
    password.style.borderColor = "red";
  } else if (pass.length < 8) {
    error.innerHTML += `Password less than 8 characters!<br>`;
    password.style.borderColor = "red";
  } else if (number == 0 || capitalletter == 0 || smallletter == 0) {
    error.innerHTML += `Password must contain at least 1: number, capital letter, small letter!<br>`;
    passwordcheck = false;
  } else {
    var passwordcheck = true;
    password.style.borderColor = "lime";
  }

  //check form and add user to local storage
  if (namecheck && mailcheck && passwordcheck) {
    user.name = name;
    user.email = mail;
    user.password = pass;
    if (userdata != null){
      console.log(userdata);
      userdata.push(user);
      store = JSON.stringify(userdata);
    } else {
      users.push(user);
      store = JSON.stringify(users);
    }
    localStorage.setItem("users", store);

    changelogin();
    password.value = "";
    error.innerHTML = `Success! Please log in`;
    error.style.color = "lime";
  }
});

function getdata() {
  var getdata = localStorage.getItem("users");
  var userdata = JSON.parse(getdata);
  return userdata;
}
