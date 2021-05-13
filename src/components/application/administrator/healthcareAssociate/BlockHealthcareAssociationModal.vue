<template>
  <v-dialog v-model="visible" persistent max-width="360">
    <v-card>
      <v-card-title class="pa-0">
        <div class="background-error d-flex justify-center align-center">
          <v-icon x-large color="white"> mdi-block-helper </v-icon>
        </div>
        <p
          class="pa-6 text-subtitle-2 text-sm-subtitle-2 text-md-subtitle-1 text-lg-h6 text-xl-h6 pb-2"
        >
          Bloquear {{ healthcareSelected.descricao }}
        </p>
      </v-card-title>

      <v-card-text class="text-body-2">
        <p>Você realmente deseja bloquear este convênio do sistema?</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :loading="loading" @click="handleBlock()"
          >SIM, DESEJO</v-btn
        >
        <v-btn color="primary" text :disabled="loading" @click="closeModal()"
          >NÃO, CANCELAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BlockHealthcareAssociationModal',
  props: {
    healthcareSelected: {
      required: true,
      type: Object,
      default: () => ({
        idconvenio: null,
        descricao: null,
        ativo: null,
      }),
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'modal/blockHealthcareAssociation') {
          this.visible = true;
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['blockHealthcareAssociationToHospital']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
    },
    async handleBlock() {
      try {
        this.loading = true;

        await this.blockHealthcareAssociationToHospital(
          this.healthcareSelected
        );
        this.closeModal();
      } catch (error) {
        this.keepModalOpen();
      }
    },
  },
};
</script>
<style>
.background-error {
  background-color: #de0129;
  min-height: 100px;
  width: 100%;
}
</style>
