import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import PageTitle from '@/components/template/PageTitle.vue';

describe('PageTitle.vue', () => {
  let localVue, vuetify;
  const titleId = '[data-testid="page-title"]';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const mountFunction = (component, options) => {
    return mount(component, {
      localVue,
      vuetify,
      ...options,
    });
  };

  describe('Verify content rendered to UI', () => {
    it('Component renders current router name', () => {
      const expectedTitleText = 'Convênios';

      const $route = {
        path: '/healthcare',
        name: expectedTitleText,
      };

      const wrapper = mountFunction(PageTitle, {
        mocks: {
          $route,
        },
      });

      const titleText = wrapper.find(titleId).text();

      expect(titleText).toBe(expectedTitleText);
    });
  });
});
