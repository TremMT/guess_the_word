const guessedLettersList = document.querySelector(".guessed-letters");
// ^ Unordered list where the player’s guessed letters will appear.
const button = document.querySelector(".guess");
// ^ Button with the text “Guess!” in it.
const letterG = document.querySelector(".letter");
// ^ Text input where the player will guess a letter.
const wordInProg = document.querySelector(".word-in-progress");
// ^ Empty paragraph where the word in progress will appear.
const remainingSpan = document.querySelector(".remaining span")
// ^ Span inside the paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// ^ Paragraph where the remaining guesses will display.
const message = document.querySelector(".message");
// ^ Empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again");
// ^ Hidden button that will appear prompting the player to play again.
const word = "magnolia";
// ^ Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const guessedLetters = [];
// ^ This array will contain all the letters the player guesses.


// v The code for the dots/ dot placeholders
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


// v Button click event listener
button.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const inputValue = letterG.value;
  const goodGuess = playerInput(inputValue);
  // ^ Function that checks the input, and passes it the input value as an argument

  if (goodGuess) {
    makeGuess(inputValue);
  }
  letterG.value = "";
  //REMINDER - To clear the letters from the input field set the value of the input field to an empty string. 

});


const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // ^ The regular expression to ensure the player inputs a letter.
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
  // ^ REMINDER - ! is the Logical NOT operator!! - !=== "not/ !(false)" in this case !playerInput does NOT match acceptedLetter.
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
    showGuessedLetters();
    updateWordProgress(guessedLetters);
    // ^ Call your new shiny new function at the bottom of the else statement inside the makeGuess function and pass it guessedLetters as an argument.
    console.log(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // a function to update the page with the letters the player guesses
  guessedLettersList.innerHTML = "";
  for (const letterG of guessedLetters) {
    //console.log(guess);
    const li = document.createElement("li");
    li.innerText = letterG;
    //Call the function inside the else statement of the makeGuess function so the letter displays when it hasn’t been guessed before.
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
  // ^ Check if the wordArray contains any letters from the guessedLetters array. If it does contain any of the letters, update the circle symbol with the correct letter. Hint: You’ll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.

  greatSuccess();
  //At the bottom of the function that updates the word in progress, call this function to check if the player has won.
};


const greatSuccess = function () {
  if (word.toUpperCase() === wordInProg.innerText) {
    //Create and name a function to check if the player successfully guessed the word and won the game. Begin by verifying if their word in progress matches the word they should guess. 
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};