export function notificationComposable() {
    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            console.error('Notifications non supportées par ce navigateur.')
            return false
        }

        const permission = await Notification.requestPermission()
        return permission === 'granted'
    }

    const notifyUser = async () => {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
            console.log('Permission refusée')
            return
        }

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SHOW_NOTIFICATION',
                payload: {
                    title: 'Memory App',
                    body:
                        `La révision du jour est disponible !` +
                        `\nVous avez ${"mes couilles en ski"} cartes à réviser aujourd'hui.` + // TODO : mettre le nombre de cartes à reviser
                        `\nCliquez sur cette notification pour commencer !`,
                    icon: '/public/marianne_pray.webp',

                }
            }).onclick = () => {
                console.log('Notification clicked');
                window.location.href = '/practice';
            }
        } else {
            console.warn('Service Worker non actif.')
        }
    }

    const generatePracticeMessage = (count:number) => {
        return count ?
            `Vous avez ${count} carte${count > 1 ? 's' : ''} à réviser aujourd'hui !` :
            `Tout est bon ! Aucune carte à réviser aujourd'hui !`
    }

    return {
        requestNotificationPermission,
        notifyUser,
        generatePracticeMessage
        notifyUser
    }
}
