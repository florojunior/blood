<template>
  <v-form ref="stepThree">
    <v-container class="pa-0">
      <v-row dense>
        <v-col>
          <v-radio-group
            v-model="requisition.idTypeTransfusion"
            :rules="[]"
            class="mt-0"
          >
            <template v-slot:label>
              <div class="text-body-1">
                Modalidade de transfusão {{ getIsRequisitionAlreadyCreated }}
              </div>
            </template>

            <v-radio
              v-for="type in mockTransfusionModality.types"
              :key="type.idtipotransfusao"
              :label="type.descricao"
              :value="type.idtipotransfusao"
              name="transfusionmodality"
              :rules="[typeTransfusionRules.required]"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-select
            v-model="requisition.idClinic"
            :loading="getClinicListLoading"
            :disabled="getClinicListLoading"
            :items="getClinicList"
            :item-text="'descricao'"
            :item-value="'idclinica'"
            outlined
            name="clinic"
            :rules="[clinicRules.required]"
            :label="getClinicListLoading ? 'Carregando...' : 'Clínica'"
          ></v-select>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="6">
          <!-- TODO: check if should list only active leitos (status=T) -->
          <!-- TODO: refactor disabled to a getter "isClinicSelected" in the null comparison -->
          <v-select
            v-model="requisition.idBed"
            :loading="getClinicListLoading"
            :disabled="requisition.idClinic === null || getClinicListLoading"
            :items="listBeds"
            :item-text="'descricao'"
            :item-value="'idleito'"
            outlined
            name="bed"
            :rules="[bedsRequistion.required]"
            :label="getClinicListLoading ? 'Carregando...' : 'Leito'"
          ></v-select>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="requisition.weight"
            type="number"
            outlined
            name="weight"
            label="Peso"
            :rules="[weightRules.required]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="requisition.platelets"
            type="number"
            outlined
            name="platelets"
            label="Plaquetas"
            :rules="[plateletsRules.required]"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="requisition.datePlatelets"
            v-mask="'##/##/####'"
            placeholder="DD/MM/YYYY"
            outlined
            name="datePlatelets"
            label="Data"
            :rules="[
              dateRules.isValidDate,
              dateRules.isValidYear,
              dateRules.isYearFourDigits,
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="requisition.hemoglobin"
            type="number"
            outlined
            name="hemoglobin"
            label="Hemoglobina"
            :rules="[hemoglobinRules.required]"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="requisition.dateHemoglobin"
            v-mask="'##/##/####'"
            placeholder="DD/MM/YYYY"
            outlined
            name="dateHemoglobin"
            label="Data"
            :rules="[
              dateRules.isValidDate,
              dateRules.isValidYear,
              dateRules.isYearFourDigits,
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="requisition.hematoctro"
            type="number"
            outlined
            name="hematoctro"
            label="Hematócrito"
            :rules="[hematoctroRules.required]"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="requisition.dateHematoctro"
            v-mask="'##/##/####'"
            placeholder="DD/MM/YYYY"
            outlined
            name="dateHematoctro"
            label="Data"
            :rules="[
              dateRules.isValidDate,
              dateRules.isValidYear,
              dateRules.isYearFourDigits,
            ]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      type="submit"
      form="stepThree"
      depressed
      color="primary"
      :loading="getSubmitLoading"
      class="mr-2 px-8 text-button"
      @click.prevent="submitRequisitionFormThenGoNext"
    >
      Continuar
    </v-btn>
    <v-btn depressed text @click="goBackStep"> Voltar </v-btn>
  </v-form>
</template>

