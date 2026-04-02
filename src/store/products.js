import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      name: 'Premium Dog Food - Chicken & Rice',
      price: 29.99,
      originalPrice: 34.99,
      category: 'food',
      animalType: 'dog',
      rating: 4.8,
      reviewCount: 124,
      images: [
        'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516361/pexels-photo-7516361.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'High-quality premium dog food made with real chicken and brown rice. Perfect for adult dogs of all sizes.',
      specifications: {
        weight: '15 lbs',
        ingredients: 'Chicken, Brown Rice, Sweet Potatoes, Peas',
        ageRange: 'Adult',
        brand: 'PetNutrition Pro'
      },
      inStock: true,
      stockCount: 25
    },
    {
      id: 2,
      name: 'Interactive Cat Laser Toy',
      price: 24.99,
      category: 'toys',
      animalType: 'cat',
      rating: 4.6,
      reviewCount: 89,
      images: [
        'https://images.pexels.com/photos/8434108/pexels-photo-8434108.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516468/pexels-photo-7516468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Automatic laser toy that keeps your cat entertained for hours. Multiple speed settings and patterns.',
      specifications: {
        batteries: 'AA x 3',
        material: 'ABS Plastic',
        colors: 'White, Black',
        brand: 'PlayTime Pro'
      },
      inStock: true,
      stockCount: 15
    },
    {
      id: 3,
      name: 'Comfortable Dog Bed - Large',
      price: 49.99,
      originalPrice: 59.99,
      category: 'accessories',
      animalType: 'dog',
      rating: 4.9,
      reviewCount: 67,
      images: [
        'https://images.pexels.com/photos/8434825/pexels-photo-8434825.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516520/pexels-photo-7516520.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Ultra-comfortable orthopedic dog bed with memory foam. Machine washable cover.',
      specifications: {
        size: 'Large (36" x 24")',
        material: 'Memory Foam, Cotton Cover',
        colors: 'Gray, Brown, Beige',
        brand: 'ComfortPaws'
      },
      inStock: true,
      stockCount: 8
    },
    {
      id: 4,
      name: 'Cat Scratching Post Tower',
      price: 79.99,
      category: 'accessories',
      animalType: 'cat',
      rating: 4.7,
      reviewCount: 156,
      images: [
        'https://images.pexels.com/photos/8434232/pexels-photo-8434232.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516543/pexels-photo-7516543.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Multi-level cat tower with scratching posts, perches, and hiding spots. Perfect for active cats.',
      specifications: {
        height: '58 inches',
        material: 'Sisal, Plush Fabric, Pressed Wood',
        capacity: 'Up to 25 lbs',
        brand: 'Feline Heights'
      },
      inStock: true,
      stockCount: 12
    },
    {
      id: 5,
      name: 'Bird Premium Seed Mix',
      price: 18.99,
      category: 'food',
      animalType: 'bird',
      rating: 4.5,
      reviewCount: 43,
      images: [
        'https://images.pexels.com/photos/8434156/pexels-photo-8434156.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516612/pexels-photo-7516612.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Nutritious seed mix for canaries, finches, and other small birds. Vitamin-enriched formula.',
      specifications: {
        weight: '5 lbs',
        ingredients: 'Millet, Sunflower Seeds, Nyjer, Vitamins',
        birdType: 'Canaries, Finches, Small Birds',
        brand: 'Avian Nutrition'
      },
      inStock: true,
      stockCount: 30
    },
    {
      id: 6,
      name: 'Dog Training Clicker Set',
      price: 12.99,
      category: 'training',
      animalType: 'dog',
      rating: 4.4,
      reviewCount: 98,
      images: [
        'https://images.pexels.com/photos/8434267/pexels-photo-8434267.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516678/pexels-photo-7516678.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Professional dog training clicker set with treats and guide. Perfect for positive reinforcement training.',
      specifications: {
        includes: '2 Clickers, Treat Bag, Training Guide',
        material: 'ABS Plastic, Nylon',
        colors: 'Blue, Red',
        brand: 'TrainRight'
      },
      inStock: true,
      stockCount: 20
    },
    {
      id: 7,
      name: 'Aquarium Filter System',
      price: 89.99,
      category: 'accessories',
      animalType: 'fish',
      rating: 4.6,
      reviewCount: 72,
      images: [
        'https://images.pexels.com/photos/8434301/pexels-photo-8434301.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516723/pexels-photo-7516723.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Advanced aquarium filter system for crystal clear water. Suitable for tanks up to 50 gallons.',
      specifications: {
        capacity: 'Up to 50 gallons',
        flowRate: '200 GPH',
        filterTypes: 'Mechanical, Biological, Chemical',
        brand: 'AquaClear Pro'
      },
      inStock: true,
      stockCount: 6
    },
    {
      id: 8,
      name: 'Cat Litter Box - Self-Cleaning',
      price: 199.99,
      originalPrice: 249.99,
      category: 'accessories',
      animalType: 'cat',
      rating: 4.3,
      reviewCount: 89,
      images: [
        'https://images.pexels.com/photos/8434334/pexels-photo-8434334.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7516789/pexels-photo-7516789.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Revolutionary self-cleaning litter box that automatically removes waste. Reduces odors and cleaning time.',
      specifications: {
        dimensions: '24" x 19" x 15"',
        power: 'AC Adapter',
        capacity: 'Up to 15 lbs cat',
        brand: 'SmartPaws Tech'
      },
      inStock: true,
      stockCount: 4
    }
  ])

  const categories = ref([
    { id: 'food', name: 'Food & Treats', icon: '🍖' },
    { id: 'toys', name: 'Toys', icon: '🎾' },
    { id: 'accessories', name: 'Accessories', icon: '🛏️' },
    { id: 'training', name: 'Training', icon: '📚' }
  ])

  const animalTypes = ref([
    { id: 'dog', name: 'Dogs', icon: '🐕' },
    { id: 'cat', name: 'Cats', icon: '🐱' },
    { id: 'bird', name: 'Birds', icon: '🦜' },
    { id: 'fish', name: 'Fish', icon: '🐠' }
  ])

  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedAnimalType = ref('')
  const priceRange = ref([0, 300])
  const sortBy = ref('name')

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(product => product.category === selectedCategory.value)
    }

    if (selectedAnimalType.value) {
      filtered = filtered.filter(product => product.animalType === selectedAnimalType.value)
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  })

  const popularProducts = computed(() => 
    products.value
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 4)
  )

  const getProductById = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId)
    if (!product) return []
    
    return products.value
      .filter(p => p.id !== product.id && p.animalType === product.animalType)
      .slice(0, limit)
  }

  return {
    products,
    categories,
    animalTypes,
    searchQuery,
    selectedCategory,
    selectedAnimalType,
    priceRange,
    sortBy,
    filteredProducts,
    popularProducts,
    getProductById,
    getRelatedProducts
  }
})