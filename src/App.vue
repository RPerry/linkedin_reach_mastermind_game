<template>
  <div id="app">
    <div class="container" id="app">
        <div class="header">
            <header>
                <a href="/"><h1>Mastermind Game</h1></a>
                <!-- <router-link to="/"><h1>Mastermind Game</h1></router-link> -->
                <h4>By Riyo Perry</h4>
            </header>
        </div>
        <main class="body">
            <router-view></router-view>
        </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 0.8fr 1.5fr 0.8fr; 
  grid-template-rows: .5% 16% 40% 30% 5%; 
  gap: 1% 1%; 
  grid-template-areas: 
    ". . ."
    "header header header"
    "body body body"
    "body body body"
    ". . ."; 
  width: 98vw;
  height: 98vh;
  font-family: 'M PLUS 2', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Shippori Antique', sans-serif;
}

.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: 2px solid coral;
}

.body {
  grid-area: body;
}

a {
  color: black;
}
</style>
