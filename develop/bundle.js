<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Logo Guessing Game</title>
<!-- Google Fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
  rel="stylesheet"
/>
// <!-- Stylesheet -->
<style>
* {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    color: #19084e;
  }
  body {
    margin: 0;
    background-color: #48C3F5;
  }
  button {
    border: none;
    outline: none;
    cursor: pointer;
  }
  .start-screen,
  .score-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #48C3F5;
    gap: 1em;
  }
  #start-button,
  #restart {
    position: absolute;
    margin-top: 355px;
    font-size: 1.2em;
    padding: 1em 3em;
    border-radius: 2em;
    box-shadow: 0 1em 3em rgba(37, 22, 80, 0.3);
  }
  .flex-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex {
    display: flex;
  }
  #display-container {
    background-color: #ffffff;
    position: absolute;
    width: 50vw; /* vw stands for viewport width, this will be 50% of the viewport's width */
    max-height: 100vh; /* vh stands for viewport height, this will be 100% of the viewport's height */
    overflow-y: auto; /* if the content is too tall, it will scroll */
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    padding: 1em 2em; /* reduce padding on smaller screens */
    border-radius: 0.8em;
    box-shadow: 0 1em 3em rgba(37, 22, 80, 0.3);
  }
  .header {
    padding: 0.1em;
    border-bottom: 1px solid #c8c5d1;
  }
  .header .title,
  .timer span {
    font-weight: 600;
  }
  h3 {
    font-size: 1.2em;
    text-align: center;
  }
  #container {
    /* display: grid;
    grid-template-columns: 4fr 4fr; */
    gap: 0.8em;
    place-items: center;
    margin-bottom: 1em;
  }
  .logo-container {
    width: 100%;
    height: 10em;
    padding: 1em;
    margin: 0.3em 0;
    border-radius: 0.5em;
    border: 3px solid black;
    background-size: 130%;
  }
  .option-div:disabled {
    cursor: not-allowed;
  }
  .correct {
    background: url("https://icons.veryicon.com/png/o/miscellaneous/linear-icon-2-1/correct-28.png");
  }
  .incorrect {
    background: url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Fwrong-icon%2F&psig=AOvVaw0mQLFQZP7Z9k0OD4fiW2gV&ust=1681066742220000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCn-uH7mv4CFQAAAAAdAAAAABAE");
  }
  .correct,
  .incorrect {
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center;
  }
  #next-button {
    font-size: 1.1em;
    background-color: #FCEF27;
    color: black;
    padding: 0.4em 2em;
    border-radius: 0.3em;
  }
  .hide {
    display: none;
  }
  #restart {
    margin-top: 6em;
  }
</style>

<div id="display-container">
  <div class="header flex-space">
    <div class="title">
      <p>Guess the logo</p>
    </div>
    <div class="timer"></div>
  </div>

  <div id="container">
    <!-- Questions and options are displayed here-->
  </div>

  <div class="flex-space">
    <div class="number-of-count">
      <span class="number-of-questions"></span>
    </div>
    <div id="next-button">Next</div>
  </div>
</div>

<div class="start-screen">
  <div id="oogl"></div>
    <div id="instructions"></div>
  <button id="start-button">Start</button>
</div>


<div class="score-container hide">
  <div id="user-score"></div>
  <button id="restart">Restart</button>
