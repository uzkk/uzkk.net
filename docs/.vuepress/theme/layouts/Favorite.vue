<template>
  <TransitionFadeSlide>
    <component :is="phase" :key="phase"/>
  </TransitionFadeSlide>
</template>

<script>
import Result from '../favorite/Result.vue'
import Select from '../favorite/Select.vue'
import Settings from '../favorite/Settings.vue'
import TransitionFadeSlide from '../components/TransitionFadeSlide.vue'

export default {
  components: {
    Result,
    Select,
    Settings,
    TransitionFadeSlide,
  },

  data: () => ({
    phase: 'Settings',
  }),
}
</script>
