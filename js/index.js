let searchName = document.querySelector("#search-by-name");
let searchLetter = document.querySelector("#search-by-letter");

async function getData() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  res = await res.json();
  displayData(res.meals, "display-data");
}
getData();

/* S T A R T      N  A V */
function isLoading() {
  $(".loading").fadeIn();
}
function closeNav() {
  let eleWidth = $("nav").innerWidth();
  $("#openning").css("left", `${eleWidth}`);
  $("nav").animate({ left: `-${eleWidth}` }, 500);
  $("#openning").animate({ left: `0` }, 500, () => {
    $("#open i").attr("class", "fa-solid fa-arrow-up-right-from-square");
  });
}

function openNav() {
  let eleWidth = $("nav").innerWidth();

  $("nav").animate({ left: `0` }, 500);
  $("#openning").animate({ left: `${eleWidth}` }, 500, () => {
    AOS.init();
    $("#open i").attr("class", "fa-solid fa-xmark");
  });
}
AOS.init();
$(document).ready(function () {
  $(".loading").fadeOut(1000, () => closeNav());
});
$(document).click((e) => {
  let eleWidth = $("nav").innerWidth();
  if (e.clientX > eleWidth) {
    closeNav();
  }
});
$("#open").click(() => {
  let eleOffset = $("#openning").offset().left;
  if (eleOffset !== 0) {
    closeNav();
  } else {
    openNav();
  }
});

/* E N D          N  A V */

function displayData(arr, id = "display-data") {
  isLoading();
  $("section").css("display", "none");
  $("#main-page").css("display", "block");
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 cursor-pointer" mealIndex="${arr[i].idMeal}" >
                        <div class="meal-card" mealIndex="${arr[i].idMeal}">
                            <figure class=" position-relative" mealIndex="${arr[i].idMeal}">
                                <img src="${arr[i].strMealThumb}"
                                    class="w-100" alt="" mealIndex="${arr[i].idMeal}">
                                <div class="img-caption bg-opacity-50 bg-white" mealIndex="${arr[i].idMeal}" onclick="getDataById(${arr[i].idMeal})">
                                    ${arr[i].strMeal}
                                </div>
                            </figure>
                        </div>
                    </div>`;
  }
  document.getElementById(id).innerHTML = cartona;
  $(document).ready(
    $(document).ready(function () {
      $(".loading").fadeOut(1000);
    })
  );
}

$("#navSearch").click(() => {
  isLoading();
  $("section").css("display", "none");
  $("#search").css("display", "block");

  $(document).ready(function () {
    $(".loading").fadeOut(1000);
  });
});
async function getDataByName(name) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  res = await res.json();
  displayDataByName(res.meals, "display-search-data");
}

$(searchName).keyup(() => {
  getDataByName(searchName.value);
});
function displayDataByName(arr, id = "display-search-data") {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 cursor-pointer"">
                  <div class="meal-card">
                    <figure class=" position-relative">
                        <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                        <div class="img-caption bg-opacity-50 bg-white" onclick="getDataById(${arr[i].idMeal})">
                          ${arr[i].strMeal}
                        </div>
                    </figure>
                  </div>
                </div>`;
  }
  document.getElementById(id).innerHTML = cartona;
  $(document).ready(function () {
    $(".loading").fadeOut(1000);
  });
}
async function getDataByLetter(name) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
  );
  res = await res.json();
  console.log(res);
  displayDataByName(res.meals, "display-search-data");
}
$("#search-by-letter").keyup(() => {
  getDataByLetter(searchLetter.value);
});

$("#nav-categories").click(() => {
  $("section").css("display", "none");
  $("#categories").css("display", "block");
  isLoading();
  listCategories();
});

async function listCategories() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php
`
  );
  res = await res.json();
  console.log(res);
  displaylistCategories(res.categories);
}
function displaylistCategories(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 cursor-pointer mb-5">
                        <div class="meal-card">
                            <figure class=" position-relative">
                                <img src="${arr[i].strCategoryThumb}"
                                    class="w-100" alt="">
                                <div class="img-caption bg-opacity-50 bg-white cursor-pointer" onclick="categoryData()" data-categ-id="${arr[i].strCategory}">
                                    ${arr[i].strCategory}
                                </div>
                            </figure>
                        </div>
                    </div>`;
  }
  document.getElementById("display-categories-data").innerHTML = cartona;
  $(document).ready(() => {
    $(".loading").fadeOut(1000);
  });
}
async function categoryData() {
  let ele = event.target.getAttribute("data-categ-id");
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ele}`
  );
  res = await res.json();
  displayData(res.meals);
}
function categoriesMoreDetailes(arr) {
  console.log(arr);
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 cursor-pointer"">
                  <div class="meal-card">
                    <figure class=" position-relative">
                        <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                        <div class="img-caption bg-opacity-50 bg-white" onclick="getDataById(${arr[i].idMeal})">
                          ${arr[i].strMeal}
                        </div>
                    </figure>
                  </div>
                </div>`;
  }
}
$("#navArea").click(() => {
  $("section").css("display", "none");
  $("#area").css("display", "block");
  isLoading();
  listArea();
});

async function listArea() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list
`
  );
  res = await res.json();
  // console.log(res);
  displaylistArea(res.meals);
}
function displaylistArea(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 cursor-pointer mb-5">
                        <div class="meal-card text-center">
                        <i class="fa-brands fa-fort-awesome fs-1 mb-2"></i>
                        <h3 onclick="getAreaDetailes()" data-area-name="${arr[i].strArea}">${arr[i].strArea}</h3>
                        </div>
                    </div>`;
  }
  document.getElementById("display-area-data").innerHTML = cartona;
  $(document).ready(() => {
    $(".loading").fadeOut(1000);
  });
}
function getAreaDetailes(e) {
  let ele = event.target.getAttribute("data-area-name");
  areaData(ele);
}
async function areaData(name) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  res = await res.json();
  displayData(res.meals);
}
$("#navIngredients").click(() => {
  $("section").css("display", "none");
  $("#ingredients").css("display", "block");
  isLoading();
  listIngredients();
});

