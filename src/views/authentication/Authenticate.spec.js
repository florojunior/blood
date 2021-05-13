import Vuetify from 'vuetify';

import Authenticate from '@/views/authentication/Authenticate.vue';

import { createLocalVue, mount } from '@vue/test-utils';

describe('Authenticate.vue', () => {
  const localVue = createLocalVue();
  let vuetify, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Authenticate, {
      localVue,
      vuetify,
    });
  });

  it('should have title', () => {
    const title = wrapper.find('.v-card__title');

    expect(title.text()).toBe('Login');
  });

  it('should have subtitle', () => {
    const title = wrapper.find('.v-card__subtitle');

    expect(title.text()).toBe('Acesse sua conta com e-mail e senha.');
  });
});
