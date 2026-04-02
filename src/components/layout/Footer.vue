<script setup>
</script>

<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="bg-orange-500 p-2 rounded-lg">
              <span class="text-white font-bold text-xl">🐾</span>
            </div>
            <span class="text-xl font-bold">PetShop</span>
          </div>
          <p class="text-gray-300 mb-4">
            Your one-stop shop for all your pet's needs. Quality products, competitive prices, and exceptional service.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-orange-500 transition-colors">📘</a>
            <a href="#" class="text-gray-300 hover:text-orange-500 transition-colors">📷</a>
            <a href="#" class="text-gray-300 hover:text-orange-500 transition-colors">🐦</a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="text-gray-300 hover:text-orange-500 transition-colors">Home</RouterLink></li>
            <li><RouterLink to="/catalog" class="text-gray-300 hover:text-orange-500 transition-colors">Catalog</RouterLink></li>
            <li><RouterLink to="/cart" class="text-gray-300 hover:text-orange-500 transition-colors">Cart</RouterLink></li>
            <li><RouterLink to="/wishlist" class="text-gray-300 hover:text-orange-500 transition-colors">Wishlist</RouterLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-300">
            <li>📍 123 Pet Street, Animal City, AC 12345</li>
            <li>📞 (555) 123-PETS</li>
            <li>📧 info@petshop.com</li>
            <li>🕒 Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM</li>
          </ul>
        </div>

        <!-- Shipping Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Shipping & Returns</h3>
          <ul class="space-y-2 text-gray-300">
            <li>🚚 Free shipping on orders over $50</li>
            <li>📦 Same-day delivery available</li>
            <li>↩️ 30-day return policy</li>
            <li>💯 100% satisfaction guarantee</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2026 PetShop. All rights reserved. Made with ❤️ for pets.</p>
      </div>
    </div>
  </footer>
</template>