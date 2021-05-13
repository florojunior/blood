import Vue from 'vue';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

Vue.use({
  install(Vue) {
    Vue.prototype.$http = httpClient;
  },
});

/**
 * Setups axios interceptors.
 * Injects Vuex store and Vue router as external dependencies.
 * @param {Vuex} store
 * @param {Router} router
 */
const setupInterceptors = (store, router) => {
  if (!store || !router) {
    throw new Error('Vuex store and Vue router are required!');
  }

  httpClient.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem(
        'token_blood'
      )}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      if (error.response) {
        // client received an error response (5xx, 4xx)
        switch (error.response.status) {
          case 400:
            store.dispatch(
              'snackbar/error',
              { message: error.response.data.message.pt },
              { root: true }
            );
            break;

          case 401: // authentication error, logout the user
            store.dispatch(
              'snackbar/error',
              { message: error.response.data.message.pt },
              { root: true }
            );
            store.dispatch('authentication/handleLogOut', { root: true });
            break;

          case 406:
            store.dispatch(
              'snackbar/warning',
              { message: error.response.data.message.pt },
              { root: true }
            );
            break;

          default:
            store.dispatch(
              'snackbar/error',
              {
                message:
                  'Ops, algo de errado aconteceu. Tente novamente mais tarde!',
              },
              { root: true }
            );
        }
      } else if (error.request) {
        // client never received a response, or request never left
        store.dispatch(
          'snackbar/error',
          {
            message:
              'Ops, algo de errado aconteceu. Tente novamente mais tarde!',
          },
          { root: true }
        );
      } else {
        // anything else
        store.dispatch(
          'snackbar/error',
          {
            message:
              'Ops, algo de errado aconteceu. Tente novamente mais tarde!',
          },
          { root: true }
        );
      }

      return Promise.reject(error);
    }
  );
};

export { setupInterceptors };
export default httpClient;
