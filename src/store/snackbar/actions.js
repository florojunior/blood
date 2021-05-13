export const actions = {
  success(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'success',
      icon: 'mdi-check-circle-outline',
    });
  },
  info(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'info',
      icon: 'mdi-information-outline',
    });
  },
  error(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'error',
      icon: 'mdi-alert-octagon-outline',
    });
  },
  warning(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'warning',
      icon: 'mdi-alert-outline',
    });
  },
  blocked(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'blocked',
      icon: 'mdi-block-helper',
    });
  },
  delete(state, { message, timeout, showClose }) {
    state.commit('showSnackbar', {
      message,
      timeout,
      showClose,
      type: 'delete',
      icon: 'mdi-delete',
    });
  },
};
