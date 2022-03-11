<template>
<div class="playButtonContainer">
  <section class="playButton">
    <router-link to="/startGame">
      <button class="btn btn-outline-success btn-block btn-lg" id="startPlayButton">Play</button>
    </router-link>
    <!-- <a class="btn btn-outline-success btn-block btn-lg" id="startPlayButton" type="button"><router-link to="/user">Play</router-link></a> -->
  </section>
  <section class="instructions">
    <h3>Instructions:</h3>
    <ul>
      <li>The game will select a combination of random numbers between 0-7 based on difficulty. 4 numbers on easy, 5 on medium, 6 on hard.</li>
      <li>You will have 10 tries to guess the combination.</li>
      <li>You will be given feedback after every guess.</li>
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
  margin-left: 15%;
}

.instructions { 
  grid-area: instructions; 
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 800px) {
  /* .homeName{
    margin-top: 40%
  } */
}

  
</style>
