function green(green) {
  let x = green;
  x.style.boxShadow = "0px 0px 10px green";
  x.style.borderColor = "green";
}
function red(red) {
  let y = red;
  y.style.boxShadow = "0px 0px 10px red";
  y.style.borderColor = "red";
}
function black() {
  username.style.boxShadow = "";
  email.style.boxShadow = "";
  password.style.boxShadow = "";
  username.style.borderColor = "black";
  email.style.borderColor = "black";
  password.style.borderColor = "black";
}
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var login = document.getElementById("login");
var register = document.getElementById("register");
var error = document.getElementById("error");
var logoutclosed = document.getElementById("logout");
var openfridge = document.getElementById("openfridge");
var user = {};
var users = [];
var loggeduser = {};
var remove = document.getElementById("remove");
var displaygroceries = document.getElementById("groceries");
var plusmap = document.getElementById("plusmap");
var items = document.getElementById("items");
var slot = document.getElementsByClassName("plus");
var heading = document.getElementById("heading");
var logoutopened = document.getElementById("logoutfridge");
var form = document.getElementById("form");
var fridge = document.getElementById("fridgeclosed");
var fridgemain = document.getElementById("fridge");
var formheading = document.getElementById("formheading");
var imhungry = document.getElementById("imhungry");
var getrecipes = document.getElementById("getrecipe");
var checkboxes = document.querySelectorAll("input[type=checkbox]");
var choose = document.getElementById("choose");
var showrecipes = document.getElementById("showrecipe");
var background = document.getElementById("main");
var grocerielist = document.getElementById("groceries");
formheading.setAttribute("class", "left");
error.style.fontSize = "1rem";

//promeni u register form
var form_register = document.getElementById("formregister");
form_register.addEventListener("click", changereg);
function changereg() {
  login.setAttribute("class", "hidden");
  email.removeAttribute("class");
  register.removeAttribute("class");
  username.value = "";
  email.value = "";
  password.value = "";
  error.innerHTML = "";
  form_login.removeAttribute("class");
  form_register.setAttribute("class", "register");
  formheading.setAttribute("class", "right");
  black();
}
//promeni u login form
var form_login = document.getElementById("formlogin");
form_login.addEventListener("click", changelogin);
function changelogin() {
  login.removeAttribute("class");
  email.setAttribute("class", "hidden");
  register.setAttribute("class", "hidden");
  form_register.removeAttribute("class");
  form_login.setAttribute("class", "login");
  formheading.setAttribute("class", "left");
  black();
  error.innerHTML = "";
}

// LOGOUT
var loggedin = JSON.parse(localStorage.getItem("logged_in"));
logoutopened.addEventListener("click", logout);
logoutclosed.addEventListener("click", logout);
function logout() {
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
}

