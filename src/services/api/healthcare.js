import httpClient from '@/plugins/axios';

/**
 * Protocol: 0053 - Create a new healthcare
 */
const createHealthcare = async ({ description, status }) =>
  httpClient.post('/register-health-insurance', {
    descricao: description,
    ativo: status,
  });

/**
 * Protocol: 0055 - Update healthcare description
 */
const updateHealthcareDescription = async ({ id, description }) =>
  httpClient.put('/modify-description-health-insurance', {
    idconvenio: id,
    descricao: description,
  });

/**
 * Protocol: 0057- Update healthcare status
 */
const updateHealthcareStatus = async ({ id, status }) =>
  httpClient.put('/modify-status-health-insurance', {
    idconvenio: id,
    ativo: status,
  });

/**
 * Protocol: 0056 - List all healthcare
 */
const getAllHealthcare = async () =>
  httpClient.get('/list-all-health-insurance');

/**
 * Protocol: 0059 - Delete healthcare
 */
const deleteHealthcare = async (healthCare) =>
  httpClient.delete('/delete-health-insurance', {
    data: {
      idconvenio: healthCare.idconvenio,
    },
  });

/**
 * Protocol: 0054 - Associate a healthcare to hospital
 */
const createHealthcareAssociationToHospital = async ({ id, active }) =>
  httpClient.post('/register-health-insurance-company', {
    idconvenio: id,
    ativo: active,
  });

/**
 * Protocol: 0019 - List all healthcare associated to a hospital
 */
const getAllHealthcareAssociatedToHospital = async () =>
  httpClient.get('/health-insurance-company');

/**
 * Protocol: 0058 - Modify status of a healthcare associated to a hospital
 */
const updateStatusOfHealthcareAssociatedToHospital = async (healthcare) =>
  httpClient.put('/modify-status-health-insurance-company', {
    idconvenio: healthcare.idconvenio,
    ativo: healthcare.ativo,
  });

/**
 * Protocol: XXXX - Block healthcare associated to a hospital
 */
const updateBlockHealthcareAssociatedToHospital = async (healthcare) =>
  Promise.resolve({
    data: {
      message: {
        pt: `Convênio ${healthcare.descricao} foi bloqueado com sucesso!`,
      },
    },
  });

export {
  createHealthcare,
  updateHealthcareDescription,
  updateHealthcareStatus,
  getAllHealthcare,
  deleteHealthcare,
  getAllHealthcareAssociatedToHospital,
  createHealthcareAssociationToHospital,
  updateStatusOfHealthcareAssociatedToHospital,
  updateBlockHealthcareAssociatedToHospital,
};

export default {
  createHealthcare,
  updateHealthcareDescription,
  updateHealthcareStatus,
  getAllHealthcare,
  deleteHealthcare,
  getAllHealthcareAssociatedToHospital,
  createHealthcareAssociationToHospital,
  updateStatusOfHealthcareAssociatedToHospital,
  updateBlockHealthcareAssociatedToHospital,
};
