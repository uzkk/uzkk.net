<template>
  <div>
    <h3 class="hint tac">
      第 {{ questionCount }} 轮：请选择更喜欢的角色
    </h3>
    <table>
      <tr class="characters">
        <td><Character :face="face" :node="pair[0]" @click="selectChar(0)"/></td>
        <td><Character :face="face" :node="pair[1]" @click="selectChar(1)"/></td>
      </tr>
      <tr>
        <td>
          <button
            class="opt-btn"
            title="将左边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0)"
          >
            不再出现左边的角色
          </button>
        </td>
        <td>
          <button
            class="opt-btn"
            title="将右边的角色从剩余问题的角色列表中剔除"
            @click="exclude(1)"
          >
            不再出现右边的角色
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <button
            class="opt-btn"
            title="将两边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0, 1)"
          >
            不再出现这两个角色
          </button>
        </td>
        <td>
          <button
            class="opt-btn"
            title="返回主界面"
            @click="backToSettings"
          >
            返回主界面
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import SortObject from '../../utils/SortObject'
import characters from '../data/characters'
import Character from './Character.vue'

export default {
  name: 'Select',

  components: { Character },

  props: ['gamelist', 'ranknum', 'face'],

  data: () => ({
    pair: [],
    questionCount: 1,
    currentRank: 0,
  }),

  created () {
    this.rtNode = new SortObject(["!root", , , , ])
    for (let char of characters) {
      for (let tag of char[4]) {
        if (this.gamelist.includes(tag)) {
          this.rtNode.add(new SortObject(char), false)
          break
        }
      }
    }
    this.pair = this.ask(this.rtNode)
  },

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
    ask (node) {
      if (node.children.length == 0) {
        return false
      }
      if (node.children.length == 1) {
        this.currentRank = node.level() + 1
        return this.ask(node.children[0])
      }
      var both = [0, 0]
      while (true) {
        if (both[0] != both[1]) {
          break
        }
        for (var i in [0, 1]) {
          both[i] = Math.floor(Math.random() * node.children.length)
        }
      }
      return [node.children[both[0]], node.children[both[1]]]
    },
    nextPair () {
      this.pair = this.ask(this.rtNode)
      if (this.pair) {
        this.questionCount += 1
        return this.pair[1].level() <= this.ranknum
      }
      return false
    },
    moveOn () {
      const { ranknum, face } = this
      if (!this.nextPair()) {
        let ranking = []
        let node = this.rtNode
        for (let i = 0; i < ranknum; i++) {
          node = node.children[0]
          if (!node) {
            break
          }
          ranking.push(node.name)
        }
        this.$emit('next', 'Result', { ranking, face })
      }
    },
    selectChar (index) {
      this.pair[index].add(this.pair[1 - index], false)
      this.moveOn()
    },
    getImage (char) {
      return `${TH_CHAR_PATH}/${this.face}/${char.img}.png`
    },
    exclude (...indices) {
      for (let i of indices) {
        this.pair[i].remove()
      }
      this.moveOn()
    }
  },
}

</script>

<style lang="stylus" scoped>

.hint
  font-size 1.3em
  text-align center

table
  margin-left auto
  margin-right auto
  margin-bottom 2em
  border-spacing 0.4em
  border-collapse separate
  text-align center
  vertical-align middle

td
  padding-left 0.5em
  padding-right 0.5em
  padding-bottom 0.3em

  tr.characters > &
    padding-bottom 0.8em

.opt-btn
  display block
  width 100%
  font-size 1em
  line-height 2em
  appearance none
  user-select none
  border none
  border-radius 0.4em
  background-color $accentColor
  color #fff
  border-radius 0.4em
  cursor pointer
  padding 0.2em 0.4em
  transition 0.3s ease

  &:focus
    outline 0

  &:hover
    background-color lighten($accentColor, 30%)

  &:active
    background-color darken($accentColor, 30%)

</style>