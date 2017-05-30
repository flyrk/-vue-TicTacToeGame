<template lang="html">
  <div class="singlePlayer">
    <div class="questionBox" v-if="!chosed">
      <h1>You wanna X or O?</h1>
      <div class="sideX" @click="turnX">X</div>
      <div class="sideO" @click="turnY">O</div>
    </div>
    <grid-view v-else :turn="turn" :player="player"></grid-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      turn: '',
      player: 'single',
      chosed: false
    }
  },
  methods: {
    turnX: function () {
      this.turn = 'X'
      this.chosed = true
    },
    turnY: function () {
      this.turn = 'O'
      this.chosed = true
    }
  }
}
</script>

<style scoped>
.sideX, .sideO {
  position: absolute;
  left: 50px;
  bottom: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px solid white;
  font-size: 100px;
  line-height: 100px;
  font-family: monospace;
  color: #f4f2f3;
}

.sideX:hover, .sideO:hover {
  cursor: pointer;
}

.sideO {
  left: 150px;
}

.drawBoard div {
  font-size: 100px;
  line-height: 100px;
  text-align: center;
  font-family: monospace;
  color: #f4f2f3;
}

.result {
  width: 240px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #b93911;
  z-index: 500;
  font-size: 1.6em;
  font-family: arial;
  line-height: 100px;
  text-align: center;
}

.shadow-box {
  z-index: 200;
  background-color: #c7c2c2;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
