// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import store from './store';
// Helpers
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import Vuefire from 'vuefire'
import firebase from './service/firebase'
import '@fortawesome/fontawesome-free/css/all.css'
import Clipboard from 'v-clipboard'

import VueApexCharts from 'vue-apexcharts'

import jsPDF from 'jsPDF'

import html2canvas from 'html2canvas'

import VueHtmlToPaper from 'vue-html-to-paper'

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

import Chart from 'chart.js';

import hchs from 'hchs-vue-charts'


let MyChart = {
  install(Vue, options) {
    window.Chart = Chart
  }

}

let MyHCHS = {
  install(Vue, options) {
    window.hchs = hchs
  }
}

Vue.use(MyHCHS)

Vue.use(MyChart)

Vue.use(Donut);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    // 'https://unpkg.com/kidlat-css/css/kidlat.css',
    'vuetify/dist/vuetify.min.css',
    'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css'
  ]
}

Vue.use(VueHtmlToPaper);

Vue.use(VueApexCharts)



let MyPlugin = {
  install(Vue, options) {
    window.html2canvas = html2canvas
  }
}

let MyPlugin2 = {
  install(Vue, options) {
    window.jsPDF = jsPDF
  }
}

Vue.use(MyPlugin)

Vue.use(MyPlugin2)

Vue.use(Clipboard)
Vue.use(Vuefire)
Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: "#ee8900", // #E53935
    secondary: colors.red.darken1, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',
  firebase: {
    menus: firebase.database.ref('global_menus').orderByChild('created_at')
  },
  router,
  store,
  template: '<App/>',
  components: { App },
  // methods: {
  //   printme() {
  //     window.print();
  //   }
  // },
})
