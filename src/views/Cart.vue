<template>
  <section class="space-y-4">
    <h2 class="h2">Cart</h2>
    <div v-if="lines.length" class="card p-0 overflow-hidden">
      <table class="table">
        <thead class="bg-slate-50">
          <tr><th class="th">Item</th><th class="th">Qty</th><th class="th">Price</th><th class="th">Line</th><th class="th"></th></tr>
        </thead>
        <tbody>
          <tr v-for="l in lines" :key="l.item.id">
            <td class="td">{{ l.item.name }}</td>
            <td class="td"><input type="number" v-model.number="l.quantity" min="1" class="input w-24"></td>
            <td class="td">{{ currency(l.price) }}</td>
            <td class="td">{{ currency(l.price * l.quantity) }}</td>
            <td class="td"><button class="btn-outline" @click="remove(l.item.id)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-between p-4">
        <p class="text-lg font-semibold">Total: {{ currency(total) }}</p>
        <router-link class="btn" to="/checkout">Proceed to Checkout →</router-link>
      </div>
    </div>
    <p v-else class="muted">Your cart is empty.</p>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const lines = cart.$state.lines
const total = computed(()=>cart.totalPrice)
const remove = (id) => cart.remove(id)
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)
</script>
