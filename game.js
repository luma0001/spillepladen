"use strict";

window.addEventListener("load", preStart);

let points;
let lives;
let sprite;
let spriteClicked;
let gameRunning = false;

function preStart() {
  //søger for alt er stoppet
  stopAll();
  //gør "START SPILLET fletet synligt"

  //Reset overlay screens...
  resetOverlay();

  // document.querySelector("#start_game").addEventListener("onclick", transition);

  //gør start-spil knappen aktiv
  document
    .querySelector("#startButton")
    .addEventListener("click", transition01);
}

function resetOverlay() {
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#level_complete").classList.remove("fade_in");
  document.querySelector("#start_screen").classList.remove("hidden");
  // document.querySelector("#start_screen").classList.add("fade_in");
}

//Spiller en fade animation før spillet starter
function transition01() {
  document.querySelector("#start_screen").classList.add("slow_fade");
  document
    .querySelector("#start_screen")
    .addEventListener("animationend", start);
}

function start() {
  //genstart liv mm.
  points = 0;
  lives = 3;

  gameRunning = true;

  document.querySelector("#start_screen").classList.remove("slow_fade");
  document
    .querySelector("#start_screen")
    .removeEventListener("animationend", start);

  document.querySelector("#medieval_music").play();

  //Reset overlay screens...
  resetOverlay2();

  //makes all hidden sprites vissible
  showSprites();

  // //genaktiver alle hjertene
  showHP();

  //gem alle 'overlay' skærme
  // hideOverlayScreens();

  //aktiver basis animationerne
  activateAnimations();

  //gør sprites klikbare
  clickableSprites();

  //aktiver tiden
  beginTimer();

  //Forhindre kliks
  stopAllButtons();
}

function resetOverlay2() {
  document.querySelector("#game_over").classList.remove("fade_in");
  document.querySelector("#start_screen").classList.remove("fade_in");
  document.querySelector("#start_screen").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
}

function showSprites() {
  document.querySelector("#game_ui").classList.remove("hidden");
  document.querySelector("#game_elements").classList.remove("hidden");
}

function showHP() {
  console.log("showHP");
  document.querySelector("#hp_container1").classList.remove("hidden");
  document.querySelector("#hp_container2").classList.remove("hidden");
  document.querySelector("#hp_container3").classList.remove("hidden");
}

function stopAllButtons() {
  document
    .querySelector("#startButton")
    .removeEventListener("click", transition01);
  document.querySelector("#lostButton").removeEventListener("click", start);
  document.querySelector("#winButton").removeEventListener("click", preStart);
}

function activateAnimations() {
  console.log("activate animations");
  // Aktivere start animationerne
  document.querySelector("#sprite_container01").classList.add("knightWall01");
  document.querySelector("#sprite_container02").classList.add("updown01");
  document
    .querySelector("#sprite_container03")
    .classList.add("animationWall04");
  document.querySelector("#sprite_container04").classList.add("wickerman01");
  document.querySelector("#sprite_container05").classList.add("updown02");
}

function clickableSprites() {
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
  sprite = "01";
  spriteClicked = sprite01Clicked;

  spriteHit();
  incrementPoints();
}

//enemy02
function sprite02Clicked() {
  sprite = "02";
  spriteClicked = sprite03Clicked;

  spriteHit();
  incrementPoints();
}

//enemy03
function sprite05Clicked() {
  sprite = "05";
  spriteClicked = sprite05Clicked;

  spriteHit();
  incrementPoints();
}

//kvinden
function sprite03Clicked() {
  sprite = "03";
  spriteClicked = sprite04Clicked;

  document.querySelector("#woman_scream").play();
  spriteHit();
  looseLife();
}
// præsten
function sprite04Clicked() {
  sprite = "04";
  spriteClicked = sprite04Clicked;

  document.querySelector("#man_scream").play();
  spriteHit();
  looseLife();
}

function spriteHit() {
  // gør den ikke klikbar
  let container = document.querySelector(`#sprite_container${sprite}`);

  // ...enemy${sprtie}Clicked
  container.removeEventListener("click", spriteClicked);

  //stop animation
  container.classList.add("paused");

  // fjern sprite
  document.querySelector(`#sprite${sprite}`).classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  container.addEventListener("animationend", spriteMoved);
}

// Der mangler en form for reseet/respawn så den ikke afspiller hvor den stoppede...

