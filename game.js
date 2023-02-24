"use strict";

window.addEventListener("load", start);

let points = 1;
let lives = 3;

function start() {
  //aktiver basis animationerne
  // document.querySelector("#sprite_container02").classList.add("updown");

  //gør sprites klikbare
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

  document
    .querySelector("#sprite_container01")
    .removeEventListener("click", enemy01Clicked);

  document.querySelector("#sprite_container01").classList.add("fade_out");

  incrementPoints();
}

function enemy02Clicked() {
  console.log("enemy02Clicked");

  // gør den ikke klikbar
  document
    .querySelector("#sprite_container02")
    .removeEventListener("click", enemy02Clicked);

  //stop animation
  document.querySelector("#sprite_container02").classList.add("paused");

  // fjern sprite
  document.querySelector("#sprite02").classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector("#sprite_container02")
    .addEventListener("animationend", enemyMoved);

  incrementPoints();
}

function enemyMoved() {
  // animation end fjernes
  document
    .querySelector("#sprite_container02")
    .removeEventListener("animationend", enemyMoved);
  // fjern fade_out
  document.querySelector("#sprite_container02").classList.remove("fade_out");
  //fjren paused
  document.querySelector("#sprite_container02").classList.remove("paused");

  // genstart animationen
  document.querySelector("#sprite_container02").classList.remove("updown");
  document.querySelector("#sprite_container02").offsetDown;
  document.querySelector("#sprite_container02").classList.add("updown");

  // elementet bliver klikbart igen...
  document
    .querySelector("#sprite_container02")
    .addEventListener("click", enemy02Clicked);
  //NB virker kun 1 gang...
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
  looseLife();
}

function looseLife() {
  if (lives > 1) {
    removeHeart();
    lives--;
  } else if (lives == 1) {
    document.querySelector("#heart_container1").classList.add("pulse");
  } else {
    gameOver();
  }
}

function removeHeart() {
  console.log(`#hp_container${lives}`);
  document.querySelector(`#hp_container${lives}`).classList.add("gone");
}

function gameOver() {
  console.log("The game is lost");
}
