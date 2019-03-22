<template>
  <TransitionFadeSlide>
    <component :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
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
    state: {},
  }),

  methods: {
    updatePhase (nextPhase, state) {
      Object.assign(this.state, state)
      this.phase = nextPhase
    },
  },
}
</script>
