import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  modal: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalAcceptUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalDeclineUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalBlockUser: {
    show: false,
  },
  modalUnblockUser: {
    show: false,
  },
  modalDeletePatient: {
    show: false,
  },
};

export const modal = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
