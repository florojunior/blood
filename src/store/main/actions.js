export const actions = {
  setMensagemSucesso(state, mensagem, error) {
    state.commit('setMensagemSucesso', {
      mensagem,
      error,
    });
  },
  setAuthenticated(state, authenticated) {
    state.commit('setAuthenticated', authenticated);
  },
};
