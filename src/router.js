import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/authentication/Login.vue'
        ),
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/chooseUnidade',
      name: 'chooseUnidade',
      component: () =>
        import(
          /* webpackChunkName: "chooseUnidade" */ '@/views/authentication/ChooseUnidade.vue'
        ),
    },
    {
      path: '/pendingUsers',
      name: 'Usuários',
      component: () =>
        import(
          /* webpackChunkName: "pendingUsers" */ '@/views/administrator/acceptusers/PendingUsers.vue'
        ),
    },
    {
      path: '/healthcare',
      name: 'Convênios',
      component: () =>
        import(
          /* webpackChunkName: "healthcare" */ '@/views/administrator/healthcare/Healthcare.vue'
        ),
    },
    {
      path: '/healthcareAssociate',
      name: 'Convênios associados',
      component: () =>
        import(
          /* webpackChunkName: "healthcareAssociate" */ '@/views/administrator/healthcare/HealthcareAssociate.vue'
        ),
    },
    {
      path: '/clinic',
      name: 'Clinicas',
      component: () =>
        import(
          /* webpackChunkName: "clinic" */ '@/views/administrator/clinic/Clinic.vue'
        ),
    },
    {
      path: '/patients',
      name: 'Pacientes',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/patients/Patients.vue'
        ),
    },

    {
      path: '/pretransfusion-requests',
      name: 'Solicitações',
      component: () =>
        import(
          /* webpackChunkName: "pretransfusion" */ '@/views/pretransfusion/PreTransfusion.vue'
        ),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
