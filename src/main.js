import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import { setupInterceptors } from './plugins/axios';
import './plugins/mask';
import './plugins/excel';
import './plugins/barcode-reader';

Vue.config.productionTip = false;

setupInterceptors(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
