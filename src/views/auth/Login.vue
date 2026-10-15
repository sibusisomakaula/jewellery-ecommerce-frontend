<template>
  <section class="max-w-md mx-auto card bg-white p-6 rounded shadow-md space-y-4">
    <!-- User Icon with Hover Animation -->
    <div class="flex justify-center">
      <svg
          class="w-16 h-16 text-brand-blue transition-transform duration-300 hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
      >
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
      </svg>
    </div>

    <h2 class="text-2xl font-bold text-brand-blue text-center">Login</h2>

    <form class="space-y-3" @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" class="input-field" required />
      <input v-model="password" type="password" placeholder="Password" class="input-field" required />
      <button type="submit" class="btn-primary w-full">Sign In</button>
      <router-link to="/register" class="block text-center text-sm text-brand-gold hover:underline">
        Create an account
      </router-link>
    </form>

    <p v-if="err" class="text-red-600 text-sm text-center">{{ err }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const err = ref('')

async function submit() {
  err.value = ''
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email: email.value,
      password: password.value
    })
    const { token, user } = response.data
    auth.login(token, user)

    if (user.role === 'ADMIN') await router.push('/admin/products')
    else await router.push('/')
  } catch (e) {
    err.value = e.response?.data?.message || e.message
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #005BAC;
  outline: none;
}

.btn-primary {
  background-color: #005BAC;
  color: white;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #003F7D;
}
</style>
