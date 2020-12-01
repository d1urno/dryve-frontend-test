<template>
  <main ref="root" class="p-6 bg-gray-100">
    <!-- Actions -->
    <div class="justify-between w-full mb-6 sm:flex">
      <div class="flex items-center w-full mb-5 sm:mb-0">
        <!-- Filter -->
        <button
          type="button"
          class="flex items-center h-full px-3 space-x-2 bg-white border border-black rounded border-opacity-10"
        >
          <icon type="filter" class="w-5 h-5 text-blue-600" />
          <span class="py-2 text-purple-500 sm:py-0">FILTRAR</span>
        </button>
        <!-- End:Filter -->

        <!-- Search field -->
        <label for="search" class="sr-only">Busca</label>
        <div
          class="relative flex items-center justify-end w-full max-w-xs sm:mb-0"
        >
          <input
            id="search"
            v-model="query"
            type="search"
            inputmode="search"
            placeholder="Buscar por nome..."
            class="w-full px-4 ml-2 text-sm leading-relaxed border-black rounded sm:mx-2 border-opacity-40"
          />
          <icon
            type="search"
            class="absolute w-6 h-6 mr-2 -my-4 text-black text-opacity-80"
          />
        </div>
        <!-- End: Search field -->
      </div>
      <router-link
        to="/clientes/adicionar"
        class="flex inline-flex items-center px-5 text-white bg-purple-700 rounded"
      >
        <icon type="add" class="w-3 h-3 text-white" />
        <span class="py-2 ml-2">ADICIONAR</span>
      </router-link>
    </div>
    <!-- End: Actions -->

    <!--Client list -->
    <section
      class="overflow-x-auto bg-white border border-black rounded border-opacity-10"
    >
      <table class="relative w-full overflow-hidden">
        <thead>
          <tr class="text-left">
            <th class="w-16"><input type="checkbox" /></th>
            <th class="opacity-50 w-80">Nome</th>
            <th class="w-64 opacity-50">Status</th>
            <th class="opacity-50 w-72">Telefone</th>
            <th class="opacity-50">E-mail</th>
            <th></th>
          </tr>
        </thead>
        <!-- Table body -->
        <transition-group :name="transition" tag="tbody">
          <tr v-for="client in clients" :key="client.id">
            <td class="border-b"><input type="checkbox" /></td>
            <td>{{ `${client.name} ${client.last_name}` }}</td>
            <td>
              <p
                class="w-24 py-2 -my-2 text-xs text-center text-gray-500 bg-gray-100 rounded-full"
                :class="{
                  'bg-blue-50 text-blue-600': client.status === 'Cliente'
                }"
              >
                {{ client.status }}
              </p>
            </td>
            <td>{{ client.phone }}</td>
            <td>
              <span>{{ client.email }}</span>
            </td>
            <td>
              <button type="button" class="relative inline-flex w-6 h-6 -mb-2">
                <icon
                  type="more"
                  class="absolute inset-y-0 w-6 h-6 text-black opacity-40"
                />
              </button>
            </td>
          </tr>
        </transition-group>
        <!-- End: Table body -->
      </table>
      <!-- Footer -->
      <footer class="items-center justify-between px-5 py-2 sm:flex">
        <div class="flex items-baseline justify-center sm:justify-start">
          <label for="items" class="text-xs text-gray-400">
            Itens por página:
          </label>
          <select
            id="items"
            :value="items"
            name="items"
            class="w-12 p-0 ml-2 border-none focus:ring-0"
            @change="handleSizeChange"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <p class="text-xs text-gray-400">
            {{ navigationText }}
          </p>
        </div>
        <div class="flex justify-center space-x-3">
          <button type="button" class="w-6 h-9" @click="handlePrev">
            <icon type="chevron-left" class="pt-1 text-black opacity-60" />
          </button>
          <button type="button" class="w-6 h-9" @click="handleNext">
            <icon type="chevron-right" class="pt-1 text-black opacity-60" />
          </button>
        </div>
      </footer>
      <!-- Footer -->
    </section>
    <!--End: Client list -->
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import Icon from '../components/Icon.vue'
import { useStore } from '../store'
import { CLIENTS } from '../store/store-constants'
import { Client } from '../types'

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useStore()

    // Set controls
    const query = ref('')
    const items = ref(10)
    const page = ref(1)

    const clients = computed<Client[]>(() =>
      store.getters[CLIENTS](query.value, items.value, page.value)
    )

    // Navigation display calculations
    const totalClientsCount = computed<number>(
      () => store.getters[CLIENTS](query.value).length
    )
    const start = computed(() => page.value * items.value - (items.value - 1))
    const end = computed(() =>
      Math.min(start.value - 1 + clients.value.length, totalClientsCount.value)
    )
    const navigationText = computed(() => {
      return `${
        totalClientsCount.value ? start.value + '-' + end.value : 0
      } de ${totalClientsCount.value}`
    })

    /**********************************
     *  Transitioned navigation feature
     *********************************/
    const transition = ref('zoom-fade')
    watch(query, () => (transition.value = 'zoom-fade'))

    const handleNext = () => {
      if (end.value === totalClientsCount.value) return
      transition.value = 'slide-fade-left'
      page.value++
    }

    const handlePrev = () => {
      if (page.value === 1) return
      transition.value = 'slide-fade-right'
      page.value--
    }

    const handleSizeChange = (e: Event) => {
      transition.value = 'zoom-fade'
      items.value = e.target.value
    }

    // Scroll top after client added
    const root = ref<HTMLElement>(null)
    onMounted(() => {
      root.value.scrollIntoView()
    })

    return {
      root,
      clients,
      items,
      navigationText,
      transition,
      handlePrev,
      handleNext,
      handleSizeChange,
      query
    }
  }
})
</script>

<style scoped>
.c-icon-dimensions {
  width: 64px;
  height: 64px;
}
.c-list-max-height {
  max-height: 35rem;
}
/* Remove default clear icon from input */
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

th {
  @apply py-5 pl-5 text-xs tracking-widest text-black uppercase border-b text-opacity-80 whitespace-nowrap;
}
td {
  @apply py-5 pl-5 text-black border-b text-opacity-80 whitespace-nowrap;
}

.slide-fade-left-enter-from {
  @apply transform translate-x-40 opacity-0;
}
.slide-fade-right-enter-from {
  @apply transform -translate-x-40 opacity-0;
}

.zoom-fade-enter-from,
.slide-fade-left-leave-to,
.slide-fade-right-leave-to,
.zoom-fade-leave-to {
  @apply transform scale-90 opacity-0;
}
.slide-fade-left-leave-active,
.slide-fade-right-leave-active {
  @apply absolute invisible transition duration-500;
}

.slide-fade-right-enter-active,
.slide-fade-left-enter-active,
.zoom-fade-enter-active,
.zoom-fade-leave-active,
.zoom-fade-move,
.slide-fade-right-move,
.slide-fade-left-move {
  @apply transition duration-500;
}
</style>
