
<template>
    <div>
        <div class="playArea" v-show="showGame">
            <h3 class="guessesRemaining">Guesses Remaining: {{newGameProp.gameGuessesRemaining}}</h3>
            <button id="viewHistoryButton" class="btn btn-secondary" v-on:click="this.viewHistory">View History</button>
            <h3 id="timer">00:00:00</h3>
            <section class="guessInput">
                <form name="guessForm" id="guessForm" @submit.prevent>
                            <div id=section1>
                                    <label for="guess">Enter your guess ({{this.newGameProp.getGameDifficultyLevel()}} numbers between 0-7): </label>
                                    <!-- type=number ensures that the user input will only be numerical -->
                                    <input id="guess" type="number" name="guess" required>
                            </div> 
                            <br><span id="guessLengthError"></span>
                            <span id="guessNumberError"></span><br>
                            <button id="guessSubmit" class="btn btn-primary" v-on:click="this.guessSubmit">Guess</button>
                </form>
            </section>
            <section id="viewFeedback" v-show="showFeedback">
                <h3>Feedback</h3>
                <!-- how to show the current guess feedback? -->
                <p>{{this.currentFeedback}}</p>
            </section>
            <section id="viewHistory" v-show="showHistory">
                <h2>Game History</h2>
                <div class="allHistory"></div>
            </section>
        </div>
        <div class="gameEnd" v-show="showEndGame">
            <h2>{{this.gameOverBanner}}</h2>
            <h4>{{this.timeOfGame}}</h4>
            <p>{{this.triesToWin}}</p>
            <button type="button" class="btn btn-outline-primary" id="playAgainButton"><router-link to="/">Play Again</router-link></button>
        </div>
    </div>
</template>

<script>
import Guess from "/classes/guessClass.js";

