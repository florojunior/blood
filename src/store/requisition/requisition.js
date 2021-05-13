import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  editRequisitionData: null,
  summary: {
    loading: false,
    error: null,
    data: null,
  },
  attendance: {
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
  },
  patientByName: {
    loading: false,
    error: null,
    data: [],
  },
  typesAttendance: {
    loading: false,
    error: null,
    data: [],
  },
  healthcares: {
    loading: false,
    error: null,
    data: [],
  },
  diagnosis: {
    loading: false,
    error: null,
    data: [],
  },
  procedure: {
    loading: false,
    error: null,
    data: {
      idProcedure: null,
      idTypeProcedure: null,
      observation: null,
    },
  },
  typesProcedure: {
    loading: false,
    error: null,
    data: [],
  },
  requisition: {
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
    },

  },
  itensRequisition: {
    data: {
      itensRequisition: []
    }
  },
  itensRequisitionTemp: [],
  listProductsType: {
    loading: false,
    error: null,
    data: [],
  },
};

export const requisition = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
