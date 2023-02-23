"use strict";

window.addEventListener("load", start);

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
}

function enemy02Clicked() {
  console.log("enemy02Clicked");
}

function friendly01Clicked() {
  console.log("friendly01Clicked");
}

function friendly02Clicked() {
  console.log("friendly02Clicked");
}
