<template>
  <div
    class="flex items-center justify-between px-6 bg-white border-b-2 border-r-2"
  >
    <router-link to="/" class="flex items-center space-x-2">
      <img src="/src/assets/logo.svg" alt="" />
      <span class="mt-2 -mb-1 text-xs text-gray-400 uppercase font-body">
        Backoffice
      </span>
    </router-link>
    <div class="flex space-x-3">
      <router-link to="/" class="pt-1 pl-1 pr-2 -ml-1 -mr-2">
        <icon type="search" class="w-6 h-6 text-black text-opacity-30" />
      </router-link>
      <router-link to="/" class="pt-1 pl-1 pr-2 -ml-1 -mr-2">
        <icon
          type="notifications"
          class="w-6 h-6 text-blue-500 text-opacity-30"
        />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'AppNavBar',
  components: { Icon },
  setup() {
    return {}
  }
})
</script>
