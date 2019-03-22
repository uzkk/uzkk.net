<template>
  <footer>
    <template v-if="$frontmatter.layout === 'Favorite'">
      <p>
        这种排序的原理是
        <a
          href="https://en.wikipedia.org/wiki/Pairwise_comparison"
          target="_blank"
        >Pairwise Comparison</a>。根据选择的顺序，结果可能会发生不同。
      </p>
      <p>
        图片采用了画师
        <a
          href="https://www.pixiv.net/member_illust.php?id=4920496"
          target="_blank"
        >dairi</a>
        的作品。全部人物来源于东方 Project，版权属于上海爱丽丝幻乐团。
      </p>
      <p>
        源代码已经开源到
        <a
          href="https://github.com/uzkk/uzkk.net"
          target="_blank"
        >GitHub</a>，遵循
        <a
          href="https://mit-license.org/"
          target="_blank"
        >MIT</a> 协议。脚本的使用，修改，复制等是免费的。
      </p>
    </template>
    <template v-else>
      <p>
        <span>Powered by </span>

        <a
          href="https://vuepress.vuejs.org"
          target="_blank"
        >
          VuePress
        </a>
      </p>
    </template>
  </footer>
</template>

<style lang="stylus">

footer
  color $grayTextColor
  padding 1.5rem 0
  text-align center
  border-top 1px solid $borderColor

</style>
