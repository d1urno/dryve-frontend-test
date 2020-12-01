<template>
  <div class="flex items-center justify-between px-6 bg-white border-b">
    <app-hamburger
      class="-ml-5 md:hidden"
      :is-open="isOpen"
      @toggle="$emit('toggle')"
    />
    <router-link to="/" class="flex items-center space-x-1 md:space-x-2">
      <img src="/src/assets/logo.svg" alt="" />
      <span
        class="mt-2 -mb-1 text-gray-400 uppercase text-tiny md:text-xs font-body"
      >
        Backoffice
      </span>
    </router-link>
    <div class="flex space-x-1 md:space-x-3">
      <router-link to="/" class="pt-2 pl-1 pr-2 -ml-1 -mr-2">
        <icon type="search" class="w-6 h-6 text-black text-opacity-30" />
      </router-link>
      <router-link to="/" class="pt-2 pl-1 pr-2 -ml-1 -mr-2">
        <icon
          type="notifications"
          class="w-6 h-6 text-blue-600 text-opacity-30"
        />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'
import AppHamburger from './AppHamburger.vue'

export default defineComponent({
  name: 'AppNavBar',
  components: { Icon, AppHamburger },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle'],
  setup() {
    return {}
  }
})
</script>
