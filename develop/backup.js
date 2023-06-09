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
let instructions = document.getElementById("instructions");
let scoreCount = 0;
let questionCount = 0;
let count = 10;
let countdown;

let logos = [
  "McDonalds",
  "Apple",
  "LouisVuitton",
  "Nike",
  "Audi",
  "Microsoft",
  "Amazon",
  "Facebook",
  "Samsung",
  "WaltDisneyPictures",
  "Toyota",
  "AT&T",
  "Verizon",
  "Intel",
  "Cisco",
  "MercedesBenz",
  "BMW",
  "Mastercard",
  "WholeFoodsMarket",
  "Tesla",
  "Starbucks",
  "ups",
  "BankofAmerica",
  "Accenture",
  "Citi",
  "Instagram",
  "Lowes",
  "Chase",
  "Netflix",
  "Target",
  "Ford",
  "Shell",
  "oogl",
  "ChatGPT",
  "KFC",
  "Chick-fil-A",
  "Chanel",
  "Rolex",
  "Kelloggs",
  "Uniqlo",
  "Nissan",
  "Lexus",
  "Corona",
  "Chevrolet",
  "Porsche",
  "H&M",
  "Fox",
  "hp",
  "HSBC",
  "Hermes",
];

// For logos
let imageArray = [
  "./assets/images/Amazon.png",
  "./assets/images/Apple.png",
  "./assets/images/AT&T.png",
  "./assets/images/Audi.png",
  "./assets/images/BMW.png",
  "./assets/images/Cisco.png",
  "./assets/images/Facebook.png",
  "./assets/images/Intel.png",
  "./assets/images/LouisVuitton.png",
  "./assets/images/Mastercard.png",
  "./assets/images/McDonalds.png",
  "./assets/images/MercedesBenz.png",
  "./assets/images/Microsoft.png",
  "./assets/images/Nike.png",
  "./assets/images/Samsung.png",
  "./assets/images/Toyota.png",
  "./assets/images/Verizon.png",
  "./assets/images/Walmart.png",
  "./assets/images/WaltDisneyPictures.png",
  "./assets/images/WholeFoodsMarket.png",
  "./assets/images/Tesla.png",
  "./assets/images/Starbucks.png",
  "./assets/images/ups.png",
  "./assets/images/BankofAmerica.png",
  "./assets/images/Accenture.png",
  "./assets/images/Citi.png",
  "./assets/images/Instagram.png",
  "./assets/images/Lowes.png",
  "./assets/images/Chase.png",
  "./assets/images/Netflix.png",
  "./assets/images/Target.png",
  "./assets/images/Ford.png",
  "./assets/images/Shell.png",
  "./assets/images/oogl.png",
  "./assets/images/ChatGPT.png",
  "./assets/images/KFC.png",
  "./assets/images/Chick-fil-A.png",
  "./assets/images/Chanel.png",
  "./assets/images/Rolex.png",
  "./assets/images/Kelloggs.png",
  "./assets/images/Uniqlo.png",
  "./assets/images/Nissan.png",
  "./assets/images/Lexus.png",
  "./assets/images/Corona.png",
  "./assets/images/Chevrolet.png",
  "./assets/images/Porsche.png",
  "./assets/images/H&M.png",
  "./assets/images/Fox.png",
  "./assets/images/hp.png",
  "./assets/images/HSBC.png",
  "./assets/images/Hermes.png",
];

console.log("initialScore", scoreCount);

// Instructions & Logo
instructions.innerHTML = "Guess the logo without seeing it in full";
let oogl = document.getElementById("oogl");
oogl.innerHTML =
  "<img src='https://i.imgur.com/acUmQXm.png' width='200px' height='200px'>";
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
    let logoImages = allLogos.map((logo) => {
      return { imgFile: imageArray.find((str) => str.includes(logo)), logo };
    });
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
      console.log("finalScore", scoreCount);
    } else {
      //display questionCount
      numOfQuestions.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      console.log("updatedScore", scoreCount);
      //display quiz
      quizDisplay(questionCount);
      count = 5;
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
    questionDiv.innerHTML = `<div class="question-logo">${i.correct}</div>`;
    div.appendChild(questionDiv);
    console.log("i", i);
    div.innerHTML += `<div class="button-container">`;
    for (let option of i.options) {
      if (option.imgFile) {
        div.innerHTML += `<button class="option-div" onclick="checker(this)" data-option="${option.logo}" style= "background-image: url(${option.imgFile})"></button>`;
      } else {
        console.log(`Missing logo for - ${option.logo}!`);
      }
    }
    div.innerHTML += `</div>`;
    //Options
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.getAttribute("data-option");
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll("button.option-div");
  console.log(quizArray[questionCount].correct);
  console.log("User Solution", userSolution);
  //If users clicked answer === correct
  if (userSolution === quizArray[questionCount].correct) {
    // userOption.classList.add("correct");
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
  count = 5;
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
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
