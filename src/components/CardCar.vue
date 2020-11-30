<template>
  <div class="py-5 md:flex">
    <!-- Car data -->
    <figure class="flex w-7/12 my-auto">
      <img
        :src="car.image"
        :alt="`${car.brand_name} ${car.model_name}`"
        class="rounded ring-1 ring-black ring-opacity-20 c-img-dimensions"
      />
      <figcaption class="ml-3">
        <p class="text-xs font-bold leading-tight text-blue-900 uppercase">
          {{ `${car.brand_name} ${car.model_name}` }}
        </p>
        <p class="text-gray-400 uppercase text-tiny">{{ car.version_name }}</p>
        <p class="text-gray-400 uppercase text-tiny">
          {{ `${car.model_year} - ${car.fuel_type}` }}
        </p>
        <p class="text-gray-400 uppercase text-tiny">
          {{ `${car.transmission_type} - ${formatNumber(car.mileage)} KM` }}
        </p>
      </figcaption>
    </figure>
    <!-- End: Car data -->

    <!-- Announce data -->
    <div class="w-6/12 md:flex">
      <div
        class="flex items-baseline justify-center flex-1 py-3 mt-3 md:my-auto md:block md:py-0"
      >
        <p class="px-2 leading-none text-gray-400 text-tiny md:px-0">ANÚNCIO</p>
        <p class="text-xs font-bold text-blue-900 md:mb-1">
          R$ {{ formatPrice(car.ad_selling_price) }}
        </p>
        <span class="ml-2 leading-none text-gray-400 text-tiny md:hidden"
          >-</span
        >
        <p class="px-2 leading-none text-gray-400 text-tiny md:px-0">
          MÍNIMO ACEITO
        </p>
        <p class="text-xs text-gray-300">
          R$ {{ formatPrice(car.ad_selling_price * 0.97) }}
        </p>
      </div>
      <div class="flex-1 my-auto text-center">
        <p
          class="px-4 py-2 mb-2 text-xs text-gray-500 rounded-full whitespace-nowrap bg-blue-50"
        >
          Aguardando precificação
        </p>
        <time class="text-xs text-gray-300">18/04/2020 às 14:35</time>
      </div>
    </div>
    <!-- End: Announce data -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Car } from '../types'

export default defineComponent({
  name: 'CarCard',
  props: {
    car: {
      type: Object as PropType<Car>,
      required: true
    }
  },
  setup() {
    const formatPrice = (price) =>
      price
        .toFixed(0)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')

    const formatNumber = (number) => {
      number += ''
      const x = number.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? '.' + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2')
      }
      return x1 + x2
    }

    return { formatPrice, formatNumber }
  }
})
</script>

<style scoped>
.c-img-dimensions {
  width: 80px;
  height: 60px;
}
</style>
