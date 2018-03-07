// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/css/animate.css'
import './assets/css/icomoon.css'
import './assets/css/magnific-popup.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/owl.theme.default.min.css'
import './assets/css/style.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import './assets/js/jquery.easing.1.3'
import './assets/js/jquery.waypoints.min'
import './assets/js/owl.carousel.min'
import './assets/js/jquery.countTo'
import './assets/js/jquery.magnific-popup.min'
import './assets/js/magnific-popup-options'
import './assets/js/main'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
