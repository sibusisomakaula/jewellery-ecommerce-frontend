<template>
  <section class="space-y-6">
    <h2 class="h2 text-brand-blue">Orders</h2>

    <!-- Debug Info -->
    <div class="bg-blue-100 p-4 rounded-lg mb-4" v-if="showDebug">
      <h3 class="font-semibold mb-2">Debug Information:</h3>
      <p><strong>User:</strong> {{ auth.user?.fullName }} (ID: {{ auth.user?.id }})</p>
      <p><strong>Role:</strong> {{ auth.user?.role }}</p>
      <p><strong>Total Orders:</strong> {{ orders.length }}</p>
      
      <div class="flex gap-2 mt-3 flex-wrap">
        <button @click="loadOrders" class="btn-primary">Reload Orders</button>
        <button @click="createDirectOrder" class="btn-outline">Create Direct Order</button>
        <button @click="toggleDebug" class="btn-outline">{{ showDebug ? 'Hide Debug' : 'Show Debug' }}</button>
      </div>
    </div>

    <!-- Simple header for normal users -->
    <div v-else class="flex justify-between items-center mb-4">
      <button @click="loadOrders" class="btn-primary">Refresh</button>
      <button @click="toggleDebug" class="btn-outline">Debug</button>
    </div>

    <!-- Orders List -->
    <div v-if="orders.length" class="space-y-4">
      <div
          v-for="order in orders"
          :key="order.id"
          class="card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition"
      >
        <div class="flex-1">
          <p><span class="font-semibold">Order ID:</span> {{ shortId(order.id) }}</p>
          <p><span class="font-semibold">Customer:</span> {{ order.customer?.name || 'Unknown' }}</p>
          <p><span class="font-semibold">Email:</span> {{ order.customer?.email || 'Unknown' }}</p>
          <p><span class="font-semibold">Status:</span>
            <span :class="statusClass(order.status)">{{ order.status }}</span>
          </p>
          <p><span class="font-semibold">Total:</span> {{ currency(order.totalPrice || 0) }}</p>
          <p><span class="font-semibold">Delivery Address:</span> {{ order.deliveryAddress || 'Not specified' }}</p>
          <p><span class="font-semibold">Date:</span> {{ formatDate(order.createdAt) }}</p>
          <div class="mt-2" v-if="order.items && order.items.length">
            <h4 class="font-semibold">Items:</h4>
            <ul class="list-disc list-inside">
              <li v-for="item in order.items" :key="item.id">
                {{ item.item?.name || 'Unknown Item' }} × {{ item.quantity }} 
                → {{ currency((item.item?.price || 0) * item.quantity) }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Admin Controls -->
        <div v-if="auth.user?.role === 'ADMIN'" class="flex flex-col gap-2">
          <select v-model="order.status" @change="updateStatus(order)" class="input">
            <option>PENDING</option>
            <option>PROCESSING</option>
            <option>SHIPPED</option>
            <option>DELIVERED</option>
            <option>CANCELLED</option>
          </select>
          <button @click="deleteOrder(order.id)" class="btn-outline">Delete</button>
        </div>
      </div>
    </div>

    <div v-else class="text-center p-8">
      <p class="muted text-lg">No orders found.</p>
      <p class="text-sm mt-2" v-if="auth.user?.role === 'USER'">Place an order from the cart to see it here.</p>
      <button v-if="showDebug" @click="createDirectOrder" class="btn-primary mt-4">Create Test Order</button>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {useAuthStore} from '../stores/auth'

const auth = useAuthStore()
const orders = ref([])
const showDebug = ref(false)

const currency = n => new Intl.NumberFormat(undefined, {style: 'currency', currency: 'ZAR'}).format(n)

const shortId = (id) => {
  if (!id) return 'N/A'
  return id.substring(0, 8) + '...'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const statusClass = status => {
  switch (status) {
    case 'PENDING': return 'text-yellow-500 font-semibold'
    case 'PROCESSING': return 'text-blue-500 font-semibold'
    case 'SHIPPED': return 'text-purple-500 font-semibold'
    case 'DELIVERED': return 'text-green-500 font-semibold'
    case 'CANCELLED': return 'text-red-500 font-semibold'
    default: return 'text-gray-500 font-semibold'
  }
}

function toggleDebug() {
  showDebug.value = !showDebug.value
}

async function loadOrders() {
  try {
    console.log('Loading orders...')
    
    let response
    if (auth.user?.role === 'ADMIN') {
      response = await axios.get('http://localhost:8080/api/orders')
    } else {
      response = await axios.get(`http://localhost:8080/api/orders/user/${auth.user.id}`)
    }
    
    orders.value = response.data
    console.log('Orders loaded successfully:', orders.value.length)
    
  } catch (error) {
    console.error('Failed to load orders:', error)
    alert('Failed to load orders. Please try again.')
  }
}

async function createDirectOrder() {
  try {
    const orderData = {
      customer: { id: auth.user.id },
      items: [
        {
          item: { id: '539d8354-d789-4c1a-bd59-bcc1ee2b3226' }, // Use any valid item ID
          quantity: 1
        }
      ],
      deliveryAddress: "123 Main Street, Cape Town",
      status: "PENDING"
    }

    const response = await axios.post('http://localhost:8080/api/orders', orderData)
    alert(`Order created successfully! ID: ${shortId(response.data.id)}`)
    await loadOrders()
    
  } catch (error) {
    console.error('Failed to create order:', error)
    alert('Failed to create order: ' + (error.response?.data?.message || error.message))
  }
}

async function updateStatus(order) {
  try {
    await axios.put(`http://localhost:8080/api/orders/${order.id}/status`, {status: order.status})
    alert('Order status updated successfully!')
  } catch (error) {
    console.error('Failed to update order status:', error)
    alert('Failed to update status.')
  }
}

async function deleteOrder(id) {
  if (!confirm('Are you sure you want to delete this order?')) return
  try {
    await axios.delete(`http://localhost:8080/api/orders/${id}`)
    orders.value = orders.value.filter(o => o.id !== id)
    alert('Order deleted successfully!')
  } catch (error) {
    console.error('Failed to delete order:', error)
    alert('Failed to delete order.')
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-outline {
  background-color: white;
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #3b82f6;
  cursor: pointer;
}

.btn-outline:hover {
  background-color: #3b82f6;
  color: white;
}

.input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.muted {
  color: #6b7280;
}
</style>