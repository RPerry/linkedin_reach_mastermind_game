
<template>
        <div class="userSection">
                <p>Are you a:</p>
                <div class="newUser">
                    <button id="newUserButton" v-on:click="this.newUserClick">New user?</button>
                    <!-- Form for the user to type their username, save their new username and start a new game -->
                    <form name="newUserForm" id="newUserForm" v-show="showNewUser">
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
        
</template>

<script>
import User from "/classes/userClass.js";
// import Game from "/classes/gameClass.js";

export default {
     mounted: function() {
        // let testGame = new Game(1, "", 10, "test");
        // testGame.newGameCombination();
    },

  name: 'user',
  data() {
    return {
      showNewUser: false,
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

        // let newGame = new Game(2, "", user.getUserName());

        // move to game page somehow? ensure that newGame data can be accessed by game page
    }
  },
  component: {
  }
}
</script>





<style scoped>

</style>
