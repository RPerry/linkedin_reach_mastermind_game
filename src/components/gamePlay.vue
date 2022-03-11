
<template>
    <div>
        <div class="playArea" v-show="showGame">
            <section class="guessesRemaining">Guesses Remaining: {{newGameProp.gameGuessesRemaining}}</section>
            <button id="viewHistoryButton" v-on:click="this.viewHistory">View History</button>
            <section class="guessInput">
                <form name="guessForm" id="guessForm" @submit.prevent>
                            <div id=section1>
                                    <label for="guess">Enter your guess (4 numbers between 0-7): </label>
                                    <input id="guess" type="number" name="guess">
                            </div> 
                            <span id="guessError"></span><br>
                            <button id="guessSubmit" v-on:click="this.guessSubmit">Guess</button>
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
            <button type="button"><router-link to="/">Play Again</router-link></button>
        </div>
    </div>
</template>

<script>
import Guess from "/classes/guessClass.js";

export default {
    props: ['newGameProp'],
    created() {
        this.newGameProp.newGameCombination();
    },

    mounted() {
        if(this.newGameProp.gameGuessesRemaining == 0) {
            this.endGame();
        }
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
        gameOverBanner: ""
    };
  },
  methods: {
    guessSubmit: function() {
        let guessString = document.getElementById("guess").value;
        let guessCombination = guessString.split("");
        let numberCombination = this.newGameProp.getGameCombination();

        console.log('number combo');
        console.log(numberCombination);
        let guess = new Guess(this.guessNumber, guessCombination, "", "test");
        let correctNumLocations = 0;
        let correctNumbers = 0;

        // checking guess against the number combination and deciding feedback
        for (var i = 0; i <= 3; i++) {
            // checking  if number and location is correct
            // If so, the value of correctNumLocations goes up by 1 for every correct number in the correct location/index
            if (numberCombination[i] == guessCombination[i]) {
                correctNumLocations += 1;
            }
        }
        

        // FIX!!!!!! - if there is a correct number multiple times in a guess, 
        // it results in feedback saying the player has guessed multiple  correct numbers. Rather than 1
        if(correctNumLocations == 0) {
            // checking if any  of the guess numbers match with any of the number combination numbers
            // If so, the value of correctNumbers goes up by 1 for every correct number in any location/index
             numberCombination.forEach(cNum => {
                guessCombination.forEach(gNum => {
                    if(cNum == gNum) {
                        correctNumbers += 1;
                    }
                })
            });
        }

        // feedback is added to the Guess
        if (correctNumLocations > 0 && correctNumLocations < 4 ) {
            guess.guessFeedback = `The player has guessed ${correctNumLocations} correct numbers and its correct location`;
        } else if (correctNumbers > 0 ){
            guess.guessFeedback = `The player has guessed ${correctNumbers} correct numbers`;
        } else if (correctNumLocations == 4){
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
        if(endType == "won") {
            this.gameOverBanner = `Congratulations! You have guessed the correct combination of ${combination}`;
            // <p>it took you ${10-gameGuessesRemaining} tries.</p>
        } else {
            this.gameOverBanner = `You have run out of guesses. The correct combination was ${combination}`;
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

</style>
