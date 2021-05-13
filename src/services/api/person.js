import httpClient from '@/plugins/axios';

/**
 * Protocol: 0039 - API to verify if CPF exists
 */
const checkPersonRegisterExistsByCpf = async (cpf) => {
  try {
    await httpClient.get('/person-cpf?', {
      params: {
        cpf,
      },
    });

    return true;
  } catch (error) {
    if (error.response.status === 406) {
      return false;
    } else {
      throw new Error(error);
    }
  }
};
export { checkPersonRegisterExistsByCpf };
