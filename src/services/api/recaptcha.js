import httpClient from '@/plugins/axios';

/**
 * Protocol: 0045 - API for backend recaptcha validation
 */
const validateRecaptcha = async (token) => {
  return httpClient.post('/check-recaptcha', {
    recaptcha_token: token,
  });
};

export { validateRecaptcha };
