// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from "vue-awesome-swiper"
import '../node_modules/swiper/dist/css/swiper.css'
import "../src/style/reset.css"
import store from "./store"
import axios from "axios"
import VueAxios from "vue-axios"
import Qs from "qs"
import VideoPlayer from 'vue-video-player'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VideoPlayer);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
