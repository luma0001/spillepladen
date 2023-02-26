"use strict";

// noter:
// mangler en start skærm
// mangler en vinder funktion og skærm
// manger en pæn game over med reset

window.addEventListener("load", preStart);

function preStart() {
  //søger for alt er stoppet
  stopAll();
  //gør "START SPILLET fletet synligt"
  document.querySelector("#start_screen").classList.remove("hidden");
}

let points = 8;
let lives = 3;

function start() {
  //gem alle 'overlay' skærme
  document.querySelector("#start_screen").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

  console.log("spillet er startet");
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

  // gør den ikke klikbar
  document
    .querySelector("#sprite_container01")
    .removeEventListener("click", enemy01Clicked);

  //stop animation
  document.querySelector("#sprite_container01").classList.add("paused");

  // fjern sprite
  document.querySelector("#sprite01").classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector("#sprite_container01")
    .addEventListener("animationend", enemy01Moved);

  incrementPoints();
}

function enemy01Moved() {
  // animation end fjernes
  document
    .querySelector("#sprite_container01")
    .removeEventListener("animationend", enemy01Moved);
  // fjern fade_out
  document.querySelector("#sprite01").classList.remove("fade_out");
  //fjren paused
  document.querySelector("#sprite_container01").classList.remove("paused");

  // genstart animationen
  document.querySelector("#sprite_container01").classList.remove("right_left");
  document.querySelector("#sprite_container01").offsetDown;
  document.querySelector("#sprite_container01").classList.add("right_left");

  // elementet bliver klikbart igen...
  document
    .querySelector("#sprite_container01")
    .addEventListener("click", enemy01Clicked);
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
    .addEventListener("animationend", enemy02Moved);

  incrementPoints();
}

// Der mangler en form for reseet/respawn så den ikke afspiller hvor den stoppede...

function enemy02Moved() {
  // animation end fjernes
  document
    .querySelector("#sprite_container02")
    .removeEventListener("animationend", enemy02Moved);
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

function enemy03Clicked() {
  console.log("enemy03Clicked");

  // gør den ikke klikbar
  document
    .querySelector("#sprite_container05")
    .removeEventListener("click", enemy03Clicked);

  //stop animation
  document.querySelector("#sprite_container05").classList.add("paused");

  // fjern sprite
  document.querySelector("#sprite05").classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector("#sprite_container05")
    .addEventListener("animationend", enemy03Moved);

  incrementPoints();
}

function enemy03Moved() {
  console.log("enemy03 moved");
  // animation end fjernes
  document
    .querySelector("#sprite_container05")
    .removeEventListener("animationend", enemy03Moved);
  // fjern fade_out
  document.querySelector("#sprite05").classList.remove("fade_out");
  //fjren paused
  document.querySelector("#sprite_container05").classList.remove("paused");

  // genstart animationen
  document.querySelector("#sprite_container05").classList.remove("updown");
  document.querySelector("#sprite_container05").offsetDown;
  document.querySelector("#sprite_container05").classList.add("updown");

  // elementet bliver klikbart igen...
  document
    .querySelector("#sprite_container05")
    .addEventListener("click", enemy03Clicked);
}

//Få et point
function incrementPoints() {
  points++;
  displayPoints();
}

// opdater det nye point
function displayPoints() {
  console.log("you've won");
  if (points > 10) {
    victory();
  } else {
    document.querySelector("#points").textContent = points;
  }
}

function friendly01Clicked() {
  console.log("friendly01Clicked");

  // gør den ikke klikbar
  document
    .querySelector("#sprite_container03")
    .removeEventListener("click", friendly01Clicked);

  //stop animation
  document.querySelector("#sprite_container03").classList.add("paused");

  // fjern sprite
  document.querySelector("#sprite03").classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector("#sprite_container03")
    .addEventListener("animationend", friendly01Moved);

  looseLife();
}

function friendly01Moved() {
  console.log("friendly01Moved");
  // animation end fjernes
  document
    .querySelector("#sprite_container03")
    .removeEventListener("animationend", friendly01Moved);
  // fjern fade_out
  document.querySelector("#sprite03").classList.remove("fade_out");
  //fjren paused
  document.querySelector("#sprite_container03").classList.remove("paused");

  // genstart animationen
  document.querySelector("#sprite_container03").classList.remove("left_right");
  document.querySelector("#sprite_container03").offsetDown;
  document.querySelector("#sprite_container03").classList.add("left_right");

  // elementet bliver klikbart igen...
  document
    .querySelector("#sprite_container03")
    .addEventListener("click", friendly01Clicked);
}

function friendly02Clicked() {
  console.log("friendly02Clicked");

  // gør den ikke klikbar
  document
    .querySelector("#sprite_container04")
    .removeEventListener("click", friendly02Clicked);

  //stop animation
  document.querySelector("#sprite_container04").classList.add("paused");

  // fjern sprite
  document.querySelector("#sprite04").classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector("#sprite_container04")
    .addEventListener("animationend", friendly02Moved);

  looseLife();
}

function friendly02Moved() {
  // animation end fjernes
  document
    .querySelector("#sprite_container04")
    .removeEventListener("animationend", friendly02Moved);
  // fjern fade_out
  document.querySelector("#sprite04").classList.remove("fade_out");
  //fjren paused
  document.querySelector("#sprite_container04").classList.remove("paused");

  // genstart animationen
  document.querySelector("#sprite_container04").classList.remove("wickerman");
  document.querySelector("#sprite_container04").offsetDown;
  document.querySelector("#sprite_container04").classList.add("wickerman");

  // elementet bliver klikbart igen...
  document
    .querySelector("#sprite_container04")
    .addEventListener("click", friendly02Clicked);
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
-function victory() {
  console.log("level complete");
  //BLIVER ALDRIG AKTIVERET - HVORFOR?!
  document.querySelector("#level_complete").classList.remove("hidden");
  stopAll();
};

function gameOver() {
  console.log("The game is lost");
  document.querySelector("#game_over").classList.remove("hidden");
  stopAll();
}

function stopAll() {
  console.log("stopAll");

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
}
