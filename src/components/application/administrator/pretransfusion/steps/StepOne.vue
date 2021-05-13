<template>
  <v-form id="formStepOne" ref="stepOne">
    <v-text-field
      v-model="attendance.dataAtendimento"
      v-mask="'##/##/####'"
      placeholder="DD/MM/YYYY"
      outlined
      name="dataAtendimento"
      validate-on-blur
      label="Data de registro"
      :disabled="getIsAttendanceAlreadyCreated"
      :rules="[dateRules.isValidDate, dateRules.isYearFourDigits]"
    ></v-text-field>

    <v-autocomplete
      v-model="attendance.idPatient"
      :loading="getSearchPatientByNameLoading"
      :search-input.sync="searchPatientName"
      :items="getSearchPatientByNameList"
      :item-text="'nome'"
      :item-value="'idpaciente'"
      :rules="[patientRules.required]"
      v-if="!getIsAttendanceAlreadyCreated"
      type="text"
      hide-no-data
      hint="Informe pelo menos os 5 primeiros caracteres do nome do paciente."
      persistent-hint
      validate-on-blur
      label="Paciente"
      name="paciente"
      outlined
      cache-items
    ></v-autocomplete>

    <v-text-field
      label="Paciente"
      name="paciente"
      outlined
      v-model="attendance.idPatient"
      disabled
      v-if="getIsAttendanceAlreadyCreated"
    >
    </v-text-field>

    <v-radio-group
      v-model="attendance.idTypeAttendance"
      :rules="[radioGroupRules.required]"
      class="mt-0 pb-4"
      :disabled="getAttendanceLoading"
    >
      <template v-slot:label>
        <div class="text-body-1">Tipo</div>
      </template>

      <div v-show="getTypesAttendanceLoading">Carregando...</div>
      <div
        v-show="
          !getTypesAttendanceLoading && getHasTypesAttendanceRequestFailed
        "
      >
        Falha ao carregar valores, tente novamente.
      </div>

      <template
        v-show="
          !getTypesAttendanceLoading && !getHasTypesAttendanceRequestFailed
        "
      >
        <v-radio
          v-for="type in getTypesAttendanceList"
          :key="type.idtipoatendimento"
          :label="type.descricao"
          :value="type.idtipoatendimento"
        ></v-radio>
      </template>
    </v-radio-group>

    <v-autocomplete
      v-model="attendance.idConvenio"
      :loading="getHealthcaresLoading"
      :disabled="getHealthcaresLoading || getIsAttendanceAlreadyCreated"
      :items="getHealthcaresList"
      :item-text="'descricao'"
      :item-value="'idconvenio'"
      outlined
      validate-on-blur
      name="convenio"
      :rules="[healthcareRules.required]"
      v-if="!getIsAttendanceAlreadyCreated"
      :label="getHealthcaresLoading ? 'Carregando...' : 'Convênios'"
    ></v-autocomplete>
    <v-text-field
      label="Convenio"
      name="convenio"
      outlined
      v-model="attendance.idConvenio"
      disabled
      v-if="getIsAttendanceAlreadyCreated"
    >
    </v-text-field>

    <v-autocomplete
      v-model="attendance.idDiagnosis"
      :loading="getSearchDiagnosisByDescriptionLoading"
      :disabled="getIsAttendanceAlreadyCreated"
      :search-input.sync="searchDiagnosisDescription"
      :items="getSearchDiagnosisByDescriptionList"
      :item-text="'upper'"
      :item-value="'iddiagnostico'"
      :rules="[diagnosisRules.required]"
      type="text"
      hide-no-data
      hint="Informe o código CID ou a descrição do diagnóstico."
      persistent-hint
      validate-on-blur
      label="Código CID/Descrição"
      name="diagnostico"
      outlined
      cache-items
      v-if="!getIsAttendanceAlreadyCreated"
    ></v-autocomplete>

    <v-text-field
      label="Código CID/Descrição"
      name="diagnostico"
      outlined
      v-model="attendance.idDiagnosis"
      disabled
      v-if="getIsAttendanceAlreadyCreated"
    >
    </v-text-field>

    <v-btn
      form="formStepOne"
      type="submit"
      depressed
      color="primary"
      :loading="getAttendanceLoading"
      class="mr-2 px-8 text-button"
      @click.prevent="submitAttendanceFormThenGoNext()"
    >
      Continuar
    </v-btn>
  </v-form>
