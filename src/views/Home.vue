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

      <!-- Cars card -->
      <section
        class="col-span-2 pt-5 bg-white border border-black rounded border-opacity-10"
      >
        <div class="flex justify-between px-6">
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
          class="flex px-6 py-5 text-xs tracking-widest text-black uppercase border-b opacity-50 text-opacity-80"
        >
          <p class="flex-1">Dados do veículo</p>
          <div class="flex flex-1">
            <p class="flex-1">Valor</p>
            <p class="flex-1">Status</p>
          </div>
        </div>
        <div class="overflow-y-auto divide-y c-list-max-height">
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

      <!-- Top brands card -->
      <section
        class="col-span-2 px-6 pt-5 mb-auto bg-white border border-black rounded sm:col-span-1 border-opacity-10"
      >
        <p class="mb-8 text-black text-opacity-80">Top intenções de compra</p>
        <ul class="divide-y">
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

export default defineComponent({
  components: { CardCar, Icon },
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
  max-height: 35rem;
}
</style>
