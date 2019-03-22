<template>
  <div class="char-view">
    <img :src="src" :alt="node.name" @click.stop="$emit('click')">
    <div class="info">
      <div class="name">{{ node.name }}</div>
      <div class="nick">{{ node.nick }}</div>
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
  box-shadow 0 0 2px 1px #0008

  img
    display block
    cursor pointer

  .info
    opacity 0
    position absolute
    width 100%
    transition 0.3s ease
    background #0008
    color #fffc
    bottom 0
    line-height 1.6
    padding 0.2em 0

    .name
      font-size 1.2em

  &:hover
    .info
      opacity 1

</style>
