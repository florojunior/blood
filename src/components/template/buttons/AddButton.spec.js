import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import AddButton from '@/components/template/buttons/AddButton.vue';

describe('AddButton.vue', () => {
  let localVue, vuetify;
  const buttonId = '[data-testid="add-button"]';

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

  describe('Verify initial state of button', () => {
    it('onClick callback is required', async () => {
      const wrapper = mountFunction(AddButton);
      const onClickRequired = wrapper.vm.$options.props.onClick.required;

      expect(onClickRequired).toBe(true);
    });

    it('onClick callback prop should be a function', async () => {
      const wrapper = mountFunction(AddButton, {
        propsData: {
          onClick: () => {},
        },
      });

      expect(typeof wrapper.vm.onClick).toBe('function');
    });

    it('When button loading prop is not declared, loading default state should be false', async () => {
      const wrapper = mountFunction(AddButton, {
        propsData: {
          onClick: () => {},
        },
      });

      expect(wrapper.vm.loading).toBe(false);
    });
  });

  describe('Verify button functionality', () => {
    it('Button displays text passed to default slot', () => {
      const slotText = 'Add new item';
      const wrapper = mountFunction(AddButton, {
        slots: {
          default: slotText,
        },
      });
      const buttonText = wrapper.find(buttonId).element.textContent;

      expect(buttonText).toEqual(slotText);
    });

    it('When button is clicked, onCLick callback should be called', async () => {
      const onClick = jest.fn();

      const wrapper = mountFunction(AddButton, {
        propsData: {
          onClick,
        },
        slots: {
          default: 'Add button',
        },
      });

      wrapper.find(buttonId).trigger('click');
      await wrapper.vm.$nextTick();

      expect(onClick).toHaveBeenCalled();
    });
  });
});
