import httpClient from '@/plugins/axios';

/**
 * Protocol: 0001 - Initial authentication API that returns a token to validate
 * access to other API's endpoints
 */
const loginUser = async ({ login, password }) =>
  httpClient.post('/login', {
    login,
    password,
  });

export default { loginUser };
