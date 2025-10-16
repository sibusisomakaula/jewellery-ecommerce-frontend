<template>
  <section class="max-w-md mx-auto card bg-white p-6 rounded shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-brand-blue text-center">Register</h2>
    <form class="space-y-3" @submit.prevent="submit">
      <input v-model="fullName" placeholder="Full Name" class="input-field" required />
      <input v-model="email" type="email" placeholder="Email" class="input-field" required />
      <input v-model="password" type="password" placeholder="Password" class="input-field" required />

      <select v-model="role" class="input-field">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit" class="btn-primary w-full">Create Account</button>
      <router-link to="/login" class="block text-center text-sm text-brand-gold hover:underline">
        Already have an account?
      </router-link>
    </form>

    <p v-if="msg" class="text-green-600 text-sm text-center">{{ msg }}</p>
    <p v-if="err" class="text-red-600 text-sm text-center">{{ err }}</p>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

const fullName = ref('')
const email = ref('')
const password = ref('')
const role = ref('USER')
const msg = ref('')
const err = ref('')
const router = useRouter()

async function submit() {
  err.value = ''
  msg.value = ''
  try {
    await axios.post('http://localhost:8080/api/auth/register', {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
    msg.value = 'Account created. You can now sign in.'
    setTimeout(() => router.push('/login'), 500)
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
  border-color: #005BAC; /* CPUT Blue */
  outline: none;
}

.btn-primary {
  background-color: #005BAC; /* CPUT Blue */
  color: white;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #003F7D; /* Darker blue */
}
</style>
