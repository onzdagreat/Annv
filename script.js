const rounds = [
  {
    photo: "photo1.jpg",
    questions: [
      {
        question: "What is my favourite colour?",
        options: ["Blue", "Red", "Green", "Black", "Yellow", "White", "Brown"],
        answer: "Blue",
        attempts: 0 // Track the number of attempts
      },
      {
        question: "What’s my favourite dish",
        options: ["Popcorn", "Chocolate", "Chapo", "Ice cream", "Kunde", "Saratt", "Kuku","Pilau"],
        answer: "Chapo",
        attempts: 0
      },
      {
        question: "Which of the following cities would I pick for our vacation",
        options: ["Eldoret", "Rome", "Tokyo", "Egypt", "Thailand", "Santorini"],
        answer: "Rome",
        attempts: 0
      },
    ],
  },
  {
    photo: "photo2.jpg",
    questions: [
      {
        question: "Which of these songs can I sing word for word",
        options: [
          "Shape of You",
          "Perfect",
          "Blinding Lights",
          "Thinking Out Loud",
          "Mapenzi",
          "Anguka Nayo"
        ],
        answer: "Mapenzi",
        attempts: 0
      },
      {
        question: "Which catchphrase or word do you say all the time",
        options: ["Aye", "Anyways", "Nyash"],
        answer: "Anyways",
        attempts: 0
      },
      {
        question: "Which of these movies would I watch on repeat?",
        options: ["Avatar", "Titanic", "The gods must be crazy", "Lucy", "Inception", "Predestination"],
        answer: "The gods must be crazy",
        attempts: 0
      },
    ],
  },
  {
    photo: "photo3.jpg",
    questions: [
      {
        question: "Which game do I always brag about winning against you?",
        options: ["Poker", "Chess", "Charades", "Monopoly", "Fifa", "Mortal Kombat", "Badminton", "Pool"],
        answer: "Poker",
        attempts: 0
      },
      {
        question: "That game you'd absolutely destroy me at?",
        options: ["Football", "Fifa", "Pool", "Jenga", "COD", "Chess"],
        answer: "Chess",
        attempts: 0
      },
      {
        question: "What would be the color of my first car?",
        options: ["Red", "Blue", "Black", "White", "Grey", "Green", "Yellow", "Brown", "Sijaamua Bado"],
        answer: "Sijaamua Bado",
        attempts: 0
      },
    ],
  },
  {
    photo: "photo4.jpg",
    questions: [
      {
        question: "Which of these TV shows would I binge-watch more than three times?",
        options: ["Friends", "Atlanta", "The Office", "Game of Thrones", "Penguins of Madagascar", "Originals"],
        answer: "The Office",
        attempts: 0
      },
      {
        question: "On our first link-up, nilikuspoil na nini..?",
        options: ["Shawarma", "Pizza", "Sweets😂", "Cake", "Managu", "Watermelon", "Kuku"],
        answer: "Sweets😂",
        attempts: 0
      },
      {
        question: "Who's your greatest crush?",
        options: ["Justin Bieber", "Me", "The Rock", "Octopizzo😂", "Me & Only Me😌", "Khaligraph"],
        answer: "Me & Only Me😌",
        attempts: 0
      },
    ],
  },
  {
    photo: "photo5.jpg",
    questions: [
      {
        question: "Which of these social media platforms am I addicted to?",
        options: ["Facebook", "Snapchat", "Twitter", "Reddit", "Instagram", "Pinterest"],
        answer: "Twitter",
        attempts: 0
      },
      {
        question: "What's my main addiction?",
        options: ["You", "You", "You", "You & Only You"],
        answer: "You & Only You",
        attempts: 0
      },
      {
        question: "Who built the pyramids in Giza, Egypt?",
        options: ["Slaves", "Jesus", "Thoth the Atlantean", "Ruto", "Aliens"],
        answer: "Thoth the Atlantean",
        attempts: 0
      },
    ],
  },
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
  currentQuestion = 0; // Reset questions for the round
  resetAttempts(); // Reset all attempts when starting a new round
  photoElement.style.backgroundImage = `url(${round.photo})`;
  photoElement.style.filter = "blur(20px)"; // Ensure photo starts fully blurred
  showQuestion(round.questions[currentQuestion]);
}

function resetAttempts() {
  // Reset attempts for all questions in the round
  rounds[currentRound].questions.forEach((question) => {
    question.attempts = 0;
  });
}

function showQuestion(questionData) {
  const question = questionData;
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, question.answer, question);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selected, correct, questionData) {
  if (selected === correct) {
    currentQuestion++;
    const round = rounds[currentRound];
    if (currentQuestion < round.questions.length) {
      revealPhoto();
      setTimeout(() => showQuestion(round.questions[currentQuestion]), 1000); // Slight delay before showing next question
    } else {
      revealPhoto();
      setTimeout(() => {
        presentDownloadOption(round.photo);
        currentRound++;
        if (currentRound < rounds.length) {
          alert("Round Complete! Get ready for the next photo.");
          setupRound(currentRound);
        } else {
          endGame();
        }
      }, 3000); // Delay before starting next round
    }
  } else {
    // Increment the number of attempts for the current question
    questionData.attempts++;
    if (questionData.attempts < 3) {
      showAlert(`Try again! Attempts left: ${3 - questionData.attempts}`);
    } else {
      showAlert("Sorry, you've reached the max attempts! Starting over.");
      // Reset the round and start from the beginning
      currentRound = 0;
      currentQuestion = 0;
      resetAttempts(); // Reset attempts for all questions
      setupRound(currentRound); // Restart the game from the first round
    }
  }
}

function showAlert(message) {
  // Create the alert box
  const alertBox = document.createElement("div");
  alertBox.className = "alert-box";
  alertBox.innerHTML = `
    <p>${message}</p>
    <button onclick="closeAlert(this)">Try Again</button>
  `;

  // Append the alert box to the body
  document.body.appendChild(alertBox);
}

// Function to close and remove the alert
function closeAlert(button) {
  const alertBox = button.parentElement;
  document.body.removeChild(alertBox);
}

function revealPhoto() {
  const blurValue = 15 - currentQuestion * 5;
  photoElement.style.filter = `blur(${Math.max(blurValue, 0)}px)`;
}

function presentDownloadOption(photoPath) {
  const downloadButton = document.createElement("a");
  downloadButton.href = photoPath;
  downloadButton.download = `RevealedPhoto_${currentRound + 1}.jpg`;
  downloadButton.textContent = "Download Revealed Photo";
  downloadButton.className = "download-button"; // Add CSS for better styling if needed
  document.body.appendChild(downloadButton);

  // Remove download button after a while to avoid clutter
  setTimeout(() => downloadButton.remove(), 10); // 1 second
}

function endGame() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  congratsElement.style.display = "block";
}
