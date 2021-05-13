
export const actions = {
  setMensagemSucesso(state, mensagem, error) {
    state.commit('setMensagemSucesso', {
      mensagem,
      error
    });
  }
}