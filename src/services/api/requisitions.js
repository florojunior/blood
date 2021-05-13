import httpClient from '@/plugins/axios';

/**
 * Protocol: 0026 MOBILE - API to list all blood transfusion requisitions
 */
const getById = async (idRequisition) =>
  httpClient.get('/requisition-attendance-summary/?idAttendance=' + idRequisition);

/**
 * Protocol: 0026 MOBILE - API to list all blood transfusion requisitions
 */
const getAllTransfusionRequisitions = async () =>
  httpClient.get('/requisitions-all');

/**
 * Protocol: 0023 MOBILE - API to cancel a blood transfusion request made by a doctor
 * with status “Aguardando Coleta de Amostra” ou “Aguardando Componentes do Sangue”
 */
const cancelTransfusionRequisition = async ({ idRequisition, observacao }) =>
  httpClient.put(
    '/requisition-cancel/?',
    { observacao },
    {
      params: {
        idRequisition,
      },
    }
  );

/**
* Protocol: 0023 MOBILE - API to cancel a blood transfusion request made by a doctor
* with status “Aguardando Coleta de Amostra” ou “Aguardando Componentes do Sangue”
*/
const rejectTransfusionRequisition = async ({ idRequisition, observacao }) =>
  httpClient.post(
    '/nc-requisition',
    { idRequisicao: idRequisition, observacao }
  );

/**
* Protocol: 0031 MOBILE - API to get a rejected transfusion
*/
const getRejectedTransfusionRequisition = async (idRequisition) =>
  httpClient.get(
    '/nc-requisition-summary/?idRequisition=' + idRequisition
  );








export { getAllTransfusionRequisitions, cancelTransfusionRequisition, getById, rejectTransfusionRequisition, getRejectedTransfusionRequisition };
