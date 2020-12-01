<template>
  <li>
    <!-- prettier-ignore -->
    <router-link
      :to="to"
      class="flex items-center px-3 py-2 space-x-6 text-sm
      font-bold rounded-sm text-black text-opacity-80
      hover:bg-blue-50 opacity-20"
      :class="{
        'hover:text-blue-600 hover:text-opacity-100 opacity-100 group': !disabled,
        'pointer-events-none': disabled || $route.path === to,
        'text-blue-600 text-opacity-100': $route.path === to
      }"
    >
      <icon
        :type="icon"
        class="w-6 h-6 text-black
        group-hover:text-blue-600 group-hover:opacity-100"
        :class="{
          'text-opacity-30': !disabled && $route.path !== to,
          'text-blue-600': $route.path === to,
          'opacity-70': disabled
        }"
      />
      <span :class="{ hidden: !isOpen }">{{ label }}</span>
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'AppSideBarLink',
  components: { Icon },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
