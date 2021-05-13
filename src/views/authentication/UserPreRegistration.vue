<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h4 mb-2">{{ card.title }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-card-text>
            <v-stepper v-model="currentStep" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step step="1" :complete="currentStep > 1">
                  Dados pessoais
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" :complete="currentStep > 2">
                  Profissional
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Login </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep1" ref="formStep1">
                        <v-text-field
                          v-model="user.name"
                          v-mask="
                            'SPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'
                          "
                          outlined
                          counter="150"
                          maxlength="150"
                          name="name"
                          :label="`${formLabels.name}`"
                          :rules="[nameRules.required, nameRules.max]"
                          validate-on-blur
                        ></v-text-field>

                        <label for="radioGender" class="v-label">
                          {{ radioGroupGender.title }}
                          <v-radio-group
                            id="radioGender"
                            v-model="user.gender"
                            :rules="[radioGroupRules.required]"
                            class="mb-2 mt-0"
                            row
                          >
                            <v-radio
                              v-for="gender in radioGroupGender.genders"
                              :key="gender.type"
                              class="mt-2"
                              :label="gender.type"
                              :value="gender.value"
                            ></v-radio>
                          </v-radio-group>
                        </label>

                        <v-text-field
                          v-model="user.telephone"
                          v-mask="'(##)#####-####'"
                          outlined
                          placeholder="(##)#####-####"
                          hint="Formato: (##)#####-####"
                          maxlength="14"
                          name="telephone"
                          label="Telefone"
                          :rules="[
                            telephoneRules.required,
                            telephoneRules.maxExtraDigit,
                          ]"
                          validate-on-blur
                        ></v-text-field>

                        <v-text-field
                          v-model="user.cpf"
                          v-mask="'###.###.###-##'"
                          outlined
                          disabled
                          name="cpf"
                          :label="`${formLabels.cpf}`"
                          :rules="[cpfRules.required, cpfRules.validCpf]"
                          validate-on-blur
                        ></v-text-field>

                        <v-text-field
                          v-model="user.birthdate"
                          v-mask="'##/##/####'"
                          outlined
                          name="birthdate"
                          :label="`${formLabels.birthdate}`"
                          :rules="[
                            birthdateRules.required,
                            dateRules.isValidDate,
                            dateRules.isValidYear,
                            dateRules.isNotFutureDate,
                          ]"
                          validate-on-blur
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep1"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        @click.prevent="validateFormStep1ThenGoNext()"
                      >
                        Prosseguir
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep2" ref="formStep2">
                        <v-autocomplete
                          v-model="user.professionalOccupationId"
                          :items="professionalOccupations"
                          :item-text="'descricao'"
                          :item-value="'idocupacao'"
                          outlined
                          :label="`${formLabels.professionalOccupationId}`"
                          :rules="[professionalOccupationIdRules.required]"
                          name="professionalOccupationId"
                          validate-on-blur
                        ></v-autocomplete>

                        <v-autocomplete
                          v-model="user.professionalCouncil"
                          :items="professionalCouncils"
                          :item-text="'descricao'"
                          return-object
                          outlined
                          :label="`${formLabels.professionalCouncil}`"
                          :rules="[professionalCouncilRules.required]"
                          validate-on-blur
                          name="professionalCouncil"
                        ></v-autocomplete>

                        <v-text-field
                          v-show="!userDoesNotHaveProfessionalCouncilNumber"
                          v-model="user.professionalCouncilNumber"
                          outlined
                          maxlength="30"
                          counter="30"
                          name="professionalCouncilNumber"
                          :label="`${formLabels.professionalCouncilNumber}`"
                          :rules="
                            userDoesNotHaveProfessionalCouncilNumber
                              ? []
                              : [
                                  professionalCouncilNumberRules.required,
                                  professionalCouncilNumberRules.max,
                                ]
                          "
                          validate-on-blur
                        ></v-text-field>

                        <v-text-field
                          v-model="user.hospitalRegistration"
                          v-mask="'NNNNNNNNNNNNNNNNNNNN'"
                          outlined
                          name="hospitalRegistration"
                          maxlength="20"
                          counter="20"
                          :label="`${formLabels.hospitalRegistration}`"
                          :rules="[
                            hospitalRegistrationRules.required,
                            hospitalRegistrationRules.max,
                          ]"
                          validate-on-blur
                        ></v-text-field>

                        <v-select
                          v-model="user.hospitalId"
                          :items="hospitals"
                          :item-text="'nome'"
                          :item-value="'idempresa'"
                          outlined
                          :label="`${formLabels.hospitalId}`"
                          :rules="[hospitalRules.required]"
                          name="hospitalId"
                          validate-on-blur
                        ></v-select>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep2"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        @click.prevent="validateFormStep2ThenGoNext()"
                      >
                        Prosseguir
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep3" ref="formStep3">
                        <v-text-field
                          v-model="user.email"
                          name="email"
                          counter="80"
                          maxlength="80"
                          :rules="[
                            emailRules.required,
                            emailRules.validEmail,
                            emailRules.min,
                            emailRules.max,
                          ]"
                          :label="`${formLabels.email}`"
                          outlined
                          validate-on-blur
                        ></v-text-field>

                        <v-text-field
                          v-model="user.password"
                          v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'"
                          counter="30"
                          minlength="8"
                          maxlength="30"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :rules="[
                            passwordRules.required,
                            passwordRules.min,
                            passwordRules.max,
                          ]"
                          validate-on-blur
                          :type="showPassword ? 'text' : 'password'"
                          name="password"
                          :label="`${formLabels.password}`"
                          outlined
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>

                        <v-text-field
                          v-model="user.passwordConfirm"
                          v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'"
                          counter="30"
                          minlength="8"
                          maxlength="30"
                          :append-icon="
                            showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :rules="[
                            passwordConfirmRules.required,
                            passwordRules.min,
                            passwordRules.max,
                            passwordConfirmRules.matchPassword(user.password),
                          ]"
                          validate-on-blur
                          :type="showPasswordConfirm ? 'text' : 'password'"
                          name="passwordConfirm"
                          :label="`${formLabels.passwordConfirm}`"
                          outlined
                          @click:append="
                            showPasswordConfirm = !showPasswordConfirm
                          "
                        ></v-text-field>

                        <Recaptcha
                          ref="recaptcha"
                          @onRecaptchaVerified="onRecaptchaVerified"
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep3"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        :loading="button.loading"
                        @click.prevent="validateFormStep3AndSubmit()"
                      >
                        {{ button.text }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { format, parse } from 'date-fns';

import Logo from '@/components/template/Logo.vue';

import unmaskText from '@/utils/unmaskText';
import recaptcha from '@/mixins/recaptcha.js';
import {
  emailRules,
  nameRules,
  cpfRules,
  birthdateRules,
  professionalOccupationIdRules,
  professionalCouncilRules,
  professionalCouncilNumberRules,
  hospitalRegistrationRules,
  hospitalRules,
  radioGroupRules,
  passwordRules,
  passwordConfirmRules,
  telephoneRules,
  dateRules,
} from '@/validations';

export default {
  components: {
    Logo,
  },
  mixins: [recaptcha],
  data() {
    return {
      card: {
        title: 'Registro',
        subtitle: 'Vamos começar com seu cadastro.',
      },
      currentStep: 1,
      totalSteps: 3,
      ID_NO_COUNCIL: [
        // 3 is the value from API that matches a user that does not have a council
        3,
        // null is default value for idconselho_profissional
        null,
      ],
      user: {
        cpf: null,

        name: null,
        gender: null,
        telephone: null,
        birthdate: null,

        professionalOccupationId: null,
        professionalCouncil: {
          idconselho_profissional: null,
          descricao: null,
          sigla: null,
          ativo: null,
        },
        professionalCouncilNumber: null,
        hospitalRegistration: null,
        hospitalId: null,

        email: null,
        password: null,
        passwordConfirm: null,
      },
      radioGroupGender: {
        title: 'Gênero',
        genders: [
          { type: 'Masculino', value: 'M' },
          { type: 'Feminino', value: 'F' },
        ],
      },
      hospitals: [],
      professionalOccupations: [],
      professionalCouncils: [],
      formLabels: {
        cpf: 'CPF',
        name: 'Nome',
        telephone: 'Telefone',
        birthdate: 'Data de nascimento',
        professionalOccupationId: 'Ocupação profissional',
        hospitalRegistration: 'Matrícula',
        professionalCouncil: 'Conselho profissional',
        professionalCouncilNumber: 'Registro no conselho profissional',
        hospitalId: 'Hospital',
        email: 'E-mail',
        password: 'Senha',
        passwordConfirm: 'Repetir senha',
      },
      button: {
        loading: false,
        text: 'Fazer cadastro',
      },
      showPassword: false,
      showPasswordConfirm: false,
      passwordRules,
      passwordConfirmRules,
      nameRules,
      cpfRules,
      birthdateRules,
      professionalOccupationIdRules,
      professionalCouncilRules,
      professionalCouncilNumberRules,
      hospitalRegistrationRules,
      hospitalRules,
      radioGroupRules,
      emailRules,
      dateRules,
      telephoneRules,
    };
  },
  computed: {
    ...mapGetters('authentication', [
      'getCpfPreRegistration',
      'getHospitals',
      'getProfessionalCouncils',
      'getOccupations',
    ]),
    unmaskedCpf() {
      return unmaskText(this.user.cpf);
    },
    unmaskedTelephone() {
      return unmaskText(this.user.telephone);
    },
    formattedBirthdate() {
      return format(
        parse(this.user.birthdate, 'dd/MM/yyyy', new Date()),
        'yyyy/MM/dd'
      );
    },
    userDoesNotHaveProfessionalCouncilNumber() {
      return this.checkUserDoesNotHaveProfessionalCouncilNumber(
        this.user.professionalCouncil.idconselho_profissional
      );
    },
  },
  watch: {
    'user.professionalCouncil': {
      handler(newInput, oldInput) {
        if (
          this.checkUserDoesNotHaveProfessionalCouncilNumber(
            this.user.professionalCouncil.idconselho_profissional
          ) ||
          this.userHasChangedCouncil(newInput, oldInput)
        ) {
          this.resetProfessionalCouncilNumber();
        }
      },
      deep: true,
    },
  },
  created() {
    this.user.cpf = this.getCpfPreRegistration;
    this.hospitals = this.getHospitals;
    this.professionalCouncils = this.getProfessionalCouncils;
    this.professionalOccupations = this.getOccupations;
  },
  methods: {
    ...mapActions('authentication', [
      'fetchRecaptchaValidation',
      'preRegisterNewUser',
    ]),
    checkUserDoesNotHaveProfessionalCouncilNumber(idconselho_profissional) {
      return this.ID_NO_COUNCIL.includes(idconselho_profissional);
    },
    userHasChangedCouncil(newCouncil, OldCouncil) {
      return (
        newCouncil.idconselho_profissional !==
        OldCouncil.idconselho_profissional
      );
    },
    resetProfessionalCouncilNumber() {
      this.user.professionalCouncilNumber = null;
    },
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep += 1;
      }
    },
    validateFormStep1ThenGoNext() {
      if (this.$refs.formStep1.validate()) {
        this.nextStep();
      }
    },
    validateFormStep2ThenGoNext() {
      if (this.$refs.formStep2.validate()) {
        this.nextStep();
      }
    },
    async validateFormStep3AndSubmit() {
      if (this.$refs.formStep3.validate()) {
        this.startButtonLoading();

        try {
          await this.fetchRecaptchaValidation({
            token: this.recaptcha.token,
          });

          await this.preRegisterNewUser({
            ...this.user,
            cpf: this.unmaskedCpf,
            telephone: this.unmaskedTelephone,
            birthdate: this.formattedBirthdate,
          });
        } catch (error) {
          this.resetRecaptcha();
        }

        this.stopButtonLoading();
      }
    },
    startButtonLoading() {
      this.button.loading = true;
    },
    stopButtonLoading() {
      this.button.loading = false;
    },
  },
};
</script>

