import httpClient from '@/plugins/axios';

/**
 * Protocol: 0006 - API to create an attendance in current hospital.
 */
const createAttendance = async ({ attendance }) =>
  httpClient.post('/attendance', { ...attendance });

/**
 * Protocol: 0020 - API to modify an attendance type.
 */
const updateAttendance = async ({ idAttendance, idTypeAttendance }) =>
  httpClient.put('/attendance', { idAttendance, idTypeAttendance });

/**
 * Protocol: 0007 MOBILE - API to list all attendances
 * started in current hospital.
 */
const getAllAttendances = async () => httpClient.get('/attendance');

/**
 * Protocol: 0021 - API to list all attendances types.
 */
const getTypesAttendance = async () => httpClient.get('/type-attendance');

export default {
  getTypesAttendance,
  getAllAttendances,
  createAttendance,
  updateAttendance,
};
