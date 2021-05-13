<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="addPatient">Adicionar Paciente</AddButton>
      </template>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de pacientes</v-col
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
                  :items="getPatientsListLoading ? [] : getPatientsList"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getPatientsListLoading"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.nome="{ item }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="d-inline-block text-truncate"
                          style="max-width: 150px"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ item.nome }}
                        </span>
                      </template>
                      <span>{{ item.nome }}</span>
                    </v-tooltip>
                  </template>

                  <template v-slot:item.cpf="{ item }">
                    <span>
                      {{ `${item.cpf}` | VMask('###.###.###-##') }}
                    </span>
                  </template>

                  <template v-slot:item.telefone1="{ item }">
                    <span>
                      {{ `${item.telefone1}` | VMask('(##) #####-####') }}
                    </span>
                  </template>

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
                      :onClick="() => handleEdit(item)"
                    />

                    <DeleteButton :onClick="() => handleDelete(item)" />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddPatientModal />
      <EditPatientModal :patientSelected="patientSelected" />
      <DeletePatientModal :patientSelected="patientSelected" />
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
import DeleteButton from '@/components/template/buttons/DeleteButton.vue';
import DeletePatientModal from '@/components/application/administrator/patients/DeletePatientModal.vue';
import EditPatientModal from '@/components/application/administrator/patients/EditPatientModal.vue';
import AddPatientModal from '@/components/application/administrator/patients/AddPatientModal.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddButton,
    EditButton,
    DeleteButton,
    DeletePatientModal,
    EditPatientModal,
    AddPatientModal,
  },
  data() {
    return {
      patientSelected: {},
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nome',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Registro',
          align: 'start',
          sortable: true,
          value: 'numero_prontuario',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'CPF',
          align: 'start',
          sortable: true,
          value: 'cpf',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Telefone',
          align: 'start',
          sortable: true,
          value: 'telefone1',
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
          label: 'Bloqueado',
          labelColor: '#DE0129',
          background: '#FCE6EA',
        },
      },
    };
  },
  computed: {
    ...mapGetters('administration', [
      'getPatientsList',
      'getPatientsListLoading',
    ]),
  },
  async created() {
    await this.fetchPatientsList();
  },
  methods: {
    ...mapActions('administration', ['fetchPatientsList']),
    ...mapActions('modal', [
      'addPreTransfusion',
      'addPatient',
      'editPatient',
      'deletePatient',
    ]),
    handleEdit(item) {
      this.patientSelected = item;
      this.editPatient();
    },
    handleDelete(item) {
      this.patientSelected = item;
      this.deletePatient();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchPatientsList();
    next();
  },
};
</script>
