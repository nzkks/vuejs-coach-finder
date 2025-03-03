import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import BaseBadge from './components/ui/BaseBadge.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

// lazy loading when required/used
const BaseDialog = defineAsyncComponent(() =>
  import('./components/ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
