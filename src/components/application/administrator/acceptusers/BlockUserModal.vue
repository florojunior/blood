<template>
  <v-dialog v-model="getBlockUserModal.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="pa-0" >
        <div class="background-error d-flex justify-center align-center">
           <v-icon
            x-large
            color="white"
          >
            mdi-cancel
          </v-icon>
        </div>
        <p class="pa-6 text-subtitle-2 text-sm-subtitle-2 text-md-subtitle-1 text-lg-h6 text-xl-h6 pb-2">Bloquear {{userSelected.dados.nome}}</p>
      </v-card-title>

      <v-card-text class="text-body-2">
        <p>
          Você realmente deseja bloquear este usuário do sistema?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="bloquear()">SIM, DESEJO</v-btn>
        <v-btn color="primary" text @click="handleClose()">NÃO, CANCELAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
      userSelected: Object
  },
  computed: {
    ...mapGetters('modal', ['getBlockUserModal']),
  },
  methods: {
    ...mapActions('modal', ['setModalBlockUserModal']),
    ...mapActions('administration', ['fetchBlockUser', 'fetchListUsers']),
    handleClose() {
      this.setModalBlockUserModal({show: false});
    },
    async bloquear(){
      await this.fetchBlockUser(this.userSelected);
      await this.fetchListUsers(status);
      this.handleClose();
    }
  },
};
</script>

<style>
  .background-error{
    background-color: #DE0129;
    min-height: 100px;
    width: 100%;
  }
</style>
