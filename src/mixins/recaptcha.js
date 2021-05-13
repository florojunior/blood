import Recaptcha from '@/components/utils/Recaptcha.vue';

export default {
  /**
   * Usage:
   * Import the mixin, and use the component:
   *   <Recaptcha
   *      ref="recaptcha"
   *      @onRecaptchaVerified="onRecaptchaVerified"
   *   />
   */
  components: {
    Recaptcha,
  },
  data() {
    return {
      recaptcha: {
        token: null,
      },
    };
  },
  methods: {
    onRecaptchaVerified(token) {
      this.recaptcha.token = token;
    },
    resetRecaptcha() {
      this.recaptcha.token = null;
      this.$refs.recaptcha.reset();
    },
  },
};
