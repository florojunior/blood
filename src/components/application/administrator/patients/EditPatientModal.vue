<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Editar paciente</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-text-field
            v-model="paciente.numero_prontuario"
            v-mask="'NNNNNNNNNNNNNNNNNNNN'"
            outlined
            maxlength="20"
            counter="20"
            hint="Apenas caracteres alfanuméricos."
            validate-on-blur
            name="numero_prontuario"
            label="Registro"
            :rules="[medicalRecordRules.required, medicalRecordRules.max]"
          ></v-text-field>

          <v-text-field
            v-model="pessoa.nome"
            v-mask="
              'SPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'
            "
            outlined
            maxlength="150"
            counter="150"
            name="nome"
            label="Nome completo"
            :rules="[nameRules.required, nameRules.max]"
          ></v-text-field>

          <v-text-field
            v-model="pessoa.datanascimento"
            v-mask="'##/##/####'"
            placeholder="DD/MM/YYYY"
            hint="Formato: DD/MM/YYYY"
            outlined
            name="datanascimento"
            label="Data de nascimento"
            :rules="[
              birthdateRules.required,
              dateRules.isValidDate,
              dateRules.isNotFutureDate,
              dateRules.isValidYear,
            ]"
            validate-on-blur
          ></v-text-field>

          <label for="sexoRadio" class="v-label">
            <div class="font-weight-bold">Sexo</div>
            <v-radio-group
              id="sexoRadio"
              v-model="pessoa.sexo"
              row
              :rules="[genderRules.required]"
              class="text-body-1 mb-4"
            >
              <v-radio value="F">
                <template v-slot:label>
                  <div>Feminino</div>
                </template>
              </v-radio>
              <v-radio value="M">
                <template v-slot:label>
                  <div>Masculino</div>
                </template>
              </v-radio>
            </v-radio-group>
          </label>

          <v-text-field
            v-model="pessoa.cpf"
            v-mask="'###.###.###-##'"
            outlined
            name="cpf"
            label="CPF"
            :rules="[cpfRules.required, cpfRules.validCpf]"
            validate-on-blur
          ></v-text-field>

          <v-text-field
            v-model="pessoa.rg"
            v-mask="'NNNNNNNNNNNNNNNNNNNN'"
            outlined
            minlength="8"
            maxlength="20"
            counter="20"
            hint="Apenas caracteres alfanuméricos."
            :rules="[rgRules.required, rgRules.min, rgRules.max]"
            validate-on-blur
            name="rg"
            label="RG"
          ></v-text-field>

          <v-text-field
            v-model="pessoa.nomemae"
            v-mask="
              'SPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'
            "
            outlined
            maxlength="150"
            counter="150"
            name="nomemae"
            label="Nome da mãe"
            :rules="[motherRules.required, nameRules.max]"
            validate-on-blur
          ></v-text-field>

          <v-text-field
            v-model="pessoa.nomepai"
            v-mask="
              'SPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'
            "
            outlined
            maxlength="150"
            counter="150"
            name="nomepai"
            label="Nome do pai"
            :rules="[nameRules.optional]"
            validate-on-blur
          ></v-text-field>

          <v-select
            v-model="pessoa.naturalidade"
            :loading="getCitiesListLoading"
            :disabled="getCitiesListLoading"
            :items="getCitiesList"
            :item-text="'descricao'"
            :item-value="'idcidade'"
            outlined
            name="nome"
            :rules="[birthplaceRules.required]"
            :label="getCitiesListLoading ? 'Carregando...' : 'Naturalidade'"
          ></v-select>

          <v-text-field
            v-model="pessoa.email"
            name="email"
            minlength="5"
            maxlength="80"
            counter="80"
            :rules="[
              emailRules.required,
              emailRules.validEmail,
              emailRules.min,
              emailRules.max,
            ]"
            validate-on-blur
            label="E-mail"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="pessoa.telefone1"
            v-mask="'(##)#####-####'"
            placeholder="(##)#####-####"
            hint="Formato: (##)#####-####"
            outlined
            maxlength="14"
            name="telefone1"
            label="Celular"
            :rules="[cellphoneRules.required, cellphoneRules.max]"
            validate-on-blur
          ></v-text-field>

          <v-text-field
            v-model="pessoa.telefone2"
            v-mask="'(##)####-####'"
            placeholder="(##)####-####"
            hint="Formato: (##)####-####"
            outlined
            maxlength="13"
            name="telefone1"
            label="Telefone"
            :rules="[telephoneRules.max]"
            validate-on-blur
          ></v-text-field>
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
          class="info mx-0 ml-sm-2"
          :loading="loading"
          @click.prevent="submit()"
        >
          <span class="px-5">Editar paciente</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import unmaskText from '@/utils/unmaskText';
import formattedBirthdate from '@/utils/formattedBirthdate';
import parseDateToDDMMYYYY from '@/utils/parseBirthdateToDDMMYYYY';

import {
  nameRules,
  radioGroupRules,
  medicalRecordRules,
  birthdateRules,
  dateRules,
  genderRules,
  cpfRules,
  rgRules,
  emailRules,
  motherRules,
  cellphoneRules,
  telephoneRules,
  birthplaceRules,
} from '@/validations';

export default {
  name: 'PatientForm',
  props: {
    patientSelected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      pessoa: {
        naturalidade: null,
        nome: null,
        cpf: null,
        rg: null,
        email: null,

        datanascimento: '',
        sexo: '',
        nomemae: null,
        nomepai: '',
        telefone1: '',
        telefone2: '',
      },
      paciente: {
        numero_prontuario: null,
        idpaciente: '',
      },
      nameRules,
      radioGroupRules,
      medicalRecordRules,
      birthdateRules,
      dateRules,
      genderRules,
      cpfRules,
      rgRules,
      emailRules,
      motherRules,
      cellphoneRules,
      telephoneRules,
      birthplaceRules,
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('administration', ['getCitiesList', 'getCitiesListLoading']),
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/editPatient') {
          if (this.patientSelected !== null) {
            this.pessoa.naturalidade = this.patientSelected.naturalidade;
            this.pessoa.nome = this.patientSelected.nome;
            this.pessoa.cpf = this.patientSelected.cpf;
            this.pessoa.rg = this.patientSelected.rg;
            this.pessoa.email = this.patientSelected.email;
            this.pessoa.datanascimento = parseDateToDDMMYYYY(
              this.patientSelected.datanascimento
            );
            this.pessoa.sexo = this.patientSelected.sexo;
            this.pessoa.nomemae = this.patientSelected.nomemae;
            this.pessoa.nomepai = this.patientSelected.nomepai;
            this.pessoa.telefone1 = this.patientSelected.telefone1;
            this.pessoa.telefone2 = this.patientSelected.telefone2;
            this.pessoa.numero_prontuario = this.patientSelected.numero_prontuario;

            this.paciente.numero_prontuario = this.patientSelected.numero_prontuario;
            this.paciente.idpaciente = this.patientSelected.idpaciente;

            this.visible = true;

            await this.fetchCities();
          }
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['editPatient', 'fetchCities']),
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
        const payload = {
          pessoa: {
            ...this.pessoa,
            cpf: unmaskText(this.pessoa.cpf),
            rg: unmaskText(this.pessoa.rg),
            telefone1: unmaskText(this.pessoa.telefone1),
            telefone2: unmaskText(this.pessoa.telefone2),
            datanascimento: formattedBirthdate(this.pessoa.datanascimento),
          },
          paciente: this.paciente,
        };

        try {
          this.loading = true;
          await this.editPatient(payload);

          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
};
</script>
