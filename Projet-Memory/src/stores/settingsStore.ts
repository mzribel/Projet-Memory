import {defineStore} from "pinia";
import {ref} from "vue";
import type {Category} from "@/types/Category.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import type {Settings} from "@/types/Settings.ts";
import {db} from "@/database.ts";
import type {Card} from "@/types/Card.ts";
import {v4 as uuidv4} from "uuid";
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
            console.error('Error loading settings:', error);
        }
        isLoaded.value = true;
    }

    const initialiseSettings = async () => {
        let settings:Settings = {
            id: '1',
            displayName: '',
            useDailyNotification: false,
            profilePicture: ''
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
            profilePicture: settings.profilePicture
        });
        await loadSettings();
    }

    return {
        settings,
        loadSettings,
        updateSettings
    }
})