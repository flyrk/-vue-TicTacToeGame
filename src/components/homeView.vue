<template>
  <div class="home-view">
    <div class="startView">
        <h1 class="game-quest">How do you want to play?</h1>
        <router-link to="singlePlayer" class="player" id="game-singleP">single player</router-link>
        <router-link to="twoPlayer" class="player" id="game-twoP">two player</router-link>
    </div>
    <button class="btn-reset" onclick='resetAll();'>Reset All</button>
  </div>
</template>

<script>
export default {
  name: 'homeView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-platform .btn-reset {
    position: absolute;
    top: -30px;
    right: 0;
    background-color: #1ed7c4;
    color: #868b7e;
    border-radius: 5px 5px;
}

.game-platform .game-background #game-singleP, .game-platform .game-background #game-twoP {
  display: inline-block;
  font-family: monospace;
  font-size: 25px;
  margin-top: 30px;
  margin-left: 15%;
  color: #f4f2f3;
  text-decoration: none;
  text-align: center;
}

.game-platform .game-background #game-singleP:hover, .game-platform .game-background #game-twoP:hover {
  text-decoration: underline;
}

.player:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
