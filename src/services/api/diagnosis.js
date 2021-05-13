import httpClient from '@/plugins/axios';

/**
 * Protocol: 0017 - API to list diagnosis by description (diagnosis description or CID code)
 */
const getDiagnosisByDescription = async ({ description }) =>
  httpClient.get(`/diagnosis/?descricao=${description}`);

export default { getDiagnosisByDescription };
