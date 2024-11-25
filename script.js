const questions = [
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
  ];
  
  let currentQuestion = 0;
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const photoElement = document.getElementById("photo");
  const congratsElement = document.getElementById("congrats");
  const startButton = document.getElementById("start");
  
  function startGame() {
    startButton.style.display = "none";
    showQuestion(currentQuestion);
  }
  
  function showQuestion(index) {
    const question = questions[index];
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
      if (currentQuestion < questions.length) {
        revealPhoto();
        showQuestion(currentQuestion);
      } else {
        revealPhoto();
        endGame();
      }
    } else {
      alert("Try again!");
    }
  }
  
  function revealPhoto() {
    const blurValue = 15 - currentQuestion * 5;
    photoElement.style.filter = `blur(${Math.max(blurValue, 0)}px)`;
  }
  
  function endGame() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    congratsElement.style.display = "block";
  }
  