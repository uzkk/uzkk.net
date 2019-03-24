<template>
  <div class="char-view" :class="size">
    <img :src="src" :alt="node.name">
    <div class="info">
      <div class="name">{{ node.name }}</div>
      <div class="nick">{{ node.nick }}</div>
    </div>
  </div>
</template>

<script>

import { getCharImage } from './utils'

export default {
  props: ['node', 'face', 'size'],

  computed: {
    src () {
      return getCharImage(this.node.id, this.face)
    },
  },
}

</script>

<style lang="stylus" scoped>

.char-view
  position relative
  max-width 100%

  img
    width 100%
    display block
    user-select none
    border 1px solid black
    box-shadow 0 0 2px 1px #0008

  .info
    width 100%
    color $textColor
    line-height 1.6
    padding 0.2em 0
    width max-content
    transform translateX(-50%)
    left 50%
    position relative

    .name
      font-size 1.2em

  &.lg
    width 180px
    font-size 1.1rem

  &.md
    width 150px
    font-size 1rem

  &.sm
    width 126px
    font-size 0.9rem

  &.xs
    width 100px
    font-size 0.8rem

</style>
