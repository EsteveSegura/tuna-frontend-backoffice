import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import SoundBoard from '../views/SoundBoard'
import SoundBoards from '../views/SoundBoards'
import Sound from '../views/Sound'
import Logs from '../views/Logs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/soundboards',
    name: 'SoundBoards',
    component: SoundBoards,
  },
  {
    path: '/soundboard',
    name: 'SoundBoard',
    component: SoundBoard,
  },
  {
    path: '/sound/:id',
    name: 'Sound',
    component: Sound,
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = (localStorage.token !== undefined)

  if(to.name == 'Home' && isAuthenticated){
    next({ name: 'SoundBoards' })
  } 

  if (to.name == 'Sound' && !isAuthenticated) {
    next({ name: 'Home' })
  } 

  if (to.name == 'SoundBoard' && !isAuthenticated) {
    next({ name: 'Home' })
  } 
  
  if (to.name == 'SoundBoards' && !isAuthenticated) {
    next({ name: 'Home' })
  } 

  if (to.name == 'Logs' && !isAuthenticated) {
    next({ name: 'Home' })
  } 
    
  next()
})

export default router