export default {
    props: ['newGameProp', 'timerProp'],
    created() {
        // this.newGameProp.newGameCombination();
    },

    mounted() {
        let timer = this.timerProp;

        timer.addEventListener('secondsUpdated', function () {
            let timeDisplay = document.getElementById("timer");
            timeDisplay.innerHTML= timer.getTimeValues().toString();
        });
    },

  name: 'gamePlay',
  data() {
    return {
        guessNumber: 1,
        allGameGuesses: [],
        showHistory: false,
        showFeedback: false,
        currentFeedback: "",
        showGame: true,
        showEndGame: false,
        gameOverBanner: "",
        isGuessLengthError: false,
        isGuessNumberError: false,
        timeOfGame: "",
        triesToWin: 0
    };
  },
  methods: {
    guessSubmit: function() {
        console.log(this.timerProp.getTimeValues().toString());
        const guessLengthError = document.getElementById("guessLengthError")
        const guessNumberError = document.getElementById("guessNumberError")

        let guessString = document.getElementById("guess").value;

        // checking if the guess input value is the correct length based on difficulty level.
        //  If it is not, an error message will be shown
        let correctLength = this.newGameProp.getGameDifficultyLevel();
        if (guessString.length != correctLength) {
            guessLengthError.textContent = `Guess must be ${correctLength} numbers`;
            this.isGuessLengthError = true;
        } else {
            guessLengthError.textContent = "";
            this.isGuessLengthError = false;
        }

        // regex to check that the numbers inputted are between 0-7
        const numberRegex = /[0-7]/;
        if(numberRegex.test(guessString) != true) {
            guessNumberError.textContent = "Guess must use numbers between 0-7";
            this.isGuessNumberError = true;
        } else {
            guessNumberError.textContent = "";
            this.isGuessNumberError = false;
        }

        // once there are no errors in the input, the guess can be compared to the number combination
        if(!this.isGuessLengthError && !this.isGuessNumberError) {

            let guessCombination = guessString.split("");
            let numberCombination = this.newGameProp.getGameCombination();

            console.log('number combo');
            console.log(numberCombination);
            let guess = new Guess(this.guessNumber, guessCombination, "", "test");
            let correctNumLocations = 0;
            let correctNumbers = 0;

            let length = this.newGameProp.getGameDifficultyLevel();

            // checking guess against the number combination and deciding feedback
            for (var i = 0; i <= (length - 1); i++) {
                // checking  if number and location is correct
                // If so, the value of correctNumLocations goes up by 1 for every correct number in the correct location/index
                if (numberCombination[i] == guessCombination[i]) {
                    correctNumLocations += 1;
                }
            }
            

            // When using a nested forEach loop to check if any of the number combination numbers
            // were in the guess numbers, it resulted in feedback saying the player has guessed multiple 
            // correct numbers when only guessing one correct number.
            // For example, if the correct combination is 3456, and the user guesses 3321, the feedback will say 2 correct numbers 
            // rather than 1 due to the user guessing two 3s.
            // To fix this, every unique number in the correct combination is a key in the numOfNumbers object and 
            // the quantity of that number is the value
            // When looping through the guess combination, if a correct number appears, the quantity of that number must be higher than 0,
            // signaling that the user has not guessed it's occurance more times that it actually occurs. 
            // For each occurance, the quantity is lowered by 1
            if(correctNumLocations == 0) {
                let numOfNumbers = {};
                numberCombination.forEach(cNum => {
                    if(numOfNumbers[cNum]) {
                        numOfNumbers[cNum] +=1;
                    } else {
                        numOfNumbers[cNum] = 1;
                    }
                });
                
                guessCombination.forEach(gNum => {
                    if(numOfNumbers[gNum] > 0) {
                        correctNumbers += 1;
                        numOfNumbers[gNum] -=1;
                    }
                })
            }

            // even if multiple feedback types are applicable to a users guess only one of the three feedback should be given, 
            // so only one feedback type is added to the Guess
            if (correctNumLocations > 0 && correctNumLocations < length ) {
                guess.guessFeedback = `The player has guessed ${correctNumLocations} correct numbers and its correct location`;
            } else if (correctNumbers > 0 ){
                guess.guessFeedback = `The player has guessed ${correctNumbers} correct numbers`;
            } else if (correctNumLocations == length){
                this.newGameProp.gameGuessesRemaining -= 1;
                this.endGame("won", numberCombination);
                // adding this return because the logic can break from this function if the user has won, 
                // as the rest of the logic in this method is no longer necessary
                return;
            } else {
                guess.guessFeedback = "The player’s guess was incorrect";
            }

            // the guess is added to the array of guesses for the game so that the user can view their game history
            this.allGameGuesses.push(guess);
            this.guessNumber++;
            // the number of guesses remaining is lowered
            this.newGameProp.gameGuessesRemaining -= 1;

            // correct number and location variable and currect number variable is reset to 0 for next guess
            correctNumLocations = 0;
            correctNumbers = 0;

            // clearing guess input field
            document.getElementById("guess").value = "";

            // if gameGuessesRemaining has reached 0, the user has used all 10 of their guesses
            // and the game is now over
            if(this.newGameProp.gameGuessesRemaining == 0) {
                this.endGame("loss", numberCombination);
            }

            // Feedback for guess is displayed to user
            this.currentFeedback = guess.guessFeedback;
            this.viewFeedback();
        }    
    },

    viewFeedback: function() {
        this.showFeedback = true;
    },

    viewHistory: function() {
        // removing duplicate elements in case the view history button clicked multiple times
        const history = document.querySelectorAll('.historyGuess');
        history.forEach(elem => {
            elem.remove();
        });

        if(this.allGameGuesses.length > 0) {
            // if there is guess history to display 
            // iterating through all of the guesses and creating a div to display each guess and feedback and 
            // adding them to the existing all history html class
            for (let i = 0; i < this.allGameGuesses.length; i++) {
                const historySection = document.createElement("div");
                historySection.className = "historyGuess";

                const sectionContents = 
                `
                <h4 class="guess">Guess #${this.allGameGuesses[i].getGuessNumber()}: ${this.allGameGuesses[i].getGuessCombination()}</h4>
                <p class="feedback">Feedback: ${this.allGameGuesses[i].getGuessFeedback()}</p>
                `;

                historySection.innerHTML = sectionContents;
                const allHistory = document.getElementsByClassName("allHistory")[0];
                allHistory.appendChild(historySection);
            }
        } else {
            // if there is no guess history to display
            const historySection = document.createElement("div");
            historySection.className = "historyGuess";
            const sectionContents = `<h4 class="noHistory">No History to Display</h4>`;
            historySection.innerHTML = sectionContents;
            const allHistory = document.getElementsByClassName("allHistory")[0];
            allHistory.appendChild(historySection);
        }

        this.showHistory = !this.showHistory;
        // changes the button text depending on whether the history is currently being displayed
        if (this.showHistory) {
        document.getElementById("viewHistoryButton").innerHTML = "Hide History";
        } else {
        document.getElementById("viewHistoryButton").innerHTML = "Show History";
        }
    },

    // ends the game by removing the guess section in the html and displaying a header based on whether the user won or lost
    // and making the 'play again' button available
    endGame: function(endType, combination) {

        // gets "cannot read property of undefined" error when using the timer prop directly. Works when saved to a variable 
        let timer = this.timerProp;
        let timeToEnd = timer.getTimeValues().toString();
        timer.stop();
        if(endType == "won") {
            this.gameOverBanner = `Congratulations! You have guessed the correct combination of ${combination}`;
            this.timeOfGame = `It look you ${timeToEnd} to win the game!`;
            this.triesToWin = `It took you ${10 - this.newGameProp.gameGuessesRemaining} tries.`
        } else {
            this.gameOverBanner = `You have run out of guesses. The correct combination was ${combination}`;
            this.timeOfGame = `You played the game for ${timeToEnd}`;
            this.triesToWin = "";
        }
        this.showGame = false;
        this.showEndGame = true;
    }

  },
  component: {
  }
}
</script>





