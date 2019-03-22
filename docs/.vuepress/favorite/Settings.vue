<template>
  <div>
    <div class="title">本命测试</div>
    <span class="ranknum">
      <span class="rank-item" v-for="num in ranks">
        <input type="radio" v-model="ranknum">
        <label>{{num}}</label>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      ranks: [1, 5, 7, 10, 20],
      ranknum: 1
    }
  },
  methods: {},
  props: []
}
</script>

<style scoped>

</style>