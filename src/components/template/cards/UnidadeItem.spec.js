import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import UnidadeItem from '@/components/template/cards/UnidadeItem.vue';

describe('UnidadeItem.vue', () => {
  let wrapper, localVue, vuetify;

  const unidadeIconId = '[data-testid="unidade-icon"]';
  const unidadeNomeId = '[data-testid="unidade-nome"]';
  const unidadeEnderecoId = '[data-testid="unidade-endereco"]';
  const unidadeButtonId = '[data-testid="unidade-button"]';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();

    wrapper = mountFunction({
      propsData: {
        hospital: {
          id: 0,
          nome: 'Hemoam',
          endereco:
            'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001',
        },
        onClick: jest.fn(),
      },
    });
  });

  const mountFunction = (options) => {
    return mount(UnidadeItem, {
      localVue,
      vuetify,
      ...options,
    });
  };

  describe('Properties', () => {
    it('"hospital" prop is required and must be an object', async () => {
      expect(UnidadeItem.props.hospital).toMatchObject({
        type: Object,
        required: true,
      });
    });

    it('"onClick" prop is required and must be a function', async () => {
      expect(UnidadeItem.props.onClick).toMatchObject({
        type: Function,
        required: true,
      });
    });
  });

  describe('When component is rendered', () => {
    it('Should render an UnidadeItem card', () => {
      const cardIcon = wrapper.find(unidadeIconId);
      const cardNome = wrapper.find(unidadeNomeId);
      const cardEndereco = wrapper.find(unidadeEnderecoId);
      const cardButton = wrapper.find(unidadeButtonId);

      expect(cardIcon.isVisible()).toBe(true);
      expect(cardNome.text()).toEqual('Hemoam');
      expect(cardEndereco.text()).toEqual(
        'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001'
      );
      expect(cardButton.isVisible()).toBe(true);
    });

    it('When button is clicked, onClick callback should be called with respective hospital parameter', async () => {
      const hospital = {
        id: 0,
        nome: 'Hemoam',
        endereco:
          'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001',
      };

      const button = wrapper.find(unidadeButtonId);
      button.trigger('click');
      await wrapper.vm.$nextTick();

      expect(button.isVisible()).toBe(true);
      expect(wrapper.vm.onClick).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.onClick).toHaveBeenCalledWith(hospital);
    });
  });
});
