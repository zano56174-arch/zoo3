import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const itemCount = computed(() => items.value.length)

  const isInWishlist = (productId) => {
    return items.value.some(item => item.id === productId)
  }

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      items.value.push(product)
    }
  }

  const removeFromWishlist = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return {
    items,
    itemCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist
  }
})