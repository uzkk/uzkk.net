<template>
  <div class="char-view">
    <img :src="src" :alt="node.name" @click.stop="$emit('click')">
    <div class="info">
      <div>{{ node.name }}</div>
      <div>{{ node.nick }}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['node', 'face'],

  computed: {
    src () {
      return `${TH_CHAR_PATH}/${this.face}/${this.node.img}.png`
    },
  },
}

</script>

<style lang="stylus" scoped>

.char-view
  position relative
  border 1px solid black
  box-shadow 0 2px 2px 1px #0008

  img
    display block
    cursor pointer

  .info
    position absolute
    width 100%
    transition 0.3s ease
    background #0006
    color #fffb
    bottom 0

</style>
