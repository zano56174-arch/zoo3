<script setup>
import { useWishlistStore } from '../store/wishlist.js'
import ProductCard from '../components/ui/ProductCard.vue'

const wishlistStore = useWishlistStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>

    <!-- Empty Wishlist -->
    <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">💝</div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your wishlist is empty</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8">Save your favorite products to buy them later!</p>
      <RouterLink 
        to="/catalog"
        class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Browse Products
      </RouterLink>
    </div>

    <!-- Wishlist Items -->
    <div v-else class="space-y-6">
      <div class="flex items-center justify-between">
        <p class="text-gray-600 dark:text-gray-300">
          {{ wishlistStore.itemCount }} item{{ wishlistStore.itemCount !== 1 ? 's' : '' }} in your wishlist
        </p>
        <button 
          @click="() => wishlistStore.items.length = 0"
          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in wishlistStore.items" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>