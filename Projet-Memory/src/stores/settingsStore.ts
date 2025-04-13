import {defineStore} from "pinia";
import {ref} from "vue";
import type {Settings} from "@/types/Settings.ts";
import {db} from "@/database.ts";
import {useFileStore} from "@/stores/fileStore.ts";

export const useSettingsStore = defineStore('settings', () => {
    const fileStore = useFileStore();

    const settings = ref<Settings>();
    const isLoaded = ref(false);
    const loadSettings = async () => {
        if (!fileStore.isLoaded) {
            await fileStore.loadFiles();
        }

        try {
            settings.value = (await db.settings.toArray())[0];
            if (!settings.value) await initialiseSettings()
        } catch (error) {
            console.error('Erreur lors du chargement des paramètres : ', error);
        }
        isLoaded.value = true;
    }

    const initialiseSettings = async () => {
        let settings:Settings = {
            id: '1',
            displayName: '',
            useDailyNotification: true,
            profilePicture: '',
            lastNotificationDate: ""
        };
        await db.settings.put(settings);
        await loadSettings();
    }

    const updateSettings = async (settings: Settings, file?: File) => {
        if (file) {
            await fileStore.addFile("profile-picture", file)
            settings.profilePicture = 'profile-picture';
        }
        await db.settings.put({
            id: "1",
            displayName: settings.displayName,
            useDailyNotification: settings.useDailyNotification,
            profilePicture: settings.profilePicture,
            lastNotificationDate: settings.lastNotificationDate
        });
        await loadSettings();
    }

    const setLastNotificationDate = async (date: string) => {
        if (!settings.value) {
            console.error('Settings non chargées')
            return
        }
        settings.value.lastNotificationDate = date;
        await db.settings.put({
            id: "1",
            displayName: settings.value.displayName,
            useDailyNotification: settings.value.useDailyNotification,
            profilePicture: settings.value.profilePicture,
            lastNotificationDate: date
        });
    }

    return {
        settings,
        loadSettings,
        updateSettings,
        setLastNotificationDate,
    }
})