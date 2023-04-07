let timer = document.getElementsByClassName("timer")[0];
let quizContainer = document.getElementById("container");
let nextButton = document.getElementById("next-button");
let numOfQuestions = document.getElementsByClassName("number-of-questions")[0];
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;
//For brands
let logos = [
  "McDonalds",
  "Apple",
  "Louis Vuitton",
  "Nike",
  "Audi",
  "Microsoft",
  "Amazon",
  "Facebook",
  "Coca Cola",
  "Samsung",
  "Walt Disney Pictures",
  "Toyota",
  "AT&T",
  "Verizon",
  "Intel",
  "Cisco",
  "Mercedes Benz",
  "BMW",
  "Marlboro",
  "Budweiser",
  "Mastercard",
  "American Express",
  "Walmart",
  "Whole Foods Market",
];

// For logos
let imageArray = [
  "./assets/images/Amazon.png",
  "./assets/images/Apple.png",
  "./assets/images/American Express.png",
  "./assets/images/AT&T.png",
  "./assets/images/Audi.png",
  "./assets/images/BMW.png",
  "./assets/images/Budweiser.png",
  "./assets/images/Cisco.png",
  "./assets/images/Coca Cola.png",
  "./assets/images/Facebook.png",
  "./assets/images/Intel.png",
  "./assets/images/Louis Vuitton.png",
  "./assets/images/Marlboro.png",
  "./assets/images/Mastercard.png",
  "./assets/images/McDonalds.png",
  "./assets/images/Mercedes Benz.png",
  "./assets/images/Microsoft.png",
  "./assets/images/Nike.png",
  "./assets/images/Samsung.png",
  "./assets/images/Toyota.png",
  "./assets/images/Verizon.png",
  "./assets/images/Walmart.png",
  "./assets/images/Walt Disney Pictures.png",
  "./assets/images/Whole Foods Market.png",
]


// //Questions and Options Array
let quizArray = [];

const generateRandomValue = (array) =>
 array[Math.floor(Math.random() * array.length)];

//Generate Logos
const logoGenerator = () => {
  newLogo = "";
  for (let i = 0; i < 1; i++) {
    newLogo += generateRandomValue(logos);
  }
  return newLogo;
};

//Create Options
const populateOptions = (imageArray) => {
  let expectedLength = 4;
  while (imageArray.length < expectedLength) {
    let logo = logoGenerator();
    if (!imageArray.includes(logo)) {
      imageArray.push(logo);
    }
  }
  return imageArray;
};

//Create quiz Object
const populateQuiz = () => {
  for (let i = 0; i < 5; i++) {
    let currentLogo = logoGenerator();
    let allLogos = [];
    allLogos.push(currentLogo);
    allLogos = populateOptions(allLogos);
    let logoImages = allLogos.map(logo => {
      return {imgFile: imageArray.find(str => str.includes(logo)), logo}
    })
    quizArray.push({
      id: i,
      correct: currentLogo,
      options: logoImages,
    });
  }
};
//Next button
nextButton.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCOunt
    questionCount += 1;
    //If last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");

      //User score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      numOfQuestions.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";

      //display quiz
      quizDisplay(questionCount);
      //count=11(so it start with 10)
      count = 10;
      //clearInterval for next question
      clearInterval(countdown);
      //display timer
      timerDisplay();
    }
    nextButton.classList.add("hide");
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    timer.innerHTML = `<span>Time Left: </span> ${count}s`;
    count--;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display Quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);

  //Generate quiz
  for (let i of quizArray) {
    //Randomly sort options
    i.options.sort(() => Math.random() - 0.5);

    //Quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    //Question number
    numOfQuestions.innerHTML = 1 + " of " + quizArray.length + " Question";

    //question
    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<div class="question-color">${i.correct}</div>`;
    div.appendChild(questionDiv);
    console.log(i);
    div.innerHTML += `<div class="button-container">`
    for(let option of i.options) {
      if(option.imgFile) {
        div.innerHTML += `<button class="option-div" onclick="checker(this)" style= "background-image: url(${option.imgFile})"></button>`
      } else {
        console.log(`Missing logo for - ${option.logo}!`)
      }
    }
    div.innerHTML += `</div>`
    //Options
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.getAttribute("data-option");
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll("i.option-div");
  //If users clicked answer === correct
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (
        element.getAttribute("data-option") == quizArray[questionCount].correct
      ) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
  nextButton.classList.remove("hide");
}

function initial() {
  nextButton.classList.add("hide");
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  clearInterval(countdown);
  count = 10;
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
  displayNext(); //remove after testing2
}

//Restart game
restart.addEventListener("click", () => {
  quizArray = [];
  populateQuiz();
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//When user clicks on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  quizArray = [];
  populateQuiz();
  initial();
});
