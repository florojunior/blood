import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all clinics
 */
const getAllClinics = async () =>
  httpClient.get('/clinic');

  /**
 * Protocol: 0063 - delete clinic
 */
const deleteClinic = async (clinic) =>
httpClient.delete('/clinic-delete',{
  data:{
    idClinica: clinic.idclinica
  }
});

/**
 * Protocol: 0061 - Create a new clinic
 */
const createClinic = async (clinic) =>
  httpClient.post('/clinic-register', clinic);

  /**
 * Protocol: 0062 - Update a clinic
 */
const updateClinic = async (clinic) =>
  httpClient.put('/clinic-modify', clinic);

export {
  getAllClinics,
  deleteClinic,
  createClinic,
  updateClinic
};
