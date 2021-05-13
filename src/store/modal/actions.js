export const actions = {
  showModal(state, payload) {
    state.commit('SHOW_MODAL', payload);
  },
  closeModal(state) {
    state.commit('CLOSE_MODAL');
  },
  setModalAcceptUsers(state, payload) {
    state.commit('setModalAcceptUsers', payload);
  },
  setModalDeclineUsers(state, payload) {
    state.commit('setModalDeclineUsers', payload);
  },
  setModalBlockUserModal(state, payload) {
    state.commit('setBlockUserModal', payload);
  },
  setModalUnblockUserModal(state, payload) {
    state.commit('setUnblockUserModal', payload);
  },
  addHealthcare() { },
  editHealthcare() { },
  deleteHealthcare() { },
  addClinic() { },
  editClinic() { },
  deleteClinic() { },
  addHealthcareAssociation() { },
  editHealthcareAssociation() { },
  blockHealthcareAssociation() { },
  deletePatient() { },
  addPatient() { },
  editPatient() { },
  cancelTransfusionRequisition() { },
  addPreTransfusion() {
  },
  closeRequisition() {
  },
  editTransfusion(state, idRequistion) {
    state.commit('setModalAcceptUsers', idRequistion);
  },
  seeTransfusion() {
  },
  closeSeeTransfusion() { },
  rejectTransfusionRequisition() { }
};
