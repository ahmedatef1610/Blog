import Vue from 'vue';
import App from './App.vue';
import router from './router';


import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';
Vue.use(VueNoty);


import VueDisqus from 'vue-disqus';
Vue.use(VueDisqus);


import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";
Vue.use(wysiwyg, {});

const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

new Vue({
  el: '#app',
  data: {
    auth
  },
  router,
  render: h => h(App)
})