</div>
<!-- Script -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
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
let count = 5;
let countdown;
//For brands
let logos = [
  {
    name: "Accenture",
    path: "https://oogl.s3.amazonaws.com/images/Accenture.png",
  },
  { name: "Amazon", path: "https://oogl.s3.amazonaws.com/images/Amazon.png" },
  { name: "Apple", path: "https://oogl.s3.amazonaws.com/images/Apple.png" },
  { name: "AT&T", path: "https://oogl.s3.amazonaws.com/images/AT&T.png" },
  { name: "Audi", path: "https://oogl.s3.amazonaws.com/images/Audi.png" },
  {
    name: "Bank of America",
    path: "https://oogl.s3.amazonaws.com/images/BankofAmerica.png",
  },
  { name: "BMW", path: "https://oogl.s3.amazonaws.com/images/BMW.png" },
  { name: "Chanel", path: "https://oogl.s3.amazonaws.com/images/Chanel.png" },
  {
    name: "ChatGPT",
    path: "https://oogl.s3.amazonaws.com/images/ChatGPT.png",
  },
  { name: "Chase", path: "https://oogl.s3.amazonaws.com/images/Chase.png" },
  {
    name: "Chick-fil-A",
    path: "https://oogl.s3.amazonaws.com/images/Chick-fil-A.png",
  },
  {
    name: "Chevrolet",
    path: "https://oogl.s3.amazonaws.com/images/Chevrolet.png",
  },
  { name: "Cisco", path: "https://oogl.s3.amazonaws.com/images/Cisco.png" },
  { name: "Citi", path: "https://oogl.s3.amazonaws.com/images/Citi.png" },
  { name: "Corona", path: "https://oogl.s3.amazonaws.com/images/Corona.png" },
  {
    name: "Facebook",
    path: "https://oogl.s3.amazonaws.com/images/Facebook.png",
  },
  { name: "Ford", path: "https://oogl.s3.amazonaws.com/images/Ford.png" },
  { name: "Fox", path: "https://oogl.s3.amazonaws.com/images/Fox.png" },
  { name: "H&M", path: "https://oogl.s3.amazonaws.com/images/H&M.png" },
  { name: "Hermes", path: "https://oogl.s3.amazonaws.com/images/Hermes.png" },
  { name: "HSBC", path: "https://oogl.s3.amazonaws.com/images/HSBC.png" },
  { name: "HSBC", path: "https://oogl.s3.amazonaws.com/images/HSBC.png" },
  { name: "Intel", path: "https://oogl.s3.amazonaws.com/images/Intel.png" },
  {
    name: "Instagram",
    path: "https://oogl.s3.amazonaws.com/images/Instagram.png",
  },
  {
    name: "Kelloggs",
    path: "https://oogl.s3.amazonaws.com/images/Kelloggs.png",
  },
  { name: "KFC", path: "https://oogl.s3.amazonaws.com/images/KFC.png" },
  { name: "Lexus", path: "https://oogl.s3.amazonaws.com/images/Lexus.png" },
  {
    name: "Louis Vuitton",
    path: "https://oogl.s3.amazonaws.com/images/LouisVuitton.png",
  },
  { name: "Lowes", path: "https://oogl.s3.amazonaws.com/images/Lowes.png" },
  {
    name: "Mastercard",
    path: "https://oogl.s3.amazonaws.com/images/Mastercard.png",
  },
  {
    name: "McDonalds",
    path: "https://oogl.s3.amazonaws.com/images/McDonalds.png",
  },
  {
    name: "Mercedes Benz",
    path: "https://oogl.s3.amazonaws.com/images/MercedesBenz.png",
  },
  {
    name: "Microsoft",
    path: "https://oogl.s3.amazonaws.com/images/Microsoft.png",
  },
  {
    name: "Netflix",
    path: "https://oogl.s3.amazonaws.com/images/Netflix.png",
  },
  { name: "Nike", path: "https://oogl.s3.amazonaws.com/images/Nike.png" },
  { name: "Nissan", path: "https://oogl.s3.amazonaws.com/images/Nissan.png" },
  { name: "oogl", path: "https://oogl.s3.amazonaws.com/images/oogl.png" },
  {
    name: "Porsche",
    path: "https://oogl.s3.amazonaws.com/images/Porsche.png",
  },
  { name: "Rolex", path: "https://oogl.s3.amazonaws.com/images/Rolex.png" },
  {
    name: "Samsung",
    path: "https://oogl.s3.amazonaws.com/images/Samsung.png",
  },
  { name: "Shell", path: "https://oogl.s3.amazonaws.com/images/Shell.png" },
  {
    name: "Starbucks",
    path: "https://oogl.s3.amazonaws.com/images/Starbucks.png",
  },
  { name: "Target", path: "https://oogl.s3.amazonaws.com/images/Target.png" },
  { name: "Tesla", path: "https://oogl.s3.amazonaws.com/images/Tesla.png" },
  { name: "Toyota", path: "https://oogl.s3.amazonaws.com/images/Toyota.png" },
  { name: "Uniqlo", path: "https://oogl.s3.amazonaws.com/images/Uniqlo.png" },
  { name: "ups", path: "https://oogl.s3.amazonaws.com/images/ups.png" },
  {
    name: "Verizon",
    path: "https://oogl.s3.amazonaws.com/images/Verizon.png",
  },
  {
    name: "Walt Disney Pictures",
    path: "https://oogl.s3.amazonaws.com/images/WaltDisneyPictures.png",
  },
  {
    name: "Whole Foods Market",
    path: "https://oogl.s3.amazonaws.com/images/WholeFoodsMarket.png",
  },
];

