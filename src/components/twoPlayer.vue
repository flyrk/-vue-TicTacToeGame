<template lang="html">
  <div class="twoPlayer">
    <div class="questionBox" v-if="!chosed">
      <h1>You wanna X or O?</h1>
      <div class="sideX" @click="turnX">X</div>
      <div class="sideO" @click="turnY">O</div>
    </div>
    <grid-view v-else turn="turn" player="two"></grid-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      turn: '',
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
</style>