<script>
import {
  dateRules,
  typeTransfusionRules,
  clinicRules,
  bedsRequistion,
  weightRules,
  plateletsRules,
  hemoglobinRules,
  hematoctroRules,
} from '@/validations';
import { mapActions, mapGetters } from 'vuex';
import date from '@/utils/date';

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
  async created() {
    await this.fetchClinicList();
    if (this.getEditRequisition) {
      this.requisition.idAttendance = this.getEditRequisition.idatendimento;
      this.requisition.idProcedure = this.getEditRequisition.idprocedimento;
      this.requisition.idRequisition = this.getEditRequisition.idrequisicao;
      this.requisition.idTypeTransfusion = this.getEditRequisition.idtipotransfusao;
      this.requisition.idClinic = this.getEditRequisition.idclinica;
      this.requisition.idBed = this.getEditRequisition.idleito;
      this.requisition.weight = this.getEditRequisition.peso;
      this.requisition.platelets = this.getEditRequisition.paquetas;
      this.requisition.hemoglobin = this.getEditRequisition.hemoglobina;
      this.requisition.hematoctro = this.getEditRequisition.hematoctro;
      this.requisition.dateHemoglobin = date.formatToDDMMYYYY(
        this.getEditRequisition.data_ex_hemoglobina
      );
      this.requisition.datePlatelets = date.formatToDDMMYYYY(
        this.getEditRequisition.data_ex_plaqueta
      );
      this.requisition.dateHematoctro = date.formatToDDMMYYYY(
        this.getEditRequisition.data_ex_hematoctro
      );
      this.requisition.idStatusRequisition = this.getEditRequisition.hematoctro;
      this.requisition.idTypeTransfusion = this.getEditRequisition.idtipotransfusao;
    } else {
      this.requisition.idTypeTransfusion = 1;
    }
  },
  computed: {
    ...mapGetters('administration', ['getClinicList', 'getClinicListLoading']),
    ...mapGetters('requisition', [
      'getEditRequisition',
      //ATTENDENCE
      'getAttendance',
      //PROCEDURE
      'getProcedureLoading',
      'getProcedure',
      //REQUISIION
      'getIsRequisitionAlreadyCreated',
      'getRequisition',
      'getRequisitionLoading',
      'getHasRequisitionRequestFailed',
      'getRequisitionRequestError',
    ]),
    listBeds() {
      var clinicaSelected = this.getClinicList.filter((clinic) => {
        return clinic.idclinica == this.requisition.idClinic;
      })[0];

      if (clinicaSelected) return clinicaSelected.leitos;
    },
  },
  data() {
    return {
      clinicRules,
      typeTransfusionRules,
      plateletsRules,
      bedsRequistion,
      hemoglobinRules,
      hematoctroRules,
      weightRules,
      dateRules,
      requisition: {
        idAttendance: null,
        idStatusRequisition: null,
        idProcedure: null,
        idRequisition: null,
        idTypeTransfusion: null,
        idClinic: null,
        idBed: null,
        weight: null,
        platelets: null,
        hemoglobin: null,
        hematoctro: null,
        dateHemoglobin: null,
        datePlatelets: null,
        dateHematoctro: null,
        observation: '',
      },
      mockTransfusionModality: {
        // API 0010
        types: [
          {
            idtipotransfusao: 1,
            descricao: 'Emergência',
          },
          {
            idtipotransfusao: 2,
            descricao: 'Urgência',
          },
          {
            idtipotransfusao: 3,
            descricao: 'Programada',
          },
          {
            idtipotransfusao: 4,
            descricao: 'Rotina',
          },
        ],
      },
      mockClinicas: {
        loading: false,
        list: [
          {
            idclinica: 1,
            descricao: 'UTI',
            ativo: 'T',
            leitos: [
              {
                idleito: 1,
                descricao: 'TEST_1',
                ativo: 'F',
              },
              {
                idleito: 2,
                descricao: 'B237',
                ativo: 'T',
              },
            ],
          },
          {
            idclinica: 2,
            descricao: 'INTERNAÇÃO',
            ativo: 'T',
            leitos: [
              {
                idleito: 5,
                descricao: 'B231',
                ativo: 'T',
              },
            ],
          },
          {
            idclinica: 6,
            descricao: 'EMERGÊNCIA',
            ativo: 'T',
            leitos: [],
          },
          {
            idclinica: 7,
            descricao: 'UTI 1',
            ativo: 'T',
            leitos: [],
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions('requisition', [
      //REQUISTION
      'createRequisition',
      'updateRequisition',
    ]),
    ...mapActions('administration', ['fetchClinicList']),
    async submitRequisitionFormThenGoNext() {
      if (this.$refs.stepThree.validate()) {
        this.getIsRequisitionAlreadyCreated
          ? await this.updateRequisition({
              ...this.requisition,
              idStatusRequisition: 1,
              dateHemoglobin: date.formatToYYYYMMDD(
                this.requisition.dateHemoglobin
              ),
              datePlatelets: date.formatToYYYYMMDD(
                this.requisition.datePlatelets
              ),
              dateHematoctro: date.formatToYYYYMMDD(
                this.requisition.dateHematoctro
              ),
            })
          : await this.createRequisition({
              ...this.requisition,
              idStatusRequisition: 1,
              dateHemoglobin: date.formatToYYYYMMDD(
                this.requisition.dateHemoglobin
              ),
              datePlatelets: date.formatToYYYYMMDD(
                this.requisition.datePlatelets
              ),
              dateHematoctro: date.formatToYYYYMMDD(
                this.requisition.dateHematoctro
              ),
              idAttendance: this.getAttendance.idAttendance, //this.getAttendance.idAttendance,
              idProcedure: this.getProcedure.idProcedure,
            });

        if (!this.getHasRequistionRequestFailed) this.goNextStep();
      }
    },
  },
};
</script>
