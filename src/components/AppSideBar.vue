<template>
  <aside class="pt-8 space-y-5 overflow-x-hidden bg-white border-r">
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
    <ul class="w-56 mx-3 space-y-1 pl-px">
      <app-side-bar-link
        :is-open="isOpen"
        label="Início"
        icon="home"
        to="/"
        @toggle="$emit('toggle')"
      />
      <app-side-bar-link
        :is-open="isOpen"
        label="Clientes"
        icon="profile"
        to="/clientes"
        @toggle="$emit('toggle')"
      />
      <app-side-bar-link
        :is-open="isOpen"
        label="Veículos"
        icon="car"
        to="/veiculos"
        @toggle="$emit('toggle')"
      />
      <app-side-bar-link
        :is-open="isOpen"
        label="Triangulação"
        icon="triangle"
        to="/triangulacao"
        @toggle="$emit('toggle')"
      />
      <app-side-bar-link
        :is-open="isOpen"
        label="Financeiro"
        icon="wallet"
        disabled
        to="/financeiro"
        @toggle="$emit('toggle')"
      />
    </ul>
    <!-- End: Navigation -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'
import AppSideBarLink from './AppSideBarLink.vue'

export default defineComponent({
  name: 'AppSideBar',
  components: { AppSideBarLink, Icon },
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
