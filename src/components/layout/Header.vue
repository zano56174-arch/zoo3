<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '../../store/cart.js'
import { useWishlistStore } from '../../store/wishlist.js'
import { useDarkMode } from '../../composables/useDarkMode.js'
import { MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon, SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { isDarkMode, toggleDarkMode } = useDarkMode()
const route = useRoute()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="bg-orange-500 p-2 rounded-lg">
            <span class="text-white font-bold text-xl">🐾</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">PetShop</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors font-medium"
            :class="{ 'text-orange-500': route.name === 'Home' }"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/catalog" 
            class="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors font-medium"
            :class="{ 'text-orange-500': route.name === 'Catalog' }"
          >
            Catalog
          </RouterLink>
        </nav>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
          >
            <SunIcon v-if="isDarkMode" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
          </button>

          <!-- Wishlist -->
          <RouterLink 
            to="/wishlist" 
            class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
          >
            <HeartIcon class="h-6 w-6" />
            <span 
              v-if="wishlistStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
            >
              {{ wishlistStore.itemCount }}
            </span>
          </RouterLink>

          <!-- Cart -->
          <RouterLink 
            to="/cart" 
            class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
          >
            <ShoppingCartIcon class="h-6 w-6" />
            <span 
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
            >
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMenu"
            class="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
          >
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <nav class="flex flex-col space-y-4">
          <RouterLink 
            to="/" 
            @click="toggleMenu"
            class="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors font-medium"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/catalog" 
            @click="toggleMenu"
            class="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors font-medium"
          >
            Catalog
          </RouterLink>
        </nav>
        
        <!-- Mobile Search -->
        <div class="mt-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>