console.log("initialScore", scoreCount);

// Instructions & Logo
instructions.innerHTML = "Guess the logo without seeing it in full";
let oogl = document.getElementById("oogl");
oogl.innerHTML =
  "<img src='https://i.imgur.com/acUmQXm.png' width='200px' height='200px'>";

// Start Button
startButton.addEventListener("click", () => {
  populateQuiz();
  quizDisplay(questionCount);
  startScreen.style.display = "none";
  displayContainer.style.display = "block";
  numOfQuestions.innerHTML = `${questionCount + 1} of ${
    quizArray.length
  } Question`;
  timerDisplay();
});

// Questions and Options Array
let quizArray = [];

const generateRandomValue = (array) => {
  if (array.length === 0) {
    console.error("Empty array provided to generateRandomValue");
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomValue = array[randomIndex];
  console.log("Generated Random Value:", randomValue);
  return randomValue;
};

// Generate Logos
const logoGenerator = () => {
  let randomLogo = generateRandomValue(logos);
  let newLogo = randomLogo.name;
  console.log("Generated Logo:", newLogo);
  return newLogo;
};

// Create Options
const populateOptions = (imageArray) => {
  if (imageArray.length === 0) {
    console.error("Empty array provided to populateOptions");
    return imageArray;
  }
  let expectedLength = 4;
  while (imageArray.length < expectedLength) {
    let logo = logoGenerator();
    if (!imageArray.includes(logo)) {
      imageArray.push(logo);
    }
  }
  return imageArray;
};

// Create quiz Object
const populateQuiz = () => {
  for (let i = 0; i < 5; i++) {
    let currentLogo = logoGenerator();
    if (!currentLogo) {
      console.error("Failed to generate a logo for quiz");
      continue;
    }
    let allLogos = [];
    allLogos.push(currentLogo);
    allLogos = populateOptions(allLogos);
    let logoImages = allLogos.map((logo) => {
      return { imgFile: logos.find((obj) => obj.name === logo), logo };
    });
    quizArray.push({
      id: i,
      correct: currentLogo,
      options: shuffleArray(logoImages),
    });
  }
  console.log("Populated Quiz Array:", quizArray);
};

//Next button
nextButton.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCOunt
    questionCount += 1;
    console.log("Question Count:", questionCount);
    //If last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");

      //User score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
      console.log("Final score:", scoreCount);
    } else {
      //display questionCount
      numOfQuestions.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      console.log("Updated score:", scoreCount);
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
    console.log("Count:", count);
    if (count == 0) {
      clearInterval(countdown);
      console.log("Timer Expired!");
      displayNext();
    }
  }, 1000);
};

// Quiz Display
const quizDisplay = (questionIndex) => {
  quizContainer.innerHTML = "";
  let quizData = quizArray[questionIndex];
  let questionTitle = document.createElement("h3");
  questionTitle.innerText = quizData.correct;
  quizContainer.appendChild(questionTitle);

  quizData.options.forEach((option) => {
    let imgContainer = document.createElement("div");
    imgContainer.classList.add('logo-container');  // Add a class for CSS styling
    imgContainer.style.backgroundImage = `url(${option.imgFile.path})`;
    imgContainer.addEventListener("click", () => {
      if (option.logo === quizData.correct) scoreCount++;
      displayNext();
    });
    quizContainer.appendChild(imgContainer);
  });
};


// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Generate quiz
function quizCreator() {
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
        div.innerHTML += `<button class="option-div" onclick="checker(this)" data-option="${option.logo}" style= "background-image: url(${option.imgFile.path})"></button>`;
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
  let quizCards = document.querySelectorAll(".container-mid");
  if (quizCards.length > 0) {
    questionCount = 0;
    scoreCount = 0;
    clearInterval(countdown);
    count = 5;
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
  } else {
    console.error("No quiz cards found.");
  }
}

//Restart game
restart.addEventListener("click", () => {
  quizArray = [];
  populateQuiz();
  quizCreator();
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
</script>
