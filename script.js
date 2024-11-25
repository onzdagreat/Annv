document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const gameScreen = document.getElementById('game-screen');
  const resultScreen = document.getElementById('result-screen');
  const restartButton = document.getElementById('restart-game-button');
  const roundTitle = document.getElementById('round-title');
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options-container');
  const feedback = document.getElementById('feedback');
  const photo = document.getElementById('photo');

  // Questions and answers array
  const questions = [
    {
      question: "What's her favorite color?",
      options: ["Red", "Blue", "Green", "Yellow", "Pink"],
      answer: "Pink",
    },
    {
      question: "Where did we first meet?",
      options: ["School", "Park", "Cafe", "Library", "Beach"],
      answer: "Cafe",
    },
    {
      question: "What's our anniversary month?",
      options: ["January", "March", "June", "November", "December"],
      answer: "November",
    },
  ];

  let currentRound = 0;
  let attempts = 3;

  // Function to load the round (questions and options)
  const loadRound = () => {
    const currentQuestion = questions[currentRound];
    roundTitle.textContent = `Round ${currentRound + 1}`;
    questionElement.textContent = currentQuestion.question;
    feedback.textContent = '';
    photo.classList.add('blurred'); // Reapply the blur effect each round
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

  // Function to handle the answer from the user
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

  // Function to disable the options after game over
  const disableOptions = () => {
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => option.classList.add('disabled'));
  };

  // Function to show the result when the game is over
  const showResults = () => {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  };

  // Restart the game
  const restartGame = () => {
    currentRound = 0;
    resultScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  };

  // Automatically start the game
  welcomeScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadRound();

  restartButton.addEventListener('click', restartGame);
});
