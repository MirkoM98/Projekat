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
};

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
          logoutclosed.removeAttribute("class");
          openfridge.removeAttribute("class");
          username.style.borderColor = "lime";
          form_login.removeEventListener("click", changelogin);
          form_register.removeEventListener("click", changereg);
          document
            .getElementById("formheading")
            .setAttribute("class", "hidden");
          error.style.fontSize = "40px";
          error.innerHTML = `Welcome ${loggeduser.name}!`;
          error.style.color = "lime";
          login.setAttribute("class", "hidden");
          username.setAttribute("class", "hidden");
          password.setAttribute("class", "hidden");
          logoutclosed.removeAttribute("class");
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
    var passwordcheck = false;
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
    localStorage.setItem("users", store);
    changelogin();
    password.value = "";
    error.innerHTML = `Success! Please log in`;
    error.style.color = "lime";
    // buildstorage();
  }
});

//otvori frizider i ispisi sva polja
openfridge.addEventListener("click", openthefridge);
function openthefridge() {
  logoutfridge.removeAttribute("class");
  form.setAttribute("class", "form hidden");
  
  var showrecipes = document.getElementById("showrecipe");
  showrecipes.setAttribute("class", "hidden");
  var getloggeduser = sessionStorage.getItem("logged_in");
  var parsename = JSON.parse(getloggeduser);
  var getloggedname = parsename.name;
  var getusers = JSON.parse(localStorage.getItem("users"));
  var existingusers = getusers.find((x) => x.name === `${getloggedname}`);
  var groceries = existingusers.groceries;
  form.style.position = "fixed";
  form.style.top = "0";
  form.style.right = "0";
  error.style.display = "inline-block";
  error.style.padding = "20px";
  logoutopened.innerHTML = `Logged in: ${getloggedname}`;
  logoutopened.addEventListener("mouseenter", function(){
    logoutopened.innerHTML = "Click to logout";
  });
  logoutopened.addEventListener("mouseleave", function() {
    logoutopened.innerHTML = `Logged in: ${getloggedname}`;
  });

  openfridge.setAttribute("class", "hidden");
  var fridge = document.getElementById("fridgeclosed");
  fridge.setAttribute("src", "Images/open.png");

  heading.setAttribute("class", "hidden");
  plusmap.removeAttribute("class");
  var background = document.getElementById("main");

  //ispisi meni za namirnice
  for (let i = 0; i < slot.length; i++) {
    slot[i].addEventListener("click", function (event) {
      var grocerielist = document.getElementById("groceries");
      grocerielist.innerHTML = "";
      var searchvalue = document.getElementById("searchgroceries");
      searchvalue.value = "";

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
  var existingusers = getusers.find((x) => x.name === `${getloggedname}`);
  var groceries = existingusers.groceries;
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
          `https://api.spoonacular.com/food/ingredients/autocomplete?query=${getsearch()}&number=10&apiKey=08f731bc20da4bd1b19fb4aaaa591b23`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            var items = data;

            displaygroceries.innerHTML = "";

            for (let i = 0; i < items.length; i++) {
              var food = document.createElement("div");
              food.addEventListener("click", additem);
              food.setAttribute("id", "food");

              food.innerHTML = `<img src="https://spoonacular.com/cdn/ingredients_100x100/${items[i].image}"><div class="searchp"><p>${items[i].name}</p></div>`;

              displaygroceries.appendChild(food);

              function additem() {
                var checkgroceries = groceries.find(
                  (x) => x.name === `${items[i].name}`
                );
                if (checkgroceries != null) {
                  alert(`You already have ${items[i].name}`);
                } else {
                  groceries[returni()].name = `${items[i].name}`;
                  groceries[returni()].image = `${items[i].image}`;

                  store = JSON.stringify(getusers);
                  localStorage.setItem("users", store);
                  displayitem(returni());
                }
              }
            }
          });
      }
    });

  var imhungry = document.getElementById("imhungry");
  var getrecipes = document.getElementById("getrecipe");
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  var choose = document.getElementById("choose");
  imhungry.addEventListener("click", hungry);
  var showrecipes = document.getElementById("showrecipe");

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
  getrecipes.addEventListener("click", recipes);
  function recipes() {
    showrecipes.innerHTML = "<div id='searching'><img src='Images/6.gif'></div>";
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
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number&apiKey=08f731bc20da4bd1b19fb4aaaa591b23`,
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
              `https://api.spoonacular.com/recipes/${recipes[i].id}/analyzedInstructions?apiKey=08f731bc20da4bd1b19fb4aaaa591b23`,
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
