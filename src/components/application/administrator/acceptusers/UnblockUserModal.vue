<template>
  <v-dialog v-model="getUnblockUserModal.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="pa-0" >
        <div class="background-sucess d-flex justify-center align-center">
           <v-icon
            x-large
            color="white"
          >
            mdi-cancel
          </v-icon>
        </div>
        <p class="pa-6 text-subtitle-2 text-sm-subtitle-2 text-md-subtitle-1 text-lg-h6 text-xl-h6 pb-2">Desbloquear {{userSelected.dados.nome}}</p>
      </v-card-title>

      <v-card-text class="text-body-2">
        <p>
          Você realmente deseja desbloquear este usuário do sistema?
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
    ...mapGetters('modal', ['getUnblockUserModal']),
  },
  methods: {
    ...mapActions('modal', ['setModalUnblockUserModal']),
    ...mapActions('administration', ['fetchUnblockUser', 'fetchListUsers']),
    handleClose() {
      this.setModalUnblockUserModal({show: false});
    },
    async bloquear(){
      await this.fetchUnblockUser(this.userSelected);
      await this.fetchListUsers(status);
      this.handleClose();
    }
  },
};
</script>

<style>
  .background-sucess{
    background-color: #4EC07C;
    min-height: 100px;
    width: 100%;
  }
</style>
