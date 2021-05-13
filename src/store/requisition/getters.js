export const getters = {
  //SUMMARY
  getSummaryRequisition: (state) => state.summary.data,
  getSummaryRequisitionLoading: (state) => state.summary.loading,
  getSummaryRequisitionRequestFailed: (state) => state.summary.error !== null,
  getSummaryRequisitionRequestError: (state) => state.summary.error,

  //PRODUCTS TYPE
  getListProductTypes: (state) => state.listProductsType.data,
  getListProductTypesLoading: (state) => state.listProductsType.loading,
  getHasListProductTypesRequestFailed: (state) => state.listProductsType.error !== null,
  getListProductTypesRequestError: (state) => state.listProductsType.error,

  //ATTENDANCE
  getIdAttendance: (state) => state.attendance.data && state.attendance.data.idAttendance,
  getAttendance: (state) => state.attendance.data,
  getAttendanceLoading: (state) => state.attendance.loading,
  getIsAttendanceAlreadyCreated: (state) =>
    state.attendance.data && state.attendance.data.idAttendance !== null,
  getHasAttendanceRequestFailed: (state) => state.attendance.error !== null,
  getAttendanceRequestError: (state) => state.attendance.error,

  //REQUISTION
  getIsRequisitionAlreadyCreated: (state) => {
    return state.requisition.data && state.requisition.data.idRequisition !== null
  },
  getRequisition: (state) => state.requisition.data,
  getEditRequisition: (state) => state.editRequisitionData,
  getRequisitionLoading: (state) => state.requisition.loading,
  getHasRequisitionRequestFailed: (state) => state.requisition.error !== null,
  getRequisitionRequestError: (state) => state.requisition.error,

  //REQUISTION ITENS

  getIsItensRequisitionAlreadyCreated: (state) => {
    return state.itensRequisition.data.itensRequisition.length > 0
  },
  getItensRequisition: (state) => state.itensRequisition.data,
  getItensRequisitionTemp: (state) => state.itensRequisitionTemp,
  getItensRequisitionLoading: (state) => state.itensRequisition.loading,
  getHasItensRequisitionRequestFailed: (state) => state.itensRequisition.error !== null,
  getItensRequisitionRequestError: (state) => state.itensRequisition.error,

  //PATIENT
  getSearchPatientByNameLoading: (state) => state.patientByName.loading,
  getSearchPatientByNameList: (state) => state.patientByName.data,
  getHasSearchPatientByNameRequestFailed: (state) =>
    state.patientByName.error !== null,
  getSearchPatientByNameRequestError: (state) => state.patientByName.error,

  //TYPES ATTENDANCE
  getTypesAttendanceList: (state) => state.typesAttendance.data,
  getTypesAttendanceLoading: (state) => state.typesAttendance.loading,
  getHasTypesAttendanceRequestFailed: (state) =>
    state.typesAttendance.error !== null,
  getTypesAttendanceRequestError: (state) => state.typesAttendance.error,

  //HEALTHCARES
  getHealthcaresList: (state) => state.healthcares.data,
  getHealthcaresLoading: (state) => state.healthcares.loading,
  getHasHealthcaresRequestFailed: (state) => state.healthcares.error !== null,
  getHealthcaresRequestError: (state) => state.healthcares.error,

  //DIAGNOSIS
  getSearchDiagnosisByDescriptionLoading: (state) => state.diagnosis.loading,
  getSearchDiagnosisByDescriptionList: (state) => state.diagnosis.data,
  getHasSearchDiagnosisByDescriptionRequestFailed: (state) =>
    state.diagnosis.error !== null,
  getSearchDiagnosisByDescriptionRequestError: (state) => state.diagnosis.error,

  //PROCEDURE
  getProcedure: (state) => state.procedure.data,
  getProcedureLoading: (state) => state.procedure.loading,
  getIsProcedureAlreadyCreated: (state) =>
    state.procedure.data.idProcedure !== null,
  getHasProcedureRequestFailed: (state) => state.procedure.error !== null,
  getProcedureRequestError: (state) => state.procedure.error,

  //TYPES PROCEDURE
  getTypesProcedureList: (state) => state.typesProcedure.data,
  getTypesProcedureLoading: (state) => state.typesProcedure.loading,
  getHasTypesProcedureRequestFailed: (state) =>
    state.typesProcedure.error !== null,
  getTypesProcedureRequestError: (state) => state.typesProcedure.error,
};
