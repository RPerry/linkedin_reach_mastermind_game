
<template>
    <div>
        <div class="difficultySection" v-show="showDifficultySection">
                <p>Current Difficulty Level: Easy</p>
                <div class="difficultyDropdown">
                    <button id="showDifficultyButton" v-on:click="this.showDifficultyClick">Change</button>
                    <!-- Dropdown for the user to choose their difficulty type -->
                    <!-- <form name="newUserForm" id="newUserForm" v-show="showDifficultyChoice" @submit.prevent>
                        <div id=section1>
                                <label for="newUser">Create a Username (required): </label>
                                <input id="newUser" type="text" name="newUser" required>
                        </div> 
                        <span id="newUserError"></span><br>
                        <button id="newUserSubmit" v-on:click="this.newUserSubmit">Submit</button>
                    </form> -->
                    <section id="difficultyArea" v-show="showDifficultyChoice">
                        <select id="difficultyChoice">
                            <!-- In order to abstract away what each difficulty means for the length of the combination, 
                            I am making the values of the choices "easy/medium/hard" and deciding the combiniation length 
                            in the Game class for easier refactoring  -->
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <button id="startGame" v-on:click="this.startGame">Start</button>
                    </section>
                </div>
        </div>
        <div class="gamePlay" v-show="showGame">
            <gamePlay :newGameProp= "newGame" :timerProp= "timer"/>
        </div>
    </div>    
</template>

<script>
import Game from "/classes/gameClass.js";
import gamePlay from "./gamePlay.vue";
// using EasyTimer.js library to time the length of the game
var { Timer } = require('easytimer.js');


export default {
    //  mounted: function() {
    // },

  name: 'user',
  data() {
    return {
      showDifficultyChoice: false,
      showGame: false,
      showDifficultySection: true,
      newGame: new Game(),
      timer: new Timer(),
    };
  },
  methods: {
    
      // when the new user button is clicked, the form to enter a new username is shown
    showDifficultyClick: function() {
        this.showDifficultyChoice = true;
    },

    startGame: function() {
        let choice = document.getElementById("difficultyChoice").value;
        this.newGame.changeDifficultyLevel(choice);
        this.newGame.newGameCombination();

        // the game play section is shown once the difficulty level has been chosen
        this.showGame = true;
        this.showDifficultySection = false;
        this.timer.start();
    }
  },
  components: {
      gamePlay
  }
}
</script>





<style scoped>

</style>
