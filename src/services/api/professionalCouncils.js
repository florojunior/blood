import httpClient from '@/plugins/axios';

/**
 * Protocol: 0025 - API to list councils registered in the system
 */
const getAllProfessionalCouncils = async () =>
  httpClient.get('/professional-councils');

export { getAllProfessionalCouncils };
