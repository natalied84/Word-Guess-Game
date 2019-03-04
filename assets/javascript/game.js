// I thought about doing the hard mode but I decided not to because I had to work this weekend. :(

var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var wins = 0;
var losses = 0;
var guesses = 10;
var wrongGuesses = [];
var correctLetters = ""
var wordList = ["banana", "crumble", "buffet", "zonked", "imperfect", "dependent", "insurance", "acoustics", "resolution", "cinema", "negligence", "projection", "contact", "empire", "magnitude", "ensure", "supplementary", "lounge", "ordinary", "retiree", "relate"]

var winsText = document.getElementById("games-won");
var lossesText = document.getElementById("games-lost");
var guessesLeft = document.getElementById("guesses-left");
var givenWord = document.getElementById("given-word");
var incorrectLetters = document.getElementById("incorrect-letters");
var directions = document.getElementById("game-directions");

var randomWord = wordList[Math.floor(Math.random() * wordList.length)];

// This is the function to replace the underscores with correct letters, it's very very strongly inspired by a google search
function replaceAt(string, index, replace) {
    return string.substring(0, (index * 2) + 1) + replace + string.substring((index * 2) + 2);
}

guessesLeft.textContent = "Guesses left: " + guesses;
incorrectLetters.textContent = "Letters guessed: " + wrongGuesses;
winsText.textContent = "Games won: " + wins;
lossesText.textContent = "Games lost: " + losses;

for (var i = 0; i < randomWord.length; i++) {

        correctLetters = correctLetters + " _"
        givenWord.textContent = "Word:" + correctLetters;

}

// this is tp make the reset button work the way I wanted it to
function reset() {

    if (correctLetters.indexOf("_") > -1) {

        losses++;
        lossesText.textContent = "Games lost: " + losses;

    }

    guessesLeft.textContent = "Guesses left: " + guesses;
    incorrectLetters.textContent = "Letters guessed: " + wrongGuesses;
    winsText.textContent = "Games won: " + wins;
    lossesText.textContent = "Games lost: " + losses;
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    guesses = 10;
    wrongGuesses = [];
    correctLetters = "";
    givenWord.textContent = "Word:";  
    console.log(randomWord);
    console.log(wrongGuesses);

    for (var i = 0; i < randomWord.length; i++) {

        correctLetters = correctLetters + " _";
        givenWord.textContent = "Word:" + correctLetters;

    }
}

// console.log to cheat, lol
console.log(randomWord);

document.onkeyup = function (event) {

    var userGuess = event.key;

    if (computerChoices.includes(userGuess)) {

        if (guesses === 0 || correctLetters.indexOf("_") === -1) {

            directions.textContent = "Seriously, press Play Again!.";
    
        } else if (wrongGuesses.includes(userGuess) || correctLetters.includes(userGuess)) {
            directions.textContent = "You guessed that letter already, guess again.";

        } else if (guesses === 0) {

            guessesLeft.textContent = "Guesses left: 0";
            guesses = 10;
            guessed = [];
            losses++;
            correctLetters.textContent = "Letters guessed: " + guessed;
            directions.textContent = "You lose! To play a new game press Play Again!";
            lossesText.textContent = "Games lost: " + losses;

        } else if (randomWord.indexOf(userGuess) >= 0) {

            for (var i = 0; i < randomWord.length; i++) {

                if (randomWord.charAt(i) === userGuess) {

                    correctLetters = replaceAt(correctLetters, i, userGuess) + " "
                    givenWord.textContent = "Word:" + correctLetters;

                }
            }

            if (correctLetters.indexOf("_") === -1) {

                directions.textContent = "You won!  To play a new game press Play Again!";
                guessesLeft.textContent = "Guesses left: " + (guesses + 1);
                guesses = 10;
                wins++;
                winsText.textContent = "Games won: " + wins;

            }

        } else {

            directions.textContent = "Guess again";
            guesses--;
            wrongGuesses.push(userGuess);
            guessesLeft.textContent = "Guesses left: " + guesses;
            incorrectLetters.textContent = "Letters guessed: " + wrongGuesses;
            directions.textContent = "Wrong letter, keep guessing!";

        }

    } else {
        directions.textContent = "Make sure you only press letters!";
    }

}