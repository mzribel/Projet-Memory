import {defineStore} from 'pinia';
import { ref} from 'vue';
import type {Theme} from '@/types/Theme';
import {db} from "@/database.ts";
import {v4 as uuidv4} from 'uuid';

export const useThemeStore = defineStore('theme', () => {
    const themes = ref<Theme[]>([]);
    const isLoaded = ref(false);

    const loadThemes = async () => {
        try {
            themes.value = await db.themes.toArray();
        } catch (error) {
            console.error('Erreur lors du chargement des thèmes : ', error);
        }
        isLoaded.value = true;
    }

    const addThemeOrUpdateIt = async (theme: Theme) => {
        if (!theme.id) {
            theme.id = uuidv4();
            theme.createdAt = new Date().toISOString();
        }
        theme.lastActivityAt = new Date().toISOString();
        await db.themes.put({ ...theme });
        await loadThemes();
    }

    const deleteThemeById = async (id: string) => {
        // Cascade
        await db.cards.where('themeId').equals(id).delete();
        // Suppression du thème
        await db.themes.delete(id);
        await loadThemes();
    }

    const deleteThemeByCategoryId = async (id : string) => {
        // Récupération de tous les ID des thèmes à supprimer
        const themeIds = (await db.themes.where('categoryId').equals(id)
            .toArray())
            .map(theme => theme.id)
        // Cascade : suppression des cartes liées
        await db.cards.where('themeId').anyOf(themeIds).delete();

        // Suppression des thèmes
        await db.themes.where('categoryId').equals(id).delete();
        await loadThemes();
    }

    const getThemeById = (id: string) => {
        return themes.value.find((theme) => theme.id === id);
    }

    const getThemesByCategoryId = (id: string) => {
        return themes.value.filter((theme) => theme.categoryId === id);
    }

    const setThemeSelected = async (id: string) => {
        const theme = await db.themes.get(id);
        if (theme) {
            theme.isThemeSelected = true;
            theme.lastActivityAt = new Date().toISOString();
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const setThemeUnselected = async (id: string) => {
        const theme = await db.themes.get(id);
        if (theme) {
            theme.isThemeSelected = false;
            theme.lastActivityAt = new Date().toISOString();
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const setLatestActivity = async (id: string) => {
        const theme = await db.themes.get(id);
        if (theme) {
            theme.lastActivityAt = new Date().toISOString();
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const getSelectedThemes = () => {
        return themes.value.filter(theme => theme.isThemeSelected);
    }

    return {
        themes,
        isLoaded,
        addThemeOrUpdateIt,
        loadThemes,
        deleteThemeById,
        deleteThemeByCategoryId,
        getThemeById,
        getThemesByCategoryId,
        setThemeSelected,
        getSelectedThemes,
        setThemeUnselected,
        setLatestActivity
    };
});
