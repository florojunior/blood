import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Creates a fresh new copy a vuex store. If default store state is defined
 * mirroring current application, gets a fresh new copy of current store application.
 *
 * @param {Object} object Allows to setup Vuex initial state (initialState key),
 * default state, mutations, actions, getters and modules. Default root state can be
 * overwritten by setting a value to initialState object.
 */
const createStore = ({
  initialState = {},
  mutations = {},
  actions = {},
  getters = {},
  modules = {},
}) => {
  return new Vuex.Store({
    state: { ...initialState },
    mutations: { ...mutations },
    actions: { ...actions },
    getters: { ...getters },
    modules: { ...modules },
  });
};

export { createStore };
