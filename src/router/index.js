import Vue from 'vue'
import Router from 'vue-router'
import homeView from '@/components/homeView'
import singlePlayer from '@/components/singlePlayer'
import twoPlayer from '@/components/twoPlayer'

Vue.use(Router)

Vue.component('grid-view', {
  props: {
    turn: String,
    player: String
  },
  template: `
    <div class="grid-view">
      <div class="mark-board">
        <span>You:0</span>
        <span>        |        </span>
        <span>Computer:0</span>
      </div>
      <div class="drawBoard" @click="draw" @load="init">
        <div class="cell-0-0" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 0px; left: 0px;"></div>
        <div class="cell-0-1" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 0px; left: 100px;"></div>
        <div class="cell-0-2" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 0px; left: 200px;"></div>
        <div class="cell-1-0" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 100px; left: 0px;"></div>
        <div class="cell-1-1" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 100px; left: 100px;"></div>
        <div class="cell-1-2" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 100px; left: 200px;"></div>
        <div class="cell-2-0" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 200px; left: 0px;"></div>
        <div class="cell-2-1" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 200px; left: 100px;"></div>
        <div class="cell-2-2" style="width: 100px; height: 100px; position: absolute; border: 1px solid white; top: 200px; left: 200px;"></div>
      </div>
      <div class="result" v-if="hasResult">{{ resultMsg }}</div>
      <div class="shadow-box" v-if="hasResult"></div>
    </div>
  `,
  data () {
    return {
      board: [],
      aiTurn: '',
      firstTurn: '',
      player1: 0,
      player2: 0,
      player1Marks: 0,
      player2Marks: 0,
      hasResult: false,
      resultMsg: ''
    }
  },
  methods: {
    init: function () {
      this.player1 = 0
      this.player2 = 0
      for (let i = 0; i < 3; i++) {
        this.board[i] = []
        for (let j = 0; j < 3; j++) {
          this.board[i][j] = 7
        }
      }
      if (this.player === 'single') {
        this.aiTurn = this.turn === 'X' ? 'O' : 'X'
      } else if (this.player === 'two') {
        this.firstTurn = this.turn
      }
    },
    draw: function (e) {
      let i = parseInt(e.target.className.match(/[a-z]+-(\d)-(\d)/)[1])
      let j = parseInt(e.target.className.match(/[a-z]+-(\d)-(\d)/)[2])
      if (e.target.innerText === '') {
        this.drawBox(i, j, e.target)
      }
      if (this.player === 'single') {
        this.board[i][j] = this.turn === 'X' ? 1 : 0
        if (this.judgeGame()) {
          this.updateMarks()
          this.playAgain()
        } else {
          setTimeout(function () {
            this.aiPlay()
            if (this.judgeGame()) {
              this.updateMarks()
              this.playAgain()
            }
          }, 1000)
        }
      } else if (this.player === 'two') {
        if (this.turn === 'X') {
          this.board[i][j] = 1
          this.turn = 'O'
        } else {
          this.board[i][j] = 0
          this.turn = 'X'
        }
        if (this.judgeGame()) {
          this.updateMarks()
          this.playAgain()
        }
      }
    },
    drawBox: function (r, c, box) {
      box.innerText = this.turn
    },
    updateMarks: function () {
      let markBoard = document.getElementsByClassName('mark-board')[0]
      let leftBoard = markBoard.firstChild
      let rightBoard = markBoard.lastChild
      if (this.player === 'single') {
        leftBoard.innerHTML = this.turn === 'X' ? 'You:' + this.player1Marks : 'Computer:' + this.player1Marks
        rightBoard.innerHTML = this.turn === 'O' ? 'You:' + this.player2Marks : 'Computer:' + this.player2Marks
      } else {
        leftBoard.innerHTML = 'Player1:' + this.player1Marks
        rightBoard.innerHTML = 'Player2:' + this.player2Marks
      }
    },
    judgeGame: function () {
      if (this.isGameOver()) {
        if (this.player === 'single') {
          if (this.player1 && !this.player2) {
            this.player1Marks++
            if (this.turn === 'X') {
              this.showResult('You Win!')
            } else {
              this.showResult('AI Win!')
            }
          } else if (this.player2 && !this.player1) {
            this.player2Marks++
            if (this.turn === 'O') {
              this.showResult('You Win!')
            } else {
              this.showResult('AI Win!')
            }
          } else {
            this.showResult('Drawn Game!')
          }
        } else {
          if (this.player1 && !this.player2) {
            this.player1Marks++
            this.showResult('Player1 Win!')
          } else if (this.player2 && !this.player1) {
            this.player2Marks++
            this.showResult('Player2 Win!')
          } else {
            this.showResult('Drawn Game!')
          }
        }
        return true
      } else {
        return false
      }
    },
    playAgain: function () {
      setTimeout(function () {
        this.clearText(this.board)
        this.player1 = this.player2 = 0
      }, 1500)
    },
    showResult: function (info) {
      this.hasResult = true
      this.resultMsg = info
    },
    isGameOver: function () {
      let full = 0
      for (let i = 0; i < 3; i++) {
          // 行判断
        if (this.board[i][0] + this.board[i][1] + this.board[i][2] === 3) {
          this.player1 = 1
        }
        if (this.board[i][0] + this.board[i][1] + this.board[i][2] === 0) {
          this.player2 = 1
        }
        // 列判断
        if (this.board[0][i] + this.board[1][i] + this.board[2][i] === 3) {
          this.player1 = 1
        }
        if (this.board[0][i] + this.board[1][i] + this.board[2][i] === 0) {
          this.player2 = 1
        }
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] !== 7) {
            full++
          }
        }
      }
      if (this.board[0][0] + this.board[1][1] + this.board[2][2] === 3 ||
        this.board[2][0] + this.board[1][1] + this.board[0][2] === 3) {
        this.player1 = 1
      }
      if (this.board[0][0] + this.board[1][1] + this.board[2][2] === 0 ||
        this.board[2][0] + this.board[1][1] + this.board[0][2] === 0) {
        this.player2 = 1
      }
      if (this.player1 || this.player2) {
        return true
      }
      if (full === 9) {
        return true
      }
      return false
    }
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: homeView
    },
    {
      path: '/singlePlayer',
      name: 'singlePlayer',
      component: singlePlayer
    },
    {
      path: '/twoPlayer',
      name: 'twoPlayer',
      component: twoPlayer
    }
  ]
})
