<template>
  <div class="card flex flex-col gap-3 p-3">
    <div class="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
      <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" alt="Product"/>
      <span v-else class="text-5xl">💎</span>
    </div>

    <div class="flex-1">
      <h3 class="font-semibold text-lg">{{ item.name }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">{{ item.description }}</p>
    </div>

    <div class="flex items-center justify-between mt-2">
      <span class="font-semibold">{{ currency(item.price) }}</span>
      <button class="btn btn-sm" @click="$emit('add', item)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object })
const currency = (n) =>
    new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
