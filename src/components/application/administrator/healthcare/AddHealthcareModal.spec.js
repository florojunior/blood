import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import AddHealthcare from '@/components/application/administrator/healthcare/AddHealthcareModal.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddHealthcare.vue', () => {
  let vuetify;
  let store, actions;

  beforeEach(() => {
    vuetify = new Vuetify();

    actions = {
      createNewHealthcare: jest.fn(),
    };

    store = {
      actions,
      subscribeAction: jest.fn(),
    };
  });

  const mountFunction = (component, options) => {
    return mount(component, {
      localVue,
      vuetify,
      store,
      ...options,
    });
  };

  describe('Verify initial state of modal', () => {
    it('By default, component is not visible', async () => {
      const wrapper = mountFunction(AddHealthcare);

      expect(wrapper.vm.visible).toBe(false);
    });
  });
});