function spriteMoved() {
  let container = document.querySelector(`#sprite_container${sprite}`);

  // animation end fjernes
  container.removeEventListener("animationend", spriteMoved);
  // fjern fade_out på sprite
  document.querySelector(`#sprite${sprite}`).classList.remove("fade_out");
  //fjren paused
  container.classList.remove("paused");

  if (gameRunning == true) {
    // kalder
    restartAnimation.call(this);
  }

  // elementet bliver klikbart igen...
  container.addEventListener("click", spriteClicked);
}

function restartAnimation() {
  // genstart animationen (SPECIFIKKE ANIMATIONER)
  let container = this;

  if (sprite == "01") {
    container.classList.remove(
      "knightWall01",
      "knightWall02",
      "knightWall03",
      "knightWall04"
    );
    let itt = Math.floor(Math.random() * 3) + 1;
    container.classList.add(`knightWall0${itt}`);

    // kvinden
  } else if (sprite == "03") {
    container.classList.remove(
      "animationWall01",
      "animationWall02",
      "animationWall03",
      "animationWall04"
    );
    container.offsetLeft;

    let num = Math.floor(Math.random() * 3) + 1;
    container.classList.add(`animationWall0${num}`);

    console.log("animataion Wall n");
  } else if (sprite == "04") {
    container.classList.remove("wickerman01", "wickerman02", "wickerman03");
    container.offsetLeft;
    let n = Math.floor(Math.random() * 2) + 1;
    container.classList.add(`wickerman0${n}`);

    console.log("wickerman");
    // tårnridderne - sptire 02 og 05
  } else {
    container.classList.remove("updown01", "updown02", "updown03");
    container.offsetLeft;

    // POSITION 3 FÅS IKKE...
    let an = Math.floor(Math.random() * 2) + 1;
    container.classList.add(`updown0${an}`);
  }
}

function incrementPoints() {
  document.querySelector("#bell").currentTime = 0;
  document.querySelector("#bell").play();
  points++;
  displayPoints();
}

// opdater det nye point
function displayPoints() {
  document.querySelector("#points").textContent = points;
}

function looseLife() {
  if (lives > 0) {
    removeHeart();
  }
}

//if (lives == 1) add pulse.
//then remove pulse and add the gone function. HOW?!

function removeHeart() {
  document.querySelector(`#hp_container${lives}`).classList.add("gone");
  document
    .querySelector(`#hp_container${lives}`)
    .addEventListener("animationend", hideHeart);
}

function hideHeart() {
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

function beginTimer() {
  document.querySelector("#time_container").classList.add("timerOn");
  document
    .querySelector("#time_container")
    .addEventListener("animationend", timesUp);
}

function timesUp() {
  document.querySelector("#time_container").classList.remove("timerOn");

  if (points > 9) {
    victory();
  } else {
    gameOver();
  }
}

function victory() {
  //BLIVER ALDRIG AKTIVERET - HVORFOR?!
  document.querySelector(
    "#win"
  ).textContent = `Congratulations you got: ${points} points`;
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#level_complete").classList.add("fade_in");

  document.querySelector("#winButton").addEventListener("click", preStart);

  document.querySelector("#yay").play();

  stopAll();
}

//viser game over skærmen

function gameOver() {
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("fade_in");

  document.querySelector("#lostButton").addEventListener("click", start);

  document.querySelector("#arrow").play();

  stopAll();
}

// stopper alle aniamtioner.
function stopAll() {
  gameRunning = false;

  document.querySelector("#medieval_music").pause();

  //deaktiver basis animationerne
  stopAnimations();

  //gør sprites u-klikbare
  preventClicks();
}

function preventClicks() {
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

function stopAnimations() {
  //hvis timeren ikke er slukket.
  document.querySelector("#time_container").classList.remove("timerOn");

  document
    .querySelector("#sprite_container01")
    .classList.remove(
      "knightWall01",
      "knightWall02",
      "knightWall03",
      "knightWall04"
    );
  document
    .querySelector("#sprite_container02")
    .classList.remove("updown01", "updown02", "updown03");
  // How do I know what animation I am removing...? remove all of them?
  document
    .querySelector("#sprite_container03")
    .classList.remove(
      "animationWall01",
      "animationWall02",
      "animationWall03",
      "animationWall04"
    );
  document
    .querySelector("#sprite_container04")
    .classList.remove("wickerman01", "wickerman02", "wickerman03");
  document
    .querySelector("#sprite_container05")
    .classList.remove("updown01", "updown02", "updown03");

  hideSprites();
}

//Gemmer alle sprites og UI så kun baggrund og slot kan ses.
function hideSprites() {
  document.querySelector("#game_elements").classList.add("hidden");
  document.querySelector("#game_ui").classList.add("hidden");
}
