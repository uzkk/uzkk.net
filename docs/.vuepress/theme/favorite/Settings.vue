<template>
  <div>
    <div class="ranknum tac">
      选择排名数：
      <span class="rank-item" v-for="(num, index) in ranks" :key="index">
        <input type="radio" :value="num" v-model="ranknum">
        <label>{{ num }}</label>
      </span>
    </div>
    <div class="ranknum tac">
      选择立绘表情：
      <span class="rank-item" v-for="(key, value) in faces">
        <input type="radio" :value="value" v-model="face">
        <label>{{ key }}</label>
      </span>
    </div>
    <div class="tac">
      <button class="start-btn" @click="$emit('next', 'Select', { ranknum, face })">开始！</button>
    </div>
  </div>
</template>

<script>
const ranks = [1, 5, 7, 10, 20]

const faces = {
  default: '正常',
  smiling: '笑脸',
}

export default {
  name: 'Settings',
  data: () => ({
    ranknum: 1,
    face: 'default',
  }),
  created () {
    this.faces = faces
    this.ranks = ranks
  },
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