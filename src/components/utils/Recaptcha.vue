<template>
  <v-input
    v-model="recaptcha.isSolved"
    :rules="[recaptcha.recaptchaRules.required]"
  >
    <VueRecaptcha
      ref="recaptcha"
      :sitekey="sitekey"
      :loadRecaptchaScript="true"
      @verify="onRecaptchaVerified"
      @expired="onRecaptchaExpired"
      @error="onRecaptchaError"
    ></VueRecaptcha>
  </v-input>
</template>

<script>
//** Usage: use the recaptcha mixin */
import VueRecaptcha from 'vue-recaptcha';
import { recaptchaRules } from '@/validations';

export default {
  name: 'Recaptcha',
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      recaptcha: {
        token: null,
        isSolved: false,
        recaptchaRules,
      },
      sitekey: process.env.VUE_APP_RECAPTCHA_PUBLIC_SITE_KEY,
    };
  },
  methods: {
    onRecaptchaVerified(token) {
      this.recaptcha.token = token;
      this.recaptcha.isSolved = true;
      this.$emit('onRecaptchaVerified', token);
    },
    onRecaptchaExpired() {
      this.reset();
    },
    onRecaptchaError() {
      this.reset();
    },
    reset() {
      this.recaptcha.token = null;
      this.recaptcha.isSolved = false;
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<style>
</style>
