<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../store/products.js'
import { useCartStore } from '../store/cart.js'
import { useWishlistStore } from '../store/wishlist.js'
import ProductCard from '../components/ui/ProductCard.vue'
import { ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref(null)
const relatedProducts = ref([])
const selectedImage = ref(0)
const quantity = ref(1)

const isInWishlist = computed(() => product.value ? wishlistStore.isInWishlist(product.value.id) : false)

onMounted(() => {
  loadProduct()
})

const loadProduct = () => {
  const foundProduct = productsStore.getProductById(route.params.id)
  if (!foundProduct) {
    router.push('/catalog')
    return
  }
  
  product.value = foundProduct
  relatedProducts.value = productsStore.getRelatedProducts(foundProduct.id)
  selectedImage.value = 0
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value)
  }
}

const selectImage = (index) => {
  selectedImage.value = index
}

const updateQuantity = (newQuantity) => {
  if (newQuantity >= 1 && newQuantity <= (product.value?.stockCount || 1)) {
    quantity.value = newQuantity
  }
}
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><RouterLink to="/" class="hover:text-orange-500">Home</RouterLink></li>
        <li>&gt;</li>
        <li><RouterLink to="/catalog" class="hover:text-orange-500">Catalog</RouterLink></li>
        <li>&gt;</li>
        <li class="text-gray-900 dark:text-white">{{ product.name }}</li>
      </ol>
    </nav>

    <!-- Product Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <!-- Product Images -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img 
            :src="product.images[selectedImage]" 
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Thumbnail Images -->
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectImage(index)"
            class="aspect-square overflow-hidden rounded-lg border-2 hover:border-orange-500 transition-colors"
            :class="{ 'border-orange-500': selectedImage === index, 'border-gray-300 dark:border-gray-600': selectedImage !== index }"
          >
            <img 
              :src="image" 
              :alt="`${product.name} view ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ product.name }}
          </h1>
          
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex items-center space-x-1">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400" />
            </div>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {{ product.rating }} ({{ product.reviewCount }} reviews)
            </span>
          </div>

          <!-- Price -->
          <div class="flex items-center space-x-4 mb-6">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              ${{ product.price.toFixed(2) }}
            </span>
            <span v-if="product.originalPrice" class="text-xl text-gray-500 line-through">
              ${{ product.originalPrice.toFixed(2) }}
            </span>
            <span v-if="product.originalPrice" class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
              Save ${{ (product.originalPrice - product.price).toFixed(2) }}
            </span>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <span 
              v-if="product.inStock"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              ✅ In Stock ({{ product.stockCount }} available)
            </span>
            <span 
              v-else
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              ❌ Out of Stock
            </span>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="flex items-center space-x-4 mb-8">
            <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button 
                @click="updateQuantity(quantity - 1)"
                :disabled="quantity <= 1"
                class="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                −
              </button>
              <span class="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white min-w-[3rem] text-center">
                {{ quantity }}
              </span>
              <button 
                @click="updateQuantity(quantity + 1)"
                :disabled="quantity >= product.stockCount"
                class="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            <button 
              @click="addToCart"
              :disabled="!product.inStock"
              class="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCartIcon class="h-5 w-5" />
              <span>Add to Cart</span>
            </button>

            <button 
              @click="toggleWishlist"
              class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <HeartSolidIcon v-if="isInWishlist" class="h-6 w-6 text-red-500" />
              <HeartIcon v-else class="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Specifications -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Specifications</h3>
          <dl class="grid grid-cols-1 gap-3">
            <div 
              v-for="(value, key) in product.specifications" 
              :key="key"
              class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
            >
              <dt class="font-medium text-gray-900 dark:text-white capitalize">{{ key.replace(/([A-Z])/g, ' $1').toLowerCase() }}</dt>
              <dd class="text-gray-600 dark:text-gray-300">{{ value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id" 
          :product="relatedProduct" 
        />
      </div>
    </div>
  </div>
</template>