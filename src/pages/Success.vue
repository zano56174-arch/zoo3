<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUserStore } from '../store/user.js'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})

const route = useRoute()
const userStore = useUserStore()

const order = computed(() => {
  return userStore.getOrderById(route.params.orderId)
})

onMounted(() => {
  // Could add analytics tracking here
  console.log('Order completed:', route.params.orderId)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <CheckCircleIcon class="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed!</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
    </div>

    <div v-if="order" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <!-- Order Details -->
      <div class="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Information</h3>
            <dl class="space-y-2 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-600 dark:text-gray-300">Order Number:</dt>
                <dd class="font-medium text-gray-900 dark:text-white">#{{ orderId }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600 dark:text-gray-300">Date:</dt>
                <dd class="font-medium text-gray-900 dark:text-white">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600 dark:text-gray-300">Total Items:</dt>
                <dd class="font-medium text-gray-900 dark:text-white">{{ order.itemCount }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600 dark:text-gray-300">Total Amount:</dt>
                <dd class="font-bold text-xl text-green-600 dark:text-green-400">
                  ${{ (order.total + (order.total >= 50 ? 0 : 5.99)).toFixed(2) }}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Information</h3>
            <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p class="font-medium text-gray-900 dark:text-white">
                {{ order.customerInfo.firstName }} {{ order.customerInfo.lastName }}
              </p>
              <p>{{ order.customerInfo.address }}</p>
              <p>{{ order.customerInfo.city }}</p>
              <p>{{ order.customerInfo.phone }}</p>
              <p>{{ order.customerInfo.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
        <div class="space-y-4">
          <div 
            v-for="item in order.items" 
            :key="item.product.id"
            class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <img 
              :src="item.product.images[0]" 
              :alt="item.product.name"
              class="w-16 h-16 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 dark:text-white">{{ item.product.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Quantity: {{ item.quantity }} × ${{ item.product.price.toFixed(2) }}
              </p>
            </div>
            <span class="font-semibold text-gray-900 dark:text-white">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">What's Next?</h3>
        <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>📧 You'll receive an order confirmation email shortly</li>
          <li>📦 We'll send you tracking information when your order ships</li>
          <li>🚚 Expected delivery: 3-7 business days</li>
          <li>📞 Questions? Contact us at support@petshop.com</li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <RouterLink 
          to="/catalog"
          class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
        >
          Continue Shopping
        </RouterLink>
        <RouterLink 
          to="/"
          class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
        >
          Return Home
        </RouterLink>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-600 dark:text-gray-300">Order not found.</p>
      <RouterLink 
        to="/"
        class="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Return Home
      </RouterLink>
    </div>
  </div>
</template>