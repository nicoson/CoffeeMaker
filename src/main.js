// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Swipe, SwipeItem, Popup } from 'mint-ui'
import 'mint-ui/lib/style.min.css'

// import Mint from 'mint-ui'
// Vue.use(Mint)

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Popup.name, Popup)

Vue.config.productionTip = false

/* eslint-disable no-new */
document.addEventListener('deviceready', function () {
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
  window.navigator.splashscreen.hide()
}, false)
