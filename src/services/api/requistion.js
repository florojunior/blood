import httpClient from '@/plugins/axios';

/**
 * Protocol: 0009 - API to create a procedure
 */
const createRequisition = async (requisition) => {
  return httpClient.post('/requisition', requisition);
}


/**
 * Protocol: 0009 - API to create a procedure
 */
const updateRequisition = async (obj) =>
  httpClient.put('/requisition', obj);

/**
 * Protocol: 0025 - API to updatew by status
 */
const updateRequisitionStatus = async (idRequisition) =>
  httpClient.put(`/requisition-update-status/?idRequisition=${idRequisition}`, {
    idStatusRequisicao: 2,
    observacao: "Atualização de status"
  });


const getRequisitionSummaryRequisition = async (id) => {
  return httpClient.get(`requisition-summary/?idRequisition=${id}`);
}


export default { createRequisition, updateRequisition, getRequisitionSummaryRequisition, updateRequisitionStatus };
