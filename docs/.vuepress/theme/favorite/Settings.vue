<template>
  <div>
    <div class="ranknum tac">
      选择排名数：
      <span class="rank-item" v-for="num in ranks">
        <input type="radio" :value="num" v-model="ranknum">
        <label>{{num}}</label>
      </span>
    </div>
    <div class="ranknum tac">
      选择立绘表情：
      <span class="rank-item" v-for="_face in faces">
        <input type="radio" :value="_face" v-model="face">
        <label>{{_face}}</label>
      </span>
    </div>
    <div class="tac">
      <button class="start-btn" @click="$emit('next', 'Select', { ranknum, face })">开始！</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      ranks: [1, 5, 7, 10, 20],
      ranknum: 1,
      faces: ['正常', '笑脸'],
      face: '正常'
    }
  },
  methods: {},
  props: [],
}
</script>

<style scoped>
.tac {
  text-align: center;
}

.ranknum {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rank-item {
  margin-left: 0.5em;
  margin-right: 0.8em;
}

.start-btn {
  margin-top: 0.3em;
  margin-bottom: 1em;
}
</style>