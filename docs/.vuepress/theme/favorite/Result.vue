<template>
  <div>
    <div class="tac">
      <h3>您的前 {{ranking}} 位本命角色排行：</h3>
    </div>
    <ul>
      <li v-for="(char, index) in ranking" :key="index">
        第 {{index + 1}} 名：{{char}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {}
  },
  methods: {},
  props: ['ranknum', 'ranking']
}
</script>

<style scoped>
.tac {
  text-align: center !important;
}
</style>