<style scoped>
    .playArea {
        display: grid; 
        grid-auto-columns: 1fr; 
        grid-template-columns: 0.8fr 1.4fr 0.8fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
        gap: 2% 2%; 
        height: 100%;
        width: 100%;
        font-family: 'M PLUS 2', sans-serif;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Shippori Antique', sans-serif;
    }

    .guessesRemaining { 
        grid-area: 1 / 1 / 2 / 2; 
        text-decoration: underline;
    }

    #timer { 
        grid-area: 1 / 3 / 2 / 4; 
        float: right;
        padding-right: 40%;
        text-decoration: underline;
    }

    .guessInput { 
        grid-area: 2 / 2 / 4 / 3; 
        padding-top: 10%;
        padding-bottom: 5%;
        padding-left: 5%;
        height: fit-content;
        border-radius: 25px;
        border: 2px solid black;
    }

    #viewHistory { 
        grid-area: 3 / 1 / 6 / 2; 
        padding-top: 5%;
        padding-left: 5%;
        padding-bottom: 5%;
        border-radius: 25px;
        border: 2px solid teal;
    }

    #viewHistory > h2 {
        text-decoration: underline;
    }

    #viewFeedback { 
        grid-area: 4 / 2 / 6 / 3; 
        padding-top: 5%;
        padding-left: 2%;
        padding-bottom: 4%;
        border-radius: 25px;
        border: 2px solid green;
        height: fit-content;
    }

    #viewHistoryButton { 
        grid-area: 2 / 1 / 3 / 2; 
        height: 60px;
        width: 150px;
        height: fit-content;
    }

    #guessLengthError {
        color: red;
        font-weight: bold;
        display: block;
    }

    #guessNumberError {
        color: red;
        font-weight: bold;
        display: block;
    }

    label {
        font-weight: bold;
        font-size: 18px;
    }

    
</style>
