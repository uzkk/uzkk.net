<template>
  <footer>
    <slot>
      <p>
        <span>Powered by </span>

        <a
          href="https://vuepress.vuejs.org"
          target="_blank"
        >
          VuePress
        </a>
      </p>
    </slot>
  </footer>
</template>

<style lang="stylus">

footer
  color $grayTextColor
  padding 1.5rem 0
  text-align center
  border-top 1px solid $borderColor

</style>
