import httpClient from '@/plugins/axios';

/**
 * Protocol: 0018 - API to list patient(s) by name registered in current hospital
 */
const getPatientByName = async ({ name }) =>
  httpClient.get(`/patient/?nome=${name}`);

/**
 * Protocol: 0068 - API to list all patients from a hospital
 */
const getAllPatients = async () => httpClient.get('/patient-company');

/**
 * Protocol: 0071 - API to delete patient from a hospital
 */
const deletePatient = async ({ idpaciente }) =>
  httpClient.delete('/patient-delete', {
    data: {
      idpaciente,
    },
  });

/**
 * Protocol: 0069 - API to register a patient in a hospital
 */
const createPatient = async ({ pessoa, paciente }) =>
  httpClient.post('/patient', {
    pessoa,
    paciente,
  });

/**
 * Protocol: 0070 - API to update patient informations
 */
const updatePatient = async ({ pessoa, paciente }) =>
  httpClient.put('/patient-modify', {
    pessoa,
    paciente,
  });

export {
  getAllPatients,
  deletePatient,
  createPatient,
  updatePatient,
  getPatientByName,
};

export default {
  getAllPatients,
  deletePatient,
  createPatient,
  updatePatient,
  getPatientByName,
};
