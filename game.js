"use strict";

window.addEventListener("load", start);

let points = 1;
let lives = 3;

function start() {
  document
    .querySelector("#sprite_container01")
    .addEventListener("click", enemy01Clicked);
  document
    .querySelector("#sprite_container02")
    .addEventListener("click", enemy02Clicked);
  document
    .querySelector("#sprite_container03")
    .addEventListener("click", friendly01Clicked);
  document
    .querySelector("#sprite_container04")
    .addEventListener("click", friendly02Clicked);
}

function enemy01Clicked() {
  console.log("enemy01Clicked");
  incrementPoints();
}

function enemy02Clicked() {
  console.log("enemy02Clicked");
  incrementPoints();
}

function incrementPoints() {
  displayPoints();
  points++;
}

function displayPoints() {
  document.querySelector("#points").textContent = points;
}

function friendly01Clicked() {
  console.log("friendly01Clicked");
  looseLife();
}

function friendly02Clicked() {
  console.log("friendly02Clicked");
}

function looseLife() {
  if (lives > 0) {
    removeHeart();
    lives--;
  } else {
    gameOver();
  }
}

function removeHeart() {
  console.log("HP: " + lives);
  // document.querySelector("hp_container" + lives).classList.add("...");
}

function gameOver() {
  console.log("The game is lost");
}
