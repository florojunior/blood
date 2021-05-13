import attendances from '@/services/api/attendances';
import diagnosis from '@/services/api/diagnosis';
import healthcare from '@/services/api/healthcare';
import patients from '@/services/api/patients';
import procedures from '@/services/api/procedures';
import {
  getById
} from '@/services/api/requisitions';
import requistion from '@/services/api/requistion';
import itensRequisition from '@/services/api/itensRequisition';

export const actions = {

  //SUMMARY

  async getRequisitionSummary(state) {
    try {
      state.commit('REQUISITION_SUMMARY_PENDING');

      const response = await requistion.getRequisitionSummaryRequisition(state.getters.getRequisition.idRequisition);
      const responseItens = await itensRequisition.getByIdRequistion(state.getters.getRequisition.idRequisition);

      if (response.data.result.length > 0 && responseItens.data.result.length) {
        console.log('entrou aqui');
        state.commit('REQUISITION_SUMMARY_SUCCESS', {
          summary: response.data.result[0],
        });

        state.commit('CREATE_ITENS_REQUISITION_SUCCESS_SUMMARY',
          responseItens.data.result);

      } else {
        state.commit('REQUISITION_SUMMARY_SUCCESS', {
          summary: null,
        });
      }

    } catch (error) {
      state.commit('REQUISITION_SUMMARY_ERROR', { error });
    }
  },

  async updateRequisitionSummary(state) {
    try {
      state.commit('REQUISITION_SUMMARY_PENDING');

      const response = await requistion.updateRequisitionStatus(state.getters.getRequisition.idRequisition);

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );

    } catch (error) {
      state.commit('REQUISITION_SUMMARY_ERROR', { error });
    }
  },

  //ITEM_REQUISITION

  async deleteitem(state, idItem) {
    try {
      state.commit('LIST_ITENS_REQUISITION_PENDING', true);
      await itensRequisition.deleteItemRequisition(idItem);
      await state.dispatch('getItensByRequisition', state.getters.getRequisition.idRequisition);
      state.commit('LIST_ITENS_REQUISITION_PENDING', false);
    } catch (error) {
      state.commit('CREATE_ITENS_REQUISITION_ERROR', { error });
    }
  },
  async getItensByRequisition(state, idRequisition) {
    try {
      state.commit('LIST_ITENS_REQUISITION_PENDING', true);
      const response = await itensRequisition.getByIdRequistion(idRequisition);
      var responseCastList = response.data.result.map((item) => {

        var abo = item.aborhd.replace('+', "").replace("-", "");
        var rhd = item.aborhd.replace(abo, "");
        var productDescription = item.produto;
        var idProduct = item.idproduto;
        var unitQuantity = item.quantidade_unidade;
        var mlQuantity = item.quantidade_ml;
        var phenotyped = item.fenotipado;
        var interval = item.intervalo ? item.intervalo : null;
        var dateScheduled = item.dataagendamento ? item.dataagendamento : null;
        var iditensrequisicao = item.iditensrequisicao;

        return {
          abo,
          rhd,
          productDescription,
          idProduct,
          unitQuantity,
          mlQuantity,
          phenotyped,
          interval,
          dateScheduled,
          iditensrequisicao
        }
      });
      state.commit('ADD_TO_ITENS_REQUISITION', responseCastList);
      state.commit('LIST_ITENS_REQUISITION_PENDING', false);
      return response.data.result;
    } catch (error) {
      state.commit('CREATE_ITENS_REQUISITION_ERROR', { error });
    }
  },

  async addNewItemRequistionToTemp(state, itemRequistion) {
    try {
      state.commit('CREATE_ITENS_REQUISITION_PENDING');
      const response = await itensRequisition.createItemRequisition(
        {
          ...itemRequistion,
          idRequisition: state.getters.getRequisition.idRequisition
        });

      state.commit('CREATE_ITENS_REQUISITION_SUCCESS', {
        itemRequisition: itemRequistion,
      });

      await state.dispatch('getItensByRequisition', state.getters.getRequisition.idRequisition);

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('CREATE_ITENS_REQUISITION_ERROR', { error });
    }
  },

  async getAllProductsType(state) {
    try {
      state.commit('LIST_PRODUCTS_TYPE_PENDING');

      const response = await itensRequisition.listProducts();

      state.commit('LIST_PRODUCTS_TYPE_SUCCESS', {
        listProductsType: response.data.result,
      });
    } catch (error) {
      state.commit('LIST_PRODUCTS_TYPE_ERROR', { error });
    }
  },

  async saveItensRequisition(state) {
    state.getters.getItensRequisitionTemp.forEach(async (itemRequistion) => {
      try {
        state.commit('CREATE_ITENS_REQUISITION_PENDING');
        const response = await itensRequisition.createItemRequisition(
          {
            ...itemRequistion,
            idRequisition: state.getters.getRequisition.idRequisition
          });

        state.commit('CREATE_ITENS_REQUISITION_SUCCESS', {
          itemRequisition: itemRequistion,
        });

        state.dispatch(
          'snackbar/success',
          { message: response.data.message.pt },
          { root: true }
        );
      } catch (error) {
        state.commit('CREATE_ITENS_REQUISITION_ERROR', { error });
      }
    });
  },

  //REQUISITION
  async getRequisionbyId(state, idrequisition) {
    try {
      if (idrequisition) {
        const response = await getById(idrequisition);

        const resultRequisition = response.data.result[0];


        state.commit('CREATE_REQUISITION_SUCCESS', {
          idRequisition: resultRequisition.idrequisicao,
        });

        state.commit('CREATE_ATTENDANCE_SUCCESS', {
          idAttendance: resultRequisition.idatendimento
        });

        state.commit('REQUISITION_EDIT_STATE', resultRequisition);
      } else {
        state.commit('REQUISITION_EDIT_STATE', null);
      }
    } catch (error) {
      state.commit('CREATE_REQUISITION_ERROR', { error });
    }
  },

  async createRequisition(state, requisition) {
    try {
      state.commit('CREATE_REQUISITION_PENDING');

      const response = await requistion.createRequisition(requisition);
      state.commit('CREATE_REQUISITION_SUCCESS', {
        idRequisition: response.data.result.idRequisition,
      });
      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('CREATE_REQUISITION_ERROR', { error });
    }
  },
  async updateRequisition(state, requisition) {
    try {
      state.commit('UPDATE_REQUISITION_PENDING');
      const response = await requistion.updateRequisition(requisition);
      state.commit('UPDATE_REQUISITION_SUCCESS', {
        idRequisition: requisition.idRequisition,
      });
      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      console.log('alert 1 error');
      state.commit('UPDATE_REQUISITION_ERROR', { error });
    }
  },

  //ATTENDANCE
  async createAttendance(state, { attendance }) {
    try {
      state.commit('CREATE_ATTENDANCE_PENDING');

      const response = await attendances.createAttendance({ attendance });

      state.commit('CREATE_ATTENDANCE_SUCCESS', response.data.result);

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('CREATE_ATTENDANCE_ERROR', { error });
    }
  },
  async updateAttendance(state, { idAttendance, idTypeAttendance }) {
    try {
      console.log('console.log 1');
      state.commit('UPDATE_ATTENDANCE_PENDING');

      const response = await attendances.updateAttendance({
        idAttendance,
        idTypeAttendance,
      });

      state.commit('UPDATE_ATTENDANCE_SUCCESS', { idAttendance });

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('UPDATE_ATTENDANCE_ERROR', { error });
    }
  },

  //PATIENT
  async searchPatientByName(state, { name }) {
    try {
      state.commit('SEARCH_PATIENT_BY_NAME_PENDING');

      const response = await patients.getPatientByName({ name });

      state.commit('SEARCH_PATIENT_BY_NAME_SUCCESS', {
        patients: response.data.result,
      });
    } catch (error) {
      state.commit('SEARCH_PATIENT_BY_NAME_ERROR', { error });
    }
  },

  //TYPES ATTENDANCE
  async fetchTypesAttendance(state) {
    try {
      state.commit('FETCH_TYPES_ATTENDANCE_PENDING');

      const response = await attendances.getTypesAttendance();

      state.commit('FETCH_TYPES_ATTENDANCE_SUCCESS', {
        typesAttendance: response.data.result,
      });
    } catch (error) {
      state.commit('FETCH_TYPES_ATTENDANCE_ERROR', { error });
    }
  },

  //HEALTHCARES
  async fetchHealthcares(state) {
    try {
      state.commit('FETCH_HEALTHCARES_PENDING');

      const response = await healthcare.getAllHealthcareAssociatedToHospital();

      state.commit('FETCH_HEALTHCARES_SUCCESS', {
        healthcares: response.data.result,
      });
    } catch (error) {
      state.commit('FETCH_HEALTHCARES_ERROR', { error });
    }
  },

  //DIAGNOSIS
  async searchDiagnosisByDescription(state, { description }) {
    try {
      state.commit('SEARCH_DIAGNOSIS_PENDING');

      const response = await diagnosis.getDiagnosisByDescription({
        description,
      });

      state.commit('SEARCH_DIAGNOSIS_SUCCESS', {
        diagnosis: response.data.result,
      });
    } catch (error) {
      state.commit('SEARCH_DIAGNOSIS_ERROR', { error });
    }
  },
  //PROCEDURE
  async createProcedure(state, { idAttendance, idTypeProcedure, observation }) {
    try {
      state.commit('CREATE_PROCEDURE_PENDING');

      const response = await procedures.createProcedure({
        idAttendance,
        idTypeProcedure,
        observation,
      });

      state.commit('CREATE_PROCEDURE_SUCCESS', {
        idProcedure: response.data.result.idProcedure,
        idTypeProcedure,
        observation,
      });

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('CREATE_PROCEDURE_ERROR', { error });
    }
  },
  async updateProcedure(state, { idProcedure, idTypeProcedure, observation }) {
    try {
      state.commit('UPDATE_PROCEDURE_PENDING');

      const response = await procedures.updateProcedure({
        idProcedure,
        idTypeProcedure,
        observation,
      });

      state.commit('UPDATE_PROCEDURE_SUCCESS', {
        idProcedure,
        idTypeProcedure,
        observation,
      });

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      state.commit('UPDATE_PROCEDURE_ERROR', { error });
    }
  },

  //TYPES PROCEDURE
  async fetchTypesProcedure(state) {
    try {
      state.commit('FETCH_TYPES_PROCEDURE_PENDING');

      const response = await procedures.getTypesProcedures();

      state.commit('FETCH_TYPES_PROCEDURE_SUCCESS', {
        typesProcedure: response.data.result,
      });
    } catch (error) {
      state.commit('FETCH_TYPES_PROCEDURE_ERROR', { error });
    }
  },
};
