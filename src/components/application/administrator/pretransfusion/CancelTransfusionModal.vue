<template>
  <v-dialog v-model="visible" persistent max-width="360">
    <v-card data-testid="card">
      <v-card
        flat
        rounded="0"
        class="py-6 d-flex flex-column align-center justify-center cancel"
      >
        <v-icon x-large color="white" data-testid="icon">
          mdi-block-helper
        </v-icon>
      </v-card>

      <v-card-title data-testid="title">Cancelar Requisição</v-card-title>

      <v-card-subtitle class="text-body-1 pt-4" data-testid="subtitle">
        Você realmente deseja cancelar esta requisição no sistema? Justifique:
      </v-card-subtitle>

      <v-card-text>
        <v-form id="form" ref="form">
          <v-textarea
            v-model="observacao"
            outlined
            :rules="[transfusionCancelObservationRules.required]"
            name="observacao"
            label="Justificação"
            no-resize
            data-testid="justification"
          ></v-textarea>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          data-testid="submit-confirm"
          text
          color="primary"
          type="submit"
          form="form"
          :loading="loading"
          @click.prevent="submit()"
          >SIM, DESEJO</v-btn
        >
        <v-btn
          color="primary"
          text
          :disabled="loading"
          data-testid="submit-cancel"
          @click.prevent="closeModal()"
          >NÃO, CANCELAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

import { transfusionCancelObservationRules } from '@/validations';

export default {
  name: 'CancelTransfusionModal',
  props: {
    requisition: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      observacao: '',
      visible: false,
      loading: false,
      transfusionCancelObservationRules,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'modal/cancelTransfusionRequisition') {
          this.visible = true;
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('pretransfusion', ['cancelTransfusionRequisition']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          await this.cancelTransfusionRequisition({
            idRequisition: this.requisition.idrequisicao,
            observacao: this.observacao,
          });
          this.closeModal();
        }
      } catch (error) {
        this.keepModalOpen();
      }
    },
  },
};
</script>
