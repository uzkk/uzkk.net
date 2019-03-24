<template>
  <div>
    <div class="back-btn-container tac">
      <Button
        class="res-page-back-btn"
        title="返回主界面"
        type="warning"
        @click="backToSettings"
      >
        返回主界面
      </Button>
    </div>
    <div class="preference tac">
      <h3>偏好分数</h3>
      <table>
        <tr>
          <th>萝莉</th>
          <th>BBA</th>
        </tr>
        <tr>
          <td>{{ preference.loli }}</td>
          <td>{{ preference.bba }}</td>
        </tr>
      </table>
    </div>
    <div class="tac">
      <h2>您的前 {{ ranking.length }} 位本命角色排行：</h2>
    </div>
    <div v-if="ranking.length >= 1">
      <table>
        <tr>
          <td class="lg" v-for="(_, index) in ranking.slice(0, 2)">
            第 {{ index + 1 }} 位
          </td>
        </tr>
        <tr class="character">
          <td class="lg" v-for="(char, index) in ranking.slice(0, 2)" :key="index">
            <ResultChar :node="char" :face="face" :size="'lg'"></ResultChar>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="ranking.length >= 3">
      <table>
        <tr>
          <td class="md" v-for="(_, index) in ranking.slice(2, 5)">
            第 {{ index + 3 }} 位
          </td>
        </tr>
        <tr class="character">
          <td class="md" v-for="(char, index) in ranking.slice(2, 5)" :key="index">
            <ResultChar :node="char" :face="face" :size="'md'"></ResultChar>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="ranking.length >= 6">
      <table>
        <tr>
          <td class="sm" v-for="(_, index) in ranking.slice(5, 10)">
            第 {{ index + 6 }} 位
          </td>
        </tr>
        <tr class="character">
          <td class="sm" v-for="(char, index) in ranking.slice(5, 10)" :key="index">
            <ResultChar :node="char" :face="face" :size="'sm'"></ResultChar>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="ranking.length >= 11">
      <table>
        <tr>
          <td class="xs" v-for="(_, index) in ranking.slice(10, 20)">
            第 {{ index + 11 }} 位
          </td>
        </tr>
        <tr class="character">
          <td class="xs" v-for="(char, index) in ranking.slice(10, 20)" :key="index">
            <ResultChar :node="char" :face="face" :size="'xs'"></ResultChar>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="ranking.length >= 21">
      <ul>
        <li v-for="(char, index) in ranking.slice(20)" :key="index">
          第 {{ index + 21 }} 位：{{ char.name }}
        </li>
      </ul>
    </div>
    <div class="back-btn-container tac">
      <Button
        class="res-page-back-btn"
        title="返回主界面"
        type="warning"
        @click="backToSettings"
      >
        返回主界面
      </Button>
    </div>
  </div>
</template>

<script>
import ResultChar from './ResultChar'
import Button from './Button'
import characters from '@dynamic/characters'

export default {
  name: 'Result',
  components: {
    ResultChar,
    Button
  },
  props: ['ranking', 'face'],
  data () {
    return {
      preference: {
        loli: 0,
        bba: 0
      }
    }
  },
  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    }
  },
  created () {
    let weightnum = Math.min(10, this.ranking.length)
    let chars = this.ranking.slice(0, weightnum)
    let weights = chars.map((char, index) => {
      return 1 / ((index + 4) * (1 + 1.1 ** (index + 1 - char.meta.rank_cn7)))
    })

    for (let tag in this.preference) {
      this.preference[tag] = weights.filter((w, index) => {
        return chars[index].tags.includes(tag)
      }).reduce((sum, w) => sum + w, 0)
    }
  }
}
</script>

<style scoped>
.tac {
  text-align: center !important;
}

.back-btn-container {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.7em;
  padding-bottom: 1.7em;
}

.res-page-back-btn {
  width: 100%;
  display: block;
}

table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5em;
  margin-bottom: 0.7em;
  text-align: center !important;
}

td {
  padding-bottom: 0.3em;
}

td.lg {
  padding-left: 2em;
  padding-right: 2em;
}

td.md {
  padding-left: 1.5em;
  padding-right: 1.5em;
}

td.sm {
  padding-left: 1.2em;
  padding-right: 1.2em;
}

td.xs {
  padding-left: 0.8em;
  padding-right: 0.8em;
}

tr.character {
  padding-bottom: 0.8em
}
</style>