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
      <div class="grid w-full grid-cols-2 gap-4 p-10 md:max-w-2xl">
        <div
          class="flex flex-col col-span-2 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row"
        >
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
        <div
          class="flex flex-col items-center col-span-2 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row"
        >
          <label class="flex-1 w-full" for="phone">
            <input
              id="phone"
              v-model="payload.phone"
              type="text"
              placeholder="Telefone"
              minlength="15"
              maxlength="15"
              required
              @keypress="debouncedPhoneMask('phone')"
              @blur="debouncedPhoneMask('phone')"
            />
          </label>
          <div v-if="!isExtraPhone" class="flex-1 my-auto">
            <button
              class="px-2 py-2 -m-2 text-sm text-left text-blue-600"
              type="button"
              @click="isExtraPhone = true"
            >
              + adicionar outro
            </button>
          </div>
          <label v-else for="extra_phone" class="flex-1 w-full">
            <input
              id="extra_phone"
              v-model="payload.extra_phone"
              type="text"
              placeholder="Telefone"
              minlength="15"
              maxlength="15"
              required
              @keypress="debouncedPhoneMask('extra_phone')"
              @blur="debouncedPhoneMask('extra_phone')"
            />
          </label>
        </div>
        <label for="cep" class="col-span-2 sm:col-span-1">
          <input
            id="cep"
            ref="cep"
            v-model="payload.cep"
            type="text"
            placeholder="CEP"
            size="10"
            maxlength="9"
            required
            @blur="fetchCep"
          />
        </label>
        <label
          :class="{ 'opacity-50': !payload.avenue }"
          class="col-span-2"
          for="address"
        >
          <input
            id="address"
            v-model="payload.avenue"
            type="text"
            placeholder="Endereço"
            disabled
          />
        </label>
        <label :class="{ 'opacity-50': !payload.avenue }" for="number">
          <input
            id="number"
            ref="number"
            v-model="payload.number"
            type="text"
            placeholder="Número"
            required
            :disabled="!payload.avenue"
          />
        </label>
        <label :class="{ 'opacity-50': !payload.avenue }" for="complement">
          <input
            id="complement"
            v-model="payload.complement"
            type="text"
            placeholder="Complemento"
            :disabled="!payload.avenue"
          />
        </label>
        <label
          class="col-span-2"
          :class="{ 'opacity-50': !payload.neighbourhood }"
          for="neighbourhood"
        >
          <input
            id="neighbourhood"
            v-model="payload.neighbourhood"
            type="text"
            placeholder="Bairro"
            disabled
          />
        </label>
        <label
          :class="{ 'opacity-50': !payload.city }"
          for="city"
          class="col-span-2 sm:col-span-1"
        >
          <input
            id="city"
            v-model="payload.city"
            type="text"
            placeholder="Cidade"
            disabled
          />
        </label>
        <label
          :class="{ 'opacity-50': !payload.state }"
          for="state"
          class="col-span-2 sm:col-span-1"
        >
          <input
            id="state"
            v-model="payload.state"
            type="text"
            placeholder="Estado"
            disabled
          />
        </label>
      </div>
    </section>
    <!-- End: Inputs -->

    <!-- Footer -->
    <footer
      class="p-5 border-b border-l border-r border-black rounded-b sm:flex sm:space-x-4 bg-blue-50 border-opacity-10"
    >
      <button
        class="block px-12 py-2 mx-auto text-white transition bg-gray-300 rounded sm:mx-0"
        type="submit"
        data-test-id="submit"
        :disabled="!isValid"
        :class="{ 'bg-purple-700 hover:bg-purple-600': isValid }"
      >
        SALVAR
      </button>
      <button
        class="block px-12 py-2 mx-auto text-white text-purple-700 rounded sm:mx-0"
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
import { computed, defineComponent, ref } from 'vue'
import { Client } from '../types'
import { useStore } from '../store'
import { ADD_CLIENT } from '../store/store-constants'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const isExtraPhone = ref(false)

    /**************************************
     *  Form submission feature
     **************************************/
    const payload = ref<Client>({
      id: 0,
      name: '',
      last_name: '',
      status: 'Cliente',
      email: '',
      phone: '',
      extra_phone: '',
      cep: '',
      avenue: '',
      number: '',
      complement: '',
      neighbourhood: '',
      city: '',
      state: ''
    })

    // Basic validation
    const isValid = computed(
      () =>
        payload.value.name.length > 0 &&
        payload.value.last_name.length > 0 &&
        payload.value.email.length > 0 &&
        payload.value.phone.length > 0 &&
        payload.value.cep.length > 0
    )

    const onSubmit = () => {
      if (!isValid.value) return
      router.push('/clientes')
      // Add little delay to see list transitions
      setTimeout(() => {
        store.dispatch(ADD_CLIENT, payload.value)
      }, 550)
    }

    /**************************************
     *  CEP webservice completion
     **************************************/
    const cep = ref<HTMLInputElement | null>(null)
    const number = ref<HTMLInputElement | null>(null)
    const cleanForm = () => {
      payload.value.avenue = ''
      payload.value.neighbourhood = ''
      payload.value.city = ''
      payload.value.state = ''
    }

    const fetchCep = () => {
      // CEP copy only with digits
      const cepCopy = payload.value.cep.replace(/\D/g, '')

      if (cepCopy != '') {
        const cepValidation = /^[0-9]{8}$/

        if (cepValidation.test(cepCopy) && cep.value) {
          cep.value.value = cepCopy.substring(0, 5) + '-' + cepCopy.substring(5)

          // Set inputs with "..." while fetching webservice
          payload.value.avenue = '...'
          payload.value.neighbourhood = '...'
          payload.value.city = '...'
          payload.value.state = '...'

          fetch('https://viacep.com.br/ws/' + cepCopy + '/json')
            .then((res) => res.json())
            .then((res) => {
              if (!('erro' in res)) {
                payload.value.avenue = res.logradouro
                payload.value.neighbourhood = res.bairro
                payload.value.city = res.localidade
                payload.value.state = res.uf
                number.value?.focus()
              } else {
                cleanForm()
                alert('CEP não encontrado.')
              }
            })
        } else {
          cleanForm()
          alert('Formato de CEP inválido.')
        }
      } else {
        cleanForm()
      }
    }

    /**************************************
     *  Phone mask feature
     **************************************/
    const debouncedPhoneMask = (field: 'phone' | 'extra_phone') => {
      setTimeout(() => {
        const v = maskPhone(payload.value[field])
        if (v != payload.value[field]) {
          payload.value[field] = v
        }
      }, 1)
    }

    const maskPhone = (v: string) => {
      if (!v.length) return ''
      let r = v.replace(/\D/g, '')
      r = r.replace(/^0/, '')
      if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
      } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3')
      } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2')
      } else {
        r = r.replace(/^(\d*)/, '($1')
      }
      return r
    }

    return {
      onSubmit,
      isExtraPhone,
      payload,
      cep,
      number,
      fetchCep,
      debouncedPhoneMask,
      isValid
    }
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
