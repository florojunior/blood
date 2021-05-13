export const mutations = {
  setCpfPreRegistration(state, cpf) {
    state.preRegistration.cpf = cpf;
  },
  setProfessionalCouncils(state, professionalCouncils) {
    state.preRegistration.professionalCouncils = professionalCouncils;
  },
  setOccupations(state, occupations) {
    state.preRegistration.occupations = occupations;
  },
  setHospitals(state, hospitals) {
    state.preRegistration.hospitals = hospitals;
  },
  resetPreRegistration(state) {
    state.preRegistration = {
      cpf: null,
      hospitals: [],
      professionalCouncils: [],
      occupations: [],
    };
  },
  setSelectedHospital(state, payload) {
    state.hospitalSelected = payload;
  },
  setHospitelUser(state, payload) {
    state.hospitalsUser = payload;
  },
  setMode(state, payload) {
    state.mode = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setMenu(state, payload) {
    state.menu = payload;
  },
  LOGIN_PENDING(state) {
    state.login.loading = true;
  },
  LOGIN_SUCCESS(state) {
    state.login.loading = false;
    state.login.error = null;
  },
  LOGIN_ERROR(state, error) {
    state.login.loading = false;
    state.login.error = error;
  },
};
