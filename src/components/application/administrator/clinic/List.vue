<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="addClinic">Adicionar novo</AddButton>
      </template>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de clínicas</v-col
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
                  :items="getClinicList"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getClinicListLoading"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.descricao="{ item }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="d-inline-block text-truncate"
                          style="max-width: 150px"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ item.descricao }}
                        </span>
                      </template>
                      <span>{{ item.descricao }}</span>
                    </v-tooltip>
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
                      :onClick="() => handleEditClinic(item)"
                    />
                    <DeleteButton
                      :disabled="item.ativo != 'T'"
                      :onClick="() => deleteClinicShow(item)"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddClinicModal />
      <EditClinicModal :clinicSelected="clinicSelected" />
      <DeleteClinicModal :clinicSelected="clinicSelected" />
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
import EditButton from '@/components/template/buttons/EditButton.vue';

import AddClinicModal from '@/components/application/administrator/clinic/AddClinicModal.vue';
import EditClinicModal from '@/components/application/administrator/clinic/EditClinicModal.vue';
import DeleteClinicModal from '@/components/application/administrator/clinic/DeleteClinicModal.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddClinicModal,
    EditClinicModal,
    DeleteClinicModal,
    AddButton,
    DeleteButton,
    EditButton,
  },
  data() {
    return {
      clinicSelected: {
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
    ...mapGetters('administration', ['getClinicList', 'getClinicListLoading']),
  },
  async created() {
    await this.fetchClinicList();
  },
  methods: {
    ...mapActions('administration', ['fetchClinicList']),
    ...mapActions('modal', ['addClinic', 'editClinic', 'deleteClinic']),
    async deleteClinicShow(selected) {
      this.clinicSelected = selected;
      this.deleteClinic();
    },
    handleEditClinic(item) {
      this.clinicSelected = {
        id: item.idclinica,
        description: item.descricao,
        status: item.ativo,
        leitos: item.leitos,
      };

      this.editClinic();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchHealthcareList();
    next();
  },
};
</script>
