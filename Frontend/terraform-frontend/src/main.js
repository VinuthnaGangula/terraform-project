import Vue from 'vue';
import VueCryptojs from 'vue-cryptojs';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(vuetify);
Vue.use(VueCryptojs);
Vue.use(VueCookies);

new Vue({
  router,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');
