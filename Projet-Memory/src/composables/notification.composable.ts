import {practiceComposable} from "@/composables/practice.composable.ts";
import marianneIcon from '@/assets/img/mariannepray.png'
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

        const cardCount = practiceComposable().getCardCountToPracticeToday();
        const message = generatePracticeMessage(cardCount)

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SHOW_NOTIFICATION',
                payload: {
                    title: 'Memory App',
                    body: message,
                    icon: marianneIcon,
                }
            })
        }
    }

    const generatePracticeMessage = (count:number) => {
        return count ?
            `La révision du jour est disponible !` +
            `\nVous avez ${count} cartes à réviser aujourd'hui.` +
            `\nCliquez sur cette notification pour commencer !`
            :
            `Tout est bon ! Aucune carte à réviser aujourd'hui !`
    }

    return {
        requestNotificationPermission,
        notifyUser,
        generatePracticeMessage
    }
}