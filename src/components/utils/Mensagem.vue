<template>
  <v-snackbar
    v-model="mostrarMensagemSucesso"
    bottom
    :color="mensagemSucesso.erro? 'red':'green'"
  >{{ mensagemSucesso.mensagem }}</v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => {
    return {
      snackbar: true,
    };
  },
  computed: {
    ...mapGetters('main', ['mensagemSucesso', 'mostrarMensagemSucesso']),
  },
  methods: {
    ...mapActions('lote', ['setMostrarMensagemSucesso']),
  },
};
</script>

<style>
</style>
