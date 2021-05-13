export const mutations = {
  setPendingUsersList(state, pendingUsersList) {
    state.pendingUsers.list = pendingUsersList;
  },
  setPendingUsersLoading(state, pendingUsersList) {
    state.pendingUsers.list = pendingUsersList;
  },
  setProfiles(state, profiles) {
    state.profiles = profiles;
  },
  setHealthcareList(state, payload) {
    state.healthcareList = payload;
  },
  setHealthcareListLoading(state, payload) {
    state.healthcareListLoading = payload;
  },
  setHealthcaresListAssociatedToHospital(state, payload) {
    state.healthcaresAssociatedToHospital = payload;
  },
  setHealthcaresListAssociatedToHospitalLoading(state, payload) {
    state.healthcaresAssociatedToHospitalLoading = payload;
  },
  setActiveHealthcareListDisponibleForAssociation(state, payload) {
    state.activeHealthcareListDisponibleForAssociation = payload;
  },
  setActiveHealthcareListDisponibleForAssociationLoading(state, payload) {
    state.activeHealthcareListDisponibleForAssociationLoading = payload;
  },
  setClinicListLoading(state, clinicList) {
    state.clinicListLoading = clinicList;
  },
  setClinicList(state, clinicList) {
    state.clinicList = clinicList;
  },
  setPatientsList(state, payload) {
    state.patients.list = payload;
  },
  setPatientsListLoading(state, payload) {
    state.patients.loading = payload;
  },
  setCitiesList(state, payload) {
    state.cities.list = payload;
  },
  setCitiesListLoading(state, payload) {
    state.cities.loading = payload;
  },
};
