import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const orders = ref([])

  const setUser = (userData) => {
    user.value = userData
  }

  const addOrder = (orderData) => {
    const orderId = Date.now().toString()
    const order = {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString()
    }
    orders.value.push(order)
    return orderId
  }

  const getOrderById = (orderId) => {
    return orders.value.find(order => order.id === orderId)
  }

  return {
    user,
    orders,
    setUser,
    addOrder,
    getOrderById
  }
})