import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Orders from '../views/Orders.vue'
import OrderDetail from '../views/OrderDetail.vue'
import AdminProducts from '../views/admin/AdminProducts.vue'
import AdminCategories from '../views/admin/AdminCategories.vue'
import AdminOrders from '../views/admin/AdminOrders.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/products/:id', component: ProductDetail, props: true },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/orders', component: Orders, meta: { requiresAuth: true, role: 'USER' } },
  { path: '/orders/:id', component: OrderDetail, props: true, meta: { requiresAuth: true, role: 'USER' } },
  // auth
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // admin
  { path: '/admin/products', component: AdminProducts, meta: { requiresAuth: true, role: 'ADMIN' } },
  { path: '/admin/categories', component: AdminCategories, meta: { requiresAuth: true, role: 'ADMIN' } },
  { path: '/admin/orders', component: AdminOrders, meta: { requiresAuth: true, role: 'ADMIN' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (!to.meta.requiresAuth) return next()

  const token = auth.token
  const userRole = auth.user?.role

  if (!token) return next('/login') // not logged in

  // role check
  if (to.meta.role && to.meta.role !== userRole) {
    // redirect to default page based on role
    return next(userRole === 'ADMIN' ? '/admin/products' : '/products')
  }

  next()
})

export default router
