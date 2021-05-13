import ChooseUnidade from '@/views/authentication/ChooseUnidade.vue';
import UnidadeItem from '@/components/template/cards/UnidadeItem.vue';
import UnidadeAdd from '@/components/template/cards/UnidadeAdd.vue';

import createWrapper from '@/../tests/utils/createWrapper';

describe('ChooseUnidade.vue', () => {
  const pageTitleId = '[data-testid="page-title"]';

  let store;
  let getters;

  beforeEach(() => {
    getters = {
      hospitalsUser: jest.fn(),
    };

    store = {
      modules: {
        authentication: {
          namespaced: true,
          getters,
        },
      },
    };
  });

  it('renders "Escolha a unidade" as page title', () => {
    getters.hospitalsUser = jest.fn().mockReturnValue([]);
    const wrapper = createWrapper(ChooseUnidade, {}, { ...store });

    const pageTitle = wrapper.find(pageTitleId);

    expect(pageTitle.text()).toEqual('Escolha a unidade');
  });

  describe('When user is not associated to a "unidade"', () => {
    it('should not list any "unidade" option', () => {
      getters.hospitalsUser = jest.fn().mockReturnValue([]);

      const wrapper = createWrapper(ChooseUnidade, {}, { ...store });

      const AmmountOfUnidadeItems = wrapper.findAllComponents(UnidadeItem)
        .length;

      expect(AmmountOfUnidadeItems).toBe(0);
    });

    it('should display only "Adicionar unidade" option', () => {
      getters.hospitalsUser = jest.fn().mockReturnValue([]);

      const wrapper = createWrapper(ChooseUnidade, {}, { ...store });

      const addOption = wrapper.findComponent(UnidadeAdd);

      expect(addOption.isVisible()).toBe(true);
    });
  });

  describe('When user is associated to one or more "unidade(s)" ', () => {
    const mockedGetterValue = [
      {
        id: 0,
        nome: 'Hemoam',
        endereco:
          'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001',
      },
      {
        id: 1,
        nome: 'Hemoam',
        endereco:
          'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001',
      },
      {
        id: 3,
        nome: 'Hemoam',
        endereco:
          'Av. Constantino Nery, 4397 - Chapada, Manaus - AM, 69050-001',
      },
    ];
    it('should list all "unidade" options', () => {
      getters.hospitalsUser = jest.fn().mockReturnValue(mockedGetterValue);

      const wrapper = createWrapper(ChooseUnidade, {}, { ...store });

      const ammountOfUnidadeItems = wrapper.findAllComponents(UnidadeItem)
        .length;

      expect(ammountOfUnidadeItems).toBe(3);
    });

    it('should display "Adicionar unidade" option', () => {
      getters.hospitalsUser = jest.fn().mockReturnValue(mockedGetterValue);

      const wrapper = createWrapper(ChooseUnidade, {}, { ...store });

      const addUnidadeOption = wrapper.findComponent(UnidadeAdd);

      expect(addUnidadeOption.isVisible()).toBe(true);
    });
  });
});
