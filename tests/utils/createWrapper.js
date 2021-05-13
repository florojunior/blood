import { mount } from '@vue/test-utils';
import createSetupTestVue from '@/../tests/utils/createSetupTestVue';

/**
 * createWrapper allows to have a fresh copy of the component under test, ready for testing.
 * It is possible to configure Vuex and Vue-router the way you need it.
 *
 * @param {Vue} component Vue component under test
 * @param {Object} options Vue component options
 * @param {Object} initialStore Vuex store object
 * @param {Array} initialRoutes Vue router routes array
 */
const createWrapper = (
  component,
  options = {},
  initialStore = {},
  initialRoutes = []
) => {
  const { localVue, store, router, vuetify } = createSetupTestVue(
    initialStore,
    initialRoutes
  );

  return mount(component, {
    store,
    router,
    localVue,
    vuetify,
    ...options,
  });
};

export default createWrapper;
