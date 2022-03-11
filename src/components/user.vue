
<template>
    <div>
        <div class="userSection" v-show="showUserSection">
                <p>Are you a:</p>
                <div class="newUser">
                    <button id="newUserButton" v-on:click="this.newUserClick">New user?</button>
                    <!-- Form for the user to type their username, save their new username and start a new game -->
                    <form name="newUserForm" id="newUserForm" v-show="showNewUser" @submit.prevent>
                        <div id=section1>
                                <label for="newUser">Create a Username (required): </label>
                                <input id="newUser" type="text" name="newUser" required>
                        </div> 
                        <span id="newUserError"></span><br>
                        <button id="newUserSubmit" v-on:click="this.newUserSubmit">Submit</button>
                    </form>
                </div>
                <!-- <div class="returningUser">
                    <button id="returningUserButton">Returning user?</button>
                    Add an input for the user to type their username and start a new game 
                </div> --> 
        </div>
        <div class="gamePlay" v-show="showGame">
            <gamePlay :newGameProp= "newGame" />
        </div>
    </div>    
</template>

<script>
import User from "/classes/userClass.js";
import Game from "/classes/gameClass.js";
import gamePlay from "./gamePlay.vue";

export default {
     mounted: function() {
        // let testGame = new Game(1, "", 10, "test");
        // testGame.newGameCombination();
    },

  name: 'user',
  data() {
    return {
      showNewUser: false,
      showGame: false,
      showUserSection: true,
      newGame: new Game(1, "test")
    };
  },
  methods: {
    
      // when the new user button is clicked, the form to enter a new username is shown
    newUserClick: function() {
        this.showNewUser = true;
    },

    newUserSubmit: function() {
        let newUserName = document.getElementById("newUser").value;
        let user = new User(newUserName);    
        console.log(user.getUserName);

        // on submission of the username form, the game play section is shown
        this.showGame = true;
        this.showUserSection = false;
    }
  },
  components: {
      gamePlay
  }
}
</script>





<style scoped>

</style>
