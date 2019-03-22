<template>
  <div>
    <div class="back-btn-container">
      <button class="back-btn" @click="backToSettings">返回主界面</button>
    </div>
    <div class="tac">
      <h3>您的前 {{ ranking.length }} 位本命角色排行：</h3>
    </div>
    <ul>
      <li v-for="(char, index) in ranking" :key="index">
        第 {{ index + 1 }} 名：{{ char }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Result',
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
</style>