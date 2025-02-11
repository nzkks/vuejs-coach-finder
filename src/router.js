import { createRouter, createWebHistory } from 'vue-router';

const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RegisterAsCoach = () => import('./pages/coaches/RegisterAsCoach.vue');
const ReceivedRequests = () => import('./pages/requests/ReceivedRequests.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');
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
      meta: { requiresUnauth: true },
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
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next(true);
  }
});

export default router;
