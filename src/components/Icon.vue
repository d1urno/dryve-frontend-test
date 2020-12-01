<template>
  <i
    class="inline-flex items-center justify-center"
    role="presentation"
    :aria-label="type"
  >
    <component :is="type" v-bind="$attrs" />
  </i>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  components: {
    home: defineAsyncComponent(() => import('../assets/icons/home.vue')),
    profile: defineAsyncComponent(() => import('../assets/icons/profile.vue')),
    car: defineAsyncComponent(() => import('../assets/icons/car.vue')),
    triangle: defineAsyncComponent(
      () => import('../assets/icons/triangle.vue')
    ),
    wallet: defineAsyncComponent(() => import('../assets/icons/wallet.vue')),
    exit: defineAsyncComponent(() => import('../assets/icons/exit.vue')),
    search: defineAsyncComponent(() => import('../assets/icons/search.vue')),
    notifications: defineAsyncComponent(
      () => import('../assets/icons/notifications.vue')
    ),
    help: defineAsyncComponent(() => import('../assets/icons/help.vue')),
    money: defineAsyncComponent(() => import('../assets/icons/money.vue')),
    devices: defineAsyncComponent(() => import('../assets/icons/devices.vue')),
    'arrow-down': defineAsyncComponent(
      () => import('../assets/icons/arrow-down.vue')
    ),
    'arrow-up': defineAsyncComponent(
      () => import('../assets/icons/arrow-up.vue')
    ),
    'arrow-right': defineAsyncComponent(
      () => import('../assets/icons/arrow-right.vue')
    ),
    'chevron-left': defineAsyncComponent(
      () => import('../assets/icons/chevron-left.vue')
    ),
    'chevron-right': defineAsyncComponent(
      () => import('../assets/icons/chevron-right.vue')
    ),
    more: defineAsyncComponent(() => import('../assets/icons/more.vue')),
    'ic-filter': defineAsyncComponent(
      () => import('../assets/icons/filter.vue')
    ),
    add: defineAsyncComponent(() => import('../assets/icons/add.vue'))
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
})
</script>
