// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import index from './components/index.vue'
import partition from './components/partition.vue'
import message from './components/message.vue'
import search from './components/search.vue'
import write from './components/write.vue'
import admin from './components/admin.vue'
import science from './components/science.vue'
import game from './components/game.vue'
import music from './components/music.vue'
import car from './components/car.vue'
import video from './components/video.vue'
import military from './components/military.vue'
import article from './components/article.vue'
import edirtArticle from './components/edirtArticle.vue'
import comment from './components/comment.vue'

import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueRouter);
Vue.use(YDUI);
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
  loading:'/src/assets/loading.gif'
});

//路由设置
const router = new VueRouter ({
  // mode: 'history',
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
      path: '/write',
      name: 'write',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: write
    },
    {
      path: '/edirtArticle',
      name: 'edirtArticle',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: edirtArticle
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
    {
      path: '/comment',
      name: 'comment',
      component: comment
    },
  ]
});

router.beforeEach((to, from, next) => {
  let userId = window.localStorage.getItem('userId');
  let access_token = window.localStorage.getItem('access_token');
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (userId&&access_token) {  // 通过vuex state获取当前的access_token是否存在
      next();
    }
    else {
      next({
        path: '/admin',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });

    }
  }
  else {
    next();
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App, index, partition, message, search, admin, science, game, music, car, video, military, article, write, edirtArticle, comment }
})
