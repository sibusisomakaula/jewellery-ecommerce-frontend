<template>
  <div class="card flex flex-col gap-3">
    <div class="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
      <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" alt="" />
      <span v-else class="text-5xl">💎</span>
    </div>
    <h3 class="font-semibold text-lg line-clamp-1">{{ item.name }}</h3>
    <p class="muted line-clamp-3">{{ item.description }}</p>
    <p class="text-xl font-bold">{{ currency(item.price) }}</p>
    <div class="flex gap-2">
      <button class="btn" @click="$emit('add', item)">Add to Cart</button>
      <router-link class="btn-outline" :to="`/products/${item.id}`">View</router-link>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ item: { type: Object, required: true } })
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
</script>
