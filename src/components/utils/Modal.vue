<template>
  <v-dialog v-model="getModal.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="text-subtitle-1">{{ getModal.title }}</v-card-title>

      <v-card-text class="text-body-2">
        <p v-for="(text, index) in getModal.message.split('\n')" :key="index">
          {{ text }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="handleClose()">{{
          getModal.buttonText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('modal', ['getModal']),
  },
  methods: {
    ...mapActions('modal', ['closeModal']),
    ...mapActions('authentication', ['setMode']),
    handleClose() {
      this.closeModal();
      this.setMode(2);
    },
  },
};
</script>

<style>
</style>
