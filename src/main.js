// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/global.styl'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '../store/store'

Vue.use(ElementUI);

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if (to.matched.length ===0) {        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  }else{
    (store.state.yhmc!='' || to.path=='/')?next():next('/')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
