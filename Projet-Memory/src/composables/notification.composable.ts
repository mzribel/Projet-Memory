import {practiceComposable} from "@/composables/practice.composable.ts";
import marianneIcon from '@/assets/img/mariannepray.png'
import {useSettingsStore} from "@/stores/settingsStore.ts";
import {computed} from "vue";
export function notificationComposable() {

    const settingsStore = useSettingsStore();
    const settings = computed(() => settingsStore.settings)

    const isNotificationSendable = () => {
        if (!settings.value) {
            console.error('Settings non chargées')
            return false
        }
        if (settings.value?.useDailyNotification === false) {
            console.log('Notifications actuellement désactivées')
            return false
        }

        const lastNotificationDate = settings.value.lastNotificationDate
        const today = new Date().toISOString().split('T')[0]

        if (lastNotificationDate === today) {
            console.log('Notification déjà envoyée aujourd\'hui')
            return false
        }

        return true
    }

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

        await settingsStore.setLastNotificationDate(new Date().toISOString().split('T')[0])

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
        generatePracticeMessage,
        isNotificationSendable
    }
}