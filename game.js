"use strict";

window.addEventListener("load", preStart);

// fix den level complete skærm
// // reset points og liv + hp sprites når du genstarter
// få styr på UIgriddet
// få styr på respawn
// få overlay skærmene til at se pæne ud

let points = 1;
let lives = 3;
let sprite;
let spriteClicked;

function preStart() {
  //søger for alt er stoppet
  stopAll();
  //gør "START SPILLET fletet synligt"
  document.querySelector("#start_screen").classList.remove("hidden");
}

function start() {
  //gem alle 'overlay' skærme
  document.querySelector("#start_screen").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

  //aktiver basis animationerne
  document.querySelector("#sprite_container01").classList.add("right_left");
  document.querySelector("#sprite_container02").classList.add("updown");
  document.querySelector("#sprite_container03").classList.add("left_right");
  document.querySelector("#sprite_container04").classList.add("wickerman");
  document.querySelector("#sprite_container05").classList.add("updown");

  //gør sprites klikbare
  document
    .querySelector("#sprite_container01")
    .addEventListener("click", sprite01Clicked);
  document
    .querySelector("#sprite_container02")
    .addEventListener("click", sprite02Clicked);
  document
    .querySelector("#sprite_container03")
    .addEventListener("click", sprite03Clicked);
  document
    .querySelector("#sprite_container04")
    .addEventListener("click", sprite04Clicked);
  document
    .querySelector("#sprite_container05")
    .addEventListener("click", sprite05Clicked);
}

//enemy01
function sprite01Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "01";
  spriteClicked = sprite01Clicked;

  spriteHit();
  incrementPoints();
}

//enemy02
function sprite02Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "02";
  spriteClicked = sprite03Clicked;

  spriteHit();
  incrementPoints();
}

//enemy03
function sprite05Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "05";
  spriteClicked = sprite05Clicked;

  spriteHit();
  incrementPoints();
}

//kvinden
function sprite03Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "03";
  spriteClicked = sprite04Clicked;
  spriteHit();
  looseLife();
}
// præsten
function sprite04Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "04";
  spriteClicked = sprite04Clicked;
  spriteHit();
  looseLife();
}

function spriteHit() {
  // gør den ikke klikbar

  // ...enemy${sprtie}Clicked
  document
    .querySelector(`#sprite_container${sprite}`)
    .removeEventListener("click", spriteClicked);

  //stop animation
  document.querySelector(`#sprite_container${sprite}`).classList.add("paused");

  // fjern sprite
  document.querySelector(`#sprite${sprite}`).classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector(`#sprite_container${sprite}`)
    .addEventListener("animationend", spriteMoved);
}

// Der mangler en form for reseet/respawn så den ikke afspiller hvor den stoppede...

function spriteMoved() {
  // animation end fjernes
  document
    .querySelector(`#sprite_container${sprite}`)
    .removeEventListener("animationend", spriteMoved);
  // fjern fade_out
  document.querySelector(`#sprite${sprite}`).classList.remove("fade_out");
  //fjren paused
  document
    .querySelector(`#sprite_container${sprite}`)
    .classList.remove("paused");

  // genstart animationen (SPECIFIKKE ANIMATIONER)
  if (sprite == "01") {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("right_left");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("right_left");
  } else if (sprite == "03") {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("left_right");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("left_right");

    console.log("left_right");
  } else if (sprite == "04") {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("wickerman");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("wickerman");

    console.log("wickerman");
  } else {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("updown");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("updown");
  }

  // elementet bliver klikbart igen...
  document
    .querySelector(`#sprite_container${sprite}`)
    .addEventListener("click", spriteClicked);
}

function incrementPoints() {
  points++;
  displayPoints();
}

// opdater det nye point
function displayPoints() {
  if (points > 10) {
    victory();
  } else {
    document.querySelector("#points").textContent = points;
  }
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

//viser game over skærmen
function gameOver() {
  console.log("The game is lost");
  document.querySelector("#game_over").classList.remove("hidden");
  stopAll();
}

// stopper alle aniamtioner.
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
    .removeEventListener("click", sprite01Clicked);
  document
    .querySelector("#sprite_container02")
    .removeEventListener("click", sprite02Clicked);
  document
    .querySelector("#sprite_container03")
    .removeEventListener("click", sprite03Clicked);
  document
    .querySelector("#sprite_container04")
    .removeEventListener("click", sprite04Clicked);
  document
    .querySelector("#sprite_container05")
    .removeEventListener("click", sprite05Clicked);
}