</template>

<script>
import {
  dateRules,
  patientRules,
  radioGroupRules,
  healthcareRules,
  diagnosisRules,
} from '@/validations';
import stringUtils from '@/utils/stringUtils';
import { mapActions, mapGetters } from 'vuex';
import date from '@/utils/date';

export default {
  props: {
    goNextStep: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dateRules,
      patientRules,
      radioGroupRules,
      healthcareRules,
      diagnosisRules,
      attendance: {
        idAttendance: null,
        idPatient: null,
        idTypeAttendance: null,
        idDiagnosis: null,
        dataAtendimento: null,
        idConvenio: null,
      },
      searchPatientName: null,
      searchDiagnosisDescription: null,
    };
  },
  computed: {
    ...mapGetters('requisition', [
      //REQUISITION
      'getEditRequisition',
      //ATTENDANCE
      'getAttendanceLoading',
      'getIsAttendanceAlreadyCreated',
      'getHasAttendanceRequestFailed',
      'getIdAttendance',
      //PATIENT
      'getSearchPatientByNameLoading',
      'getSearchPatientByNameList',
      'getHasSearchPatientByNameRequestFailed',
      //TYPES ATTENDANCE
      'getTypesAttendanceList',
      'getTypesAttendanceLoading',
      'getHasTypesAttendanceRequestFailed',
      'getTypesAttendanceRequestError',
      //HEALTHCARES
      'getHealthcaresList',
      'getHealthcaresLoading',
      //DIAGNOSIS
      'getSearchDiagnosisByDescriptionLoading',
      'getSearchDiagnosisByDescriptionList',
      'getHasSearchDiagnosisByDescriptionRequestFailed',
      'getSearchDiagnosisByDescriptionRequestError',
    ]),
  },
  watch: {
    // attendance: {
    //   handler(newValue) {
    //     console.log(
    //       'idPatient',
    //       newValue.idPatient,
    //       '\nidTypeAttendance',
    //       newValue.idTypeAttendance,
    //       '\nidDiagnosis',
    //       newValue.idDiagnosis,
    //       '\ndataAtendimento',
    //       newValue.dataAtendimento,
    //       '\nidConvenio',
    //       newValue.idConvenio
    //     );
    //   },
    //   deep: true,
    // },
    searchPatientName: {
      async handler(value) {
        if (!stringUtils.isEmptyOrIsBlank(value) && value.length >= 5) {
          await this.searchPatientByName({ name: value });
        }
      },
    },
    searchDiagnosisDescription: {
      async handler(value) {
        if (!stringUtils.isEmptyOrIsBlank(value) && value.length >= 2) {
          await this.searchDiagnosisByDescription({ description: value });
        }
      },
    },
  },
  async created() {
    if (this.getEditRequisition) {
      this.attendance.dataAtendimento = date.formatToDDMMYYYY(
        this.getEditRequisition.dataatendimento
      );
      this.attendance.idTypeAttendance = this.getEditRequisition.idtipoatendimento;
      this.attendance.idPatient = this.getEditRequisition.nomepaciente;
      this.attendance.idConvenio = this.getEditRequisition.descricaoconvenio;
      this.attendance.idDiagnosis = this.getEditRequisition.diagnostico;
    }
    await Promise.all([this.fetchTypesAttendance(), this.fetchHealthcares()]);
  },
  methods: {
    ...mapActions('requisition', [
      //ATTENDANCE
      'createAttendance',
      'updateAttendance',
      //PATIENT
      'searchPatientByName',
      //TYPES ATTENDANCE
      'fetchTypesAttendance',
      //HEALTHCARES
      'fetchHealthcares',
      //DIAGNOSIS
      'searchDiagnosisByDescription',
    ]),
    async submitAttendanceFormThenGoNext() {
      if (this.$refs.stepOne.validate()) {
        this.getIsAttendanceAlreadyCreated
          ? await this.updateAttendance({
              idAttendance: this.getIdAttendance,
              idTypeAttendance: this.attendance.idTypeAttendance,
            })
          : await this.createAttendance({
              attendance: {
                ...this.attendance,
                dataAtendimento: date.formatToYYYYMMDD(
                  this.attendance.dataAtendimento
                ),
              },
            });

        if (!this.getHasAttendanceRequestFailed) this.goNextStep();
      }
    },
  },
};
</script>

<style>
</style>
