import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import localforage from 'localforage';
import App from './App.vue';
import router from './router';

localforage.config({
    name: 'memoryApp',
    storeName: 'pinia_store',
});

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');


// registerSW({ immediate: true });