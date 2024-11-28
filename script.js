const rounds = [
  {
    photo: "photo1.jpg",
    questions: [
      {
        question: "Where did we go on our first date?",
        options: ["Park", "Cinema", "Beach", "Restaurant"],
        answer: "Cinema",
      },
      {
        question: "What’s our favorite snack during movie nights?",
        options: ["Popcorn", "Chocolate", "Chips", "Ice cream"],
        answer: "Popcorn",
      },
      {
        question: "Which city did we visit for our first trip together?",
        options: ["Paris", "New York", "Rome", "Tokyo"],
        answer: "Rome",
      },
    ],
  },
  {
    photo: "photo2.jpg",
    questions: [
      {
        question: "What’s the name of our favorite song?",
        options: [
          "Shape of You",
          "Perfect",
          "Blinding Lights",
          "Thinking Out Loud",
        ],
        answer: "Perfect",
      },
      {
        question: "What’s our anniversary month?",
        options: ["January", "February", "March", "April"],
        answer: "February",
      },
      {
        question: "What’s the name of our first pet?",
        options: ["Buddy", "Max", "Bella", "Lucy"],
        answer: "Buddy",
      },
    ],
  },
  {
    photo: "photo3.jpg",
    questions: [
      {
        question: "What’s our favorite vacation activity?",
        options: ["Hiking", "Swimming", "Reading", "Sunbathing"],
        answer: "Swimming",
      },
      {
        question: "What’s the name of the movie we watched on our first date?",
        options: ["Inception", "Titanic", "Avatar", "Frozen"],
        answer: "Titanic",
      },
      {
        question: "What’s the color of our first car?",
        options: ["Red", "Blue", "Black", "White"],
        answer: "Red",
      },

    ],
  },
  {
    photo: "photo4.jpg",
    questions: [
      {
        question: "Where did we celebrate our first anniversary?",
        options: ["Restaurant", "Park", "Beach", "Home"],
        answer: "Restaurant"
      },
      {
        question: "What’s the name of our favorite book?",
        options: ["Book A", "Book B", "Book C", "Book D"],
        answer: "Book A"
      },
      {
        question: "What’s our favorite dessert?",
        options: ["Cake", "Ice Cream", "Pudding", "Brownie"],
        answer: "Cake"
      }
    ]
  },
  {
    photo: "photo5.jpg",
    questions: [
      {
        question: "What’s the name of our favorite TV show?",
        options: ["Show A", "Show B", "Show C", "Show D"],
        answer: "Show A"
      },
      {
        question: "What’s the name of our first vacation spot?",
        options: ["City A", "City B", "City C", "City D"],
        answer: "City A"
      },
      {
        question: "What’s our favorite drink?",
        options: ["Coffee", "Tea", "Juice", "Soda"],
        answer: "Coffee"
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
  currentQuestion = 0; // Reset questions for the round
  photoElement.style.backgroundImage = `url(${round.photo})`;
  photoElement.style.filter = "blur(20px)"; // Ensure photo starts fully blurred
  showQuestion(round.questions[currentQuestion]);
}

function showQuestion(questionData) {
  const question = questionData;
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
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
      setTimeout(
        () => showQuestion(round.questions[currentQuestion]),
        1000
      ); // Slight delay before showing next question
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
    showAlert("Try again!");
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
  setTimeout(() => downloadButton.remove(), 10); // 1 seconds
}

function endGame() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  congratsElement.style.display = "block";
}
