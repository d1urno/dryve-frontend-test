import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import ClientsData from '../assets/clients-data.json'

// define your typings for the store state
export interface State {
  count: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {},
  actions: {}
})

// Simplifying typed useStore usage
export function useStore() {
  return baseUseStore(key)
}
