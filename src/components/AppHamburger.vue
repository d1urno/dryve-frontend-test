<template>
  <!-- Hamburger -->
  <button
    id="hamburger"
    class="p-4 -ml-4 -mr-1 transform scale-75 c-no-select hamburger hamburger--slider focus:outline-none"
    type="button"
    aria-label="Menu"
    aria-controls="navigation"
    data-test-id="toggle"
    :class="{ 'is-active': isOpen }"
    @click="$emit('toggle')"
  >
    <span id="hamburger-box" class="hamburger-box">
      <span id="hamburger-inner" class="hamburger-inner"></span>
    </span>
  </button>
  <!-- End: Hamburger -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHamburger',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle']
})
</script>

<style scoped>
.hamburger-box {
  width: 30px;
  height: 24px;
  display: block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 40px;
  height: 4px;
  background-color: theme('colors.blue.500');
  border-radius: 4px;
  position: absolute;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}

.hamburger--slider .hamburger-inner {
  top: 2px;
}
.hamburger--slider .hamburger-inner::before {
  top: 10px;
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 0.15s;
}
.hamburger--slider .hamburger-inner::after {
  top: 20px;
}

.hamburger--slider.is-active .hamburger-inner {
  transform: translate3d(0, 10px, 0) rotate(45deg);
}
.hamburger--slider.is-active .hamburger-inner::before {
  transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
  opacity: 0;
}
.hamburger--slider.is-active .hamburger-inner::after {
  transform: translate3d(0, -20px, 0) rotate(-90deg);
}
</style>
