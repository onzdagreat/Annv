// Welcome and navigation between screens
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-game-button');

// Game elements
const photo = document.getElementById('photo');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const roundTitle = document.getElementById('round-title');

// End screen elements
const downloadAllButton = document.getElementById('download-all-button');

// Game data
const rounds = [
  {
    photo: 'images/photo1.jpg',
    question: 'Where did we first meet?',
    options: ['Park', 'Cafe', 'Library', 'Mall', 'Beach'],
    answer: 'Cafe'
  },
  {
    photo: 'images/photo2.jpg',
    question: 'Our favorite movie together?',
    options: ['Titanic', 'Inception', 'The Notebook', 'Avatar', 'Joker'],
    answer: 'The Notebook'
  },
  {
    photo: 'images/photo3.jpg',
    question: 'What’s my nickname for you?',
    options: ['Babe', 'Honey', 'Love', 'Sweetheart', 'Darling'],
    answer: 'Honey'
  }
];

let currentRound = 0;
let triesLeft = 3;

// Start the game
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-game-button');
  startButton.addEventListener('click', () => {
    console.log('Start Button Clicked');
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadRound();
  });
});


// Load the current round
function loadRound() {
  const round = rounds[currentRound];
  roundTitle.textContent = `Question ${currentRound + 1}`;
  photo.src = round.photo;
  photo.style.filter = 'blur(20px)';
  questionElement.textContent = round.question;

  // Clear previous answers
  answersElement.innerHTML = '';
  round.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    answersElement.appendChild(button);
  });
}

// Check the user's answer
function checkAnswer(selected) {
  const round = rounds[currentRound];
  if (selected === round.answer) {
    // Correct answer
    photo.style.filter = 'blur(0px)';
    feedbackElement.classList.add('hidden');
    setTimeout(() => {
      currentRound++;
      if (currentRound < rounds.length) {
        loadRound();
      } else {
        endGame();
      }
    }, 2000);
  } else {
    // Wrong answer
    triesLeft--;
    feedbackElement.textContent = `Wrong answer! Tries left: ${triesLeft}`;
    feedbackElement.classList.remove('hidden');
    if (triesLeft === 0) {
      feedbackElement.textContent = 'Out of tries! Moving to the next question.';
      setTimeout(() => {
        currentRound++;
        if (currentRound < rounds.length) {
          loadRound();
        } else {
          endGame();
        }
      }, 2000);
    }
  }
}

// End the game
function endGame() {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
}

// Download all photos
downloadAllButton.addEventListener('click', () => {
  rounds.forEach((round, index) => {
    const a = document.createElement('a');
    a.href = round.photo;
    a.download = `Memory-${index + 1}.jpg`;
    a.click();
  });
});
