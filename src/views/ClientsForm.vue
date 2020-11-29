<template>
  <form class="p-6 bg-gray-100" @submit.prevent="onSubmit">
    <h1 class="mb-6 text-xl text-black text-opacity-80">Adicionar cliente</h1>

    <!-- Step navigation -->
    <nav class="flex overflow-x-auto text-sm c-no-scroll-bar">
      <button
        type="button"
        class="flex-1 w-full px-4 py-3 text-center text-purple-700 bg-white border-b-2 border-purple-700 whitespace-nowrap"
      >
        <span class="block -mb-px">DADOS DO CLIENTE</span>
      </button>
      <button
        type="button"
        class="flex-1 w-full px-4 py-3 text-center text-black bg-white border-b whitespace-nowrap text-opacity-40"
      >
        DADOS DO VEÍCULO
      </button>
      <button
        type="button"
        class="flex-1 w-full px-4 py-3 text-center text-black bg-white border-b whitespace-nowrap text-opacity-40"
      >
        INTENÇÃO DE COMPRA
      </button>
    </nav>
    <!-- End: Step navigation -->

    <!-- Inputs -->
    <section class="bg-white border border-black rounded-t border-opacity-10">
      <div class="grid w-full max-w-2xl grid-cols-2 gap-4 p-10">
        <div class="flex col-span-2 space-x-4">
          <label class="flex-1" for="name">
            <input
              id="name"
              v-model="payload.name"
              type="text"
              placeholder="Nome"
              required
            />
          </label>
          <label class="flex-1" for="last_name">
            <input
              id="last_name"
              v-model="payload.last_name"
              type="text"
              placeholder="Sobrenome"
              required
            />
          </label>
        </div>
        <label class="col-span-2" for="email">
          <input
            id="email"
            v-model="payload.email"
            type="email"
            placeholder="E-mail"
            required
          />
        </label>
        <div class="flex col-span-2 space-x-4">
          <label class="flex-1" for="phone">
            <input
              id="phone"
              v-model="payload.phone"
              type="text"
              placeholder="Telefone"
              required
            />
          </label>
          <div v-if="!isExtraPhone" class="flex-1 my-auto">
            <button
              class="px-2 py-2 -m-2 text-left text-blue-600"
              type="button"
              @click="isExtraPhone = true"
            >
              + adicionar outro
            </button>
          </div>
          <label v-else for="extra_phone" class="flex-1">
            <input
              id="extra_phone"
              v-model="payload.extra_phone"
              type="text"
              placeholder="Telefone"
              required
            />
          </label>
        </div>
        <label for="cep">
          <input
            id="cep"
            v-model="payload.cep"
            type="text"
            placeholder="CEP"
            required
          />
        </label>
        <label class="col-span-2 opacity-40" for="address">
          <input id="address" type="text" placeholder="Endereço" disabled />
        </label>
        <label class="opacity-50" for="number">
          <input
            id="number"
            type="text"
            placeholder="Número"
            required
            disabled
          />
        </label>
        <label class="opacity-50" for="complement">
          <input
            id="complement"
            type="text"
            placeholder="Complemento"
            disabled
          />
        </label>
        <label class="col-span-2 opacity-50" for="neighbourhood">
          <input id="neighbourhood" type="text" placeholder="Bairro" disabled />
        </label>
        <label class="opacity-50" for="city">
          <input id="city" type="text" placeholder="Cidade" disabled />
        </label>
        <label class="opacity-50" for="state">
          <input id="state" type="text" placeholder="Estado" disabled />
        </label>
      </div>
    </section>
    <!-- End: Inputs -->

    <!-- Footer -->
    <footer
      class="flex p-5 space-x-4 border-b border-l border-r border-black rounded-b bg-blue-50 border-opacity-10"
    >
      <button class="px-12 py-2 text-white bg-purple-700 rounded" type="submit">
        SALVAR
      </button>
      <button
        class="px-12 py-2 text-white text-purple-700 rounded"
        type="button"
        @click="$router.push('/clientes')"
      >
        CANCELAR
      </button>
    </footer>
    <!-- End: Footer -->
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Client } from '../types'
import { useStore } from '../store'
import { ADD_CLIENT } from '../store/store-constants'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const isExtraPhone = ref(false)

    const payload = ref<Client>({
      id: 0,
      name: '',
      last_name: '',
      status: 'Cliente',
      email: '',
      phone: '',
      extra_phone: '',
      cep: ''
    })

    const onSubmit = () => {
      router.push('/clientes')
      // Add little delay to see list transitions
      setTimeout(() => {
        store.dispatch(ADD_CLIENT, payload.value)
      }, 250)
    }
    return { onSubmit, isExtraPhone, payload }
  }
})
</script>

<style scoped>
@layer base {
  input {
    @apply w-full py-3 text-black placeholder-black border-black rounded text-opacity-80 border-opacity-40 placeholder-opacity-40;
  }
}
/* Works on Chrome/Edge/Safari */
.c-no-scroll-bar::-webkit-scrollbar {
  @apply hidden;
}
.c-no-scroll-bar::-webkit-scrollbar-thumb {
  @apply bg-transparent;
}
</style>
