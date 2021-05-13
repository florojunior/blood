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
            <v-form id="form-authenticate" ref="form">
              <v-text-field
                v-model="email"
                name="email"
                :rules="[emailRules.required, emailRules.validEmail]"
                validate-on-blur
                :label="`${formLabels.email}`"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                name="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required]"
                validate-on-blur
                :type="showPassword ? 'text' : 'password'"
                :label="`${formLabels.password}`"
                outlined
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions
            class="d-flex flex-row align-center justify-space-between"
          >
            <v-btn
              form="form-authenticate"
              type="submit"
              depressed
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :loading="loginLoading"
              @click.prevent="submitForm()"
              >{{ button.text }}</v-btn
            >

            <v-btn
              depressed
              text
              color="primary"
              class="py-2 ml-2 text-button"
              :disabled="loginLoading"
              @click="setMode(1)"
              ><span class="text-lowercase font-weight-regular">{{
                button.textForgotPassword
              }}</span></v-btn
            >
          </v-card-actions>

          <v-card-text
            class="text-body-1 d-flex flex-column justify-center align-center flex-md-row align-md-center justify-md-start"
          >
            <span>{{ bottomQuestion.question }}&nbsp;</span>
            <v-btn
              depressed
              text
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :disabled="loginLoading"
              @click="setMode(4)"
              ><span class="text-lowercase">{{ bottomQuestion.text }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { emailRules, passwordRules } from '@/validations';

import Logo from '@/components/template/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      card: {
        title: 'Login',
        subtitle: 'Acesse sua conta com e-mail e senha.',
      },
      formLabels: {
        email: 'E-mail',
        password: 'Senha',
      },
      button: {
        text: 'ENTRAR',
        textForgotPassword: 'Esqueci minha Senha',
      },
      bottomQuestion: {
        question: 'Ainda não tem registro no Blood?',
        text: 'Criar uma conta',
      },
      email: '',
      password: '',
      emailRules,
      passwordRules,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters('authentication', ['loginLoading']),
  },
  methods: {
    ...mapActions('authentication', ['setMode', 'handleLogin']),
    ...mapActions('modal', ['showModal']),
    async submitForm() {
      if (this.$refs.form.validate()) {
        await this.handleLogin({ login: this.email, password: this.password });
      }
    },
  },
};
</script>

<style scoped>
.text-lowercase::first-letter {
  text-transform: uppercase;
}
</style>

