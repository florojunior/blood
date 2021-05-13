export const mutations = {
  SHOW_MODAL(state, payload) {
    state.modal = {
      title: payload.title,
      message: payload.message,
      buttonText: payload.buttonText,
      show: true,
    };
  },
  CLOSE_MODAL(state) {
    state.modal = {
      title: '',
      message: '',
      buttonText: '',
      show: false,
    };
  },
  setModalAcceptUsers(state, payload) {
    state.modalAcceptUsers = payload;
  },
  setModalDeclineUsers(state, payload) {
    state.modalDeclineUsers = payload;
  },
  setBlockUserModal(state, payload) {
    state.modalBlockUser = payload;
  },
  setUnblockUserModal(state, payload) {
    state.modalUnblockUser = payload;
  },
  addHealthcare() {},
  editHealthcare() {},
  deleteHealthcare() {},
  setHealthcare(state, payload) {
    state.healthcare = {
      id: payload.idconvenio,
      description: payload.descricao,
      status: payload.ativo,
    };
  },
  addHealthcareAssociation() {},
  editHealthcareAssociation() {},
  blockHealthcareAssociation() {},
  deletePatient() {},
  addPatient() {},
  editPatient() {},
  cancelTransfusionRequisition() {},
};
