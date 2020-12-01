<template>
  <transition name="slide-right">
    <!-- prettier-ignore -->
    <app-side-bar
      v-if="isOpen || !isMobile"
      class="absolute inset-0 z-30 w-64 top-16
      transition-all ease-out transform shadow-lg
      md:top-0 md:transform-none md:shadow-none"
      :class="{ 'md:w-20': !isOpen }"
      :is-open="isOpen"
      @mouseover="!isMobile ? showMenu(true) : false"
      @mouseleave="!isMobile ? showMenu(false) : false"
      @navigation="showMenu(false, true)"
    />
  </transition>
  <app-nav-bar
    class="absolute inset-0 z-20 h-16 md:ml-20"
    :is-open="isOpen"
    @toggle="showMenu(!isOpen)"
  />
  <!-- Mobile backdrop -->
  <transition name="fade">
    <button
      v-if="isOpen"
      type="button"
      class="fixed inset-0 z-10 w-full bg-black cursor-default md:hidden opacity-20 focus:outline-none"
      tabindex="-1"
      @mousedown="showMenu(false)"
    />
  </transition>
  <!-- End: Mobile backdrop -->
  <div
    class="flex flex-col mt-16 overflow-x-hidden overflow-y-auto md:ml-20 c-content"
  >
    <router-view v-slot="{ Component }" class="flex-1">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <AppFooter class="h-16" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import AppSideBar from './components/AppSideBar.vue'
import AppNavBar from './components/AppNavBar.vue'
import AppFooter from './components/AppFooter.vue'
import { WINDOW_WIDTH } from './store/store-constants'
import { useStore } from './store'

export default defineComponent({
  name: 'App',
  components: { AppSideBar, AppNavBar, AppFooter },
  setup() {
    const store = useStore()
    // Menu handling
    const isOpen = ref(false)
    const waiting = ref(false)
    const showMenu = (val: boolean, pause = false) => {
      if (waiting.value) return
      isOpen.value = val
      if (!pause) return
      waiting.value = true
      setTimeout(() => {
        waiting.value = false
      }, 200)
    }

    // Menu responsive behavior
    const isMobile = computed(() => store.getters[WINDOW_WIDTH] < 768)
    const onResize = () => store.commit(WINDOW_WIDTH)
    onMounted(() => window.addEventListener('resize', onResize))
    onUnmounted(() => window.removeEventListener('resize', onResize))

    return { isOpen, showMenu, isMobile }
  }
})
</script>

<style scoped>
.c-content {
  max-height: calc(100vh - theme('spacing.16'));
  height: calc(100vh - theme('spacing.16'));
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
.fade-leave-active,
.fade-enter-active {
  @apply transition duration-300 ease-out;
}
.slide-right-enter-from,
.slide-right-leave-to {
  @apply -translate-x-full;
}
</style>

<style>
/*****************************************
   Remove highlight blue color on buttons
   when tapped, only for mobile devices
  *****************************************/
@layer base {
  a,
  button,
  label {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
.scale-enter-from {
  @apply transform scale-105 opacity-0;
}
.scale-leave-to {
  @apply transform scale-105 opacity-0;
}
.scale-leave-active,
.scale-enter-active {
  @apply transition duration-300 origin-top;
}
</style>
