<template>
  <aside
    class="pt-8 space-y-5 overflow-x-hidden bg-white border-l-2 border-r-2"
  >
    <figure class="flex items-center w-56 space-x-3">
      <!-- prettier-ignore -->
      <img
        class="box-content object-cover w-12 h-12 ml-3
        border-2 border-white rounded-full ring-2 ring-blue-600"
        src="/src/assets/img/Steven.jpg"
        alt=""
      />
      <figcaption :class="{ hidden: !isOpen }" class="pl-1">
        <p class="text-sm text-black text-opacity-80">Vinicius Malara</p>
        <button type="button" class="flex items-center block px-1 -mx-1">
          <icon
            type="exit"
            class="inline-flex w-3 h-3 -ml-px text-black text-opacity-40"
          />
          <span
            class="pl-1 text-xs tracking-widest text-black uppercase text-opacity-40"
          >
            Sair
          </span>
        </button>
      </figcaption>
    </figure>

    <!-- Navigation -->
    <ul class="w-56 mx-3 space-y-1">
      <li>
        <!-- prettier-ignore -->
        <router-link
          to="/"
          class="flex items-center px-3 py-2 space-x-6 text-sm group
          font-bold rounded-sm text-black text-opacity-80
          hover:bg-blue-50 hover:text-blue-600 hover:text-opacity-100"
        >
          <!-- prettier-ignore -->
          <icon type="home" class="w-6 h-6 text-black text-opacity-30
          group-hover:text-blue-600 group-hover:opacity-100" />
          <span :class="{ hidden: !isOpen }">Início</span>
        </router-link>
      </li>
      <li>
        <!-- prettier-ignore -->
        <router-link
          to="/"
          class="flex items-center px-3 py-2 space-x-6 text-sm group
          font-bold rounded-sm text-black text-opacity-80
          hover:bg-blue-50 hover:text-blue-600 hover:text-opacity-100"
        >
          <!-- prettier-ignore -->
          <icon type="profile" class="w-6 h-6 text-black text-opacity-30
          group-hover:text-blue-600 group-hover:opacity-100" />
          <span :class="{ hidden: !isOpen }">Clientes</span>
        </router-link>
      </li>
      <li>
        <!-- prettier-ignore -->
        <router-link
          to="/"
          class="flex items-center px-3 py-2 space-x-6 text-sm group
          font-bold rounded-sm text-black text-opacity-80
          hover:bg-blue-50 hover:text-blue-600 hover:text-opacity-100"
        >
          <!-- prettier-ignore -->
          <icon type="car" class="w-6 h-6 text-black text-opacity-30
          group-hover:text-blue-600 group-hover:opacity-100" />
          <span :class="{ hidden: !isOpen }">Veículos</span>
        </router-link>
      </li>
      <li>
        <!-- prettier-ignore -->
        <router-link
          to="/"
          class="flex items-center px-3 py-2 space-x-6 text-sm group
          font-bold rounded-sm text-black text-opacity-80
          hover:bg-blue-50 hover:text-blue-600 hover:text-opacity-100"
        >
          <!-- prettier-ignore -->
          <icon type="triangle" class="w-6 h-6 text-black text-opacity-30
          group-hover:text-blue-600 group-hover:opacity-100" />
          <span :class="{ hidden: !isOpen }">Triangulação</span>
        </router-link>
      </li>
      <li>
        <!-- prettier-ignore -->
        <router-link
          to="/"
          class="flex items-center px-3 py-2 space-x-6 text-sm
          font-bold rounded-sm text-black text-opacity-80 opacity-20"
        >
          <icon type="wallet" class="w-6 h-6 text-black opacity-50" />
          <span :class="{ hidden: !isOpen }">Financeiro</span>
        </router-link>
      </li>
    </ul>
    <!-- End: Navigation -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'AppSideBar',
  components: { Icon },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
