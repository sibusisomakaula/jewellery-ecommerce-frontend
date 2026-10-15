<template>
  <section class="cart-section">
    <h2>Shopping Cart</h2>
    <div v-if="lines.length" class="cart-content">
      <div v-for="l in lines" :key="l.id" class="cart-item">
        <img 
          v-if="l.item.imageUrl" 
          :src="l.item.imageUrl" 
          :alt="l.item.name" 
          class="item-thumb" 
        />
        <div v-else class="item-thumb placeholder">💎</div>
        
        <div class="item-details">
          <h3>{{ l.item.name }}</h3>
          <p class="description">{{ l.item.description }}</p>
          <p class="price-line">
            {{ currency(l.item.price) }} × {{ l.quantity }} 
            = <span class="subtotal">{{ currency(l.item.price * l.quantity) }}</span>
          </p>
        </div>
        
        <button @click="remove(l.item.id)" class="btn-remove">Remove</button>
      </div>
      
      <div class="cart-total">
        <h3>Total: {{ currency(total) }}</h3>
        <button @click="checkout" class="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
    <p v-else class="empty-cart">Your cart is empty.</p>

    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="popup-overlay">
      <div class="success-popup">
        <div class="popup-icon">🎉</div>
        <h3>Congratulations!</h3>
        <p>Your purchase was successful!</p>
        <div class="order-details" v-if="lastOrder">
          <p><strong>Order ID:</strong> {{ shortId(lastOrder.id) }}</p>
          <p><strong>Total:</strong> {{ currency(lastOrder.totalPrice) }}</p>
          <p><strong>Status:</strong> <span class="status-badge">{{ lastOrder.status }}</span></p>
        </div>
        <button @click="closePopup" class="btn-continue">Continue Shopping</button>
        <button @click="viewOrders" class="btn-orders">View My Orders</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()
const showSuccessPopup = ref(false)
const lastOrder = ref(null)

const lines = computed(() => cart.lines)
const total = computed(() => cart.totalPrice)
const remove = cart.remove

const currency = (n) => new Intl.NumberFormat('en-ZA', { style:'currency', currency:'ZAR' }).format(n)

const shortId = (id) => {
  if (!id) return 'N/A'
  return id.substring(0, 8).toUpperCase()
}

async function checkout() {
  try {
    console.log('Starting checkout process...')
    
    // Prompt for delivery address
    const deliveryAddress = prompt('Please enter your delivery address:')
    if (!deliveryAddress) {
      alert('Delivery address is required to complete your order.')
      return
    }

    // Call the cart store checkout method
    const order = await cart.checkout(deliveryAddress)
    
    if (order) {
      lastOrder.value = order
      showSuccessPopup.value = true
      console.log('Checkout successful, showing popup')
    }
    
  } catch (error) {
    console.error('Checkout failed:', error)
    alert('Checkout failed: ' + (error.response?.data?.message || error.message))
  }
}

function closePopup() {
  showSuccessPopup.value = false
  lastOrder.value = null
  // Optionally redirect to products page
  router.push('/products')
}

function viewOrders() {
  showSuccessPopup.value = false
  router.push('/orders')
}

onMounted(() => cart.load())
</script>

<style scoped>
.cart-section {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  position: relative;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.cart-content {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-thumb {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-thumb.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  font-size: 2rem;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.price-line {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: #555;
}

.subtotal {
  font-weight: bold;
  color: #28a745;
  font-size: 1.1rem;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #c82333;
}

.cart-total {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #333;
  text-align: right;
}

.cart-total h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.btn-checkout {
  padding: 0.75rem 2rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-checkout:hover {
  background: #218838;
}

.empty-cart {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  padding: 3rem;
}

/* Success Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.success-popup {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-popup h3 {
  color: #28a745;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-popup p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.order-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: left;
}

.order-details p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.status-badge {
  background: #ffc107;
  color: #212529;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.btn-continue, .btn-orders {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem;
  transition: all 0.2s;
}

.btn-continue {
  background: #6c757d;
  color: white;
}

.btn-continue:hover {
  background: #5a6268;
}

.btn-orders {
  background: #007bff;
  color: white;
}

.btn-orders:hover {
  background: #0056b3;
}
</style>