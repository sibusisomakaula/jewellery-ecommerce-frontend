<template>
  <div class="max-w-7xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Our Jewellery Collection</h2>

    <!-- Category filter buttons -->
    <div class="flex gap-2 mb-6">
      <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-3 py-1 rounded', selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800']"
      >
        {{ cat }}
      </button>
      <button
          @click="selectedCategory = 'All'"
          :class="['px-3 py-1 rounded', selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800']"
      >
        All
      </button>
    </div>

    <!-- Grid of products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @add="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from './ProductCard.vue';

const items = ref([]);
const selectedCategory = ref('All');
const categories = ref([]);

// Fetch products from backend
async function fetchProducts() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}/jewellery-items`);
    if (!response.ok) throw new Error('Failed to fetch products');
    items.value = await response.json();

    // Extract unique categories
    const cats = new Set();
    items.value.forEach(i => { if (i.category?.name) cats.add(i.category.name); });
    categories.value = Array.from(cats);
  } catch (error) {
    console.error(error);
  }
}

// Filtered items based on selected category
const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') return items.value.filter(i => i.name && i.price);
  return items.value.filter(i => i.name && i.price && i.category?.name === selectedCategory.value);
});

// Add to Cart handler
function addToCart(item) {
  console.log('Added to cart:', item);
}

onMounted(fetchProducts);
</script>

<style scoped>
/* Hover effect for cards */
.grid > * {
  transition: transform 0.2s ease;
}
.grid > *:hover {
  transform: translateY(-4px);
}
</style>
