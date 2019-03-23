<template>
  <div>
    <h3 class="tac">
      第 {{ questionCount }} 轮：请<span class="emphasize">点击图片</span>选择更喜欢的角色
    </h3>
    <h4 class="tac" v-if="currentRank > 0">
      排名第 {{ currentRank }} 的角色已经确定
    </h4>
    <table class="tac">
      <tr class="characters">
        <td><Character :face="face" :node="pair[0]" @click="selectChar(0)"/></td>
        <td><Character :face="face" :node="pair[1]" @click="selectChar(1)"/></td>
      </tr>
      <tr>
        <td>
          <button
            class="btn opt-btn"
            title="将左边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0)"
          >
            不再出现左边的角色
          </button>
        </td>
        <td>
          <button
            class="btn opt-btn"
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
            class="btn opt-btn"
            title="将两边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0, 1)"
          >
            不再出现这两个角色
          </button>
        </td>
        <td>
          <button
            class="btn opt-btn"
            title="重新作答上一题"
            @click="previous"
            :disabled="questionCount === 1 || isPrevious"
          >
            等下，选错了……
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="btn back-btn"
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

import SortObject from '../utils/SortObject'
import IDSortTree from '../utils/IDSortTree'
import characters from '../data/characters'
import Character from './Character'

export default {
  name: 'Select',

  components: { Character },

  props: ['gamelist', 'ranknum', 'face'],

  data: () => ({
    pair: [],
    bkpPair: [],
    questionCount: 1,
    currentRank: 0,
    isPrevious: false
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
    this.bkpRtNode = new IDSortTree()
    this.bkpRtNode.setupCTree()
    this.bkpRtNode.initTree(this.rtNode, this.bkpRtNode)
  },

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
    backup () {
      this.bkpPair = [this.pair[0], this.pair[1]]
      this.bkpRtNode.setupCTree()
      this.bkpRtNode.initTree(this.rtNode, this.bkpRtNode)
    },
    restore () {
      this.pair = [this.bkpPair[0], this.bkpPair[1]]
      this.bkpPair = null
      this.currentRank = 0
      this.rtNode = this.bkpRtNode.restoreCTree(this.bkpRtNode, null)
    },
    ask (node, pair) {
      if (pair) {
        let left = node.findSortObjectById(pair[0].id)
        let right = node.findSortObjectById(pair[1].id)
        if (left !== null && right !== null) {
          return [left, right]
        }
      }
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
    nextPair (back) {
      if (back) {
        this.pair = this.ask(this.rtNode, this.pair)
      } else {
        this.pair = this.ask(this.rtNode)
      }
      if (this.pair && this.pair[1].level() <= this.ranknum) {
        this.questionCount += 1
        return true
      }
      return false
    },
    moveOn (back) {
      const { ranknum, face } = this
      if (!this.nextPair(back)) {
        let ranking = []
        let node = this.rtNode
        for (let i = 0; i < ranknum; i++) {
          node = node.children[0]
          if (!node) {
            break
          }
          ranking.push(node)
        }
        this.$emit('next', 'Result', { ranking, face })
      }
    },
    selectChar (index) {
      this.backup()
      this.pair[index].add(this.pair[1 - index], false)
      this.isPrevious = false
      this.moveOn(false)
    },
    getImage (char) {
      return `${TH_CHAR_PATH}/${this.face}/${char.img}.png`
    },
    exclude (...indices) {
      this.backup()
      for (let i of indices) {
        this.pair[i].remove()
      }
      this.moveOn(false)
    },
    previous () {
      this.restore()
      this.questionCount -= 2
      this.isPrevious = true
      this.moveOn(true)
    }
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.emphasize
  color #d00

table
  margin-left auto
  margin-right auto
  margin-bottom 2em
  border-spacing 0.4em
  border-collapse separate
  vertical-align middle

td
  padding-left 0.5em
  padding-right 0.5em
  padding-bottom 0.3em

  tr.characters > &
    padding-bottom 0.8em

.btn
  display block
  width 100%
  font-size 1em
  line-height 2em
  appearance none
  user-select none
  border none
  border-radius 0.4em
  color #fff
  border-radius 0.4em
  cursor pointer
  padding 0.2em 0.4em
  transition 0.3s ease

  &:focus
    outline 0

  &:disabled
    cursor default

active-bg-color(color)
  background-color color

  &:disabled
    background-color #ccc

  &:hover
    background-color lighten(color, 30%)

  &:active
    background-color darken(color, 30%)

.opt-btn
  active-bg-color($accentColor)

.back-btn
  active-bg-color(#f33)

</style>