<template>
  <main class="p-6 bg-gray-100">
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Top Card 1 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 sm:col-span-1"
      >
        <p class="text-xs tracking-widest text-black text-opacity-50">
          AVALIAÇÕES HOJE
        </p>
        <div class="flex items-center justify-between">
          <p class="py-2 text-4xl text-black text-opacity-80">29</p>
          <span
            class="flex items-center justify-center rounded-full bg-blue-50 c-icon-dimensions"
          >
            <icon type="car" class="w-10 h-10 text-blue-600" />
          </span>
        </div>
        <div class="flex items-center -ml-1">
          <icon type="arrow-up" class="w-5 h-5 text-blue-600" />
          <div class="flex items-baseline">
            <p class="text-sm text-purple-700">36%</p>
            <p class="ml-2 text-xs text-black text-opacity-50">desde ontem</p>
          </div>
        </div>
      </section>
      <!-- End: Top Card 1 -->

      <!-- Top Card 2 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 sm:col-span-1"
      >
        <p class="text-xs tracking-widest text-black text-opacity-50">
          CARROS PUBLICADOS
        </p>
        <div class="flex items-center justify-between">
          <p class="py-2 text-4xl text-black text-opacity-80">397</p>
          <span
            class="flex items-center justify-center rounded-full bg-blue-50 c-icon-dimensions"
          >
            <icon type="devices" class="w-10 h-10 text-blue-600" />
          </span>
        </div>
        <div class="flex items-center -ml-1">
          <icon type="arrow-up" class="w-5 h-5 text-blue-600" />
          <div class="flex items-baseline">
            <p class="text-sm text-purple-700">4%</p>
            <p class="ml-2 text-xs text-black text-opacity-50">este mês</p>
          </div>
        </div>
      </section>
      <!-- End: Top Card 2 -->

      <!-- Top Card 3 -->
      <section
        class="col-span-2 px-6 py-3 bg-white border border-black rounded border-opacity-10 md:col-span-1"
      >
        <p class="text-xs tracking-widest text-black text-opacity-50">
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
        <div class="flex items-center -ml-1">
          <icon type="arrow-down" class="w-5 h-5 text-red-500" />
          <div class="flex items-baseline">
            <p class="text-sm text-red-500">6%</p>
            <p class="ml-2 text-xs text-black text-opacity-50">este mês</p>
          </div>
        </div>
      </section>
      <!-- End: Top Card 3 -->

      <!-- Cars card -->
      <section
        class="col-span-2 pt-5 bg-white border border-black rounded border-opacity-10"
      >
        <div class="flex justify-between px-6 text-sm">
          <p>Últimas avaliações</p>
          <button type="button" class="flex pt-1 pl-2 -mt-1 -ml-2">
            <span>Hoje</span>
            <icon
              type="arrow-down"
              class="w-6 h-6 text-black text-opacity-50"
            />
          </button>
        </div>

        <!-- Car list -->
        <div
          class="flex px-6 py-5 tracking-widest text-black text-opacity-50 uppercase border-b text-tiny"
        >
          <p class="w-7/12">Dados do veículo</p>
          <div class="flex w-6/12">
            <p class="w-6/12">Valor</p>
            <p class="w-6/12">Status</p>
          </div>
        </div>
        <div class="overflow-y-auto divide-y c-list-max-height c-custom-bar">
          <card-car
            v-for="car in cars"
            :key="car.vehicle_uuid"
            :car="car"
            class="px-6"
          />
        </div>
        <button
          type="button"
          class="flex items-center px-6 py-2 ml-auto text-sm text-blue-600"
        >
          <span>Ver tudo</span>
          <icon type="arrow-right" class="w-6 h-6" />
        </button>
        <!-- End: Car list -->
      </section>
      <!-- End: Cars card -->

      <div
        class="col-span-2 lg:col-span-1 md:flex md:space-x-5 lg:block lg:space-x-0"
      >
        <!-- Top brands card -->
        <section
          class="flex-1 px-6 pt-5 mb-5 bg-white border border-black rounded border-opacity-10"
        >
          <p class="mb-8 text-sm text-black text-opacity-80">
            Top intenções de compra
          </p>
          <ul class="text-sm divide-y">
            <li
              v-for="intention in intentions"
              :key="intention.id"
              class="flex items-center justify-between py-4"
            >
              <figure class="flex items-center space-x-4">
                <img
                  :src="intention.image"
                  :alt="intention.name"
                  :srcset="intention.hq"
                />
                <figcaption class="text-black text-opacity-80">
                  {{ intention.name }}
                </figcaption>
              </figure>
              <p class="mr-10 text-black text-opacity-80">
                {{ intention.quantity }}
              </p>
            </li>
          </ul>
        </section>
        <!-- End: Top brands card -->

        <!-- Dryve pie chart card -->
        <section
          class="flex-1 px-6 py-5 mb-auto bg-white border border-black rounded border-opacity-10"
        >
          <p class="flex items-center mb-5 text-sm text-black text-opacity-80">
            <span>Preços - Dryve x KBB</span>
            <icon type="help" class="w-5 h-5 ml-2 text-black text-opacity-20" />
          </p>
          <figure class="flex items-center">
            <pie-chart class="-m-3" />
            <div
              class="flex flex-col items-center justify-center flex-1 w-full"
            >
              <div class="ml-3 text-sm">
                <span class="block space-x-2 text-black text-opacity-80">
                  <span
                    class="inline-block w-2 h-2 mb-px bg-blue-500 rounded-full"
                  />
                  <span>Na média</span
                  ><span class="text-xs text-gray-300">60%</span>
                </span>
                <span class="block space-x-2 text-black text-opacity-80">
                  <span
                    class="inline-block w-2 h-2 mb-px bg-red-500 rounded-full"
                  />
                  <span>Acima da média</span
                  ><span class="text-xs text-gray-300">60%</span>
                </span>
                <span class="block space-x-2 text-black text-opacity-80">
                  <span
                    class="inline-block w-2 h-2 mb-px bg-yellow-500 rounded-full"
                  />
                  <span>Abaixo da média</span
                  ><span class="text-xs text-gray-300">60%</span>
                </span>
              </div>
            </div>
          </figure>
        </section>
        <!-- End: Dryve pie chart card -->
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from '../components/Icon.vue'
import CardCar from '../components/CardCar.vue'
import { useStore } from '../store'
import { CARS, FETCH_CARS, INTENTIONS } from '../store/store-constants'
import { Car, Intention } from '../types'
import PieChart from '../components/PieChart.vue'

export default defineComponent({
  components: { PieChart, CardCar, Icon },
  setup() {
    const store = useStore()
    const cars = computed<Car[]>(() => store.getters[CARS]())
    if (cars.value.length === 0) store.dispatch(FETCH_CARS)

    const intentions = computed<Intention[]>(() => store.getters[INTENTIONS]())

    return { cars, intentions }
  }
})
</script>

<style>
.c-icon-dimensions {
  width: 64px;
  height: 64px;
}
.c-list-max-height {
  max-height: 33rem;
}
/* Works on Chrome/Edge/Safari */
.c-custom-bar::-webkit-scrollbar {
  @apply w-2 bg-white;
}
.c-custom-bar::-webkit-scrollbar-thumb {
  @apply bg-black bg-opacity-10 rounded;
}
</style>
