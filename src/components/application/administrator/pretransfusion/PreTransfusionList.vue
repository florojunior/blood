<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="openPreTransfusionDialog"
          >Nova solicitação</AddButton
        >
      </template>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de solicitações</v-col
              >
              <v-col cols="12" sm="5" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Buscar"
                  label="Buscar"
                  single-line
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container pa-0>
            <v-row no-gutters>
              <v-col cols="12">
                <v-data-table
                  :items="
                    getTransfusionRequisitionsListLoading
                      ? []
                      : getTransfusionRequisitionsList
                  "
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getTransfusionRequisitionsListLoading"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.dataatendimento="{ item }">
                    <span>{{ formatDate(item.data_hora_cadastro) }}</span>
                  </template>

                  <template v-slot:item.clinica="{ item }">
                    <span>{{ `${item.clinica} - ${item.leito}` }}</span>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip
                      small
                      class="font-weight-bold"
                      :color="chipStyle(item.status).color"
                      :text-color="chipStyle(item.status).textColor"
                      data-testid="chips-status"
                    >
                      <v-icon left data-testid="chips-icon">
                        mdi-circle-small
                      </v-icon>
                      <span data-testid="chips-text">
                        {{ item.status }}
                      </span>
                    </v-chip>
                  </template>

                  <template v-slot:item.acoes="{ item }">
                    <SeeRequestButton
                      :onClick="() => handleSeeTransfusion(item)"
                      :loading="loading"
                    />
                    <EditButton
                      class="mr-1"
                      :onClick="() => handleEditPretransfusion(item)"
                    />
                    <BlockButton
                      :disabled="isBlockButtonDisabled(item.status)"
                      :onClick="() => handleCancel(item)"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <CreateTransfusionModal
        v-if="visible"
        :requisition="requisitionSelected"
      />
      <SeeModal
        v-if="visibleSeeTranfusion"
        :requisition="requisitionSelected"
      />

      <CancelTransfusionModal :requisition="requisitionSelected" />
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import date from '@/utils/date';

import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';

import AddButton from '@/components/template/buttons/AddButton.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';
import SeeRequestButton from '@/components/template/buttons/SeeRequestButton.vue';
import BlockButton from '@/components/template/buttons/BlockButton.vue';

import CreateTransfusionModal from '@/components/application/administrator/pretransfusion/CreateTransfusionModal.vue';
import CancelTransfusionModal from '@/components/application/administrator/pretransfusion/CancelTransfusionModal.vue';
import SeeModal from '@/components/application/administrator/pretransfusion/SeeModal.vue';

export default {
  name: 'PreTransfusionList',
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddButton,
    EditButton,
    SeeRequestButton,
    BlockButton,
    CreateTransfusionModal,
    CancelTransfusionModal,
    SeeModal,
  },
  data() {
    return {
      loading: false,
      visible: false,
      visibleSeeTranfusion: false,
      unsubscribe: null,
      unsubscribeClose: null,
      unsubscribeEdit: null,
      unsubscribeSeeTransfusion: null,
      search: '',
      requisitionSelected: {},
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'paciente',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Solicitante',
          align: 'start',
          sortable: true,
          value: 'medico',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Localização',
          align: 'start',
          sortable: true,
          value: 'clinica',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Status',
          align: 'start',
          sortable: true,
          value: 'status',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Data',
          value: 'dataatendimento',
          align: 'center',
          sortable: true,
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Ação',
          value: 'acoes',
          align: 'center',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
      ],
      chipsStyle: {
        cancelled: {
          color: 'red',
          textColor: 'white',
        },
        default: {
          color: 'primary',
          textColor: 'white',
        },
      },
    };
  },
  computed: {
    ...mapGetters('pretransfusion', [
      'getTransfusionRequisitionsList',
      'getTransfusionRequisitionsListLoading',
    ]),
  },
  async created() {
    await this.fetchTransfusionRequisitionsList();
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/addPreTransfusion') {
          this.visible = true;
          this.title = 'Nova solicitação';
        }
      },
    });

    this.unsubscribeEdit = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/editTransfusion') {
          this.visible = true;
        }
      },
    });

    this.unsubscribeClose = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/closeRequisition') {
          this.visible = false;
        }
      },
    });

    this.unsubscribeSeeTransfusion = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/seeTransfusion') {
          this.visibleSeeTranfusion = true;
        }
      },
    });

    this.unsubscribeClose = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/closeSeeTransfusion') {
          this.visibleSeeTranfusion = false;
        }
      },
    });
  },
  methods: {
    ...mapActions('pretransfusion', ['fetchTransfusionRequisitionsList']),
    ...mapActions('modal', [
      'cancelTransfusionRequisition',
      'addPreTransfusion',
      'editTransfusion',
      'seeTransfusion',
    ]),
    ...mapActions('requisition', ['getRequisionbyId', 'getRequisitionSummary']),
    isBlockButtonDisabled(status) {
      return ['Em Elaboração', 'Cancelada'].indexOf(status) !== -1
        ? true
        : false;
    },
    handleCancel(item) {
      this.requisitionSelected = item;
      this.cancelTransfusionRequisition();
    },
    chipStyle(status) {
      return status === 'Cancelada'
        ? this.chipsStyle.cancelled
        : this.chipsStyle.default;
    },
    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    },
    async openPreTransfusionDialog() {
      await this.getRequisionbyId(null);
      this.addPreTransfusion();
    },
    async handleEditPretransfusion(item) {
      this.requisitionSelected = item;
      await this.getRequisionbyId(this.requisitionSelected.idatendimento);
      this.editTransfusion();
    },
    async handleSeeTransfusion(item) {
      this.requisitionSelected = item;
      this.loading = true;
      await this.getRequisionbyId(this.requisitionSelected.idatendimento);
      await this.getRequisitionSummary();
      this.seeTransfusion();
      this.loading = false;
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchTransfusionRequisitionsList();
    next();
  },
};
</script>

