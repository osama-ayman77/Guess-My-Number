'use strict';

// DOM Elements
const body = document.querySelector('body');
const againBtn = document.querySelector('.again');
const number = document.querySelector('.number');
const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const message = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const resetHighscoreBtn = document.querySelector('.reset-highscore');

// Global Variables
let gemeOver = false;
let score = 20;
let highscore = 0;

// Get The Stored Highscore If There Is One
if (localStorage.getItem('highscore')) {
  highscore = Number(localStorage.getItem('highscore'));
}
highscoreElement.textContent = highscore;

/* ====== Fucntions ====== */

// Generate A Random Number Between 1 and 20
let theRandomNumber;
function generateRandomNumber() {
  let numbersArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  theRandomNumber = numbersArray[parseInt(Math.random() * 20)];
}
generateRandomNumber();

// Check If The Guessing is Right
function check() {
  resetHighscoreBtn.style.display = 'none';
  if (!gemeOver) {
    if (guessInput.value != '' && guessInput.value != 0) {
      if (guessInput.value == theRandomNumber) {
        message.textContent = '🎉 Correct Number!';
        number.textContent = theRandomNumber;
        body.style.backgroundColor = '#60b347';
        if (highscore < score) {
          highscore = score;
          highscoreElement.textContent = highscore;
          localStorage.setItem('highscore', highscore);
        }
        gemeOver = true;
      } else {
        message.textContent =
          guessInput.value > theRandomNumber ? '📈 Too high!' : '📈 Too Low!';
        score--;
        scoreElement.innerHTML = score;
      }
    } else {
      message.textContent = '❓ No Number';
    }
  }

  if (score == 0) {
    message.textContent = '💥 You lost the game!';
    body.style.backgroundColor = 'red';
    gemeOver = true;
  }
}
// Calling a chick Function When The Check Button clicked
checkBtn.addEventListener('click', check);

// Reset Fucntion
function reset() {
  resetHighscoreBtn.style.display = 'block';
  number.textContent = '?';
  guessInput.value = '';
  message.textContent = 'Start guessing...';
  score = 20;
  scoreElement.textContent = score;
  body.style.backgroundColor = '#222';
  gemeOver = false;
  generateRandomNumber();
}

// Calling a Reset Function When The Again Button clicked
againBtn.addEventListener('click', reset);

// Reset Highscore
function resetHighscore() {
  localStorage.removeItem('highscore');
  highscore = 0;
  highscoreElement.textContent = highscore;
}

// Calling a Reset Highscore Function When The Reset Highscore Button clicked
resetHighscoreBtn.addEventListener('click', resetHighscore);
