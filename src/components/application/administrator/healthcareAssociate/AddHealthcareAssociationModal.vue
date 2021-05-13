<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Novo Convênio</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-select
            v-model="newHealthcareAssociation.id"
            :loading="getActiveHealthcareListDisponibleForAssociationLoading"
            :disabled="getActiveHealthcareListDisponibleForAssociationLoading"
            :items="getActiveHealthcareListDisponibleForAssociation"
            :item-text="'descricao'"
            :item-value="'idconvenio'"
            outlined
            name="nome"
            :rules="[nameRules.required]"
            :label="
              getActiveHealthcareListDisponibleForAssociationLoading
                ? 'Carregando...'
                : 'Nome'
            "
          ></v-select>

          <label for="newHealthcareAssociationRadio" class="v-label">
            <div class="font-weight-bold">Status</div>
            <v-radio-group
              id="newHealthcareAssociationRadio"
              v-model="newHealthcareAssociation.active"
              row
              :rules="[radioGroupRules.required]"
              class="text-body-1"
            >
              <v-radio value="T">
                <template v-slot:label>
                  <div>Ativo</div>
                </template>
              </v-radio>
              <v-radio value="F">
                <template v-slot:label>
                  <div>Inativo</div>
                </template>
              </v-radio>
            </v-radio-group>
          </label>
        </v-form>
      </v-card-text>

      <v-card-actions
        class="pb-8 px-8 d-flex justify-center align-center flex-column-reverse flex-sm-row justify-sm-end"
      >
        <v-btn
          class="tertiary--text mt-4 mt-sm-0"
          text
          depressed
          :disabled="loading"
          @click="closeModal()"
          >CANCELAR</v-btn
        >
        <v-btn
          type="submit"
          form="form"
          class="secondary lighten-2 mx-0 ml-sm-2"
          :loading="loading"
          @click.prevent="submit()"
        >
          <span class="px-5">Adicionar convênio</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { nameRules, radioGroupRules } from '@/validations';

export default {
  name: 'AddHealthcareModal',
  data() {
    return {
      newHealthcareAssociation: {
        id: null,
        active: null,
      },
      nameRules,
      radioGroupRules,
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('administration', [
      'getActiveHealthcareListDisponibleForAssociation',
      'getActiveHealthcareListDisponibleForAssociationLoading',
    ]),
  },
  async created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/addHealthcareAssociation') {
          this.visible = true;
          await this.fetchActiveHealthcareListDisponibleForAssociation();
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', [
      'createNewHealthcareAssociationToHospital',
      'fetchActiveHealthcareListDisponibleForAssociation',
    ]),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await this.createNewHealthcareAssociationToHospital({
            id: this.newHealthcareAssociation.id,
            active: this.newHealthcareAssociation.active,
          });
          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
};
</script>
