import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Car, Client, Intention } from '../types'
import ClientsData from '../assets/clients-data.json'
import IntentionsData from '../assets/intentions-data.json'
import {
  RequestStatus,
  ADD_CLIENT,
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  CARS,
  CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
  FETCH_CARS,
  STATUS,
  INTENTIONS
} from './store-constants'
import { useIncludesText } from '../compositions/text-match'

// define your typings for the store state
export interface State {
  status: RequestStatus
  cars: Car[]
  clients: Client[]
  intentions: Intention[]
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    status: RequestStatus.SUCCESS,
    cars: [],
    clients: [...ClientsData],
    intentions: [...IntentionsData]
  },

  mutations: {
    [API_REQUEST](state: State) {
      state.status = RequestStatus.LOADING
    },
    [API_SUCCESS](state: State) {
      state.status = RequestStatus.SUCCESS
    },
    [API_ERROR](state: State) {
      state.status = RequestStatus.ERROR
    },
    [FETCH_CARS](state: State, payload: Car[]) {
      state.cars = payload
    },
    [ADD_CLIENT](state: State, payload: Client) {
      state.clients.unshift(payload)
    },
    [DELETE_CLIENT](state: State, payload: number) {
      state.clients.splice(payload, 1)
    }
  },

  actions: {
    [FETCH_CARS]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(API_REQUEST)
        fetch(import.meta.env.VITE_CARS_API_URL)
          .then((res) => res.json())
          .then((data) => {
            commit(FETCH_CARS, data)
            commit(API_SUCCESS)
            resolve(data)
          })
          .catch((err) => {
            commit(API_ERROR)
            reject(err)
          })
      })
    },
    [ADD_CLIENT]({ state, commit }, payload: Client) {
      const newId = (state.clients[0] ? state.clients[0].id : 0) + 1
      commit(ADD_CLIENT, { ...payload, id: newId })
      return payload
    },
    [EDIT_CLIENT]({ commit }, client) {
      commit(EDIT_CLIENT, client)
      return client
    },
    [DELETE_CLIENT]({ state, commit }, client) {
      const index = state.clients
        .map((value) => client.id === value.id)
        .indexOf(true)
      if (index !== -1) {
        commit(DELETE_CLIENT, index)
        return client
      } else {
        return false
      }
    }
  },

  getters: {
    [STATUS]: (state) => state.status,
    [CARS]: (state) => (size = 10, page = 1) =>
      state.cars.slice((page - 1) * size, page * size),
    [CLIENTS]: (state) => (query = '', size = 10, page = 0) => {
      const filteredClients = state.clients.reduce(
        (prev, val) =>
          useIncludesText(val.name, query) ||
          useIncludesText(val.last_name, query)
            ? [...prev, val]
            : prev,
        [] as Client[]
      )
      return page
        ? filteredClients.slice((page - 1) * size, page * size)
        : filteredClients
    },
    [INTENTIONS]: (state) => (size = 10, page = 0) =>
      page
        ? state.intentions.slice((page - 1) * size, page * size)
        : state.intentions
  }
})

// Simplifying typed useStore usage
export function useStore() {
  return baseUseStore(key)
}
