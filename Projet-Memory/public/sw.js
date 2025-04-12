// @ts-nocheck
import {precacheAndRoute} from "workbox-precaching";

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, icon } = event.data.payload;

        self.registration.showNotification(title, {
            body,
            icon
        });
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

precacheAndRoute(self.__WB_MANIFEST);