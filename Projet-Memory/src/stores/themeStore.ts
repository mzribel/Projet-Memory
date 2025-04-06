import { defineStore } from 'pinia';
import {computed, onMounted, ref} from 'vue';
import type { Theme } from '@/types/Theme';
import {db} from "@/database.ts";
import { v4 as uuidv4 } from 'uuid';

export const useThemeStore = defineStore('theme', () => {
    const themes = ref<Theme[]>([]);
    const isLoaded = ref(false);

    const loadThemes = async () => {
        try {
            const storedThemes = await db.themes.toArray();
            themes.value = storedThemes.map(theme => JSON.parse(JSON.stringify(theme)));
        } catch (error) {
            console.error('Error loading themes:', error);
        }
        isLoaded.value = true;
    }

    const addThemeOrUpdateIt = async (theme: Theme) => {
        if (!theme.id) {
            theme.id = uuidv4();
            theme.createdAt = new Date().toISOString();
        }
        await db.themes.put(JSON.parse(JSON.stringify(theme)));
        await loadThemes();
    }

    const deleteThemeById = async (id: string) => {
        await db.themes.delete(id);
        await loadThemes();
    }

    const deleteThemeByCategoryId = async (id : string) => {
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
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const setThemeUnselected = async (id: string) => {
        const theme = await db.themes.get(id);
        if (theme) {
            theme.isThemeSelected = false;
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const setThemeCardCount = async (id: string, cardCount: number) => {
        const theme = await db.themes.get(id);
        if (theme) {
            theme.cardCount = cardCount;
            await db.themes.put(theme);
            await loadThemes();
        }
    }

    const getSelectedThemes = () => {
        return themes.value.filter(theme => theme.isThemeSelected);
    }

    return {
        themes : computed(() => themes.value),
        isLoaded : computed(() => isLoaded.value),
        addThemeOrUpdateIt,
        deleteThemeById,
        deleteThemeByCategoryId,
        loadThemes,
        getThemeById,
        getThemesByCategoryId,
        setThemeSelected,
        setThemeUnselected,
        setThemeCardCount,
        getSelectedThemes
    };
});
