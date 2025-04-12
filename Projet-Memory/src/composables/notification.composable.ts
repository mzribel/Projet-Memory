export const notificationComposable = () => {
    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            console.log('Notification permission:', permission);
        }
    };

    const notifyUser = (message:string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Mes couilles en ski', {
                body: message
            });
        }
    };

    const generatePracticeMessage = (count:number) => {
        return count ?
            `Vous avez ${count} carte${count > 1 ? 's' : ''} à réviser aujourd'hui !` :
            `Tout est bon ! Aucune carte à réviser aujourd'hui !`
    }

    return {
        requestNotificationPermission,
        notifyUser,
        generatePracticeMessage
    }
}