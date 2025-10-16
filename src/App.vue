<template>
  <div class="bg-brand-light min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-gray-300 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div class="container flex items-center justify-between py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 font-bold text-brand-blue text-lg">
          <span>💎</span>
          <span>Cape Peninsula Jewellery Shop</span>
        </router-link>

        <!-- Navigation -->
        <nav class="flex items-center gap-4 text-sm font-medium text-brand-dark">
          <!-- User-only links -->
          <template v-if="auth.user?.role === 'USER'">
            <router-link to="/products" class="hover:text-brand-gold transition">Products</router-link>
            <router-link to="/cart" class="hover:text-brand-gold transition">Cart ({{ cartCount }})</router-link>
            <router-link to="/orders" class="hover:text-brand-gold transition">My Orders</router-link>
          </template>

          <!-- Admin-only links -->
          <template v-if="auth.user?.role === 'ADMIN'">
            <router-link to="/admin/products" class="hover:text-brand-gold transition">Admin Products</router-link>
            <router-link to="/admin/categories" class="hover:text-brand-gold transition">Admin Categories</router-link>
            <router-link to="/admin/orders" class="hover:text-brand-gold transition">Admin Orders</router-link>
          </template>

          <!-- Public links -->
          <template v-if="!auth.isAuthed">
            <router-link to="/products" class="hover:text-brand-gold transition">Products</router-link>
          </template>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center gap-3">
          <router-link v-if="!auth.isAuthed" to="/login" class="px-4 py-2 rounded bg-brand-blue text-white font-semibold hover:bg-brand-dark transition">
            Login
          </router-link>
          <button v-else @click="handleLogout" class="px-4 py-2 rounded bg-brand-blue text-white font-semibold hover:bg-brand-dark transition">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container py-8 flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="container py-6 text-center text-sm text-brand-dark">
      © {{ year }} • CPUT Jewellery Department
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'

const year = new Date().getFullYear()
const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

const cartCount = computed(() => cart.totalItems)

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<style>
/* Tailwind colors: define your CPUT palette */
.bg-brand-blue { background-color: #005BAC; }
.bg-brand-dark { background-color: #333333; }
.text-brand-blue { color: #005BAC; }
.text-brand-dark { color: #333333; }
.text-brand-gold { color: #FFD100; }
.bg-brand-light { background-color: #F5F5F5; }
</style>
