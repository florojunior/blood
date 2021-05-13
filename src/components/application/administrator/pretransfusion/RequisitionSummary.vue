<template>
  <div>
    <v-card flat>
      <v-card-title
        class="primary--text text-h5 px-0 d-flex justify-center align-start flex-column"
      >
        Atendimento
      </v-card-title>
      <v-card-text class="px-0">
        <v-container class="pa-0">
          <v-row dense>
            <v-col cols="6" class="text-subtitle-2 black--text">Paciente</v-col>
            {{ requisitionAttendanceSummary }}
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.nomepaciente
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Data de registro</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.dataatendimento
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">Tipo</v-col>
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.tipoatendimento
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Convênios</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.descricaoconvenio
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">CID</v-col>
            <v-col cols="6">
              {{ requisitionAttendanceSummaryDesc.diagnostico }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title class="primary--text text-h5 px-0">
        Procedimento
      </v-card-title>
      <v-card-text class="px-0">
        <v-container class="pa-0">
          <v-row dense>
            <v-col cols="6" class="text-subtitle-2 black--text">Tipo</v-col>
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.tipoprocedimento
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Observação</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.observacao
            }}</v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title class="primary--text text-h5 px-0">
        Requisição
      </v-card-title>
      <v-card-text class="px-0">
        <v-container class="pa-0">
          <v-row dense>
            <v-col cols="6" class="text-subtitle-2 black--text"
              >Modalidade de Transfusão</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.tiporequisicao
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">Clínica</v-col>
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.descricaoclinica
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">Leito</v-col>
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.descricaoleito
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">Plaqueta</v-col>
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.paquetas
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Data Plaqueta</v-col
            >
            <v-col cols="6">{{
              parseDate(requisitionAttendanceSummaryDesc.data_ex_plaqueta)
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Hemoglobina</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.hemoglobina
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Data Hemoglobina</v-col
            >
            <v-col cols="6">{{
              parseDate(requisitionAttendanceSummaryDesc.data_ex_hemoglobina)
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Hematócrito</v-col
            >
            <v-col cols="6">{{
              requisitionAttendanceSummaryDesc.hematoctro
            }}</v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"
              >Data Hematócrito</v-col
            >
            <v-col cols="6">{{
              parseDate(requisitionAttendanceSummaryDesc.data_ex_hematoctro)
            }}</v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title class="primary--text text-h5 px-0">
        Itens da requisição
      </v-card-title>
      <v-card-text class="px-0">
        <v-container class="pa-0">
          <v-row
            v-for="item in getItensRequisition.itensRequisition"
            :key="item.iditensrequisicao"
            dense
          >
            <v-col cols="6" class="text-subtitle-2 black--text">
              Produto
            </v-col>
            <v-col cols="6">
              {{ item.produto }}
            </v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"> ABO </v-col>
            <v-col cols="6">
              {{ item.aborhd }}
            </v-col>

            <v-col cols="6" class="text-subtitle-2 black--text"> RHD </v-col>
            <v-col cols="6">
              {{ item.aborhd }}
            </v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">
              Quantidade
            </v-col>
            <v-col cols="6">
              {{
                `${
                  item.quantidade_unidade
                    ? item.quantidade_unidade + ' uni.'
                    : ''
                }
                ${item.quantidade_ml ? item.quantidade_ml + ' ml.' : ''}`
              }}
            </v-col>

            <v-col cols="6" class="text-subtitle-2 black--text">
              Produto
            </v-col>
            <v-col cols="6">
              {{ item.fenotipado === 'N' ? 'Não Fenotipado' : 'Fenotipado' }}
            </v-col>

            <template
              v-if="
                requisitionAttendanceSummaryDesc.tiporequisicao === 'Programada'
              "
            >
              <v-col cols="6" class="text-subtitle-2 black--text">
                Transfusão programada
              </v-col>
              <v-col cols="6">
                {{ requisitionAttendanceSummaryDesc.datacadastrorequisicao }}
              </v-col>
            </template>

            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import parseDateToDDMMYYYY from '@/utils/parseBirthdateToDDMMYYYY';

export default {
  props: {
    requisitionAttendanceSummary: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      // Fetch de items da requisição da api ou pega de um estado local?
      items: [
        {
          iditensrequisicao: 4,
          idtipoatendimento: 1,
          idproduto: 22,
          produto: 'CONC. HEMAC. 42d.',
          aborhd: 'O-',
          quantidade_unidade: 1,
          quantidade_ml: null,
          fenotipado: 'S',
        },
        {
          iditensrequisicao: 5,
          idtipoatendimento: 1,
          idproduto: 22,
          produto: 'CONC. HEMAC. 42d.',
          aborhd: 'O-',
          quantidade_unidade: null,
          quantidade_ml: 450,
          fenotipado: 'N',
        },
        {
          iditensrequisicao: 6,
          idtipoatendimento: 1,
          idproduto: 22,
          produto: 'CONC. HEMAC. 42d.',
          aborhd: 'O-',
          quantidade_unidade: 1,
          quantidade_ml: null,
          fenotipado: 'N',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('requisition', ['getSummaryRequisition']),
    ...mapGetters('requisition', ['getItensRequisition']),
    requisitionAttendanceSummaryDesc() {
      return this.getSummaryRequisition
        ? this.getSummaryRequisition.summary
        : {};
    },
  },
  methods: {
    ...mapActions('modal', ['editTransfusion']),
    parseDate(value) {
      return parseDateToDDMMYYYY(value);
    },
  },
};
</script>

<style>
</style>
