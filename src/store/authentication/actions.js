import { validateRecaptcha } from '@/services/api/recaptcha.js';
import {
  createUserPreRegister,
  sendRecoverPasswordEmail,
} from '@/services/api/user.js';
import { checkPersonRegisterExistsByCpf } from '@/services/api/person';
import { getAllHospitals } from '@/services/api/companies';
import { getAllProfessionalCouncils } from '@/services/api/professionalCouncils';
import { getAllOccupations } from '@/services/api/occupations';

import router from '@/router';
import authentication from '@/services/api/authentication';

export const actions = {
  setSelectedHospital(state, payload) {
    state.commit('setSelectedHospital', payload);
  },
  setHospitelUser(state, payload) {
    state.commit('setHospitelUser', payload);
  },
  setUser(state, payload) {
    state.commit('setUser', payload);
  },
  setMenu(state, payload) {
    state.commit('setMenu', payload);
  },
  setMode(state, payload) {
    state.commit('setMode', payload);
  },
  async handleLogin(state, payload) {
    try {
      state.commit('LOGIN_PENDING');

      const response = await authentication.loginUser(payload);

      state.commit('LOGIN_SUCCESS');

      state.dispatch(
        'snackbar/success',
        {
          message: response.data.message.pt,
        },
        { root: true }
      );

      localStorage.setItem('token_blood', response.data.result.token);
      state.dispatch('setHospitelUser', response.data.result.companyAccess);
      router.push({ name: 'chooseUnidade' });
    } catch (error) {
      state.commit('LOGIN_ERROR', error);
    }
  },
  handleLogOut() {
    localStorage.setItem('token_blood', null);
    localStorage.setItem('perfil', null);
    router.push({ name: 'login' });
  },
  async fetchRecaptchaValidation(state, payload) {
    try {
      await validateRecaptcha(payload.token);
    } catch (error) {
      state.dispatch(
        'snackbar/warning',
        {
          message: 'Falha ao validar recaptcha, tente novamente.',
        },
        {
          root: true,
        }
      );

      throw new Error('Falha ao validar recaptcha, tente novamente.');
    }
  },
  async requestPasswordRecovery(state, payload) {
    try {
      await sendRecoverPasswordEmail(payload.email);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Verifique suas informa????es',
          message: 'Enviamos para voc?? um e-mail para redefinir a sua senha.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisi????o!',
          message: 'Favor contatar o suporte',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchPersonRegister(state, cpf) {
    try {
      const userExists = await checkPersonRegisterExistsByCpf(cpf);

      if (userExists) {
        state.dispatch(
          'modal/showModal',
          {
            title: 'A conta de usu??rio j?? existe',
            message:
              'Detectamos que uma conta j?? est?? cadastrada com o CPF informado.',
            buttonText: 'VOLTAR PARA LOGIN',
          },
          {
            root: true,
          }
        );
      } else {
        state.commit('setCpfPreRegistration', cpf);
        await state.dispatch('loadUserPreRegistrationForm');
      }
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisi????o!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async loadUserPreRegistrationForm(state) {
    await state.dispatch('fetchListFields');
    state.dispatch('authentication/setMode', 5, { root: true });
  },
  async fetchListFields(state) {
    try {
      const [hospitals, professionalCouncils, occupations] = await Promise.all([
        getAllHospitals(),
        getAllProfessionalCouncils(),
        getAllOccupations(),
      ]);

      state.commit('setHospitals', hospitals.data.result);
      state.commit('setProfessionalCouncils', professionalCouncils.data.result);
      state.commit('setOccupations', occupations.data.result);
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisi????o!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async preRegisterNewUser(state, user) {
    try {
      await createUserPreRegister(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro realizado',
          message:
            'Seus dados foram submetidos e agora est?? pendente de aprova????o pela gest??o do hospital. \nAguarde e-mail de confirma????o para ter acesso ao sistema.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
      state.commit('resetPreRegistration');
    } catch (error) {
      throw new Error('Falha ao submeter dados!', error);
    }
  },
};
