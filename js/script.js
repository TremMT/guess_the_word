const guessedLetters = document.querySelector(".guessed-letters");
const gButton = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProg = document.querySelector(".word-in-progress");
const remainingSpan = document.querySelector(".remaining span")
const remaining = document.querySelector(".remaining");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
gButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = guess.value;
  console.log(inputValue);
  
});

