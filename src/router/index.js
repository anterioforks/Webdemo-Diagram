import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/edit-page/Main';
import Start from '@/components/start-page/Start';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/edit',
      name: 'Main',
      component: Main,
      props: true,
    },
    {
      path: '*',
      name: 'Start',
      component: Start,
    },
  ],
});
