// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import index from './components/index.vue'
import partition from './components/partition.vue'
import message from './components/message.vue'
import search from './components/search.vue'
import admin from './components/admin.vue'
import science from './components/science.vue'
import game from './components/game.vue'
import music from './components/music.vue'
import car from './components/car.vue'
import video from './components/video.vue'
import military from './components/military.vue'
import article from './components/article.vue'

import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueRouter)
Vue.use(YDUI)
Vue.use(infiniteScroll)
Vue.use(VueLazyLoad,{
  loading:'/src/assets/loading.gif'
})

//路由设置
const router = new VueRouter ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/partition',
      name: 'partition',
      component: partition
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/science',
      name: 'science',
      component: science
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/car',
      name: 'car',
      component: car
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/military',
      name: 'military',
      component: military
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App, index, partition, message, search, admin, science, game, music, car, video, military, article }
})
