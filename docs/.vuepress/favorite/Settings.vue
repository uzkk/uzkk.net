<template>
  <div>
    <div class="choice-container option-container">
      <div>
        <span class="choice-item game-item">
          <Checkbox
            v-model="allSelected"
            label="所有作品全选"
          />
        </span>
        <span class="choice-item game-item">
          <Checkbox
            v-model="allStgSelected"
            label="正作 STG 全选"
          />
        </span>
      </div>
      <div>
        <span class="choice-item game-item" v-for="(game, index) in games" :key="index">
          <Checkbox
            :value="gamelist.includes(game.tag)"
            :label="game.name"
            @update="toggleGame(game.tag)"
          />
        </span>
      </div>
    </div>
    <div class="option-container">
      <div class="choice-container tac">
        选择排名数：
        <span class="choice-item opt-item" v-for="(num, index) in ranks" :key="index">
          <input type="radio" :value="num" v-model="ranknum">
          <label>{{ num }}</label>
        </span>
      </div>
      <div class="choice-container tac">
        选择立绘表情：
        <span class="choice-item opt-item" v-for="(key, value) in faces">
          <input type="radio" :value="value" v-model="face">
          <label>{{ key }}</label>
        </span>
      </div>
    </div>
    <div class="start-btn-container tac">
      <Button
        class="start-btn"
        @click="$emit('next', 'Select', { gamelist, ranknum, face })"
        :disabled="!gamelist.length"
      >
        开始
      </Button>
    </div>
  </div>
</template>

<script>

import games from '../data/games'
import Button from './Button'
import Checkbox from './Checkbox'

const ranks = [1, 5, 7, 10, 20]

const faces = {
  default: '正常',
  smiling: '笑脸',
}

export default {
  components: { Button, Checkbox },

  data: () => ({
    ranknum: 1,
    face: 'default',
    gamelist: 'abcdefghijk',
  }),

  created () {
    this.faces = faces
    this.ranks = ranks
    this.games = games
  },

  watch: {
    gamelist(value) {
      console.log(value)
    }
  },

  computed: {
    allSelected: {
      get () {
        return this.gamelist.length === 'ABCDEFabcdefghijk'.length
      },
      set (value) {
        this.gamelist = value ? 'ABCDEFabcdefghijk' : ''
      },
    },
    allStgSelected: {
      get () {
        return this.gamelist.endsWith('abcdefghijk')
      },
      set (value) {
        const noSTG = this.gamelist.match(/[A-Z]*/)[0]
        this.gamelist = noSTG + (value ? 'abcdefghijk' : '')
      },
    },
  },

  methods: {
    toggleGame (tag) {
      const index = this.gamelist.indexOf(tag)
      const chars = this.gamelist.split('')
      if (index > -1) {
        chars.splice(index, 1)
        this.gamelist = chars.join('')
      } else {
        chars.push(tag)
        this.gamelist = chars.sort().join('')
      }
    },
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

.opt-item {
  display: inline-block;
  width: 4em;
}

.start-btn-container {
  margin-top: 1.3em;
  margin-bottom: 2em;
  width: 180px;
  margin-left: auto;
  margin-right: auto;
}

.start-btn {
  width: 100%;
  display: block;
}
</style>