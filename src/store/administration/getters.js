export const getters = {
  getPendingUsersList: (state) => state.pendingUsers.list,
  getPorfileslist: (state) => state.profiles,
  getHealthcareList: (state) => state.healthcareList,
  getHealthcareListLoading: (state) => state.healthcareListLoading,
  getClinicList: (state) => state.clinicList,
  getClinicListLoading: (state) => state.clinicListLoading,
  getHealthcaresAssociatedToHospital: (state) =>
    state.healthcaresAssociatedToHospital,
  getHealthcaresAssociatedToHospitalLoading: (state) =>
    state.healthcaresAssociatedToHospitalLoading,
  getActiveHealthcareListDisponibleForAssociation: (state) =>
    state.activeHealthcareListDisponibleForAssociation,
  getActiveHealthcareListDisponibleForAssociationLoading: (state) =>
    state.activeHealthcareListDisponibleForAssociationLoading,
  getPatientsList: (state) => state.patients.list,
  getPatientsListLoading: (state) => state.patients.loading,
  getCitiesList: (state) => state.cities.list,
  getCitiesListLoading: (state) => state.cities.loading,
};
