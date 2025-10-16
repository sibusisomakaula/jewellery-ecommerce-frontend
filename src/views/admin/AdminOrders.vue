<template>
  <section class="space-y-6">
    <h2 class="h2">Admin · Orders</h2>
    <div class="card p-0 overflow-hidden" v-if="orders.length">
      <table class="table">
        <thead class="bg-slate-50"><tr><th class="th">ID</th><th class="th">Status</th><th class="th">Total</th><th class="th">Customer</th><th class="th">Actions</th></tr></thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td class="td">{{ o.id }}</td>
            <td class="td">{{ o.status }}</td>
            <td class="td">{{ currency(o.totalPrice) }}</td>
            <td class="td">{{ o.customer?.fullName || o.customerId }}</td>
            <td class="td">
              <select v-model="o.status" class="input w-40" @change="update(o)">
                <option>NEW</option><option>PAID</option><option>READY</option><option>COLLECTED</option><option>CANCELLED</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="muted">No orders.</p>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Orders } from '../../services/api'
const orders = ref([])
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
const load = async ()=> orders.value = await Orders.list()
const update = async (o) => { await Orders.updateStatus(o.id, o.status) }
onMounted(load)
</script>
