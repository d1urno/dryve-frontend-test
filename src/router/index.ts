import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Clients from '../views/Clients.vue'
import ClientsForm from '../views/ClientsForm.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/clientes',
      name: 'clients',
      component: Clients
    },
    {
      path: '/clientes/adicionar',
      name: 'add',
      component: ClientsForm
    }
  ]
})
