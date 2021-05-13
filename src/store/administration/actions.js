import { getAllProfiles } from '@/services/api/profiles';
import {
  rejectUserStatus,
  blockUserStatus,
  unblockUserStatus,
  listUsersByStatus,
  updateUserStatus,
} from '@/services/api/user';
import {
  createHealthcare,
  updateHealthcareDescription,
  updateHealthcareStatus,
  getAllHealthcare,
  deleteHealthcare,
  getAllHealthcareAssociatedToHospital,
  createHealthcareAssociationToHospital,
  updateStatusOfHealthcareAssociatedToHospital,
  updateBlockHealthcareAssociatedToHospital,
} from '@/services/api/healthcare';

import {
  getAllClinics,
  deleteClinic,
  createClinic,
  updateClinic,
} from '@/services/api/clinic';

import {
  getAllPatients,
  deletePatient,
  createPatient,
  updatePatient,
} from '@/services/api/patients';
import { getAllCities } from '@/services/api/cities';

export const actions = {
  async fetchListUsers(state, status) {
    try {
      const dataUsers = await listUsersByStatus(status);
      state.commit('setPendingUsersList', dataUsers.data.result);
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchListProfiles(state) {
    try {
      const dataProfiles = await getAllProfiles();
      state.commit('setProfiles', dataProfiles.data.result);
    } catch (error) {
      console.log(error);
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUpdateUserStatus(state, user) {
    try {
      if (user.ativo == 'T') await updateUserStatus(user);
      else await rejectUserStatus(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro Atualizado',
          message: `Seus dados foram submetidos e o usuário foi ${
            user.status == 'F' ? 'Rejeitado' : 'Aprovado'
          }.`,
          buttonText: 'VOLTAR PARA A LISTA DE USUÁRIOS',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      console.log(error);
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } finally {
      //state.dispatch('resetPreRegistration');
    }
  },
  async fetchRejectUser(state, user) {
    try {
      await rejectUserStatus(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro Atualizado',
          message: `Seus dados foram submetidos e o usuário foi ${
            user.status == 'F' ? 'Rejeitado' : 'Aprovado'
          }.`,
          buttonText: 'VOLTAR PARA A LISTA DE USUÁRIOS',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } finally {
      //state.dispatch('resetPreRegistration');
    }
  },
  async fetchBlockUser(state, user) {
    try {
      await blockUserStatus(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro Atualizado',
          message: `Seus dados foram submetidos e o usuário foi Bloqueado}.`,
          buttonText: 'VOLTAR PARA A LISTA DE USUÁRIOS',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      console.log(error);
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUnblockUser(state, user) {
    try {
      await unblockUserStatus(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro Atualizado',
          message: `Seus dados foram submetidos e o usuário foi desbloqueado}.`,
          buttonText: 'VOLTAR PARA A LISTA DE USUÁRIOS',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      console.log(error);
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } finally {
      //state.dispatch('resetPreRegistration');
    }
  },
  startHealthcareListLoading(state) {
    state.commit('setHealthcareListLoading', true);
  },
  stopHealthcareListLoading(state) {
    state.commit('setHealthcareListLoading', false);
  },
  async fetchHealthcareList(state) {
    try {
      state.dispatch('startHealthcareListLoading');

      const response = await getAllHealthcare();
      state.commit('setHealthcareList', response.data.result);
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao carregar lista de convênios!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.commit('setHealthcareList', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
    } finally {
      state.dispatch('stopHealthcareListLoading');
    }
  },
  async createNewHealthcare(state, payload) {
    try {
      const response = await createHealthcare(payload);

      await state.dispatch('fetchHealthcareList');
      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na criação de um novo convênio!');
    }
  },
  async deleteHealthcare(state, payload) {
    try {
      const response = await deleteHealthcare(payload);

      await state.dispatch('fetchHealthcareList');

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro durante o processo de deletar o convênio!');
    }
  },
  async editHealthcareDescription(state, payload) {
    try {
      const response = await updateHealthcareDescription(payload);

      await state.dispatch('fetchHealthcareList');

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na atualização de descrição de um convênio!');
    }
  },
  async editHealthcareStatus(state, payload) {
    try {
      const response = await updateHealthcareStatus(payload);
      await state.dispatch('fetchHealthcareList');

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na atualização de status de um convênio!');
    }
  },
  async fetchClinicList(state) {
    try {
      //state.commit('setClinicListLoading', true);
      const response = await getAllClinics();
      console.log(response.data.result);
      state.commit('setClinicList', response.data.result);
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao carregar lista de clinicas!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.commit('setClinicList', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
    } finally {
      state.commit('setClinicListLoading', false);
    }
  },
  async deleteClinic(state, payload) {
    try {
      const response = await deleteClinic(payload);

      await state.dispatch('fetchClinicList');

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro durante o processo de deletar o convênio!');
    }
  },
  async createNewClinic(state, payload) {
    try {
      const response = await createClinic(payload);

      await state.dispatch('fetchClinicList');
      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na criação de uma nova clinica!');
    }
  },
  async editClinicFetch(state, payload) {
    try {
      const response = await updateClinic(payload);
      await state.dispatch('fetchClinicList');

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na atualização de status de um convênio!');
    }
  },
  startHealthcareAssociatedListLoading(state) {
    state.commit('setHealthcaresListAssociatedToHospitalLoading', true);
  },
  stopHealthcareAssociatedListLoading(state) {
    state.commit('setHealthcaresListAssociatedToHospitalLoading', false);
  },
  startActiveHealthcareListDisponibleForAssociationLoading(state) {
    state.commit(
      'setActiveHealthcareListDisponibleForAssociationLoading',
      true
    );
  },
  stopActiveHealthcareListDisponibleForAssociationLoading(state) {
    state.commit(
      'setActiveHealthcareListDisponibleForAssociationLoading',
      false
    );
  },
  async fetchActiveHealthcareListDisponibleForAssociation(state) {
    try {
      state.dispatch(
        'startActiveHealthcareListDisponibleForAssociationLoading'
      );

      const [
        listAllHealthcare,
        listHealthcareAssociatedToHospital,
      ] = await Promise.all([
        getAllHealthcare(),
        getAllHealthcareAssociatedToHospital(),
      ]);

      const activeHealthcareList = listAllHealthcare.data.result.filter(
        (h) => h.ativo === 'T'
      );

      const activeHealthcareListDisponibleForAssociation = activeHealthcareList.filter(
        (activeHealthcare) =>
          !listHealthcareAssociatedToHospital.data.result.find(
            (associatedHealthcare) =>
              activeHealthcare.idconvenio === associatedHealthcare.idconvenio
          )
      );

      state.commit(
        'setActiveHealthcareListDisponibleForAssociation',
        activeHealthcareListDisponibleForAssociation
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao carregar lista de convênios!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.commit('setActiveHealthcareListDisponibleForAssociation', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
    } finally {
      state.dispatch('stopActiveHealthcareListDisponibleForAssociationLoading');
    }
  },
  async fetchHealthcareListAssociatedToHospital(state) {
    try {
      state.dispatch('startHealthcareAssociatedListLoading');

      const response = await getAllHealthcareAssociatedToHospital();

      state.commit(
        'setHealthcaresListAssociatedToHospital',
        response.data.result
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao carregar lista de convênios!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.commit('setHealthcaresListAssociatedToHospital', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro na criação de um novo convênio!');
    } finally {
      state.dispatch('stopHealthcareAssociatedListLoading');
    }
  },
  async createNewHealthcareAssociationToHospital(state, payload) {
    try {
      const response = await createHealthcareAssociationToHospital(payload);

      await state.dispatch('fetchHealthcareListAssociatedToHospital');
      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na criação de um novo convênio!');
    }
  },
  async editHealthcareAssociationToHospital(state, payload) {
    try {
      const response = await updateStatusOfHealthcareAssociatedToHospital(
        payload
      );

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchHealthcareListAssociatedToHospital');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na atualização de status de um convênio!');
    }
  },
  async blockHealthcareAssociationToHospital(state, payload) {
    try {
      const response = await updateBlockHealthcareAssociatedToHospital(payload);
      await state.dispatch('fetchHealthcareListAssociatedToHospital');

      state.dispatch(
        'snackbar/blocked',
        { message: response.data.message.pt },
        { root: true }
      );
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error;
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );

      throw new Error('Erro na atualização de status de um convênio!');
    }
  },
  startPatientsListLoading(state) {
    state.commit('setPatientsListLoading', true);
  },
  stopPatientsListLoading(state) {
    state.commit('setPatientsListLoading', false);
  },
  async fetchPatientsList(state) {
    try {
      state.dispatch('startPatientsListLoading');
      const response = await getAllPatients();

      state.commit('setPatientsList', response.data.result);
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao carregar lista de pacientes!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.commit('setPatientsList', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro no carregamento da lista de pacientes!');
    } finally {
      state.dispatch('stopPatientsListLoading');
    }
  },
  async deletePatient(state, payload) {
    try {
      const response = await deletePatient(payload);

      state.dispatch(
        'snackbar/delete',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchPatientsList');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao excluir paciente!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro na exclusão de paciente!');
    }
  },
  async createNewPatient(state, payload) {
    try {
      const response = await createPatient(payload);

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchPatientsList');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao registrar paciente!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro ao registrar paciente!');
    }
  },
  async editPatient(state, payload) {
    try {
      const response = await updatePatient(payload);

      state.dispatch(
        'snackbar/success',
        { message: response.data.message.pt },
        { root: true }
      );

      await state.dispatch('fetchPatientsList');
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage = error + ', falha ao atualizar paciente!';
      } else {
        errorMessage = 'Falha na comunicação!';
      }

      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
      throw new Error('Erro ao atualizar paciente!');
    }
  },
  startCitiesListLoading(state) {
    state.commit('setCitiesListLoading', true);
  },
  stopCitiesListLoading(state) {
    state.commit('setCitiesListLoading', false);
  },
  async fetchCities(state) {
    try {
      state.dispatch('startCitiesListLoading');

      const response = await getAllCities();

      state.commit('setCitiesList', response.data.result);
    } catch (error) {
      // TODO: (refactor) CREATE CENTRAL ERROR HANDLER IN AXIOS TO SHOW SNACKBAR
      let errorMessage = null;
      if (error.response) {
        errorMessage = error.response.data.message.pt;
      } else if (error.request) {
        errorMessage =
          error + ', falha ao carregar lista de cidades/naturalidades!';
      } else {
        errorMessage = 'Falha ao carregar lista de cidades/naturalidades!';
      }

      state.commit('setCitiesList', []);
      state.dispatch(
        'snackbar/error',
        {
          message: errorMessage,
        },
        { root: true }
      );
    } finally {
      state.dispatch('stopCitiesListLoading');
    }
  },
};
