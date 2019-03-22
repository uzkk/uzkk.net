<template>
  <div>
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
  props: ['ranknum', 'ranking'],
  data () {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.tac {
  text-align: center !important;
}
</style>