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
  INTENTIONS,
  WINDOW_WIDTH
} from './store-constants'
import { useIncludesText } from '../compositions/text-match'

// define your typings for the store state
export interface State {
  status: RequestStatus
  cars: Car[]
  clients: Client[]
  intentions: Intention[]
  windowWidth: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    status: RequestStatus.SUCCESS,
    cars: [],
    clients: ClientsData,
    intentions: IntentionsData,
    windowWidth: window.innerWidth
  },

  mutations: {
    [API_REQUEST](state) {
      state.status = RequestStatus.LOADING
    },
    [API_SUCCESS](state) {
      state.status = RequestStatus.SUCCESS
    },
    [API_ERROR](state) {
      state.status = RequestStatus.ERROR
    },
    [FETCH_CARS](state, payload: Car[]) {
      state.cars = payload
    },
    [ADD_CLIENT](state, payload: Client) {
      state.clients.unshift(payload)
    },
    [DELETE_CLIENT](state, payload: number) {
      state.clients.splice(payload, 1)
    },
    [WINDOW_WIDTH](state) {
      state.windowWidth = window.innerWidth
    }
  },

  actions: {
    [FETCH_CARS]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(API_REQUEST)
        // At this time getting variables from import.meta.env throws error on jest,
        // so we hardcode url this time.
        // see https://github.com/kulshekhar/ts-jest/issues/1174
        fetch('https://www.mocky.io/v2/5eb553df31000060006994a8')
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
        : state.intentions,
    [WINDOW_WIDTH]: (state) => state.windowWidth
  }
})

// Simplifying typed useStore usage
export const useStore = (): Store<State> => {
  return baseUseStore(key)
}
