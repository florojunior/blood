import httpClient from '@/plugins/axios';

/**
 * Protocol: 0009 - API to create a procedure
 */
const createProcedure = async ({
  idAttendance,
  idTypeProcedure,
  observation,
}) =>
  httpClient.post('/procedure', {
    idAttendance,
    idTypeProcedure,
    observation,
  });

/**
 * Protocol: 0009 - API to create a procedure
 */
const updateProcedure = async ({ idProcedure, idTypeProcedure, observation }) =>
  httpClient.put('/procedure', {
    idProcedure,
    idTypeProcedure,
    observation,
  });

/**
 * Protocol: 0023 - API to list procedure types
 */
const getTypesProcedures = async () => httpClient.get('/type-procedure');

export default { createProcedure, updateProcedure, getTypesProcedures };
