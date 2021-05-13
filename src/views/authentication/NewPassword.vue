<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h5 text-sm-h4"
            >{{ card.title }}&nbsp;{{ user }}</v-card-title
          >
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-text class="pb-0">
            <v-form id="form-new-password" ref="form">
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :label="`${formLabels.password}`"
                outlined
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirm"
                :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  passwordConfirmRules.required,
                  passwordRules.min,
                  passwordConfirmRules.matchPassword(password),
                ]"
                :type="showPasswordConfirm ? 'text' : 'password'"
                name="passwordConfirm"
                :label="`${formLabels.passwordConfirm}`"
                outlined
                @click:append="showPasswordConfirm = !showPasswordConfirm"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              form="form-new-password"
              depressed
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :loading="buttonLoading"
              @click.prevent="submitForm()"
              >{{ button.text }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';

import { passwordRules, passwordConfirmRules } from '@/validations';

import Logo from '@/components/template/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      card: {
        title: 'Oi',
        subtitle:
          'Digite a sua nova senha para ter acesso novamente ao sistema.',
      },
      formLabels: {
        password: 'Nova senha',
        passwordConfirm: 'Repetir senha',
      },
      button: {
        text: 'Definir senha',
      },
      buttonLoading: false,
      password: '',
      passwordConfirm: '',
      showPassword: false,
      showPasswordConfirm: false,
      passwordRules,
      passwordConfirmRules,
      modal: {
        success: {
          title: 'Senha redefinida',
          message: 'Você redefiniu a sua senha de acesso ao sistema.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        error: {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
      },
    };
  },
  computed: {
    user() {
      return this.$route.query.name;
    },
  },
  methods: {
    ...mapActions('notification', ['showNotification']),
    ...mapActions('modal', ['showModal']),
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.startButtonLoading();
        await this.requestNewPassword();
        this.stopButtonLoading();
      }
    },
    async requestNewPassword() {
      const { token } = this.$route.query;

      try {
        const userDecoded = jwt_decode(token);

        await this.$http.put('/user-password', {
          email: userDecoded.login,
          password: this.password,
          token,
        });

        this.showModal({
          title: this.modal.success.title,
          message: this.modal.success.message,
          buttonText: this.modal.success.buttonText,
        });
      } catch (error) {
        this.showModal({
          title: this.modal.error.title,
          message: this.modal.error.message,
          buttonText: this.modal.error.buttonText,
        });
      }
    },
    startButtonLoading() {
      this.buttonLoading = true;
    },
    stopButtonLoading() {
      this.buttonLoading = false;
    },
  },
};
</script>
