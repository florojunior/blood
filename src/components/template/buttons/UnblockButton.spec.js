import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import UnblockButton from '@/components/template/buttons/UnblockButton.vue';

describe('UnblockButton.vue', () => {
  let localVue, vuetify;
  const buttonId = '[data-testid="unblock-button"]';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => {
    return mount(UnblockButton, {
      localVue,
      vuetify,
      ...options,
    });
  };

  describe('Verify initial state of button', () => {
    it('onClick callback is required', async () => {
      expect(UnblockButton.props.onClick.required).toBe(true);
    });

    it('onClick callback prop should be a function', async () => {
      expect(typeof UnblockButton.props.onClick.type).toBe('function');
    });
  });

  describe('Verify button functionality', () => {
    it('When button is clicked, onCLick callback should be called', async () => {
      const onClick = jest.fn();

      const wrapper = mountFunction({
        propsData: {
          onClick,
        },
      });

      wrapper.find(buttonId).trigger('click');
      await wrapper.vm.$nextTick();

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
