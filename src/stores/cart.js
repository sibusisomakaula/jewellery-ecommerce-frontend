// import { defineStore } from 'pinia'
// import axios from 'axios'
// import { useAuthStore } from './auth'

// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     lines: [] // { item, quantity, price }
//   }),
//   getters: {
//     totalItems: (s) => s.lines.reduce((n,l)=>n+l.quantity, 0),
//     totalPrice: (s) => s.lines.reduce((sum,l)=>sum + l.price*l.quantity, 0)
//   },
//   actions: {
//     async load() {
//       const auth = useAuthStore()
//       if (!auth.user) return
//       try {
//         const res = await axios.get('http://localhost:8080/api/cart', { params: { userId: auth.user.id } })
//         this.lines = res.data.map(l => ({ item: l.item, quantity: l.quantity, price: l.item.price }))
//       } catch(e) {
//         console.error('Failed to load cart', e)
//       }
//     },
//     async add(item, qty = 1) {
//       const auth = useAuthStore()
//       if (!auth.user) return alert('Please log in.')

//       try {
//         await axios.post('http://localhost:8080/api/cart/add', {
//           userId: auth.user.id,
//           itemId: item.id,
//           quantity: qty
//         })
//         await this.load()
//       } catch(e) { console.error('Add failed', e) }
//     },
//     async remove(itemId) {
//       const line = this.lines.find(l => l.item.id === itemId)
//       if (!line) return
//       try {
//         await axios.delete(`http://localhost:8080/api/cart/${line.item.id}`)
//         await this.load()
//       } catch(e) { console.error('Remove failed', e) }
//     },
//     clear() { this.lines = [] },
//     async checkout() {
//       const auth = useAuthStore()
//       if (!auth.user) return alert('Please log in.')

//       try {
//         await axios.post('http://localhost:8080/api/cart/checkout', { userId: auth.user.id })
//         this.lines = []
//         alert('Order placed successfully!')
//       } catch(e) { console.error('Checkout failed', e) }
//     }
//   }
// })

// import { defineStore } from 'pinia'
// import axios from 'axios'
// import { useAuthStore } from './auth'

// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     lines: [] // { id, item, quantity, price }
//   }),
//   getters: {
//     totalItems: (s) => s.lines.reduce((n, l) => n + l.quantity, 0),
//     totalPrice: (s) => s.lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
//   },
//   actions: {
//     async load() {
//       const auth = useAuthStore()
//       if (!auth.user) return
//       try {
//         const res = await axios.get('http://localhost:8080/api/cart', {
//           params: { userId: auth.user.id }
//         })
//         this.lines = res.data.map(l => ({
//           id: l.id, // CartLine ID
//           item: l.item,
//           quantity: l.quantity,
//           price: l.item.price
//         }))
//       } catch (e) {
//         console.error('Failed to load cart', e)
//       }
//     },
//     async add(item, qty = 1) {
//       const auth = useAuthStore()
//       if (!auth.user) return alert('Please log in.')

//       try {
//         await axios.post('http://localhost:8080/api/cart/add', {
//           userId: auth.user.id,
//           itemId: item.id,
//           quantity: qty
//         })
//         await this.load()
//       } catch (e) {
//         console.error('Add failed', e)
//       }
//     },
//     async remove(itemId) {
//       const line = this.lines.find(l => l.item.id === itemId)
//       if (!line) return
//       try {
//         await axios.delete(`http://localhost:8080/api/cart/${line.id}`) // ✅ correct ID
//         await this.load()
//       } catch (e) {
//         console.error('Remove failed', e)
//       }
//     },
//     clear() { this.lines = [] },
//     async checkout() {
//       const auth = useAuthStore()
//       if (!auth.user) return alert('Please log in.')

//       try {
//         await axios.post('http://localhost:8080/api/cart/checkout', {
//           userId: auth.user.id
//         })
//         this.lines = []
//         alert('Order placed successfully!')
//       } catch (e) {
//         console.error('Checkout failed', e)
//       }
//     }
//   }
// })

import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    lines: [] // { id, item, quantity, price }
  }),
  getters: {
    totalItems: (s) => s.lines.reduce((n, l) => n + l.quantity, 0),
    totalPrice: (s) => s.lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
  },
  actions: {
    async load() {
      const auth = useAuthStore()
      if (!auth.user) return
      try {
        const res = await axios.get('http://localhost:8080/api/cart', {
          params: { userId: auth.user.id }
        })
        this.lines = res.data.map(l => ({
          id: l.id,
          item: l.item,
          quantity: l.quantity,
          price: l.item.price
        }))
      } catch (e) {
        console.error('Failed to load cart', e)
      }
    },
    async add(item, qty = 1) {
      const auth = useAuthStore()
      
      console.log('Current user:', auth.user) // Debug
      
      if (!auth.user) {
        alert('Please log in.')
        return
      }

      const payload = {
        userId: auth.user.id,
        itemId: item.id,
        quantity: qty
      }
      
      console.log('Adding to cart with payload:', payload)

      try {
        const response = await axios.post('http://localhost:8080/api/cart/add', payload)
        console.log('Cart add response:', response.data)
        await this.load()
        alert(`${item.name} added to cart!`)
      } catch (e) {
        console.error('Add failed:', e)
        console.error('Error details:', e.response?.data)
        alert(`Failed to add to cart: ${e.response?.data || e.message}`)
      }
    },
    async remove(itemId) {
      const line = this.lines.find(l => l.item.id === itemId)
      if (!line) return
      try {
        await axios.delete(`http://localhost:8080/api/cart/${line.id}`)
        await this.load()
      } catch (e) {
        console.error('Remove failed', e)
      }
    },
    clear() { 
      this.lines = [] 
    },
    async checkout() {
      const auth = useAuthStore()
      if (!auth.user) {
        alert('Please log in.')
        return
      }

      try {
        await axios.post('http://localhost:8080/api/cart/checkout', {
          userId: auth.user.id
        })
        this.lines = []
        alert('Order placed successfully!')
      } catch (e) {
        console.error('Checkout failed', e)
        alert(`Checkout failed: ${e.response?.data || e.message}`)
      }
    }
  }
})