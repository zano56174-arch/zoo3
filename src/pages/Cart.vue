<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../store/cart.js'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()

const isEmpty = computed(() => cartStore.items.length === 0)

const updateQuantity = (productId, newQuantity) => {
  cartStore.updateQuantity(productId, newQuantity)
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

    <!-- Empty Cart -->
    <div v-if="isEmpty" class="text-center py-16">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8">Add some products to get started!</p>
      <RouterLink 
        to="/catalog"
        class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <!-- Cart Items -->
    <div v-else class="space-y-8">
      <!-- Items List -->
      <div class="space-y-4">
        <div 
          v-for="item in cartStore.items" 
          :key="item.product.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <!-- Product Image -->
          <div class="flex-shrink-0">
            <img 
              :src="item.product.images[0]" 
              :alt="item.product.name"
              class="w-24 h-24 object-cover rounded-lg"
            />
          </div>

          <!-- Product Info -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              <RouterLink 
                :to="`/product/${item.product.id}`"
                class="hover:text-orange-500 transition-colors"
              >
                {{ item.product.name }}
              </RouterLink>
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {{ item.product.description }}
            </p>
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-gray-900 dark:text-white">
                ${{ item.product.price.toFixed(2) }}
              </span>
              <span v-if="item.product.originalPrice" class="text-sm text-gray-500 line-through">
                ${{ item.product.originalPrice.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button 
                @click="updateQuantity(item.product.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
                class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <span class="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white min-w-[3rem] text-center">
                {{ item.quantity }}
              </span>
              <button 
                @click="updateQuantity(item.product.id, item.quantity + 1)"
                :disabled="item.quantity >= item.product.stockCount"
                class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>

            <!-- Item Total -->
            <div class="text-right min-w-[4rem]">
              <span class="text-lg font-bold text-gray-900 dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>

            <!-- Remove Button -->
            <button 
              @click="removeItem(item.product.id)"
              class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>{{ cartStore.itemCount }} item{{ cartStore.itemCount !== 1 ? 's' : '' }}</span>
              <span>•</span>
              <span>Free shipping on orders over $50</span>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              Total: ${{ cartStore.totalPrice.toFixed(2) }}
            </div>
          </div>

          <div class="flex space-x-4">
            <RouterLink 
              to="/catalog"
              class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Continue Shopping
            </RouterLink>
            <RouterLink 
              to="/checkout"
              class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Proceed to Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>