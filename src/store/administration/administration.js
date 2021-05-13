import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  healthcareList: [],
  healthcareListLoading: false,
  healthcaresAssociatedToHospital: [],
  healthcaresAssociatedToHospitalLoading: false,
  activeHealthcareListDisponibleForAssociation: [],
  activeHealthcareListDisponibleForAssociationLoading: false,
  pendingUsers: {
    list: [],
    loading: false,
  },
  profiles: [],
  clinicList: [],
  clinicListLoading: false,
  patients: {
    list: [],
    loading: false,
  },
  cities: {
    list: [],
    loading: false,
  },
};

export const administration = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
