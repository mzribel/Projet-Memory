import './assets/main.scss';
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

navigator.serviceWorker.register('/sw.js', { type: 'module' })
    .then(registration => {
        registration.onupdatefound = () => {
            const newWorker = registration.installing
            if (newWorker) {
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('Service Worker mis à jour.')
                        } else {
                            console.log('Service Worker installé pour la première fois.')
                        }
                    }
                }
            }
        }
    }).catch(error => {
        console.error('Erreur lors de l\'enregistrement du Service Worker : ', error)
    })