<template>
  <div>
    <div class="back-btn-container">
      <button class="back-btn" @click="backToSettings">返回主界面</button>
    </div>
    <div class="rank-display tac" v-if="currentRank > 0">
      排名第 {{ currentRank }} 的角色已经确定！
    </div>
    <div class="hint tac">
      第 {{ questionCount }} 轮：请选择更喜欢的角色（点击图片或第一行按钮）
    </div>
    <table class="tac vam">
      <tr>
        <td>
          <Character :face="face" :node="pair[0]" @click="selectChar(0)"/>
        </td>
        <td>
          <Character :face="face" :node="pair[1]" @click="selectChar(1)"/>
        </td>
      </tr>
      <tr>
        <td>
          <div class="opt-btn" data-toggle="tooltip" title="将左边的角色从剩余问题的角色列表中剔除" @click="exclude(0)">除外左边的角色</div>
        </td>
        <td>
          <div class="opt-btn" data-toggle="tooltip" title="将右边的角色从剩余问题的角色列表中剔除" @click="exclude(1)">除外右边的角色</div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="opt-btn" data-toggle="tooltip" title="将两边的角色从剩余问题的角色列表中剔除" @click="exclude(0, 1)">除外两边的角色</div>
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

<style scoped>
.tac {
  text-align: center !important;
}

.vam {
  vertical-align: middle !important;
}

.rank-display {
  color: #0b0;
  font-style: italic;
}

.hint {
  font-size: 1.3em;
}

table {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2em;
  border-spacing: 0.4em;
  border-collapse: separate;
}

td {
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0.3em;
}

.char-img {
  cursor: pointer;
}

.opt-btn {
  user-select: none;
  background-color: #ccf;
  color: #000;
  border-radius: 0.4em;
  cursor: pointer;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.4em;
  padding-right: 0.4em;
}

.opt-btn:hover {
  background-color: #ddf;
}

.opt-btn:focus {
  outline: 0 !important;
}

.opt-btn:active {
  background-color: #aaf;
}
</style>