import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import './assets/css/index.css';

import axiosPlugin from '@/plugins/axios';
import App from './App.vue';
import router from './router/index';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(axiosPlugin);

app.mount('#app');