async function listIngredients() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  res = await res.json();
  displaylistIngredients(res.meals.slice(0, 20));
}
function displaylistIngredients(arr) {
  console.log(arr);
  let cartona = ``;
  for (let i = 0; i < arr.length && i < 50; i++) {
    cartona += `<div class="col-md-3 cursor-pointer mb-5"  onclick="ingredientsDetailes()" data-ingredients="${arr[i].strIngredient}">
                        <div class="meal-card text-center" data-ingredients="${arr[i].strIngredient}">
                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h3 class="img-captio bg-opacity-50 bg-white" data-ingredients="${arr[i].strIngredient}">
                                    ${arr[i].strIngredient}
                                </h3>
                                <p class="text-secondary" data-ingredients="${arr[i].strIngredient}">${arr[i].strDescription}</p>
                        </div>
                    </div>`;
  }
  document.getElementById("display-ingredients-data").innerHTML = cartona;
  $(document).ready(() => {
    $(".loading").fadeOut(1000);
  });
}
function ingredientsDetailes() {
  let ele = event.target.getAttribute("data-ingredients");
  ingredientData(ele);
}
async function ingredientData(name) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  res = await res.json();
  displayData(res.meals);
}
$("#navContact-us").click(() => {
  isLoading();
  $("section").css("display", "none");
  $("#contact-us").css("display", "flex");
  $(document).ready(() => {
    $(".loading").fadeOut(1000);
  });
});

async function getDataById(id = "5") {
  isLoading();
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  res = await res.json();

  getMoreDetales(res.meals[0]);
}
function getMoreDetales(res) {
  isLoading();
  $("section").css("display", "none");
  $("#more-detailes").css("display", "block");
  let cartona = `<div class="col-md-4">
                        <figure>
                            <img src="${res.strMealThumb}" class="w-100" alt="">
                        </figure>
                        <h1>${res.strMeal}</h1>
                    </div>
                    <div class="col-md-8">
                        <h2>Instructions</h2>
                        <p>${res.strInstructions}</p>
                            <ul class=" list-unstyled">
                                <li><h3>Area :${res.strArea}</h3></li>
                                <li><h3>Category :${res.strCategory}</h3></li>
                                <li class="mb-3"><h3>Recipes :</h3>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient1}</span>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient2}</span>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient3}</span>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient4}</span>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient5}</span>
                                    <span class="bg-info bg-opacity-25 py-1 px-3 rounded-3">${res.strIngredient6}</span>
                                    
                                    
                                    
                                </li>
                                <li class=" mb-4"><h3>Tags :</h3>
                                    <span class="bg-danger bg-opacity-25 py-1 px-3 rounded-3">${res.strTags}</span>
                                    
                                </li>
                                <a href="${res.strSource}" target="_blank" class="btn btn-success">Source</a>
                                <a href="${res.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                            </ul>

                            <button class="btn btn-outline-success" id="back-home" onclick="getData()">BACK TO HOME</button>

                    </div>`;

  document.getElementById("meal-detailes").innerHTML = cartona;
  $(document).ready(() => {
    $(".loading").fadeOut(1000);
  });
}

function validation() {
  if (
    validateName($("#userName").val()) &&
    validateEmail($("#userEmail").val()) &&
    validatePhone($("#userPhone").val()) &&
    validateAge($("#userAge").val())
  ) {
    document.querySelector("#submit").classList.remove("disabled");
    document.querySelector("#submit").classList.add("cursor-pointer");
  } else {
    document.querySelector("#submit").classList.add("disabled");
  }
}
$("#userName").keyup(() => {
  let userReguler = validateName($("#userName").val());
  userReguler
    ? $("#userReg").css("display", "none")
    : $("#userReg").css("display", "block");
  $("#userName").val() == "" && $("#userReg").css("display", "none");
  validation();
});

function validateName(name) {
  let regex = /^[a-zA-Z\s]{4,12}$/;
  return regex.test(name) == true;
}
$("#userEmail").keyup(() => {
  let emailReguler = validateEmail($("#userEmail").val());
  emailReguler
    ? $("#emailReg").css("display", "none")
    : $("#emailReg").css("display", "block");
  $("#userEmail").val() == "" && $("#emailReg").css("display", "none");
  validation();
});
function validateEmail(email) {
  let regex = /^[a-z]{1,}@[a-z]{1,}(.com|.org)$/;
  return regex.test(email) == true;
}
$("#userPhone").keyup(() => {
  let phoneReguler = validatePhone($("#userPhone").val());
  phoneReguler
    ? $("#phoneReg").css("display", "none")
    : $("#phoneReg").css("display", "block");
  $("#userPhone").val() == "" && $("#phoneReg").css("display", "none");
  validation();
});
function validatePhone(phone) {
  let regex = /[0-9]{10}/;
  return regex.test(phone) == true;
}
$("#userAge").keyup(() => {
  let ageReguler = validateAge($("#userAge").val());
  ageReguler
    ? $("#ageReg").css("display", "none")
    : $("#ageReg").css("display", "block");
  $("#userAge").val() == "" && $("#ageReg").css("display", "none");
  validation();
});
function validateAge(age) {
  let regex = /^[1-7]?[0-9]$|80/;
  return regex.test(age) == true;
}
$("#submit").click((e) => {
  e.preventDefault();
});
