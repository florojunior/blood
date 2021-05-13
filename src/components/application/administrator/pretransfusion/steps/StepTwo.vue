<template>
  <v-form ref="stepTwo">
    <v-select
      v-model="procedure.idTypeProcedure"
      :loading="getTypesProcedureLoading"
      :disabled="getTypesProcedureLoading || getProcedureLoading"
      :items="getTypesProcedureList"
      :item-text="'descricao'"
      :item-value="'idtipoprocedimento'"
      validate-on-blur
      outlined
      name="tipoprocedimento"
      :rules="[typesProcedureRules.required]"
      :label="getTypesProcedureLoading ? 'Carregando...' : 'Tipo'"
    ></v-select>

    <v-textarea
      v-model="procedure.observation"
      outlined
      :disabled="getProcedureLoading"
      :rules="[procedureObservationRules.required]"
      name="observation"
      label="Observação"
      validate-on-blur
      no-resize
      data-testid="observation"
    ></v-textarea>

    <v-btn
      type="submit"
      form="formStepTwo"
      depressed
      color="primary"
      :loading="getProcedureLoading"
      class="mr-2 px-8 text-button"
      @click.prevent="submitProcedureFormThenGoNext"
    >
      Continuar
    </v-btn>
    <v-btn depressed text @click="goBackStep"> Voltar </v-btn>
  </v-form>
</template>
<script>
import { typesProcedureRules, procedureObservationRules } from '@/validations';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    goNextStep: {
      type: Function,
      required: true,
    },
    goBackStep: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      procedureObservationRules,
      typesProcedureRules,
      procedure: {
        idAttendance: null,
        idProcedure: null,
        idTypeProcedure: null,
        observation: null,
      },
    };
  },
  computed: {
    ...mapGetters('requisition', [
      'getEditRequisition',
      //TYPES PROCEDURE
      'getTypesProcedureList',
      'getTypesProcedureLoading',
      'getTypesProcedureRequestError',
      'getIsProcedureAlreadyCreated',
      'getHasProcedureRequestFailed',
      //PROCEDURE
      'getProcedureLoading',
      'getProcedure',
      //ATTENDANCE
      'getAttendance',
    ]),
  },
  async created() {
    await Promise.all([this.fetchTypesProcedure()]);
    if (this.getEditRequisition) {
      this.procedure.idAttendance = this.getEditRequisition.idatendimento;
      this.procedure.idProcedure = this.getEditRequisition.idprocedimento;
      this.procedure.idTypeProcedure = this.getEditRequisition.idtipoprocedimento;
      this.procedure.observation = this.getEditRequisition.observacao;
    }
  },
  methods: {
    ...mapActions('requisition', [
      //TYPES PROCEDURE
      'fetchTypesProcedure',
      //PROCEDURE
      'updateProcedure',
      'createProcedure',
    ]),
    async submitProcedureFormThenGoNext() {
      if (this.$refs.stepTwo.validate()) {
        this.getIsProcedureAlreadyCreated
          ? await this.updateProcedure({
              ...this.procedure,
              idProcedure: this.getProcedure.idProcedure,
            })
          : await this.createProcedure({
              ...this.procedure,
              idAttendance: this.getAttendance.idAttendance,
            });

        if (!this.getHasProcedureRequestFailed) this.goNextStep();
      }
    },
  },
};
</script>

<style>
</style>
