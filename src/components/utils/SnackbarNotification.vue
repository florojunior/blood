<template>
  <v-snackbar
    v-model="visible"
    centered
    top
    tile
    :timeout="getSnackbar.timeout"
    :color="getSnackbar.type"
  >
    <span
      class="text-subtitle-1 text-left onHighEmphasys--text d-flex align-center justify-center"
    >
      <v-icon left>{{ getSnackbar.icon }}</v-icon>
      {{ getSnackbar.message }}
    </span>

    <template v-if="getSnackbar.showClose" v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="visible = false">
        {{ button.text }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      button: {
        text: 'Fechar',
      },
      visible: false,
    };
  },
  computed: {
    ...mapGetters('snackbar', ['getSnackbar']),
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'snackbar/showSnackbar') {
        this.visible = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
