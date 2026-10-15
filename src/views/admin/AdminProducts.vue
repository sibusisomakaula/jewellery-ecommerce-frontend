<template>
  <section class="space-y-6">
    <h2 class="h2">Admin · Products</h2>

    <!-- Product Form -->
    <form @submit.prevent="save" class="card grid sm:grid-cols-2 gap-4">
      <input v-model="form.name" placeholder="Name" class="input" required />
      <input v-model.number="form.price" type="number" step="0.01" placeholder="Price" class="input" required/>
      <textarea v-model="form.description" placeholder="Description" class="input sm:col-span-2"></textarea>
      <input v-model.number="form.quantity" type="number" min="0" placeholder="Stock" class="input"/>

      <!-- Image Upload -->
      <input type="file" @change="handleFile" class="input"/>
      <div v-if="filePreview" class="sm:col-span-2 w-32 h-32 overflow-hidden rounded">
        <img :src="filePreview" class="w-full h-full object-cover"  alt=""/>
      </div>

      <select v-model="form.categoryId" class="input" required>
        <option disabled value="">Category…</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>

      <div class="sm:col-span-2 flex gap-3">
        <button type="submit" class="btn">{{ form.id ? 'Update' : 'Create' }}</button>
        <button type="button" class="btn-outline" @click="reset">Clear</button>
      </div>
    </form>

    <!-- Product Table -->
    <div class="card p-0 overflow-hidden">
      <table class="table">
        <thead class="bg-slate-50">
        <tr>
          <th class="th">Preview</th>
          <th class="th">Name</th>
          <th class="th">Price</th>
          <th class="th">Qty</th>
          <th class="th">Category</th>
          <th class="th"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in items" :key="p.id">
          <td class="td">
            <div class="w-12 h-12 rounded bg-slate-100 overflow-hidden flex items-center justify-center">
              <img v-if="p.imageUrl" :src="p.imageUrl" class="w-full h-full object-cover"  alt=""/>
              <span v-else>💎</span>
            </div>
          </td>
          <td class="td">{{ p.name }}</td>
          <td class="td">{{ currency(p.price) }}</td>
          <td class="td">{{ p.quantity }}</td>
          <td class="td">{{ p.category?.name || p.categoryId }}</td>
          <td class="td">
            <div class="flex gap-2">
              <button class="btn-outline" @click="edit(p)">Edit</button>
              <button class="btn-outline" @click="del(p)">Delete</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import {Items, Categories} from '../../services/api'

const items = ref([])
const categories = ref([])

const form = reactive({id: '', name: '', description: '', price: 0, quantity: 0, categoryId: '', imageUrl: ''})
const file = ref(null)
const filePreview = ref('')

const load = async () => {
  items.value = await Items.list({size: 200})
}
const loadCats = async () => {
  categories.value = await Categories.list()
}

const reset = () => {
  Object.assign(form, {id: '', name: '', description: '', price: 0, quantity: 0, categoryId: '', imageUrl: ''})
  file.value = null
  filePreview.value = ''
}

function handleFile(e) {
  file.value = e.target.files[0]
  if (file.value) filePreview.value = URL.createObjectURL(file.value)
}

const edit = (p) => {
  Object.assign(form, p, {categoryId: p.categoryId || p.category?.id})
  filePreview.value = p.imageUrl || ''
}

const del = async (p) => {
  await Items.remove(p.id);
  await load()
}

const save = async () => {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('description', form.description)
  formData.append('price', form.price)
  formData.append('quantity', form.quantity)
  formData.append('categoryId', form.categoryId)
  if (file.value) formData.append('image', file.value)

  if (form.id) await Items.update(form.id, formData)
  else await Items.create(formData)

  await load()
  reset()
}

const currency = n => new Intl.NumberFormat('en-ZA', {style: 'currency', currency: 'ZAR'}).format(n)

onMounted(async () => {
  await Promise.all([load(), loadCats()])
})
</script>
