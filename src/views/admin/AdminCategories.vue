<template>
  <section class="space-y-6">
    <h2 class="h2">Admin · Categories</h2>
    <form @submit.prevent="save" class="card flex gap-3">
      <input v-model="form.name" placeholder="Name" class="input" required />
      <button type="submit" class="btn">{{ form.id ? 'Update' : 'Create' }}</button>
      <button type="button" class="btn-outline" @click="reset">Clear</button>
    </form>
    <div class="card">
      <ul class="space-y-2">
        <li v-for="c in categories" :key="c.id" class="flex items-center justify-between">
          <span>{{ c.name }}</span>
          <div class="flex gap-2">
            <button class="btn-outline" @click="edit(c)">Edit</button>
            <button class="btn-outline" @click="del(c)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Categories } from '../../services/api'
const categories = ref([])
const form = reactive({ id:'', name:'' })
const load = async () => categories.value = await Categories.list()
const edit = (c) => Object.assign(form, c)
const reset = () => Object.assign(form, { id:'', name:'' })
const del = async (c) => { await Categories.remove(c.id); await load() }
const save = async () => {
  const dto = { name: form.name }
  if (form.id) await Categories.update(form.id, dto); else await Categories.create(dto)
  await load(); reset()
}
onMounted(load)
</script>
