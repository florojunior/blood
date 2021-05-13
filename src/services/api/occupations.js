import httpClient from '@/plugins/axios';

/**
 * Protocol: 0030 - API to list councils registered in the system
 */
const getAllOccupations = async () => httpClient.get('/occupations');

export { getAllOccupations };
