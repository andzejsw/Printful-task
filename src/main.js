import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Questions from './components/Questions.vue'
import Results from './components/Results.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/questions', name: 'questions', component: Questions, props: true },
  { path: '/results', name: 'results', component: Results, props: true },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
