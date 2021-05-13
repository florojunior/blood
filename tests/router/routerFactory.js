import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const createRouter = (initialRoutes = []) => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...initialRoutes],
  });
};

export { createRouter };
