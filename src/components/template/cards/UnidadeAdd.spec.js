import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import UnidadeAdd from '@/components/template/cards/UnidadeAdd.vue';

describe('UnidadeAdd.vue', () => {
  let wrapper, localVue, vuetify;

  const cardUnidadeAddId = '[data-testid="card-unidade-add"]';
  const cardUnidadeIconId = '[data-testid="card-icon"]';
  const cardUnidadeTitleId = '[data-testid="card-title"]';
  const cardUnidadeDescriptionId = '[data-testid="card-description"]';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();

    wrapper = mountFunction();
  });

  const mountFunction = (options) => {
    return mount(UnidadeAdd, {
      localVue,
      vuetify,
      ...options,
    });
  };

  describe('When component is rendered', () => {
    it('Should render an UnidadeAdd card', () => {
      const cardIcon = wrapper.find(cardUnidadeIconId);
      const cardTitle = wrapper.find(cardUnidadeTitleId);
      const cardDescription = wrapper.find(cardUnidadeDescriptionId);

      expect(cardIcon.isVisible()).toBe(true);
      expect(cardTitle.text()).toEqual('Adicionar unidade');
      expect(cardDescription.text()).toEqual(
        'Solicite aqui acesso a uma nova unidade.'
      );
    });
  });
});
