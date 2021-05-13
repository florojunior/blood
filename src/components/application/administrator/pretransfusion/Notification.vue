<template>
  <div style="width: 100%" class="d-flex justify-center pb-6">
    <div
      style="
        width: 80%;
        border-style: solid;
        border-color: #de0129;
        border-width: thin;
        border-radius: 5px;
      "
      class="pa-2"
    >
      <v-row class="mb-0">
        <v-col
          cols="10"
          class="mb-0 d-flex flex-row align-center justify-center"
        >
          <v-btn class="ma-0 pa-0" outlined x-small fab color="#DE0129">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="ml-4 mb-0 d-flex flex-column align-start justify-center">
            <p class="black--text text-xl-subtitle-2 text-lg-subtitle-2 mb-0">
              Solicitação não conforme
            </p>
            <p
              class="black--text text-xl-subtitle-2 text-lg-subtitle-2 font-weight-regular mb-0"
            >
              Justificativa: {{ justificativa }}
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-0 pt-0">
        <v-col class="mt-0 pt-0 d-flex justify-center">
          <v-btn
            width="80%"
            depressed
            outlined
            color="#DE0129"
            class="mr-2 px-8 text-button"
            @click="editTransfusion()"
          >
            <span class=""> Continuar </span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      justificativa: ' sdasds',
    };
  },
  props: {
    requisition: {
      type: Object,
      required: false,
    },
  },
  async created() {
    const resultRejected = await this.getRejectedTransfusionRequisition(
      this.requisition.idrequisicao
    );
    this.justificativa = resultRejected[0].observacao;
  },
  methods: {
    ...mapActions('pretransfusion', ['getRejectedTransfusionRequisition']),
    ...mapActions('modal', ['editTransfusion']),
  },
};
</script>

<style>
</style>