<template>
  <div>
    <h2 class="tac">您的前 {{ ranking.length }} 位本命角色排行：</h2>
    <div
      v-for="[size, start, end] in rankingGroups"
      :class="['tac', size]"
      :key="start"
    >
      <ResultChar
        v-for="(char, index) in ranking.slice(start, end)"
        :key="index"
        :rank="index + start + 1"
        :node="char"
        :face="face"
        :size="size"
      />
    </div>
    <div class="preference tac">
      <h3>偏好分数</h3>
      <table>
        <tr>
          <th>标签</th>
          <th>参考值</th>
        </tr>
        <tr>
          <th>萝莉</th>
          <th>{{ preference.loli }}</th>
        </tr>
        <tr>
          <td>BBA</td>
          <td>{{ preference.bba }}</td>
        </tr>
      </table>
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

function group (length, groupLength, startIndex) {
  const groups = new Array(Math.ceil(length / groupLength)).fill()
  groups[groups.length - 1] = length % groupLength
  return groups.map((_, index) => {
    if (index < groups.length - 1) {
      const start = groupLength * index + startIndex
      return ['sm', start, groupLength + start]
    }
    const end = length + startIndex
    return ['sm', end - (length % groupLength || groupLength), end]
  })
}

export default {
  name: 'Result',

  components: {
    ResultChar,
    Button,
  },

  props: ['ranking', 'face'],

  data () {
    return {
      preference: {
        loli: 0,
        bba: 0,
      },
    }
  },

  computed: {
    rankingGroups () {
      switch (this.ranking.length) {
        case 1: return [['lg', 0, 1]]
        case 5: return [['lg', 0, 2], ['md', 2, 5]]
        case 7: return [['lg', 0, 2], ['lg', 2, 4], ['md', 4, 7]]
        default: return [
          ['lg', 0, 2],
          ['md', 2, 5],
          ...group(this.ranking.length - 5, 5, 5),
        ]
      }
    },
  },

  created () {
    const weightnum = Math.min(10, this.ranking.length)
    const chars = this.ranking.slice(0, weightnum)
    const weights = chars.map((char, index) => {
      return 1 / ((index + 4) * (1 + 1.1 ** (index + 1 - char.meta.rank_cn7)))
    })

    for (const tag in this.preference) {
      this.preference[tag] = weights.filter((w, index) => {
        return chars[index].tags.includes(tag)
      }).reduce((sum, w) => sum + w, 0)
    }
  },

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
  },
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
