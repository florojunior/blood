<template>
  <div class="d-flex flex-grow-1 justify-center align-content-center">
    <Menu v-if="authenticated"></Menu>
    <router-view></router-view>
    <Modal />
    <SnackbarNotification />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Modal from '@/components/utils/Modal.vue';
import Menu from '@/components/template/Menu.vue';
import SnackbarNotification from '@/components/utils/SnackbarNotification.vue';

export default {
  components: {
    Modal,
    Menu,
    SnackbarNotification,
  },
  computed: {
    ...mapGetters('main', ['authenticated']),
  },
};
</script>

<style>
.hideMenu {
  margin-top: 60px;
}
</style>
