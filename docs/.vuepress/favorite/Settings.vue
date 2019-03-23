<template>
  <div>
    <div class="choice-container option-container">
      <div>
        <span class="choice-item game-item">
          <input type="checkbox" v-on:click="selectAll" v-model="all">
          <label>所有作品全选</label>
        </span>
        <span class="choice-item game-item">
          <input type="checkbox" v-on:click="selectAllStg" v-model="allStg">
          <label>正作STG全选</label>
        </span>
      </div>
      <div>
        <span class="choice-item game-item" v-for="(game, index) in games" :key="index">
          <input type="checkbox" :value="game.tag" v-on:click="gameChecked(game.tag)" v-model="gamelist">
          <label>{{ game.name }}</label>
        </span>
      </div>
    </div>
    <div class="option-container">
      <div class="choice-container tac">
        选择排名数：
        <span class="choice-item" v-for="(num, index) in ranks" :key="index">
          <input type="radio" :value="num" v-model="ranknum">
          <label>{{ num }}</label>
        </span>
      </div>
      <div class="choice-container tac">
        选择立绘表情：
        <span class="choice-item" v-for="(key, value) in faces">
          <input type="radio" :value="value" v-model="face">
          <label>{{ key }}</label>
        </span>
      </div>
    </div>
    <div class="tac">
      <button class="start-btn" @click="$emit('next', 'Select', { gamelist, ranknum, face })" :disabled="gamelist.length === 0">开始！</button>
    </div>
  </div>
</template>

<script>
import games from '../data/games'

const ranks = [1, 5, 7, 10, 20]

const faces = {
  default: '正常',
  smiling: '笑脸',
}

export default {
  name: 'Settings',
  data: () => ({
    ranknum: 1,
    face: 'default',
    gamelist: [],
    all: false,
    allStg: false
  }),
  created () {
    this.faces = faces
    this.ranks = ranks
    this.games = games
  },
  methods: {
    selectAll () {
      if (!this.all) {
        this.allStg = true
        this.gamelist = this.games.map(game => game.tag)
      } else {
        this.allStg = false
        this.gamelist = []
      }
    },
    selectAllStg () {
      this.all = false
      if (!this.allStg) {
        this.gamelist = []
        for (let game of this.games) {
          if (game.tag >= 'a' && game.tag <= 'z') {
            this.gamelist.push(game.tag)
          }
        }
      } else {
        let gl = this.gamelist.slice()
        for (let game of gl) {
          if (game >= 'a' && game <= 'z') {
            let index = this.gamelist.indexOf(game)
            this.gamelist.splice(index, 1)
          }
        }
      }
    },
    gameChecked (tag) {
      if (this.gamelist.indexOf(tag) > -1) {
        this.all = false
        if (tag >= 'a' && tag <= 'z') {
          this.allStg = false
        }
      } else {
        if (this.gamelist.length === this.games.length - 1) {
          this.all = true
        }
        if (tag >= 'a' && tag <= 'z') {
          let selectedLower = 0
          for (let game of this.gamelist) {
            if (game >= 'a' && game <= 'z') {
              selectedLower += 1
            }
          }
          let lower = 0
          for (let game of this.games) {
            if (game.tag >= 'a' && game.tag <= 'z') {
              lower += 1
            }
          }
          if (selectedLower === lower - 1) {
            this.allStg = true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.tac {
  text-align: center;
}

.option-container {
  border-style: solid;
  border-width: 1px;
  border-radius: 0.5em;
  margin-left: 5em;
  margin-right: 5em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 2em;
  padding-bottom: 2em;
}

.choice-item {
  margin-left: 0.5em;
  margin-right: 0.8em;
}

.game-item {
  display: inline-block;
  width: 10em;
}

.start-btn {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>