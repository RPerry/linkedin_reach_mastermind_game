<template>
<div class="playButtonContainer">
  <section class="playButton">
    <router-link to="/gameDifficulty">
      <button class="btn btn-outline-success btn-block btn-lg" id="startPlayButton">Play</button>
    </router-link>
    <!-- <a class="btn btn-outline-success btn-block btn-lg" id="startPlayButton" type="button"><router-link to="/user">Play</router-link></a> -->
  </section>
  <section class="instructions">
    <h3>Instructions: </h3>
    <ul>
      <li>The game will select a combination of random numbers between 0-7 based on their choice of game difficulty. 4 numbers on easy, 5 on medium, 6 on hard.</li><br>
      <li>Players will have 10 tries to guess the combination.</li><br>
      <li>Feedback will be given after every guess.</li><br>
      <li>Players will be able to view how many guesses they have remaining, as well as how long they have been playing the game.</li><br>
      <li>Players are also able to view the history of their guesses and feedback within the game</li>
    </ul>
  </section>
</div> 
</template>

<script>


export default {
  name: 'playButton',
  component: {
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
  height:200px;
  width:400px;
  margin-top: 50px;
}

#startPlayButton {
  min-width: 100%;
  min-height: 50%;
}

.playButtonContainer {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 0.9fr 0.5fr 2.3fr 0.5fr .8fr; 
  grid-template-rows: 0.1fr 1fr 1fr; 
  gap: 8% 1%; 
  grid-template-areas: 
    ". . . . ."
    ". . playButton . ."
    ". instructions instructions instructions .";
  height: 100%;
  font-family: 'M PLUS 2', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Shippori Antique', sans-serif;
}

.playButton { 
  grid-area: playButton;  
  display: flex;
  align-items: center;
  justify-content: center;
}

.instructions { 
  grid-area: instructions; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: 2px solid black;
  padding: 12px;
}
@media screen and (max-width: 800px) {
  /* .homeName{
    margin-top: 40%
  } */
}

  
</style>
