<template>
  <div>
    <div class="back-btn-container">
      <button class="back-btn" @click="backToSettings">返回主界面</button>
    </div>
    <div class="tac">
      <h3>您的前 {{ ranking.length }} 位本命角色排行：</h3>
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
    <ul v-if="ranking.length >= 21">
      <li v-for="(char, index) in ranking.slice(20)" :key="index">
        第 {{ index + 21 }} 位：{{ char.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import ResultChar from './ResultChar'

export default {
  name: 'Result',
  components: {
    ResultChar
  },
  props: ['ranking', 'face'],
  data () {
    return {}
  },
  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    }
  },
}
</script>

<style scoped>
.tac {
  text-align: center !important;
}

table {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5em;
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