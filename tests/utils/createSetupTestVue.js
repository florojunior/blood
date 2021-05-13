import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { createLocalVue } from '@vue/test-utils';

import { createStore } from '@/../tests/store/storeFactory';
import { createRouter } from '@/../tests/router/routerFactory';

/**
 * Encapsulates boilerplate setup logic/settings to test a Vue/Vuetify component.
 *
 * @param {Object} initialStore Vuex store object.
 * @param {Array} initialRoutes Vue-router routes array
 */
const createSetupTestVue = (initialStore = {}, initialRoutes = []) => {
  const vuetify = new Vuetify();

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);

  const store = createStore({ ...initialStore });
  const router = createRouter(initialRoutes);
  return { store, router, localVue, vuetify };
};

export default createSetupTestVue;
