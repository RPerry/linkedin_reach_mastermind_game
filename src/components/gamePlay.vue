
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
        <section class="feedback">
            <h3>Feedback</h3>
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
    };
  },
  methods: {
    guessSubmit: function() {
        let guessCombination = document.getElementById("guess").value;
        let guess = new Guess(this.guessNumber, guessCombination, "", "test");
        
        this.numberCombination.forEach(num => {
        // checking guess against the number combination and deciding feedback

        // after giving feedback, feedback is added to the Guess
        // guess.guessFeedback = feedback;
        });

        this.allGameGuesses.push(guess);
        this.guessNumber++;
        this.testGame.gameGuessesRemaining -= 1;
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
