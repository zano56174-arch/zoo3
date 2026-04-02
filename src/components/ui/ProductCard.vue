<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../../store/cart.js'
import { useWishlistStore } from '../../store/wishlist.js'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const addToCart = () => {
  cartStore.addToCart(props.product)
}

const toggleWishlist = () => {
  wishlistStore.toggleWishlist(props.product)
}

const discountPercentage = computed(() => {
  if (!props.product.originalPrice) return null
  return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
    <!-- Product Image -->
    <div class="relative overflow-hidden">
      <RouterLink :to="`/product/${product.id}`">
        <img 
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </RouterLink>
      
      <!-- Discount Badge -->
      <div v-if="discountPercentage" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
        -{{ discountPercentage }}%
      </div>

      <!-- Wishlist Button -->
      <button 
        @click="toggleWishlist"
        class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      >
        <HeartSolidIcon v-if="isInWishlist" class="h-5 w-5 text-red-500" />
        <HeartIcon v-else class="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        <RouterLink 
          :to="`/product/${product.id}`" 
          class="hover:text-orange-500 transition-colors"
        >
          {{ product.name }}
        </RouterLink>
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-2">
        <div class="flex items-center">
          <span class="text-yellow-400">⭐</span>
          <span class="text-sm text-gray-600 dark:text-gray-300 ml-1">
            {{ product.rating }} ({{ product.reviewCount }})
          </span>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-gray-900 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </span>
          <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Stock Status -->
      <div class="flex items-center justify-between">
        <span 
          v-if="product.inStock"
          class="text-sm text-green-600 dark:text-green-400"
        >
          In Stock
        </span>
        <span 
          v-else
          class="text-sm text-red-600 dark:text-red-400"
        >
          Out of Stock
        </span>

        <!-- Add to Cart Button -->
        <button 
          @click="addToCart"
          :disabled="!product.inStock"
          class="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200 flex items-center space-x-1"
        >
          <ShoppingCartIcon class="h-4 w-4" />
          <span class="text-sm font-medium">Add</span>
        </button>
      </div>
    </div>
  </div>
</template>