import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

// Vuetify v-snackbar:
// default timeout: 5 seconds
const defaultOptions = Object.freeze({
  message: null,
  timeout: null,
  showClose: false,
  type: null,
  icon: null,
  visible: false,
});

const state = {
  snackbar: {
    ...defaultOptions,
  },
  defaultOptions,
};

export const snackbar = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
