<template>
<div class="playButtonContainer">
  <section class="playButton">
    <button><router-link to="/user">Play</router-link></button>
  </section>
  <section class="instructions">
    WRITE game instructions HERE!!!
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
.playButtonContainer {
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
  /* grid-area: 1 / 3 / 3 / 4;
  font-size:6vw;
  position: absolute;
  margin-top: 6.5%;
  margin-left: 16.8%; */

}

@media screen and (max-width: 800px) {
  /* .homeName{
    margin-top: 40%
  } */
}

  
</style>
