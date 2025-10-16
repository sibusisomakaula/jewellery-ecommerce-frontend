import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
  state: () => ({ lines: [] }),
  getters: {
    totalItems: (s) => s.lines.reduce((n,l)=>n+l.quantity, 0),
    totalPrice: (s) => s.lines.reduce((sum,l)=>sum + l.price*l.quantity, 0)
  },
  actions: {
    add(item, qty = 1) { const e = this.lines.find(l=>l.item.id===item.id); if(e) e.quantity+=qty; else this.lines.push({item, quantity:qty, price:item.price}); },
    remove(id) { this.lines = this.lines.filter(l=>l.item.id!==id) },
    setQty(id, qty) { const l = this.lines.find(l=>l.item.id===id); if (l) l.quantity = qty },
    clear(){ this.lines=[] }
  }
})
