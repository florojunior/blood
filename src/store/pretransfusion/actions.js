import {
  getAllTransfusionRequisitions,
  cancelTransfusionRequisition,
  rejectTransfusionRequisition,
  getRejectedTransfusionRequisition
} from '@/services/api/requisitions';

export const actions = {
  async fetchTransfusionRequisitionsList(state) {
    try {
      state.dispatch('startTransfusionRequisitionsListLoading');

      const response = await getAllTransfusionRequisitions();

      state.commit('setTransfusionRequisitionsList', response.data.result);
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage =
          error + ', falha ao carregar lista requisições de transfusão!';
      } else {
        errorMessage = 'Falha ao carregar lista requisições de transfusão!';
      }

      state.commit('setTransfusionRequisitionsList', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
    } finally {
      state.dispatch('stopTransfusionRequisitionsListLoading');
    }
  },
  startTransfusionRequisitionsListLoading(state) {
    state.commit('setTransfusionRequisitionsListLoading', true);
  },
  stopTransfusionRequisitionsListLoading(state) {
    state.commit('setTransfusionRequisitionsListLoading', false);
  },
  async cancelTransfusionRequisition(state, payload) {
    try {
      const response = await cancelTransfusionRequisition(payload);

      state.dispatch(
        'snackbar/blocked',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchTransfusionRequisitionsList');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao cancelar requisição de transfusão!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro ao cancelar requisição de transfusão!');
    }
  },
  async rejectTransfusionRequisition(state, payload) {
    try {
      const response = await rejectTransfusionRequisition(payload);

      state.dispatch(
        'snackbar/blocked',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchTransfusionRequisitionsList');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao cancelar requisição de transfusão!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro ao cancelar requisição de transfusão!');
    }
  },
  async getRejectedTransfusionRequisition(state, payload) {
    try {
      const response = await getRejectedTransfusionRequisition(payload);

      return response.data.result;
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao cancelar requisição de transfusão!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro ao cancelar requisição de transfusão!');
    }
  },


};
