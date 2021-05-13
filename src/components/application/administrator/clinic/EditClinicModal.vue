<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Editar Clinica</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-text-field
            v-model="editClinic.description"
            outlined
            maxlength="150"
            counter="150"
            name="description"
            label="Nome"
            :rules="[nameRules.required]"
            class="mb-4"
          ></v-text-field>

          <v-combobox
            v-model="editClinic.leitos"
            class="mb-4"
            :items="editClinic.leitos"
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
              v-model="editClinic.status"
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
          <span class="px-5">Editar Clínica</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { nameRules, radioGroupRules, bedsRules } from '@/validations';

export default {
  name: 'EditClinicModal',
  props: {
    clinicSelected: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      editClinic: {
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
      if (action.type === 'modal/editClinic') {
        this.visible = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['editClinicFetch']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async submit() {
      console.log('submeteu');
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          const notDeletedBeds = this.clinicSelected.leitos.filter(
            (element) => {
              return this.editClinic.leitos.find(
                (leito) => leito == element.descricao
              );
            }
          );

          const newBeds = this.editClinic.leitos.filter((element) => {
            return !this.clinicSelected.leitos.find(
              (leito) => leito.descricao == element
            );
          });

          await this.editClinicFetch({
            idClinica: this.clinicSelected.id,
            descricao: this.editClinic.description,
            ativo: this.editClinic.status,
            novosLeitos: newBeds.map((element) => {
              return {
                descricao: element,
                ativo: 'T',
              };
            }),
            leitos: notDeletedBeds.map((bed) => {
              return { idLeito: bed.idleito };
            }),
          });
          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
  watch: {
    visible(value) {
      if (value) {
        this.editClinic.description = this.clinicSelected.description;
        this.editClinic.status = this.clinicSelected.status;
        this.editClinic.leitos = this.clinicSelected.leitos.map(
          (element) => element.descricao
        );
      }
    },
  },
};
</script>
