<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-end gap-3">
      <div>
        <label class="block text-sm muted">Category</label>
        <select v-model="categoryId" @change="load" class="input">
          <option :value="''">All</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div class="flex-1 min-w-[220px]">
        <label class="block text-sm muted">Search</label>
        <input v-model="q" placeholder="Search name..." @input="debouncedLoad" class="input"/>
      </div>
      <div>
        <label class="block text-sm muted">Sort</label>
        <select v-model="sort" @change="load" class="input">
          <option value="">Default</option>
          <option value="price,asc">Price ↑</option>
          <option value="price,desc">Price ↓</option>
          <option value="name,asc">Name A–Z</option>
          <option value="name,desc">Name Z–A</option>
        </select>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="it in items" :key="it.id" :item="it" @add="addToCart"/>
    </div>

    <div class="flex items-center justify-center gap-2" v-if="totalPages>1">
      <button class="btn-outline" :disabled="page<=0" @click="page--; load()">Prev</button>
      <span class="muted">Page {{ page+1 }} / {{ totalPages }}</span>
      <button class="btn-outline" :disabled="page>=totalPages-1" @click="page++; load()">Next</button>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Items, Categories } from '../services/api'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'

const items = ref([])
const categories = ref([])
const categoryId = ref('')
const q = ref('')
const sort = ref('')
const page = ref(0)
const size = ref(12)
const totalPages = ref(1)
const cart = useCartStore()

const load = async () => {
  const params = { page: page.value, size: size.value }
  if (categoryId.value) params.categoryId = categoryId.value
  if (q.value) params.q = q.value
  if (sort.value) params.sort = sort.value
  const res = await Items.list(params)
  // Support either {content,totalPages} or array
  if (Array.isArray(res)) { items.value = res; totalPages.value = 1 }
  else { items.value = res.content || []; totalPages.value = res.totalPages || 1 }
}
let timer; const debouncedLoad = ()=>{ clearTimeout(timer); timer = setTimeout(load, 300) }
const loadCategories = async () => categories.value = await Categories.list()
const addToCart = (item) => cart.add(item, 1)
onMounted(async () => { await loadCategories(); await load(); })
</script>
