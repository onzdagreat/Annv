document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const gameScreen = document.getElementById('game-screen');
  const resultScreen = document.getElementById('result-screen');
  const startButton = document.getElementById('start-game-button');
  const restartButton = document.getElementById('restart-game-button');
  const roundTitle = document.getElementById('round-title');
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options-container');
  const feedback = document.getElementById('feedback');
  const photo = document.getElementById('photo');

  const questions = [
    {
      question: "What's her favorite color?",
      options: ["Red", "Blue", "Green", "Yellow", "Pink"],
      answer: "Pink",
      photo: "photo1.jpg",
    },
    {
      question: "Where did we first meet?",
      options: ["School", "Park", "Cafe", "Library", "Beach"],
      answer: "Cafe",
      photo: "photo2.jpg",
    },
    {
      question: "What's our anniversary month?",
      options: ["January", "March", "June", "November", "December"],
      answer: "November",
      photo: "photo3.jpg",
    },
  ];

  let currentRound = 0;
  let attempts = 3;

  const startGame = () => {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadRound();
  };

  const loadRound = () => {
    const currentQuestion = questions[currentRound];
    roundTitle.textContent = `Round ${currentRound + 1}`;
    questionElement.textContent = currentQuestion.question;
    feedback.textContent = '';
    photo.src = currentQuestion.photo;
    photo.classList.add('blurred');
    optionsContainer.innerHTML = '';
    attempts = 3;

    currentQuestion.options.forEach(option => {
      const button = document.createElement('div');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => handleAnswer(option));
      optionsContainer.appendChild(button);
    });
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentRound];
    if (selectedOption === currentQuestion.answer) {
      photo.classList.remove('blurred');
      feedback.textContent = 'Correct! Moving to the next round...';
      feedback.style.color = 'green';
      setTimeout(() => {
        currentRound++;
        if (currentRound < questions.length) {
          loadRound();
        } else {
          showResults();
        }
      }, 1000);
    } else {
      attempts--;
      feedback.textContent = `Incorrect! Attempts left: ${attempts}`;
      feedback.style.color = 'red';
      if (attempts === 0) {
        feedback.textContent = 'Game Over! Restart to try again.';
        disableOptions();
      }
    }
  };

  const disableOptions = () => {
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => option.classList.add('disabled'));
  };

  const showResults = () => {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  };

  const restartGame = () => {
    currentRound = 0;
    resultScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  };

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', restartGame);
});
