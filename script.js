const rounds = [
  {
    photo: "photo1.jpg",
    questions: [
      {
        question: "Where did we go on our first date?",
        options: ["Park", "Cinema", "Beach", "Restaurant"],
        answer: "Cinema"
      },
      {
        question: "What’s our favorite snack during movie nights?",
        options: ["Popcorn", "Chocolate", "Chips", "Ice cream"],
        answer: "Popcorn"
      },
      {
        question: "Which city did we visit for our first trip together?",
        options: ["Paris", "New York", "Rome", "Tokyo"],
        answer: "Rome"
      }
    ]
  },
  {
    photo: "photo2.jpg",
    questions: [
      {
        question: "What’s the name of our favorite song?",
        options: ["Shape of You", "Perfect", "Blinding Lights", "Thinking Out Loud"],
        answer: "Perfect"
      },
      {
        question: "What’s our anniversary month?",
        options: ["January", "February", "March", "April"],
        answer: "February"
      },
      {
        question: "What’s the name of our first pet?",
        options: ["Buddy", "Max", "Bella", "Lucy"],
        answer: "Buddy"
      }
    ]
  },
  {
    photo: "photo3.jpg",
    questions: [
      {
        question: "What’s our favorite vacation activity?",
        options: ["Hiking", "Swimming", "Reading", "Sunbathing"],
        answer: "Swimming"
      },
      {
        question: "What’s the name of the movie we watched on our first date?",
        options: ["Inception", "Titanic", "Avatar", "Frozen"],
        answer: "Titanic"
      },
      {
        question: "What’s the color of our first car?",
        options: ["Red", "Blue", "Black", "White"],
        answer: "Red"
      }
    ]
  }
];

let currentRound = 0;
let currentQuestion = 0;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const photoElement = document.getElementById("photo");
const congratsElement = document.getElementById("congrats");
const startButton = document.getElementById("start");

function startGame() {
  startButton.style.display = "none";
  setupRound(currentRound);
}

function setupRound(roundIndex) {
  const round = rounds[roundIndex];
  photoElement.style.backgroundImage = `url(${round.photo})`;
  currentQuestion = 0; // Reset the question for the new round
  showQuestion(round.questions[currentQuestion]);
}

function showQuestion(questionData) {
  const question = questionData;
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, question.answer);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    currentQuestion++;
    const round = rounds[currentRound];
    if (currentQuestion < round.questions.length) {
      revealPhoto();
      showQuestion(round.questions[currentQuestion]);
    } else {
      revealPhoto();
      currentRound++;
      if (currentRound < rounds.length) {
        alert("Round Complete! Get ready for the next photo.");
        setupRound(currentRound);
      } else {
        endGame();
      }
    }
  } else {
    alert("Try again!");
  }
}

function revealPhoto() {
  const blurValue = 20 - currentQuestion * 5;
  photoElement.style.filter = `blur(${Math.max(blurValue, 0)}px)`;
}

function endGame() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  congratsElement.style.display = "block";
}
