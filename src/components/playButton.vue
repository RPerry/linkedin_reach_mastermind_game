<template>
<div class="playButtonContainer">
  <section class="playButton">
    <button class="btn btn-outline-success btn-block btn-lg" id="startPlayButton">
      <router-link to="/startGame">Play</router-link>
    </button>
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
  /* width: 98vw;
  /* display: grid;
  grid-template-columns: 35.5% 14.5% 40% 50%;
  grid-template-rows: 14.9% 23.1% 30% 8% 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  width: 98vw;
  height: 70vh;
  margin-top: 5%; */
}

.playButton { 
  grid-area: playButton;  
  display: flex;
  align-items: center;
  justify-content: center;
  /* height:200px;
  width:400px; */
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
