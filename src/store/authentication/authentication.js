import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  preRegistration: {
    cpf: null,
    hospitals: [],
    professionalCouncils: [],
    occupations: [],
  },
  hospitalSelected: null,
  hospitalsUser: [],
  setUser: {},
  menu: {},
  login: {
    loading: false,
    error: null,
  },
  // Modes:
  // 1 - ForgotPassword
  // 2 - (default) Authenticate
  // 3 - NewPassword
  // 4 - VerifyUserRegistration
  // 5 - UserPreRegistration
  mode: 2,
};

export const authentication = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
