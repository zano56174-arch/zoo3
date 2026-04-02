<script setup>
import { useProductsStore } from '../store/products.js'
import ProductCard from '../components/ui/ProductCard.vue'

const productsStore = useProductsStore()
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Everything Your Pet Needs
            </h1>
            <p class="text-xl mb-8 text-orange-100">
              Discover premium products for dogs, cats, birds, and more. Quality nutrition, fun toys, and essential accessories all in one place.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <RouterLink 
                to="/catalog" 
                class="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
              >
                Shop Now
              </RouterLink>
              <RouterLink 
                to="/catalog" 
                class="border border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
              >
                Browse Categories
              </RouterLink>
            </div>
          </div>
          <div class="hidden lg:block">
            <img 
              src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Happy pets" 
              class="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Find exactly what your pet needs</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="category in productsStore.categories" 
            :key="category.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div class="text-4xl mb-4">{{ category.icon }}</div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popular Products</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Best sellers loved by pets and their owners</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in productsStore.popularProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-12">
          <RouterLink 
            to="/catalog"
            class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View All Products
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose PetShop?</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl">🚚</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
            <p class="text-gray-600 dark:text-gray-300">Free delivery on orders over $50</p>
          </div>
          
          <div class="text-center">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl">💯</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality Guarantee</h3>
            <p class="text-gray-600 dark:text-gray-300">100% satisfaction guaranteed</p>
          </div>
          
          <div class="text-center">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expert Advice</h3>
            <p class="text-gray-600 dark:text-gray-300">Pet care guidance from experts</p>
          </div>
          
          <div class="text-center">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl">↩️</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
            <p class="text-gray-600 dark:text-gray-300">30-day hassle-free returns</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>