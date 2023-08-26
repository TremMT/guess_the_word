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
let word = "magnolia";
// ^ Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const guessedLetters = [];
// ^ This array will contain all the letters the player guesses.
let remainingGuesses = 8;
// ^ The value is the maximum number of guesses the player can make.Hint: The value of the remainingGuesses variable will change over time. That's why LET is used here.

const getWord = async function () {
  const wList = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const words = await wList.text();
  // ^ Since you are fetching TEXT use "await ****.text()"
  const wordArray = words.split("\n");
  // ^ To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break), so this is the delimiter you’ll use to create the array
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  // ^ To grab a random word from the file, create a variable to pull a random index from the wordArray. Hint: Use Math.floor/.random times the length of the wordArray. 
  word = wordArray[randomIndex].trim();
  // ^ Use randomIndex and .trim() to pull out a random word from the array and remove any extra whitespace around the word. Reassign the value of the existing word global variable to this new random word. Now declare the global WORD variable with LET instead of const.
  dots(word);

 // console.log(wordArray)
}

getWord();
// ^ Will call and new word

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
    updateRemainingGuesses(guess);
    showGuessedLetters();
    updateWordProgress(guessedLetters);
    // ^ Call your new shiny new function at the bottom of the else statement inside the makeGuess function and pass it guessedLetters as an argument.
    //console.log(guessedLetters);
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

const updateRemainingGuesses = function (guess) {
  const upWord = word.toUpperCase();
  if (!upWord.includes(guess)) {
    // ^ If the word DOESN'T include the guessed letter
    message.innerText = `Oof! Sorry but the word has no ${guess}.`
    remainingGuesses -= 1;
    // ^ Find out if the word contains the guess. If it doesn’t include the letter from guess, let the player know that the word doesn’t contain the letter and subtract 1 from their remainingGuesses. 
  } else {
    message.innerText = `Good job! The word has the letter ${guess}!`
  }
  // ^ In the function, grab the word and make it uppercase. Because the player’s guess is uppercase, making the word they’re guessing uppercase will compare letters with the same casing.
  if (remainingGuesses === 0) {
    message.innerHTML = `GAME OVER. The word word was <span class="highlight">${upWord}</span>.`;
  }
  else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`
    // ^  If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining.
  }
  else {
    remainingSpan.innerText = `${remainingGuesses} guesses`
    // ^ For more than one guess, update the same span element to tell them the number of guesses remaining.
  }
};

const greatSuccess = function () {
  if (word.toUpperCase() === wordInProg.innerText) {
    //Create and name a function to check if the player successfully guessed the word and won the game. Begin by verifying if their word in progress matches the word they should guess. 
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};