<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Nova Clinica</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-text-field
            v-model="newClinic.description"
            outlined
            maxlength="150"
            counter="150"
            name="description"
            label="Nome"
            :rules="[nameRules.required]"
            class="mb-4"
          ></v-text-field>

          <v-combobox
            v-model="newClinic.leitos"
            class="mb-4"
            :items="newClinic.leitos"
            hide-selected
            outlined
            hint="Clique Enter para adicionar"
            label="Leitos"
            multiple
            deletable-chips
            persistent-hint
            small-chips
            :rules="[bedsRules.required]"
          >
          </v-combobox>
          <label for="newClinicRadio" class="v-label">
            <div class="font-weight-bold">Status</div>
            <v-radio-group
              id="newClinicRadio"
              v-model="newClinic.status"
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
          <span class="px-5">Adicionar Clínica</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { nameRules, radioGroupRules, bedsRules } from '@/validations';

export default {
  name: 'AddClinicModal',
  data() {
    return {
      newClinic: {
        description: null,
        status: null,
        leitos: [],
      },
      items: [],
      nameRules,
      radioGroupRules,
      bedsRules,
      visible: false,
      loading: false,
      model: [],
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'modal/addClinic') {
        this.visible = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['createNewClinic']),
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
          await this.createNewClinic({
            descricao: this.newClinic.description,
            ativo: this.newClinic.status,
            leitos: this.newClinic.leitos.map((element) => {
              return {
                descricao: element,
                ativo: 'T',
              };
            }),
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
