import httpClient from '@/plugins/axios';

/**
 * Protocol: 0072 - API to list all cities
 */
const getAllCities = async () => httpClient.get('/cities');

export { getAllCities };
