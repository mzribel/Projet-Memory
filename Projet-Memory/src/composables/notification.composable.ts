export const notificationComposable = () => {
    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            console.log('Notification permission:', permission);
        }
    };

    const notifyUser = () => {
        if ('Notification' in window && Notification.permission === 'granted') {
            console.log("wtf")
            new Notification('Mes couilles en ski', {
                body: `HELLO`
            });
        }
    };

    return {
        requestNotificationPermission,
        notifyUser,
    }
}