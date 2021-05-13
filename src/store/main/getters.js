export const getters = {
  mensagemSucesso: (state) => state.mensagemSucesso,
  authenticated: (state) => {
    if(!state.authenticated){
      return localStorage.getItem('token_blood') != null && localStorage.getItem('token_blood') != "null";
    }else{
      return state.authenticated;
    }
  },
};
