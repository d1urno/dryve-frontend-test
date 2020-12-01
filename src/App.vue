<template>
  <app-side-bar
    class="absolute inset-0 z-10 w-20 transition-all ease-out"
    :class="{ 'w-64': isOpen }"
    :is-open="isOpen"
    @mouseover="isOpen = true"
    @mouseout="isOpen = false"
  />
  <app-nav-bar class="absolute inset-0 h-16 ml-20" />
  <div class="flex flex-col mt-16 ml-20 overflow-y-auto border-r-2 c-content">
    <router-view class="flex-1" />
    <AppFooter class="h-16" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppSideBar from './components/AppSideBar.vue'
import AppNavBar from './components/AppNavBar.vue'
import AppFooter from './components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: { AppSideBar, AppNavBar, AppFooter },
  setup: () => ({ isOpen: ref(false) })
})
</script>

<style scoped>
.c-content {
  max-height: calc(100vh - theme('spacing.16'));
  height: calc(100vh - theme('spacing.16'));
}
</style>
