import {actions} from './actions';
import {getters} from "./getters";
import {mutations} from './mutations';

const namespaced = true;

const state = {
  mensagemSucesso: {
    mensagem:'Mensagem',
    erro: true,
  }
}

export const principal = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}