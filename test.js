"use strict";

window.addEventListener("load", start);

let points = 1;
let lives = 3;

function start() {
  //aktiver basis animationerne
  document.querySelector("#sprite_container01").classList.add("right_left");
  document.querySelector("#sprite_container02").classList.add("updown");
  document.querySelector("#sprite_container03").classList.add("left_right");
  document.querySelector("#sprite_container04").classList.add("wickerman");
  document.querySelector("#sprite_container05").classList.add("updown");

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
  document
    .querySelector("#sprite_container05")
    .addEventListener("click", enemy03Clicked);
}

function enemy01Clicked() {
  console.log("enemy01Clicked");

  // document
  //   .querySelector("#sprite_container01")
  //   .removeEventListener("click", enemy01Clicked);

  // document.querySelector("#sprite_container01").classList.add("fade_out");

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

function enemy03Clicked() {
  incrementPoints();
}

// Der mangler en form for reseet/respawn så den ikke afspiller hvor den stoppede...

function enemyMoved() {
  // animation end fjernes
  document
    .querySelector("#sprite_container02")
    .removeEventListener("animationend", enemyMoved);
  // fjern fade_out
  document.querySelector("#sprite02").classList.remove("fade_out");
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
  if (lives > 0) {
    removeHeart();
  }
}

//if (lives == 1) add pulse.
//then remove pulse and add the gone function. HOW?!

function removeHeart() {
  console.log(`#hp_container${lives}`);
  document.querySelector(`#hp_container${lives}`).classList.add("gone");
  document
    .querySelector(`#hp_container${lives}`)
    .addEventListener("animationend", hideHeart);
}

function hideHeart() {
  console.log(`#hp_container${lives}`);
  //stop animation end event
  document
    .querySelector(`#hp_container${lives}`)
    .removeEventListener("animationend", hideHeart);
  //fjern container animationen(nødvendigt?)
  document.querySelector(`#hp_container${lives}`).classList.remove("gone");
  //få spriten til at forsvinde...
  document.querySelector(`#hp_container${lives}`).classList.add("hidden");

  lives--;
  if (lives == 0) {
    gameOver();
  }
}

function gameOver() {
  console.log("The game is lost");

  //deaktiver basis animationerne
  document.querySelector("#sprite_container01").classList.remove("right_left");
  document.querySelector("#sprite_container02").classList.remove("updown");
  document.querySelector("#sprite_container03").classList.remove("left_right");
  document.querySelector("#sprite_container04").classList.remove("wickerman");
  document.querySelector("#sprite_container05").classList.remove("updown");

  //gør sprites u-klikbare
  document
    .querySelector("#sprite_container01")
    .removeEventListener("click", enemy01Clicked);
  document
    .querySelector("#sprite_container02")
    .removeEventListener("click", enemy02Clicked);
  document
    .querySelector("#sprite_container03")
    .removeEventListener("click", friendly01Clicked);
  document
    .querySelector("#sprite_container04")
    .removeEventListener("click", friendly02Clicked);

  document.querySelector("#game_over").classList.remove("hidden");
}
