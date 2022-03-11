
<template>
    <div>
        <section class="guessesRemaining">Guesses Remaining: {{newGameProp.gameGuessesRemaining}}</section>
        <button id="viewHistoryButton" v-on:click="this.viewHistory">View History</button>
        <section class="guessInput">
            <form name="guessForm" id="guessForm" @submit.prevent>
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
    props: ['newGameProp'],
    created() {
        // let testGame = new Game(1, "", "test");
        this.newGameProp.newGameCombination();
        // console.log(testGame.getGameCombination());
        console.log(this.newGameProp);
    },

  name: 'gamePlay',
  data() {
    return {
        // guessesRemaining: this.testGame.getGameGuessesRemaining(),
        // guessesRemaining: 10,
        // numberCombination: this.testGame.getGameCombination,
        guessNumber: 1,
        allGameGuesses: [],
        showHistory: false,
        showFeedback: false
    };
  },
  methods: {
    guessSubmit: function() {
        let guessString = document.getElementById("guess").value;
        let guessCombination = guessString.split("");
        let numberCombination = this.newGameProp.getGameCombination();
        console.log("inputted guess");
        console.log(guessCombination);

        console.log('number combo');
        console.log(numberCombination);
        let guess = new Guess(this.guessNumber, guessCombination, "", "test");
        let correctNumLocations = 0;
        let correctNumbers = 0;

        console.log(typeof numberCombination);
        console.log(typeof guessCombination);

        // checking guess against the number combination and deciding feedback
        for (var i = 0; i <= 3; i++) {
            // checking  if number and location is correct
            // If so, the value of correctNumLocations goes up by 1 for every correct number in the correct location/index
            if (numberCombination[i] == guessCombination[i]) {
                correctNumLocations += 1;
            }
        }
        

        // FIX - if there is a correct number multiple times in a guess, 
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
        if (correctNumLocations > 0 ) {
            guess.guessFeedback = `The player has guessed ${correctNumLocations} correct numbers and its correct location`;
        } else if (correctNumbers > 0 ){
            guess.guessFeedback = `The player has guessed ${correctNumbers} correct numbers`;
        } else {
            guess.guessFeedback = "The player’s guess was incorrect";
        }

        console.log(guess.guessFeedback);

        // the guess is added to the array of guesses for the game so that the user can view their game history
        this.allGameGuesses.push(guess);
        this.guessNumber++;
        // the number of guesses remaining is lowered
        this.newGameProp.gameGuessesRemaining -= 1;

        // Feedback is shown for guess is displayed to user
        this.viewFeedback();

        // correct number and location variable and currect number variable is reset to 0 for next guess
        correctNumLocations = 0;
        correctNumbers = 0;

        // clearing guess input field
        document.getElementById("guess").value = "";
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
