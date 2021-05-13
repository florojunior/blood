<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="addHealthcare">Adicionar novo</AddButton>
      </template>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de convênios</v-col
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
                  :items="getHealthcareListLoading ? [] : getHealthcareList"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getHealthcareListLoading"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.ativo="{ item }">
                    <v-chip
                      small
                      class="font-weight-bold"
                      :color="chips[`${item.ativo}`].background"
                      :text-color="chips[`${item.ativo}`].labelColor"
                    >
                      <v-icon left large> mdi-circle-small </v-icon>
                      <span>
                        {{ chips[`${item.ativo}`].label }}
                      </span>
                    </v-chip>
                  </template>

                  <template v-slot:item.acoes="{ item }">
                    <EditButton
                      class="mr-1"
                      :onClick="() => handleEditHealthcare(item)"
                    />

                    <DeleteButton :onClick="() => deleteHealCareShow(item)" />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddHealthcareModal />
      <EditHealthcareModal :healthCareSelected="healthCareSelected" />
      <DeleteHealthcareModal :health-care-selected="healthCareSelected" />
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';
import AddButton from '@/components/template/buttons/AddButton.vue';
import DeleteButton from '@/components/template/buttons/DeleteButton.vue';
import AddHealthcareModal from '@/components/application/administrator/healthcare/AddHealthcareModal.vue';
import EditHealthcareModal from '@/components/application/administrator/healthcare/EditHealthcareModal.vue';
import DeleteHealthcareModal from '@/components/application/administrator/healthcare/DeleteHealthcareModal.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddHealthcareModal,
    EditHealthcareModal,
    DeleteHealthcareModal,
    AddButton,
    DeleteButton,
    EditButton,
  },
  data() {
    return {
      healthCareSelected: {
        id: null,
        description: null,
        status: null,
      },
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'descricao',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Status',
          value: 'ativo',
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
      chips: {
        T: {
          label: 'Ativo',
          labelColor: '#007F00',
          background: '#CDFFCD',
        },
        F: {
          label: 'Inativo',
          labelColor: '#DE0129',
          background: '#FCE6EA',
        },
      },
    };
  },
  computed: {
    ...mapGetters('administration', [
      'getHealthcareList',
      'getHealthcareListLoading',
    ]),
  },
  async created() {
    await this.fetchHealthcareList();
  },
  methods: {
    ...mapActions('administration', ['fetchHealthcareList']),
    ...mapActions('modal', [
      'addHealthcare',
      'editHealthcare',
      'deleteHealthcare',
    ]),
    async deleteHealCareShow(selected) {
      this.healthCareSelected = selected;
      this.deleteHealthcare();
    },
    handleEditHealthcare(item) {
      this.healthCareSelected = {
        id: item.idconvenio,
        description: item.descricao,
        status: item.ativo,
      };

      this.editHealthcare();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchHealthcareList();
    next();
  },
};
</script>
