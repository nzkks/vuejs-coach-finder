import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RegisterAsCoach from './pages/coaches/RegisterAsCoach.vue';
import ReceivedRequests from './pages/requests/ReceivedRequests.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // coaches/:id/contact
      ],
    },
    {
      path: '/register',
      component: RegisterAsCoach,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: ReceivedRequests,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else {
    next(true);
  }
});

export default router;
