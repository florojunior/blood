import httpClient from '@/plugins/axios';

/**
 * Protocol: 0030 - API to list councils registered in the system
 */
const getAllProfiles = async () => httpClient.get('/profile');

export { getAllProfiles };
