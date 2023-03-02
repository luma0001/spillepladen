"use strict";

window.addEventListener("load", preStart);

// få styr på UIgriddet
// få styr på respawn
// få overlay skærmene til at se pæne ud
// elementer der stadig kører efter slut"
// problemer med random positions automatisk... grundet ting

let points;
let lives;
let sprite;
let spriteClicked;

function preStart() {
  //søger for alt er stoppet
  stopAll();
  //gør "START SPILLET fletet synligt"
  document.querySelector("#start_screen").classList.remove("hidden");
}

function start() {
  //genstart liv mm.
  points = 0;
  lives = 3;

  // document.querySelector("#medieval_music").play();
  // document.querySelector("#medieval_music").loop()= true;

  console.log("Start");

  // //genaktiver alle hjertene
  showHP();

  //gem alle 'overlay' skærme
  hideOverlayScreens();

  //aktiver basis animationerne
  activateAnimations();

  //gør sprites klikbare
  clickableSprites();

  //aktiver tiden
  beginTimer();
}

function showHP() {
  console.log("showHP");
  document.querySelector("#hp_container1").classList.remove("hidden");
  document.querySelector("#hp_container2").classList.remove("hidden");
  document.querySelector("#hp_container3").classList.remove("hidden");
}

function hideOverlayScreens() {
  console.log("hideOverlay");
  document.querySelector("#start_screen").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
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

  // Aktivere en ny random animation når den sidste er slut

  // document
  //   .querySelector("#sprite_container01")
  //   .addEventListener("animationiteration", restartAnimation);
  // document
  //   .querySelector("#sprite_container02")
  //   .addEventListener("animationiteration", restartAnimation);
  // document
  //   .querySelector("#sprite_container03")
  //   .addEventListener("animationiteration", restartAnimation);
  // document
  //   .querySelector("#sprite_container04")
  //   .addEventListener("animationiteration", restartAnimation);
  // document
  //   .querySelector("#sprite_container05")
  //   .addEventListener("animationiteration", restartAnimation);
}

function clickableSprites() {
  console.log("clickable sprites");
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
  let container = document.querySelector(`#sprite_container${sprite}`);
  console.log(container);

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
  console.log(container);

  // animation end fjernes
  container.removeEventListener("animationend", spriteMoved);
  // fjern fade_out på sprite
  document.querySelector(`#sprite${sprite}`).classList.remove("fade_out");
  //fjren paused
  container.classList.remove("paused");

  // kalder
  restartAnimation.call(this);

  // elementet bliver klikbart igen...
  container.addEventListener("click", spriteClicked);
}

function restartAnimation() {
  // genstart animationen (SPECIFIKKE ANIMATIONER)
  let container = this;
  console.log(this);

  if (sprite == "01") {
    container.classList.remove(
      "knightWall01",
      "knightWall02",
      "knightWall03",
      "knightWall04"
    );
    let itt = Math.floor(Math.random() * 3) + 1;
    container.classList.add(`knightWall0${itt}`);
    console.log(itt);

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
    console.log(num);

    console.log("animataion Wall n");
  } else if (sprite == "04") {
    container.classList.remove("wickerman01", "wickerman02", "wickerman03");
    container.offsetLeft;
    let n = Math.floor(Math.random() * 2) + 1;
    container.classList.add(`wickerman0${n}`);
    console.log(n);

    console.log("wickerman");
    // tårnridderne - sptire 02 og 05
  } else {
    container.classList.remove("updown01", "updown02", "updown03");
    container.offsetLeft;

    // POSITION 3 FÅS IKKE...
    let an = Math.floor(Math.random() * 2) + 1;
    container.classList.add(`updown0${an}`);
    console.log(an);
  }
}

function incrementPoints() {
  points++;
  displayPoints();
}

// opdater det nye point
function displayPoints() {
  // if (points > 10) {
  //   victory();
  // } else {
  //   document.querySelector("#points").textContent = points;
  // }
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

function beginTimer() {
  document.querySelector("#time_container").classList.add("timerOn");
  document
    .querySelector("#time_container")
    .addEventListener("animationend", timesUp);
}

function timesUp() {
  console.log("times up");
  if (points > 10) {
    victory();
  } else {
    gameOver;
  }
}

function victory() {
  console.log("level complete");
  //BLIVER ALDRIG AKTIVERET - HVORFOR?!
  document.querySelector("#level_complete").classList.remove("hidden");
  stopAll();
}

//viser game over skærmen
function gameOver() {
  console.log("The game is lost");
  document.querySelector("#game_over").classList.remove("hidden");
  stopAll();
}

// stopper alle aniamtioner.
function stopAll() {
  console.log("stopAll");

  // document.querySelector("#medieval_music").pause();

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
    .classList.remove("updown01,updown02,updown03");
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
}
