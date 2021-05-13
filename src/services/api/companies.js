import httpClient from '@/plugins/axios';

/**
 * Protocol: 0035 - API to list companies (hospitals)
 */
const getAllHospitals = async () => httpClient.get('/companies');

export { getAllHospitals };
