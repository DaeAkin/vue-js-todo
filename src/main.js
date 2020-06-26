// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'
import {store} from './store/store'

//이벤트 버스 생성 
window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)



const router = new VueRouter({
  routes,
  mode : 'history'
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(recode => recode.meta.requiresAuth)) {
    if(!store.getters.loggedIn) {
      next({
        name : 'login',
      })
    } else {
      next()
    }
  } else if(to.matched.some(recode => recode.meta.requiresVisitor)) {
    if(store.getters.loggedIn) {
      next({
        name : 'todo',
      })
    } else {
      next()
    }
  } {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router : router,
  store : store,
  components: { Master },
  render : h => h(Master),
})
