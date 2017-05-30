<template>
  <div id="app">
    <div class="game-platform">
      <div class="game-background">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body, h1, a, p {
  margin: 0;
  padding: 0; }

body {
  position: relative;
}

h1 {
  font-family: inherit;
  font-size: 30px;
  color: #f4f2f3;
  text-shadow: 2px 2px #595558;
  margin: 10px;
  padding: 10px;
}

.game-platform {
  border: 20px #d2bd48 solid;
  border-top: 40px #d2bd48 solid;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  margin-top: 10%;
  position: relative;
}

.game-platform .game-background {
    display: inline-block;
    position: relative;
    background-color: #34373b;
    width: 100%;
    height: 100%;
}
</style>
