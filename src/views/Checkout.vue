<template>
  <section class="grid md:grid-cols-2 gap-8">
    <!-- Checkout Form -->
    <form class="card space-y-4" @submit.prevent="submit">
      <h2 class="h2">Checkout</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm muted mb-1">Full Name</label>
          <input v-model="customer.name" class="input" required />
        </div>
        <div>
          <label class="block text-sm muted mb-1">Email</label>
          <input v-model="customer.email" type="email" class="input" required />
        </div>
        <div>
          <label class="block text-sm muted mb-1">Phone</label>
          <input v-model="customer.phone" class="input" required />
        </div>
      </div>

      <div>
        <label class="block text-sm muted mb-1">Delivery Address</label>
        <textarea
            v-model="order.deliveryAddress"
            class="input"
            rows="3"
            placeholder="Enter your delivery address"
            required
        ></textarea>
      </div>

      <div class="flex gap-3">
        <button class="btn" type="submit" :disabled="loading">
          {{ loading ? 'Placing Order...' : 'Place Order' }}
        </button>
        <router-link class="btn-outline" to="/cart">Back to Cart</router-link>
      </div>
    </form>

    <!-- Order Summary -->
    <div class="card space-y-2 h-fit">
      <h3 class="font-semibold">Order Summary</h3>
      <div class="divide-y">
        <div
            v-for="line in cart.lines"
            :key="line.item.id"
            class="flex justify-between py-2 text-sm"
        >
          <span>{{ line.item.name }} × {{ line.quantity }}</span>
          <span>{{ currency(line.price * line.quantity) }}</span>
        </div>
      </div>
      <p class="text-right font-semibold">Total: {{ currency(cart.totalPrice) }}</p>
    </div>
  </section>

  <!-- Success Modal -->
  <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg max-w-md mx-4">
      <div class="text-center">
        <div class="text-green-500 text-5xl mb-4">✓</div>
        <h3 class="text-xl font-semibold mb-2">Order Placed Successfully!</h3>
        <p class="text-gray-600 mb-4">
          Your order has been placed and you will receive a confirmation email shortly.
        </p>
        <button @click="closeModal" class="btn">View My Orders</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { Orders, Customers } from '../services/api'

const cart = useCartStore()
const router = useRouter()
const loading = ref(false)
const showSuccess = ref(false)

const customer = reactive({
  name: '',
  email: '',
  phone: ''
})

const order = reactive({
  deliveryAddress: '',
  status: 'PENDING'
})

const currency = (n) =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'ZAR' }).format(n)

async function submit() {
  if (!cart.lines.length) return alert('Cart is empty!')

  try {
    loading.value = true

    // 1️⃣ Create customer
    const createdCustomer = await Customers.create(customer)

    // 2️⃣ Create order with items
    const orderDto = {
      customer: {id: createdCustomer.id},
      status: order.status,
      items: cart.lines.map((line) => ({
        item: {id: line.item.id},
        quantity: line.quantity
      })),
      deliveryAddress: order.deliveryAddress
    }

    await Orders.create(orderDto)

    // 3️⃣ Show success modal and clear cart
    showSuccess.value = true
    await cart.clear()
  } catch (error) {
    console.error('Order placement failed:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    loading.value = false
  }
}

function closeModal() {
  showSuccess.value = false
  router.push('/orders')
}
</script>
