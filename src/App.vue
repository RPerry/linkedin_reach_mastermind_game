<template>
  <div id="app">
    <div class="container" id="app">
        <div class="header">
            <header>
                <h1>Mastermind Game</h1>
                <h4>By Riyo Perry</h4>
            </header>
        </div>
        <main class="body">
            <router-view></router-view>
        </main>
        <!-- <footer class="footer">
            <p>&#169; Riyo Perry 2022</p>
        </footer> -->
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
</style>
