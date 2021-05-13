<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h5 text-sm-h4">{{
            card.title
          }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-text class="pb-0">
            <v-form id="form-forget-password" ref="form">
              <v-text-field
                v-model="email.value"
                name="email"
                :rules="[
                  email.emailRules.required,
                  email.emailRules.validEmail,
                ]"
                :label="`${email.label}`"
                outlined
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
              form="form-forget-password"
              depressed
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :loading="button.loading"
              @click.prevent="submitForm()"
              >{{ button.text }}</v-btn
            >
          </v-card-actions>

          <v-card-text
            class="text-body-1 d-flex flex-column justify-center align-center flex-md-row align-md-center justify-md-start"
          >
            <span>{{ link.question }}&nbsp;</span>
            <v-btn
              depressed
              text
              class="primary--text font-weight-bold"
              @click="setMode(2)"
            >
              <span class="text-lowercase">{{ link.text }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import { emailRules } from '@/validations';

import Logo from '@/components/template/Logo.vue';
import recaptcha from '@/mixins/recaptcha.js';

export default {
  components: {
    Logo,
  },
  mixins: [recaptcha],
  data() {
    return {
      card: {
        title: 'Esqueci minha senha',
        subtitle: 'Digite seu e-mail para redefinir sua senha.',
      },
      button: {
        text: 'Buscar',
        loading: false,
      },
      link: {
        question: 'Não é isso que queria fazer?',
        text: 'Voltar para o login',
      },
      email: {
        value: null,
        label: 'E-mail',
        emailRules,
      },
    };
  },
  methods: {
    ...mapActions('authentication', [
      'setIsForgotPassword',
      'setMode',
      'fetchRecaptchaValidation',
      'requestPasswordRecovery',
    ]),
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.startButtonLoading();
        try {
          await this.fetchRecaptchaValidation({
            token: this.recaptcha.token,
          });

          await this.requestPasswordRecovery({
            email: this.email.value,
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

<style scoped>
.text-lowercase::first-letter {
  text-transform: uppercase;
}
</style>
