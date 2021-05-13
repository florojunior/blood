import httpClient from '@/plugins/axios';

/**
 * Protocol: 0009 - API to create a procedure
 */
const createItemRequisition = async (itemRequisition) => {
  return httpClient.post('/items-requisition', itemRequisition);

}


/**
 * Protocol: 0009 - API to create a procedure
 */
const updateItemRequisition = async (itemRequisition) => {
  return httpClient.put('/items-requisition', itemRequisition);
}


/**
 * Protocol: 0014 - API to list products
 */
const listProducts = async () => {
  return httpClient.get('/product');

}

/**
 * Protocol: 0014 - API to list products
 */
const getByIdRequistion = async (idRequisicao) => {
  return httpClient.get(`items-requisition/?idRequisicao=${idRequisicao}`);
}

/**
* Protocol: 0028 MOBILE - API para deletar produtos vinculados a uma requisição de transfusão.
*/
const deleteItemRequisition = async (idItensRequisition) =>
  httpClient.delete(
    `/items-requisition/?idItensRequisition=${idItensRequisition}`);


export default { createItemRequisition, updateItemRequisition, listProducts, getByIdRequistion, deleteItemRequisition };
