//promeni u register form
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
//promeni u login form
var form_login = document.getElementById("formlogin");
form_login.addEventListener("click", changelogin);
function changelogin() {
  login.removeAttribute("class");
  email.setAttribute("class", "hidden");
  register.setAttribute("class", "hidden");
  form_register.style.color = "darkgray";
  form_login.style.color = "white";
}

// vise i ne znam sta je ovde
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var login = document.getElementById("login");
var register = document.getElementById("register");
var error = document.getElementById("error");
var logout = document.getElementById("logout");
var openfridge = document.getElementById("openfridge");
var user = {};
var users = [];
var loggeduser = {};
var remove = document.getElementById("remove");
var searchvalue = document.getElementById("searchgroceries").value;
var items = document.getElementById("items");
var slot = document.getElementsByClassName("plus");
var add = document.getElementById("add");

// LOGOUT
var loggedin = JSON.parse(localStorage.getItem("logged_in"));
logout.addEventListener("click", function () {
  var ask = window.confirm(
    `Are you sure you want to log out ${username.value}?`
  );
  if (ask == false) {
    return false;
  } else {
    username.value = "";
    var nouser = {};
    localStorage.setItem("logged_in", JSON.stringify(nouser));
    sessionStorage.clear();
    window.location.reload();
  }
});

//LOGOVANJE
login.addEventListener("click", function () {
  error.innerHTML = "";
  username.style.borderColor = "red";
  password.style.borderColor = "red";
  var name = username.value;
  var pass = password.value;
  var pulldata = getdata();
  if (pulldata == null) {
    error.innerHTML += `There are no registered users!<br>`;
    error.style.color = "red";
    usercheck = false;
  } else if (name == "") {
    error.innerHTML += `Username field empty!<br>`;
    username.style.borderColor = "red";
    usercheck = false;
  } else {
    for (i = 0; i < pulldata.length; i++)
      if (pulldata[i].name == name) {
        if (pulldata[i].name == name && pulldata[i].password == pass) {
          loggeduser.name = name;
          loggeduser.password = pass;
          sessionStorage.setItem("logged_in", JSON.stringify(loggeduser));
          error.innerHTML = `Welcome ${name}!`;
          error.style.color = "lime";
          login.setAttribute("class", "hidden");
          username.setAttribute("class", "hidden");
          password.setAttribute("class", "hidden");
          logout.removeAttribute("class");
          openfridge.removeAttribute("class");
          username.style.borderColor = "lime";
          form_login.removeEventListener("click", changelogin);
          form_register.removeEventListener("click", changereg);
          document
            .getElementById("formheading")
            .setAttribute("class", "hidden");
          error.style.fontSize = "40px";
          error.innerHTML = `Welcome ${getloggedname}!`;
          error.style.color = "lime";
          login.setAttribute("class", "hidden");
          username.setAttribute("class", "hidden");
          password.setAttribute("class", "hidden");
          logout.removeAttribute("class");
          openfridge.removeAttribute("class");
          document
            .getElementById("formheading")
            .setAttribute("class", "hidden");
          error.style.fontSize = "40px";

          return;
        } else if (pulldata[i].name == name && pulldata[i].password != pass) {
          username.style.borderColor = "lime";
          password.style.borderColor = "red";
          error.style.color = "red";
          error.innerHTML = "Wrong password!";
          return;
        }
      }
    error.innerHTML += `${name} is not registered!`;
    username.style.borderColor = "red";
  }
});

//REGISTROVANJE
function getdata() {
  var getdata = localStorage.getItem("users");
  var userdata = JSON.parse(getdata);
  return userdata;
}
register.addEventListener("click", function () {
  var name = username.value;
  var mail = email.value;
  var pass = password.value;
  error.innerHTML = "";
  error.style.color = "red";

  //proveri username
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
  } else if (name.includes(" ")) {
    error.innerHTML += `Username musn't contain a space!<br>`;
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
  //proveri email
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
  //proveri password
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

  //proveri formu i ubaci korisnika u storage
  if (namecheck && mailcheck && passwordcheck) {
    user.name = name;
    user.email = mail;
    user.password = pass;
    user.groceries = [];
    for (i = 0; i < slot.length; i++) {
      var entry = {
        name: "",
      };

      user.groceries.push(entry);
    }
    if (userdata != null) {
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
    // buildstorage();
  }
});

//otvori frizider i ispisi sva polja
openfridge.addEventListener("click", function () {
  var getloggeduser = sessionStorage.getItem("logged_in");
  var parsename = JSON.parse(getloggeduser);
  var getloggedname = parsename.name;
  var getusers = JSON.parse(localStorage.getItem("users"));
  var existingusers = getusers.find((x) => x.name === `${getloggedname}`);
  var groceries = existingusers.groceries;
  var form = document.getElementById("form");
  form.style.position = "fixed";
  form.style.top = "0";
  form.style.right = "0";
  error.style.display = "inline-block";
  error.style.padding = "20px";
  error.innerHTML = `${username.value}`;
  logout.style.display = "inline-block";
  openfridge.setAttribute("class", "hidden");
  var fridge = document.getElementById("fridgeclosed");
  fridge.setAttribute("src", "Images/open.png");
  fridge.setAttribute("usemap", "#map");
  fridge.setAttribute("id", "fridgeopen");
  document.getElementById("heading").setAttribute("class", "hidden");
  document.getElementById("plusmap").removeAttribute("class");
  var background = document.getElementById("main");

  //ispisi meni za namirnice
  for (let i = 0; i < slot.length; i++) {
    slot[i].addEventListener("click", function (event) {
      var top = slot[i].style.top;
      var parsetop = parseInt(top, 10);
      var left = slot[i].style.left;
      var parseleft = parseInt(left, 10);
      if (parsetop >= 400) {
        items.style.top = `${450}px`;
        items.style.left = `${parseleft + 50}px`;
      } else {
        items.style.top = `${parsetop + 50}px`;
        items.style.left = `${parseleft + 50}px`;
      }
      returni = function () {
        return i;
      };

      items.removeAttribute("class");
      event.stopPropagation();
    });
  }
  background.addEventListener("click", function () {
    items.setAttribute("class", "hidden");
  });
  items.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // //dodaj item u polje i storage
  add.addEventListener("click", function () {
    groceries[returni()].name = `${searchvalue}`;
    displayitem();
    store = JSON.stringify(getusers);
    localStorage.setItem("users", store);
  });

  //remove item iz storage-a
  remove.addEventListener("click", function () {
    groceries[returni()].name = ``;
    displayitem();
    slot[returni()].innerHTML = "+";
    store = JSON.stringify(getusers);

    localStorage.setItem("users", store);
  });

  //pokupi sacuvane iteme iz storiga u frizider
  var existingusers = getusers.find((x) => x.name === `${getloggedname}`);
  var groceries = existingusers.groceries;
  for (i = 0; i < groceries.length; i++) {
    if (groceries[i].name != "") {
      slot[i].innerHTML = `${groceries[i].name}`;
    }
  }
  function displayitem() {
    slot[returni()].innerHTML = `${groceries[returni()].name}`;
  }
});
