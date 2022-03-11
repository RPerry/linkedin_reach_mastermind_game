
<template>
        <div class="userSection">
                <p>Are you a:</p>
                <div class="newUser">
                    <button id="newUserButton">New user?</button>
                    <!-- Add an input for the user to type their username, save their new username and start a new game -->
                </div>
                <div class="returningUser">
                    <button id="returningUserButton">Returning user?</button>
                    <!-- Add an input for the user to type their username and start a new game -->
                </div>
        </div>
        
</template>

<script>
import User from "/classes/userClass.js";

export default {
     mounted: function() {
        document.getElementById("newUserButton").addEventListener("click", function() {
            // this is the value of the form input that needs to be created
            let newUserName = document.getElementById("userName").value;
            let user = new User(newUserName);    
            console.log(user.us)

        })
    },

  name: 'user',
  component: {
  }
}
</script>





<style scoped>

</style>