//LOGOVANJE
login.addEventListener("click", function () {
  error.innerHTML = "";
  var name = username.value;
  var pass = password.value;
  var pulldata = getdata();
  if (pulldata == null) {
    error.innerHTML += `There are no registered users!<br>`;
    error.style.color = "red";
    usercheck = false;
  } else if (name == "") {
    error.innerHTML += `Username field empty!<br>`;
    red(username);
    usercheck = false;
  } else {
    for (i = 0; i < pulldata.length; i++)
      if (pulldata[i].name == name) {
        if (pulldata[i].name == name && pulldata[i].password == pass) {
          loggeduser.name = name;
          loggeduser.password = pass;
          sessionStorage.setItem("logged_in", JSON.stringify(loggeduser));
          login.setAttribute("class", "hidden");
          username.setAttribute("class", "hidden");
          password.setAttribute("class", "hidden");
          formheading.setAttribute("class", "hidden");
          logoutclosed.removeAttribute("class");
          openfridge.removeAttribute("class");
          form_login.removeEventListener("click", changelogin);
          form_register.removeEventListener("click", changereg);
          error.innerHTML = `Welcome ${loggeduser.name}!`;
          username.style.borderColor = "lime";
          error.style.color = "#2ecc71";
          error.style.fontWeight = "bolder";
          error.style.textShadow = "1px 1px 2px black";
          error.style.fontSize = "2rem";
          if (width < 1000) {
            error.style.fontSize = "1.5rem";
          }
          return;
        } else if (pulldata[i].name == name && pulldata[i].password != pass) {
          username.style.borderColor = "lime";
          error.style.textShadow = "0px 0px 10px red";
          green(username);
          red(password);
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
  var parseddata = JSON.parse(getdata);
  return parseddata;
}
register.addEventListener("click", function () {
  var name = username.value;
  var mail = email.value;
  var pass = password.value;
  error.innerHTML = "";
  error.style.color = "red";
  black();

  //proveri username
  var namecheck = false;
  var userdata = getdata();

  if (name == "") {
    error.innerHTML += `Username field empty!<br>`;
    red(username);
  } else if (name.length < 3) {
    error.innerHTML += `Username too short! (minimum 3 letters)<br>`;
    red(username);
  } else if (name.length > 15) {
    error.innerHTML += `Username too long! (maximum 15 letters)<br>`;
    red(username);
  } else if (name.includes(" ")) {
    error.innerHTML += `Username musn't contain a space!<br>`;
    red(username);
  } else {
    green(username);
    namecheck = true;
  }

  if (userdata != null) {
    for (i = 0; i < userdata.length; i++) {
      if (userdata[i].name == name) {
        error.innerHTML += `Username taken!<br>`;
        red(username);
      }
    }
  }

  //proveri email
  var mailcheck = false;
  if (mail == "") {
    error.innerHTML += `Email field empty!<br>`;
    red(email);
  } else if (
    mail.includes("@") == false ||
    mail.includes(".") == false ||
    mail.includes(" ")
  ) {
    error.innerHTML += `Email format not correct!<br>`;
    red(email);
  } else {
    green(email);
    mailcheck = true;
  }

  //proveri password
  var passwordcheck = false;
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
    red(password);
  } else if (pass.includes(" ")) {
    error.innerHTML += `Password musn't contain a space!<br>`;
    red(password);
  } else if (pass.length < 8) {
    error.innerHTML += `Password less than 8 characters!<br>`;
    red(password);
  } else if (number == 0 || capitalletter == 0 || smallletter == 0) {
    error.innerHTML += `Password must contain at least 1: number, capital letter, small letter!<br>`;
  } else {
    passwordcheck = true;
    green(password);
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
        image: "",
      };
      user.groceries.push(entry);
    }
    if (userdata != null) {
      userdata.push(user);
      store = JSON.stringify(userdata);
    } else {
      users.push(user);
      store = JSON.stringify(users);
    }
    green(username);
    green(password);
    localStorage.setItem("users", store);
    changelogin();
    password.value = "";
    error.innerHTML = `Success! Please log in`;
    error.style.color = "lime";
    error.style.textShadow = "1px 1px 2px black";
  }
});

//otvori frizider i ispisi sva polja sa slikama
openfridge.addEventListener("click", openthefridge);
function openthefridge() {
  logoutfridge.removeAttribute("class");
  form.setAttribute("class", "form hidden");
  showrecipes.setAttribute("class", "hidden");
  var getloggeduser = sessionStorage.getItem("logged_in");
  var parsename = JSON.parse(getloggeduser);
  var getloggedname = parsename.name;
  var getusers = JSON.parse(localStorage.getItem("users"));
  var existingusers = getusers.find((x) => x.name === `${getloggedname}`);
  var groceries = existingusers.groceries;
  logoutopened.innerHTML = `Logged in: ${getloggedname}`;
  logoutopened.addEventListener("mouseenter", function () {
    logoutopened.innerHTML = "Click to logout";
  });
  logoutopened.addEventListener("mouseleave", function () {
    logoutopened.innerHTML = `Logged in: ${getloggedname}`;
  });
  openfridge.setAttribute("class", "hidden");
  fridge.setAttribute("src", "Images/open.png");
  heading.setAttribute("class", "hidden");
  plusmap.removeAttribute("class");

  //ispisi meni za namirnice i odredi poziciju
  for (let i = 0; i < slot.length; i++) {
    slot[i].addEventListener("click", function (event) {
      items.style.height = "";
      grocerielist.innerHTML = "";
      var searchvalue = document.getElementById("searchgroceries");
      searchvalue.value = "";
      var top = slot[i].style.top;
      parsetop = parseInt(top, 10);
      var left = slot[i].style.left;
      var parseleft = parseInt(left, 10);
      items.style.top = `${parsetop + 50}px`;
      items.style.left = `${parseleft + 50}px`;
      items.removeAttribute("class");
      returni = function () {
        return i;
      };
      event.stopPropagation();
      let boundingright = items.getBoundingClientRect();
      var bright = Math.round(boundingright.right);
      var boundingbot1 = items.getBoundingClientRect();
      bbottom1 = Math.round(boundingbot1.bottom);

      if (bright > width) {
        excessright = bright - width;
        items.style.left = `${parseleft + 50 - (excessright + 20)}px`;
      }
      if (bbottom1 > height) {
        var excessbottom1 = bbottom1 - height;
        items.style.top = `${parsetop + 50 - excessbottom1}px`;
      }
    });
  }
  background.addEventListener("click", function () {
    items.setAttribute("class", "hidden");
  });
  items.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // remove item iz storage-a
  remove.addEventListener("click", function () {
    groceries[returni()].name = ``;
    groceries[returni()].image = ``;
    displayitem(returni());
    slot[returni()].innerHTML = "+";
    store = JSON.stringify(getusers);
    localStorage.setItem("users", store);
  });

  //pokupi sacuvane iteme iz storiga u frizider
  for (let i = 0; i < groceries.length; i++) {
    if (groceries[i].name != "") {
      displayitem(i);
    }
  }

  function getsearch() {
    var searchvalue = document.getElementById("searchgroceries").value;
    return searchvalue.replace(/\s+/g, "-").toLowerCase();
  }
  function displayitem(x) {
    x = x;
    slot[
      x
    ].innerHTML = `<img src="https://spoonacular.com/cdn/ingredients_100x100/${groceries[x].image}" title="${groceries[x].name}">`;
  }
  // 08f731bc20da4bd1b19fb4aaaa591b23 mirketna key // mirkomail key bac1eba564884223a0dbdb9605cedef5 // bojke key e929b96d042449e69c91ba672d69c79f

  //trazi namirnice preko api i ispisi
  document
    .getElementById("searchgroceries")
    .addEventListener("keypress", function () {
      if (event.keyCode === 13) {
        fetch(
          `https://api.spoonacular.com/food/ingredients/autocomplete?query=${getsearch()}&number=10&apiKey=e929b96d042449e69c91ba672d69c79f`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var itemdata = data;

            displaygroceries.innerHTML = "";

            for (let i = 0; i < itemdata.length; i++) {
              var food = document.createElement("div");
              food.addEventListener("click", additem);
              food.setAttribute("id", "food");
              food.innerHTML = `<img src="https://spoonacular.com/cdn/ingredients_100x100/${itemdata[i].image}"><div class="searchp"><p>${itemdata[i].name}</p></div>`;
              displaygroceries.appendChild(food);
              // dodaj item u polje i storage

              function additem() {
                var checkgroceries = groceries.find(
                  (x) => x.name === `${itemdata[i].name}`
                );
                if (checkgroceries != null) {
                  alert(`You already have ${itemdata[i].name}`);
                } else {
                  groceries[returni()].name = `${itemdata[i].name}`;
                  groceries[returni()].image = `${itemdata[i].image}`;

                  store = JSON.stringify(getusers);
                  localStorage.setItem("users", store);
                  displayitem(returni());
                }
              }
            }
            var boundingbot = items.getBoundingClientRect();
            bbottom = Math.round(boundingbot.bottom);

            if (bbottom > height) {
              var excessbottom = bbottom - height;
              items.style.top = `${parsetop + 50 - excessbottom}px`;
              var itemtop = items.style.top;
              var parseitemtop = parseInt(itemtop, 10);
            }
            if (parseitemtop < 0) {
              items.style.top = "5px";
            }
            if (height < 600) {
              items.style.height = `${height - 20}px`;
            }
          });
      }
    });
  //bira namirnice koje se koriste za recepte
  imhungry.addEventListener("click", hungry);

  function hungry() {
    getrecipes.removeAttribute("class");
    imhungry.setAttribute("class", "hidden");
    choose.removeAttribute("class");
    plusmap.style.backgroundColor = "rgba(0, 0, 0, 0.658)";

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].setAttribute("id", `id${i}`);
      slot[i].setAttribute("for", `id${i}`);
      if (slot[i].innerHTML != "+") {
        slot[i].setAttribute("class", "plus hover shad");
      } else {
        slot[i].setAttribute("class", "plus hover");
      }
    }
  }
  //vuce api za recepte i instrukcije
  getrecipes.addEventListener("click", recipes);
  function recipes() {
    showrecipes.innerHTML =
      "<div id='searching'><img src='Images/6.gif'></div>";
    heading.innerHTML = "<p>Instructions are shown here!</p>";
    heading.removeAttribute("class");
    imhungry.removeAttribute("class");
    getrecipes.setAttribute("class", "hidden");
    plusmap.style.backgroundColor = "";
    var ingredientslong = "";
    for (let i = 0; i < checkboxes.length; i++) {
      slot[i].setAttribute("class", "plus");
      slot[i].style.borderColor = "black";
      if (checkboxes[i].checked == true && groceries[i].name != "") {
        ingredientslong += `${groceries[i].name},+`;
      }

      checkboxes[i].removeAttribute("id");
      slot[i].removeAttribute("for");
      slot[i].style.border = "";
      checkboxes[i].checked = false;
    }

    var ingredientsspace = ingredientslong.slice(0, -2);
    var ingredients = ingredientsspace.replace(/\s+/g, "-").toLowerCase();
    fridge.setAttribute("src", "Images/closed.png");
    plusmap.setAttribute("class", "hidden");
    openfridge.removeAttribute("class");
    showrecipe.removeAttribute("class");
    choose.setAttribute("class", "hidden");
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number&apiKey=e929b96d042449e69c91ba672d69c79f`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        var recipes = data;

        showrecipes.innerHTML = "";
        for (let i = 0; i < recipes.length; i++) {
          var recipe = document.createElement("div");
          recipe.innerHTML = `<img src="${recipes[i].image}"><p>${recipes[i].title}</p>`;
          recipe.setAttribute("class", `show`);
          recipe.setAttribute("id", "showrecipesmenu");
          showrecipes.appendChild(recipe);
        }

        var recipeclass = document.getElementsByClassName(`show`);
        for (let i = 0; i < recipeclass.length; i++) {
          recipeclass[i].addEventListener("click", function () {
            heading.innerHTML = "";
            fetch(
              `https://api.spoonacular.com/recipes/${recipes[i].id}/analyzedInstructions?apiKey=e929b96d042449e69c91ba672d69c79f`,
              {
                method: "GET",
              }
            )
              .then((resp) => resp.json())
              .then((data) => {
                if (data.length < 1) {
                  heading.innerHTML =
                    "<p>Sorry, we couldn't find any instructions for this dish... :(</p>";
                } else {
                  for (let j = 0; j < data[0].steps.length; j++) {
                    heading.innerHTML += `<p><span>${data[0].steps[j].number}</span> : ${data[0].steps[j].step}</p><br>`;
                  }
                }
              });
          });
        }
      });
  }
}
// responsive design
var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
var height = window.innerHeight > 0 ? window.innerHeight : screen.height;
if (width < 1000) {
  fridge.style.width = `${width}px`;
  fridgemain.style.width = `${width}px`;
  var newwidth = 1000 - width;
  var result = (newwidth * 100) / 1000;
  var reduceby = result / 100;
  choose.style.fontSize = "1rem";
  for (let i = 0; i < slot.length; i++) {
    var top2 = slot[i].style.top;
    var parsetop = parseInt(top2, 10);
    var left = slot[i].style.left;
    var parseleft = parseInt(left, 10);
    var size = 45 - reduceby * 45;
    slot[i].style.width = `${size}px`;
    slot[i].style.height = `${size}px`;
    parsetop = parsetop - reduceby * parsetop;
    parseleft = parseleft - reduceby * parseleft;
    slot[i].style.top = `${parsetop}px`;
    slot[i].style.left = `${parseleft}px`;
  }
  if (width < 700) {
    document.getElementById("h2").style.fontSize = "1.1rem";
    document.getElementById("h2span").style.fontSize = "1.2rem";
    form_login.style.fontSize = "1.1rem";
    form_register.style.fontSize = "1.1rem";
    items.style.width = "50%";
    logoutfridge.style.fontSize = "0.7rem";
    imhungry.style.fontSize = "0.7rem";
    getrecipes.style.fontSize = "0.7rem";
  }
  if (width < 600) {
    for (let i = 0; i < slot.length; i++) {
      slot[i].style.fontSize = "1rem";
    }
    imhungry.style.fontSize = "0.5rem";
    getrecipes.style.fontSize = "0.5rem";
    logoutfridge.style.fontSize = "0.5rem";
  }
}
