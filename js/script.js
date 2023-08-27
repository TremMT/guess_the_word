const guessedLettersList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterG = document.querySelector(".letter");
const wordInProg = document.querySelector(".word-in-progress");
const remainingSpan = document.querySelector(".remaining span")
const remaining = document.querySelector(".remaining");
const message = document.querySelector(".message");

const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function () {
  const wList = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const words = await wList.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
 
  dots(word);
  // console.log(wordArray)
}

getWord();
// ^ Will call and new word

const dots = function (word) {
  const placeholders = [];
  for (const letter of word) {
    //console.log(letter);
    placeholders.push("●");
  }
  wordInProg.innerText = placeholders.join("");
};
dots(word);
// ^ The code for the dots/ dot placeholders

button.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const inputValue = letterG.value;
  const goodGuess = playerInput(inputValue);

  if (goodGuess) {
    makeGuess(inputValue);
  }
  letterG.value = "";

});


const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = `Please enter a letter`;
  }
  // ^ If NOTHING was entered
  else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  }
  // ^ If more than one letter was entered
  else if (!input.match(acceptedLetter)) {
    message.innerText = "Please only enter a letter that is A to Z.";
  }
  // ^ If the input DOESN'T match the any of the allowed letters
  else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = `Whoops, you've already tried that letter! Please try again.`
  }
  else {
    guessedLetters.push(guess);
    updateRemainingGuesses(guess);
    showGuessedLetters();
    updateWordProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  guessedLettersList.innerHTML = "";
  for (const letterG of guessedLetters) {
    //console.log(guess);
    const li = document.createElement("li");
    li.innerText = letterG;
    guessedLettersList.append(li);
  }
};

const updateWordProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("●");
    }
  }
  // console.log(showWord);
  wordInProg.innerText = showWord.join("");

  greatSuccess();

};

const updateRemainingGuesses = function (guess) {
  const upWord = word.toUpperCase();
  if (!upWord.includes(guess)) {
    // ^ If the word DOESN'T include the guessed letter
    message.innerText = `Oof! Sorry but the word has no ${guess}.`
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good job! The word has the letter ${guess}!`
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `GAME OVER. The word word was <span class="highlight">${upWord}</span>.`;
    startOver();
  }
  else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`
  }
  else {
    remainingSpan.innerText = `${remainingGuesses} guesses`
  }
};

const greatSuccess = function () {
  if (word.toUpperCase() === wordInProg.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  button.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersList.classList.add("hide");
  playAgainButton.classList.remove("hide");

  //console.log(startOver);
};


playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  message.innerText = "";
  guessedLettersList.innerHTML = "";
  remainingSpan.innerHTML = `${remainingGuesses} guesses`;
  letterG.innerText = "";

  button.classList.remove("hide");
  remaining.classList.remove("hide");
  guessedLettersList.classList.remove("hide");
  playAgainButton.classList.add("hide");

  getWord();

});
