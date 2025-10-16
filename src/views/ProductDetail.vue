<template>
  <section v-if="item" class="grid md:grid-cols-2 gap-8">
    <div class="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
      <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" alt="" />
      <span v-else class="text-6xl">💎</span>
    </div>
    <div class="space-y-3">
      <h2 class="h2">{{ item.name }}</h2>
      <p class="muted">{{ item.description }}</p>
      <p class="text-2xl font-bold">{{ currency(item.price) }}</p>
      <div class="flex items-center gap-3">
        <label class="muted">Qty</label>
        <input type="number" v-model.number="qty" min="1" class="input w-24"/>
        <button class="btn" @click="add">Add to Cart</button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Items } from '../services/api'
import { useCartStore } from '../stores/cart'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const item = ref(null)
const qty = ref(1)
const cart = useCartStore()
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)

const add = () => cart.add(item.value, qty.value)
onMounted(async () => { item.value = await Items.get(id) })
</script>
