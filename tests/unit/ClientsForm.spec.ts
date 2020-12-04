import { DOMWrapper, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ClientsForm from '../../src/views/ClientsForm.vue'
import { createWebHistory, routerKey } from 'vue-router'
import { key } from '../../src/store'
import { ADD_CLIENT, FETCH_CARS } from '../../src/store/store-constants'
import { createStore } from 'vuex'
import { Client } from '../../src/types'

const state = () => ({
  clients: [] as Client[]
})

const actions = {
  [ADD_CLIENT]: jest.fn(),
  [FETCH_CARS]: jest.fn()
}

const store = createStore({
  state,
  actions
})

const router = {
  history: createWebHistory(),
  resolve: jest.fn(),
  push: jest.fn()
}

const payload = {
  id: 0,
  name: 'Jhon',
  last_name: 'Doe',
  status: 'Cliente',
  email: 'jhon@doe.com',
  phone: '(55) 55555 5555',
  extra_phone: '',
  cep: '02203-000',
  avenue: '',
  number: '',
  complement: '',
  neighbourhood: '',
  city: '',
  state: ''
}

const onSubmit = jest.fn()

describe('ClientsForm.vue', () => {
  it('does not call onSubmit method when submit button is pressed and form is not valid', () => {
    const onSubmit = jest.fn()
    const wrapper = shallowMount(ClientsForm, {
      global: {
        stubs: RouterLinkStub,
        provide: { [routerKey as any]: router, [key as any]: store },
        mocks: {
          onSubmit
        }
      }
    })
    wrapper.find('[data-test-id="submit"]').trigger('submit')
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })
  it('fails validation when submit is triggered and some required input is empty', async () => {
    const wrapper = shallowMount(ClientsForm, {
      global: {
        stubs: RouterLinkStub,
        provide: { [routerKey as any]: router, [key as any]: store },
        mocks: {
          onSubmit
        }
      }
    })

    const submit: DOMWrapper<HTMLButtonElement> = wrapper.find(
      '[data-test-id="submit"]'
    )

    const nameInput = wrapper.find('#name')
    await nameInput.setValue('Jhon')
    await submit.trigger('submit')
    expect(wrapper.vm.isValid).toBeFalsy()

    const lastNameInput = wrapper.find('#last_name')
    await lastNameInput.setValue('Doe')
    await submit.trigger('submit')
    expect(wrapper.vm.isValid).toBeFalsy()

    const emailInput = wrapper.find('#email')
    await emailInput.setValue('jhon@doe.com')
    await submit.trigger('submit')
    expect(wrapper.vm.isValid).toBeFalsy()

    const phoneInput = wrapper.find('#phone')
    await phoneInput.setValue('(55) 55555 5555')
    await submit.trigger('submit')
    expect(wrapper.vm.isValid).toBeFalsy()

    const cepInput = wrapper.find('#cep')
    await cepInput.setValue('02203-000')
    await submit.trigger('submit')
    expect(wrapper.vm.isValid).toBeTruthy()
    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })

  it('redirects user to /clientes and calls ADD_CLIENT action when form is submitted and validation passes', async () => {
    // const to = '/'
    const wrapper = shallowMount(ClientsForm, {
      global: {
        stubs: RouterLinkStub,
        provide: { [routerKey as any]: router, [key as any]: store }
      }
    })

    const nameInput = wrapper.find('#name')
    await nameInput.setValue(payload.name)
    const lastNameInput = wrapper.find('#last_name')
    await lastNameInput.setValue(payload.last_name)
    const emailInput = wrapper.find('#email')
    await emailInput.setValue(payload.email)
    const phoneInput = wrapper.find('#phone')
    await phoneInput.setValue(payload.phone)
    const cepInput = wrapper.find('#cep')
    await cepInput.setValue(payload.cep)

    await wrapper.find('[data-test-id="submit"]').trigger('submit')

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(router.push).toHaveBeenCalledWith('/clientes')
        expect(actions[ADD_CLIENT]).toHaveBeenCalledWith(
          {
            commit: store.commit,
            dispatch: store.dispatch,
            getters: {},
            rootGetters: {},
            rootState: { clients: [] },
            state: { clients: [] }
          },
          payload
        )
        resolve()
      }, 650)
    )
  })
})
