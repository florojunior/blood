export const mutations = {
  setTransfusionRequisitionsList(state, list) {
    state.transfusionRequisitions.list = list;
  },
  setTransfusionRequisitionsListLoading(state, loading) {
    state.transfusionRequisitions.loading = loading;
  },
};
