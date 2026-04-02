<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart.js'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  comment: ''
})

const errors = ref({})

const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.phone && 
         form.value.email && 
         form.value.city && 
         form.value.address
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }

  if (!form.value.city.trim()) {
    errors.value.city = 'City is required'
  }

  if (!form.value.address.trim()) {
    errors.value.address = 'Address is required'
  }

  return Object.keys(errors.value).length === 0
}

const submitOrder = () => {
  if (!validateForm()) {
    return
  }

  const orderData = {
    items: [...cartStore.items],
    customerInfo: { ...form.value },
    total: cartStore.totalPrice,
    itemCount: cartStore.itemCount
  }

  const orderId = userStore.addOrder(orderData)
  cartStore.clearCart()
  
  router.push(`/success/${orderId}`)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Order Form -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Customer Information</h2>
          
          <form @submit.prevent="submitOrder" class="space-y-4">
            <!-- Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  :class="{ 'border-red-500': errors.firstName }"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="John"
                />
                <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  :class="{ 'border-red-500': errors.lastName }"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Doe"
                />
                <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
              </div>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  :class="{ 'border-red-500': errors.phone }"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  :class="{ 'border-red-500': errors.email }"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="john@example.com"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City *
              </label>
              <input
                v-model="form.city"
                type="text"
                :class="{ 'border-red-500': errors.city }"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="New York"
              />
              <p v-if="errors.city" class="mt-1 text-sm text-red-600">{{ errors.city }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <input
                v-model="form.address"
                type="text"
                :class="{ 'border-red-500': errors.address }"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="123 Main St, Apartment 4B"
              />
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
            </div>

            <!-- Comment -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Comments (Optional)
              </label>
              <textarea
                v-model="form.comment"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="Special delivery instructions, gift message, etc."
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
          
          <!-- Order Items -->
          <div class="space-y-4 mb-6">
            <div 
              v-for="item in cartStore.items" 
              :key="item.product.id"
              class="flex items-center space-x-4"
            >
              <img 
                :src="item.product.images[0]" 
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ item.product.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">Qty: {{ item.quantity }}</p>
              </div>
              <span class="font-semibold text-gray-900 dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Order Totals -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
              <span class="text-gray-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-300">Shipping:</span>
              <span class="text-green-600 dark:text-green-400">
                {{ cartStore.totalPrice >= 50 ? 'Free' : '$5.99' }}
              </span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
              <span class="text-gray-900 dark:text-white">Total:</span>
              <span class="text-gray-900 dark:text-white">
                ${{ (cartStore.totalPrice + (cartStore.totalPrice >= 50 ? 0 : 5.99)).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Place Order Button -->
          <button 
            @click="submitOrder"
            :disabled="!isFormValid"
            class="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Place Order
          </button>

          <!-- Security Note -->
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
            🔒 Your order information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  </div>
</template>