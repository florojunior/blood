import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  mensagemSucesso: {
    mensagem: 'Mensagem',
    erro: true,
  },
  authenticated: false
};

export const main = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
