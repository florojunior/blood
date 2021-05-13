<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-row class="full-screen pa-0 ma-0">
        <v-col class="pa-0 ma-0"><AuthSidebar cols="4" /></v-col>
        <v-col cols="12" xs="12" sm="12" md="8">
          <ForgotPassword v-if="mode == 1" />
          <Authenticate v-if="mode == 2" />
          <NewPassword v-if="mode == 3" />
          <VerifyUserRegistration v-if="mode == 4" />
          <UserPreRegistration v-if="mode == 5" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ForgotPassword from '@/views/authentication/ForgotPassword';
import Authenticate from '@/views/authentication/Authenticate';
import NewPassword from '@/views/authentication/NewPassword';
import AuthSidebar from '@/components/template/AuthSidebar.vue';
import VerifyUserRegistration from '@/views/authentication/VerifyUserRegistration.vue';
import UserPreRegistration from '@/views/authentication/UserPreRegistration.vue';

export default {
  name: 'Login',
  components: {
    AuthSidebar,
    Authenticate,
    ForgotPassword,
    NewPassword,
    VerifyUserRegistration,
    UserPreRegistration,
  },
  computed: {
    ...mapGetters('authentication', ['mode']),
    ...mapGetters('main', ['authenticated']),
  },
  created() {
    localStorage.setItem('token_blood', null);
    this.setAuthenticated(false);
    this.loadModeNewPassword();
  },
  methods: {
    ...mapActions('main', ['setAuthenticated']),
    ...mapActions('authentication', ['setMode']),
    loadModeNewPassword() {
      if (this.$route.query.token) {
        this.setMode(3);
      }
    },
  },
};
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100%;
  max-width: 100% !important;
}
</style>
