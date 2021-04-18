import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//importa tienda
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Tareas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/tareas',
    name: 'Tareas',
    component: () => import('../views/Tareas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/deleteuser',
    name: 'deleteuser',
    component: () => import('../views/DeleteUser.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/Users.vue')
  },{
    path: '/usuario/:id',
    name: 'usuario',
    component: () => import('../views/UserId.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)  => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

  if(rutaProtegida && store.state.token === ''){
    next({name: 'login'});
  } else{
    next();
  }
})


export default router
