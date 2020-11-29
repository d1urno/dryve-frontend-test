<template>
  <main class="p-6 bg-gray-100">
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Top Card 1 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 sm:col-span-1"
      >
        <p class="text-black opacity-50 text-opacity-80">AVALIAÇÕES HOJE</p>
        <div class="flex items-center justify-between">
          <p class="py-2 text-4xl text-black text-opacity-80">29</p>
          <span
            class="flex items-center justify-center rounded-full bg-blue-50 c-icon-dimensions"
          >
            <icon type="car" class="w-10 h-10 text-blue-600" />
          </span>
        </div>
        <div class="flex">
          <icon type="arrow-up" class="w-6 h-6 -ml-1 text-blue-600" />
          <p class="text-purple-500">36%</p>
          <p class="ml-2 text-black opacity-50 text-opacity-80">desde ontem</p>
        </div>
      </section>
      <!-- End: Top Card 1 -->

      <!-- Top Card 2 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 sm:col-span-1"
      >
        <p class="text-black opacity-50 text-opacity-80">CARROS PUBLICADOS</p>
        <div class="flex items-center justify-between">
          <p class="py-2 text-4xl text-black text-opacity-80">397</p>
          <span
            class="flex items-center justify-center rounded-full bg-blue-50 c-icon-dimensions"
          >
            <icon type="devices" class="w-10 h-10 text-blue-600" />
          </span>
        </div>
        <div class="flex">
          <icon type="arrow-up" class="w-6 h-6 -ml-1 text-blue-600" />
          <p class="text-purple-500">4%</p>
          <p class="ml-2 text-black opacity-50 text-opacity-80">este mês</p>
        </div>
      </section>
      <!-- End: Top Card 2 -->

      <!-- Top Card 3 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 md:col-span-1"
      >
        <p class="text-black opacity-50 text-opacity-80">
          TICKET MÉDIO DO ESTOQUE
        </p>
        <div class="flex items-center justify-between">
          <p class="py-2 text-4xl text-black text-opacity-80">R$ 42.567</p>
          <span
            class="flex items-center justify-center rounded-full bg-blue-50 c-icon-dimensions"
          >
            <icon type="money" class="w-10 h-10 text-blue-600" />
          </span>
        </div>
        <div class="flex">
          <icon type="arrow-down" class="w-6 h-6 mt-px -ml-1 text-red-500" />
          <p class="text-red-500">6%</p>
          <p class="ml-2 text-black opacity-50 text-opacity-80">este mês</p>
        </div>
      </section>
      <!-- End: Top Card 3 -->
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../components/Icon.vue'

export default defineComponent({
  components: { Icon },
  setup() {
    return {}
  }
})
</script>

<style>
.c-icon-dimensions {
  width: 64px;
  height: 64px;
}
.c-list-max-height {
  max-height: 35rem;
}
</style>
