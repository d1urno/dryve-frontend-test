<template>
  <i
    class="inline-flex items-center justify-center"
    role="presentation"
    :aria-labelledby="type"
  >
    <component :is="type" v-bind="$attrs" />
  </i>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  components: {},
  props: {
    type: {
      type: String,
      required: true
    }
  }
})
</script>
