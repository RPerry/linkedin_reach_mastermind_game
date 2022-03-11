
<template>
    <div>
        <div class="difficultySection" v-show="showDifficultySection">
                <div class="difficultyDropdown">
                    <button id="showDifficultyButton" class="btn btn-primary" v-show="showChooseButton" v-on:click="this.showDifficultyClick">Choose Difficulty Level</button>

                    <!-- Dropdown form for the user to choose their difficulty type -->
                    <section id="difficultyArea" v-show="showDifficultyChoice">
                        <select id="difficultyChoice" class="form-select">
                            <!-- In order to abstract away what each difficulty means for the length of the combination, 
                            I am making the values of the choices "easy/medium/hard" and deciding the combiniation length 
                            in the Game class for easier refactoring  -->
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <br>
                        <button id="startGame" class="btn btn-info" v-on:click="this.startGame">Start</button>
                    </section>
                </div>
        </div>
        <div class="gamePlay" v-show="showGame">
            <gamePlay :newGameProp= "newGame" :timerProp= "timer"/>
        </div>
        <section class="apiErrorSection" v-show="showApiError">
            <h4 class="apiError">{{this.apiError}}</h4>
        </section>
    </div>    
</template>

<script>
import Game from "/classes/gameClass.js";
import gamePlay from "./gamePlay.vue";
// using EasyTimer.js library to time the length of the game
var { Timer } = require('easytimer.js');


export default {
  name: 'gameDifficulty',
  data() {
    return {
      showDifficultyChoice: false,
      showGame: false,
      showDifficultySection: true,
      showChooseButton: true,
      newGame: new Game(),
      timer: new Timer(),
      showApiError: false,
      apiError: ""
    };
  },
  methods: {
    
      // when the new user button is clicked, the form to enter a new username is shown
    showDifficultyClick: function() {
        this.showChooseButton = false;
        this.showDifficultyChoice = true;
    },

    startGame: function() {
        // Once the difficulty level has been chosen, a new game combination is added to the newGame object
        let choice = document.getElementById("difficultyChoice").value;
        this.newGame.changeDifficultyLevel(choice);
        this.newGame.newGameCombination();
        
        // once the newGameCombination function has been run and the apiErrorMessage property of the newGame has been updated 
        // check whether there is an error message 
        // and if there has been no error with the random.org api request, show game play area. Else, show error message
        // setTimeout as apiErrorMessage property not updated until newGameCombination returns and I can't get an async function
        // to await its return

        // within setTimeout, "this" needs to be set to a different variable in order to be called
        let that = this;
        setTimeout(function () {
           if(that.newGame.getErrorMessage() == "") {
            that.showGame = true;
            that.showDifficultySection = false;
            that.startTimer();
            } else {
            that.apiError = that.newGame.getErrorMessage();
            that.showDifficultySection = false;
            that.showApiError = true;
        }
        }, 900);
    },

    startTimer: function() {
        this.timer.start();
    }
  },
  components: {
      gamePlay
  }
}
</script>


<style scoped>

.difficultySection {
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 0.4fr 2.2fr 0.4fr; 
    grid-template-rows: 0.6fr 0.1fr 1.7fr 0.7fr; 
    gap: 2% 2%; 
    height: 100%;
    padding: 0%;
    font-family: 'M PLUS 2', sans-serif;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Shippori Antique', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
}

#showDifficultyButton {
    min-width: 100%;
    min-height: 100%;
}

.difficultyDropdown { 
    grid-area: 3 / 2 / 4 / 3;
    padding-top: 10%;
    min-width: 60%;
    min-height: 100%;
}

#startGame {
    min-width: 100%;
    min-height: 100%;
}

</style>
