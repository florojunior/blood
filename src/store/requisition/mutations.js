export const mutations = {

  //EDIT_REQUISITION SUMMARY
  REQUISITION_EDIT_STATE(state, requisition) {
    if (requisition) {
      state.editRequisitionData = requisition;
    } else {
      state.editRequisitionData = requisition;
      state.attendance = {
        loading: false,
        error: null,
        data: {
          idAttendance: null,
          idPatient: null,
          idTypeAttendance: null,
          idDiagnosis: null,
          dataAtendimento: null,
          idConvenio: null,
        },
      };
      state.procedure = {
        loading: false,
        error: null,
        data: {
          idProcedure: null,
          idTypeProcedure: null,
          observation: null,
        },
      };

      state.requisition = {
        loading: false,
        error: null,
        data: {
          idRequisition: null,
          idProcedure: null,
          idStatusRequisition: null,
          idTypeTransfusion: null,
          idClinic: null,
          idBed: null,
          weight: null,
          platelets: null,
          hematoctro: null,
          hemoglobin: null,
          datePlatelets: null,
          dateHematoctro: null,
          dateHemoglobin: null,
          observation: null,
        }
      };

      state.itensRequisitionTemp = [];
    }
  },
  //REQUISITION SUMMARY
  REQUISITION_SUMMARY_PENDING(state) {
    state.summary.loading = true;
  },
  REQUISITION_SUMMARY_SUCCESS(state, summary) {
    state.summary.data = summary;
    state.summary.error = null;
    state.summary.loading = false;
  },
  REQUISITION_SUMMARY_ERROR(state, { error }) {
    state.summary.error = error;
    state.summary.data = null;
    state.summary.loading = false;
  },

  //PRDDUCTS TYPE
  LIST_PRODUCTS_TYPE_PENDING(state) {
    state.listProductsType.loading = true;
  },
  LIST_PRODUCTS_TYPE_SUCCESS(state, { listProductsType }) {
    state.listProductsType.data = listProductsType;
    state.listProductsType.error = null;
    state.listProductsType.loading = false;
  },
  LIST_PRODUCTS_TYPE_ERROR(state, { error }) {
    state.listProductsType.error = error;
    state.listProductsType.data = [];
    state.listProductsType.loading = false;
  },

  //ITENS_REQUISITION

  LIST_ITENS_REQUISITION_PENDING(state, loading) {
    state.itensRequisition.loading = loading;
  },

  CREATE_ITENS_REQUISITION_PENDING(state) {
    state.itensRequisition.loading = true;
  },

  ADD_TO_ITENS_REQUISITION(state, itemRequisition) {
    if (Array.isArray(itemRequisition)) {
      state.itensRequisitionTemp = [];
      state.itensRequisitionTemp.push(...itemRequisition);
    }
    else {
      state.itensRequisitionTemp.push(itemRequisition);
    }

  },

  CREATE_ITENS_REQUISITION_SUCCESS_SUMMARY(state, itemRequisition) {
    state.itensRequisition.data.itensRequisition = itemRequisition;
    state.itensRequisition.error = null;
    state.itensRequisition.loading = false;
  },

  CREATE_ITENS_REQUISITION_SUCCESS(state, { itemRequisition }) {
    state.itensRequisition.data.itensRequisition.push(itemRequisition);
    state.itensRequisition.error = null;
    state.itensRequisition.loading = false;
  },
  CREATE_ITENS_REQUISITION_ERROR(state, { error }) {
    state.itensRequisition.error = error;
    state.itensRequisition.data.itensRequisition = [];
    state.itensRequisition.loading = false;
  },
  UPDATE_ITENS_REQUISITION_PENDING(state) {
    state.itensRequisition.loading = true;
  },
  UPDATE_ITENS_REQUISITION_SUCCESS(state) {
    state.itensRequisition.error = null;
    state.itensRequisition.loading = false;
  },
  UPDATE_ITENS_REQUISITION_ERROR(state, { error }) {
    state.itensRequisition.error = error;
    state.itensRequisition.loading = false;
  },

  //REQUISITON
  CREATE_REQUISITION_PENDING(state) {
    state.requisition.loading = true;
  },
  CREATE_REQUISITION_SUCCESS(state, { idRequisition }) {
    state.requisition.data.idRequisition = idRequisition;
    state.requisition.error = null;
    state.requisition.loading = false;
  },
  CREATE_REQUISITION_ERROR(state, { error }) {
    state.requisition.error = error;
    state.requisition.idRequisition = null;
    state.requisition.loading = false;
  },
  UPDATE_REQUISITION_PENDING(state) {
    state.requisition.loading = true;
  },
  UPDATE_REQUISITION_SUCCESS(state, requisition) {
    state.requisition.error = null;
    state.requisition.data = requisition;
    state.requisition.loading = false;
  },
  UPDATE_REQUISITION_ERROR(state, { error }) {
    state.requisition.error = error;
    state.requisition.loading = false;
  },

  //ATTENDANCE
  CREATE_ATTENDANCE_PENDING(state) {
    state.attendance.loading = true;
  },
  CREATE_ATTENDANCE_SUCCESS(state, attendance) {
    state.attendance.data = attendance;
    state.attendance.error = null;
    state.attendance.loading = false;
  },
  CREATE_ATTENDANCE_ERROR(state, { error }) {
    state.attendance.error = error;
    state.attendance.data.attendance = null;
    state.attendance.loading = false;
  },
  UPDATE_ATTENDANCE_PENDING(state) {
    state.attendance.loading = true;
  },
  UPDATE_ATTENDANCE_SUCCESS(state, attendance) {
    state.attendance.error = null;
    state.attendance.data = attendance;
    state.attendance.loading = false;
  },
  UPDATE_ATTENDANCE_ERROR(state, { error }) {
    state.attendance.error = error;
    state.attendance.loading = false;
  },

  // PATIENT
  SEARCH_PATIENT_BY_NAME_PENDING(state) {
    state.patientByName.loading = true;
  },
  SEARCH_PATIENT_BY_NAME_SUCCESS(state, { patients }) {
    state.patientByName.data = patients;
    state.patientByName.error = null;
    state.patientByName.loading = false;
  },
  SEARCH_PATIENT_BY_NAME_ERROR(state, { error }) {
    state.patientByName.error = error;
    state.patientByName.data = [];
    state.patientByName.loading = false;
  },

  //TYPES ATTENDANCE
  FETCH_TYPES_ATTENDANCE_PENDING(state) {
    state.typesAttendance.loading = true;
  },
  FETCH_TYPES_ATTENDANCE_SUCCESS(state, { typesAttendance }) {
    state.typesAttendance.data = typesAttendance;
    state.typesAttendance.error = null;
    state.typesAttendance.loading = false;
  },
  FETCH_TYPES_ATTENDANCE_ERROR(state, { error }) {
    state.typesAttendance.error = error;
    state.typesAttendance.data = [];
    state.typesAttendance.loading = false;
  },

  //HEALTHCARES
  FETCH_HEALTHCARES_PENDING(state) {
    state.healthcares.loading = true;
  },
  FETCH_HEALTHCARES_SUCCESS(state, { healthcares }) {
    state.healthcares.data = healthcares;
    state.healthcares.error = null;
    state.healthcares.loading = false;
  },
  FETCH_HEALTHCARES_ERROR(state, { error }) {
    state.healthcares.error = error;
    state.healthcares.data = [];
    state.healthcares.loading = false;
  },

  // DIAGNOSIS
  SEARCH_DIAGNOSIS_PENDING(state) {
    state.diagnosis.loading = true;
  },
  SEARCH_DIAGNOSIS_SUCCESS(state, { diagnosis }) {
    state.diagnosis.data = diagnosis;
    state.diagnosis.error = null;
    state.diagnosis.loading = false;
  },
  SEARCH_DIAGNOSIS_ERROR(state, { error }) {
    state.diagnosis.error = error;
    state.diagnosis.data = [];
    state.diagnosis.loading = false;
  },

  //PROCEDURE
  CREATE_PROCEDURE_PENDING(state) {
    state.procedure.loading = true;
  },
  CREATE_PROCEDURE_SUCCESS(
    state,
    { idProcedure, idTypeProcedure, observation }
  ) {
    state.procedure.data.idProcedure = idProcedure;
    state.procedure.data.idTypeProcedure = idTypeProcedure;
    state.procedure.data.observation = observation;
    state.procedure.error = null;
    state.procedure.loading = false;
  },
  CREATE_PROCEDURE_ERROR(state, { error }) {
    state.procedure.error = error;
    state.procedure.idProcedure = null;
    state.procedure.loading = false;
  },
  UPDATE_PROCEDURE_PENDING(state) {
    state.procedure.loading = true;
  },
  UPDATE_PROCEDURE_SUCCESS(
    state,
    { idProcedure, idTypeProcedure, observation }
  ) {
    state.procedure.data.idProcedure = idProcedure;
    state.procedure.data.idTypeProcedure = idTypeProcedure;
    state.procedure.data.observation = observation;
    state.procedure.error = null;
    state.procedure.loading = false;
  },
  UPDATE_PROCEDURE_ERROR(state, { error }) {
    state.procedure.error = error;
    state.procedure.loading = false;
  },

  //TYPES PROCEDURE
  FETCH_TYPES_PROCEDURE_PENDING(state) {
    state.typesProcedure.loading = true;
  },
  FETCH_TYPES_PROCEDURE_SUCCESS(state, { typesProcedure }) {
    state.typesProcedure.data = typesProcedure;
    state.typesProcedure.error = null;
    state.typesProcedure.loading = false;
  },
  FETCH_TYPES_PROCEDURE_ERROR(state, { error }) {
    state.typesProcedure.error = error;
    state.typesProcedure.data = [];
    state.typesProcedure.loading = false;
  },
};
