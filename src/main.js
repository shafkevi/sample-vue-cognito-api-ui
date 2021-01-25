import Vue from 'vue'
import App from './App.vue'
import router from './router';

import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import UUID from "vue-uuid";
Vue.use(UUID);
Amplify.configure(awsconfig);


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import './styles/main.scss';

Vue.use(VueMaterial)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
