import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RegisterACoach from './pages/coaches/RegisterACoach.vue';
import ReceivedRequests from './pages/requests/ReceivedRequests.vue';
import NotFound from './pages/NotFound.vue';

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
      children: [
        { path: 'contact', component: ContactCoach }, // coaches/:id/contact
      ],
    },
    {
      path: '/register',
      component: RegisterACoach,
    },
    {
      path: '/requests',
      component: ReceivedRequests,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default router;
