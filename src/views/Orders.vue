<template>
  <section class="space-y-4">
    <h2 class="h2">My Orders</h2>
    <div class="card p-0 overflow-hidden" v-if="orders.length">
      <table class="table">
        <thead class="bg-slate-50"><tr><th class="th">ID</th><th class="th">Date</th><th class="th">Status</th><th class="th">Total</th><th class="th"></th></tr></thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td class="td">{{ o.id }}</td>
            <td class="td">{{ new Date(o.orderDate||o.createdAt||Date.now()).toLocaleString() }}</td>
            <td class="td">{{ o.status }}</td>
            <td class="td">{{ currency(o.totalPrice) }}</td>
            <td class="td"><router-link class="btn-outline" :to="`/orders/${o.id}`">View</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="muted">No orders yet.</p>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Orders as OrdersApi } from '../services/api'
const orders = ref([])
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
onMounted(async () => { orders.value = await OrdersApi.list() })
</script>
