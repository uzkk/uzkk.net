<template>
  <div>
    <div class="hint tac">
      请选择更喜欢的角色（点击图片或第一行按钮）
    </div>
    <table class="tac vam">
      <tr>
        <td>
          <img class="char-img" :src="getImage(pair[0])" :alt="pair[0].name" @click="selectChar(0)">
        </td>
        <td>
          <img class="char-img" :src="getImage(pair[1])" :alt="pair[1].name" @click="selectChar(1)">
        </td>
      </tr>
      <tr>
        <td>
          <div class="opt-btn" @click="selectChar(0)">选择左边的角色</div>
        </td>
        <td>
          <div class="opt-btn" @click="selectChar(1)">选择右边的角色</div>
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
          <div class="opt-btn" data-toggle="tooltip" title="本题与接下来的问题将全部由系统随机选择" @click="random">不想做了，接下来随便选吧</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import SortObject from '../../utils/SortObject.js'
import characters from '../data/characters.json'

let rtNode = new SortObject(["!root", , , , ])
for (let char of characters) {
  rtNode.add(new SortObject(char), false)
}

export default {
  name: 'Select',
  data () {
    return {
      pair: this.ask(rtNode),
      currentRank: 0
    }
  },
  methods: {
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
      this.pair = this.ask(rtNode)
      if (this.pair) {
        return this.pair[1].level() <= this.ranknum
      }
      return false
    },
    selectChar (index) {
      this.pair[index].add(this.pair[1 - index], false)
      if (!this.nextPair()) {
        $emit('next', 'Result')
      }
    },
    getImage (char) {
      // TODO: get character image
    },
    exclude (char) {
      // TODO: exclude character from list
    },
    random () {
      // TODO: from now on all questions will be answered at random
    }
  },
  props: ['ranknum']
}
</script>

<style scoped>
.tac {
  text-align: center !important;
}

.vam {
  vertical-align: middle !important;
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

.opt-btn {
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