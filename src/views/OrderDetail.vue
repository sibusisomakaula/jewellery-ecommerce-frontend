<template>
  <section v-if="order" class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="h2">Order {{ order.id }}</h2>
      <span class="px-3 py-1 rounded-full bg-slate-100">{{ order.status }}</span>
    </div>
    <div class="card p-0 overflow-hidden">
      <table class="table">
        <thead class="bg-slate-50"><tr><th class="th">Item</th><th class="th">Qty</th><th class="th">Price</th><th class="th">Line</th></tr></thead>
        <tbody>
          <tr v-for="i in order.items || []" :key="i.jewelleryItemId">
            <td class="td">{{ i.itemName || i.jewelleryItem?.name || i.jewelleryItemId }}</td>
            <td class="td">{{ i.quantity }}</td>
            <td class="td">{{ currency(i.price) }}</td>
            <td class="td">{{ currency(i.price * i.quantity) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-right font-semibold">Total: {{ currency(order.totalPrice) }}</p>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Orders } from '../services/api'
import { useRoute } from 'vue-router'
const route = useRoute()
const order = ref(null)
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
onMounted(async () => { order.value = await Orders.get(route.params.id) })
</script>
