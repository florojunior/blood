import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  transfusionRequisitions: {
    list: [],
    loading: false,
  },
};

export const pretransfusion = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
