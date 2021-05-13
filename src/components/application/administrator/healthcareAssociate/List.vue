<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="addHealthcareAssociation"
          >Adicionar novo</AddButton
        >
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
                  :items="
                    getHealthcaresAssociatedToHospitalLoading
                      ? []
                      : getHealthcaresAssociatedToHospital
                  "
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getHealthcaresAssociatedToHospitalLoading"
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
                      :onClick="() => handleEditHealthcareAssociation(item)"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddHealthcareAssociationModal />
      <EditHealthcareAssociatedModal :healthcareSelected="healthcareSelected" />
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';
import AddButton from '@/components/template/buttons/AddButton.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';
import AddHealthcareAssociationModal from '@/components/application/administrator/healthcareAssociate/AddHealthcareAssociationModal.vue';
import EditHealthcareAssociatedModal from '@/components/application/administrator/healthcareAssociate/EditHealthcareAssociatedModal.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddHealthcareAssociationModal,
    EditHealthcareAssociatedModal,
    AddButton,
    EditButton,
  },
  data() {
    return {
      healthcareSelected: {
        idconvenio: null,
        descricao: null,
        ativo: null,
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
      'getHealthcaresAssociatedToHospital',
      'getHealthcaresAssociatedToHospitalLoading',
    ]),
  },
  async created() {
    await this.fetchHealthcareListAssociatedToHospital();
  },
  methods: {
    ...mapActions('administration', [
      'fetchHealthcareListAssociatedToHospital',
    ]),
    ...mapActions('modal', [
      'addHealthcareAssociation',
      'editHealthcareAssociation',
      'blockHealthcareAssociation',
    ]),
    handleBlockHealthcareAssociation(selected) {
      this.healthcareSelected = selected;
      this.blockHealthcareAssociation();
    },
    handleEditHealthcareAssociation(selected) {
      this.healthcareSelected = selected;
      this.editHealthcareAssociation();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchHealthcareListAssociatedToHospital();
    next();
  },
};
</script>
