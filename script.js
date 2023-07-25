"use strict";

const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(300, 1200);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function wack(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;

  // Add a class to indicate a successful hit
  this.classList.add("hit");

  // Remove the hit class after a short delay to revert the animation
  setTimeout(() => {
    this.classList.remove("hit");
  }, 300); // Adjust the delay (in milliseconds) for the animation duration
}

function showGameOverOverlay() {
  const finalScoreElement = document.querySelector(".finalScore");
  finalScoreElement.textContent = score;
  const overlay = document.getElementById("gameOverOverlay");
  overlay.style.display = "flex";
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    showGameOverOverlay(); // Call this function to show the Game Over overlay
  }, 10000);
}

moles.forEach((mole) => mole.addEventListener("click", wack));
