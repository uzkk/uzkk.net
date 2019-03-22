<template>
  <div>
    <PageHeader />

    <main class="main-container">
      <TransitionFadeSlide>
        <component :is="layout" :key="$page.path" />
      </TransitionFadeSlide>
    </main>

    <PageFooter v-if="$frontmatter.footer" />
  </div>
</template>

<script>

import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue'
import PageHeader from '@theme/components/PageHeader.vue'
import PageFooter from '@theme/components/PageFooter.vue'

export default {
  components: {
    TransitionFadeSlide,
    PageHeader,
    PageFooter,
  },

  computed: {
    layout () {
      const layout = this.$page.frontmatter.layout
      if (layout && (this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }

      return 'Home'
    },
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"/>

<style lang="stylus">

.main-container
  margin 0 auto
  padding 0 1rem
  @media (min-width $MQWide)
    max-width (($MQWide + $MQNarrow) / 2)
  @media (min-width $MQNarrow) and (max-width $MQWide - 1px)
    max-width $MQNarrow
  @media (max-width $MQMobile - 1px)
    padding 0 0.5rem

</style>