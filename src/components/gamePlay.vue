
<template>
    <div>
        <section class="guessesRemaining">Guesses Remaining: {{this.guessesRemaining}}</section>
        <button id="viewHistoryButton" v-on:click="this.viewHistory">View History</button>
        <section class="guessInput">
            <form name="guessForm" id="guessForm">
                        <div id=section1>
                                <label for="guess">Enter your guess (4 numbers between 0-7): </label>
                                <input id="guess" type="number" name="guess" required>
                        </div> 
                        <span id="guessError"></span><br>
                        <button id="guessSubmit" v-on:click="this.guessSubmit">Guess</button>
            </form>
        </section>
        <section id="viewFeedback" v-show="showFeedback">
            <h3>Feedback</h3>
            <!-- how to show the current guess feedback? -->
            <p>{{this.feedback}}</p>
        </section>
        <section id="viewHistory" v-show="showHistory">

        </section>
    </div>
</template>

<script>
import Guess from "/classes/guessClass.js";
// import Game from "/classes/gameClass.js";

export default {
     mounted: function() {
        // let testGame = new Game(1, "", 10, "test");
        // testGame.newGameCombination();
    },

  name: 'gamePlay',
  data() {
    return {
        guessesRemaining: this.testGame.getGameGuessesRemaining,
        numberCombination: this.testGame.getGameCombination,
        guessNumber: 1,
        allGameGuesses: [],
        showHistory: false,
        showFeedback: false
    };
  },
  methods: {
    guessSubmit: function() {
        let guessCombination = document.getElementById("guess").value;
        let guess = new Guess(this.guessNumber, guessCombination, "", "test");
        let correctNumLocations = 0;
        let correctNumbers = 0;

        // checking guess against the number combination and deciding feedback

        for (var i = 0; i <= 3; i++) {
            // checking  if number and location is correct
            if (this.numberCombination[i] == guessCombination[i]) {
                correctNumLocations += 1;
            }
        }

        if(correctNumLocations == 0) {
            // checking if any  of the guess numbers match with any of the number combination numbers
             this.numberCombination.forEach(cNum => {
                guessCombination.forEach(gNum => {
                    if(cNum == gNum) {
                        correctNumbers += 1;
                    }
                })
            });
        }

        // feedback is added to the Guess
        if (correctNumLocations > 0 ) {
            guess.guessFeedback = `The player had guessed ${correctNumLocations} correct numbers and its correct location`;
        } else if (correctNumbers > 0 ){
            guess.guessFeedback = `The player has guessed ${correctNumbers} correct numbers`;
        } else {
            guess.guessFeedback = "The player’s guess was incorrect";
        }

        // the guess is added to the array of guesses for the game so that the user can view their game history
        this.allGameGuesses.push(guess);
        this.guessNumber++;
        // the number of guesses remaining is lowered
        this.testGame.gameGuessesRemaining -= 1;

        // Feedback is shown for guess is displayed to user
        this.viewFeedback();

        // correct number and location variable and currect number variable is reset to 0 for next guess
        correctNumLocations = 0;
        correctNumbers = 0;
    },

    viewFeedback: function() {
        this.showFeedback = true;
    },

    viewHistory: function() {
        this.showHistory = !this.showHistory;

        // this.ALLHISTORYANDFEEDBACK is the content of the history and feedback dropdown. Implement!
        document.getElementById("viewHistory").innerHTML = this.ALLHISTORYANDFEEDBACK;
        if (this.showHistory) {
        document.getElementById("viewHistoryButton").innerHTML = "Hide History";
        } else {
        document.getElementById("viewHistoryButton").innerHTML = "Show History";
        }
    }

  },
  component: {
  }
}
</script>





<style scoped>

</style>
