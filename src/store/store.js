import Vue from 'vue';
import Vuex from 'vuex';

import { main } from './main/main';
import { administration } from './administration/administration';
import { authentication } from './authentication/authentication';
import { snackbar } from './snackbar/snackbar';
import { modal } from './modal/modal';
import { pretransfusion } from './pretransfusion/pretransfusion';
import { requisition } from './requisition/requisition';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    administration,
    authentication,
    snackbar,
    modal,
    pretransfusion,
    requisition,
  },
});
