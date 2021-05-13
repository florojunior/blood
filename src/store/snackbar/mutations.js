export const mutations = {
  showSnackbar(state, payload) {
    state.snackbar = {
      message: payload.message,
      timeout: payload.timeout,
      showClose: payload.showClose,
      type: payload.type,
      icon: payload.icon,
      visible: true,
    };
  },
};
