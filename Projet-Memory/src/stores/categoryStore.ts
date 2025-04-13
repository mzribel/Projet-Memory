import { defineStore } from 'pinia';
import { ref} from 'vue';
import { db } from '@/database';
import type { Category } from '@/types/Category';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import {useThemeStore} from "@/stores/themeStore.ts";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([]);
    const isLoaded = ref(false);

    const themeStore = useThemeStore()

    const loadCategories = async () => {
        try {
            categories.value = await db.categories.toArray();
        } catch (error) {
            console.error('Erreur lors du chargement des catégories : ', error);
        }
        isLoaded.value = true;
    };

    const addCategoryOrUpdateIt = async (category: Category) => {
        if (!category.id) {
            category.id = uuidv4();
        }
        await db.categories.put({ ...category });
        await loadCategories();
    };

    const getCategoryById = async (id: string) => {
        return db.categories.get(id);
    }

    const deleteCategoryById = async (id: string) => {
        // Cascade
        // TODO : modale de confirmation permettant de transvaser les
        // TODO : thèmes de la catégorie vers une autre catégorie
        themeStore.getThemesByCategoryId(id).forEach((theme) => {
            themeStore.deleteThemeById(theme.id);
        })

        await db.categories.delete(id);
        await loadCategories();
    };

    return {
        categories,
        isLoaded,
        addCategory: addCategoryOrUpdateIt,
        deleteCategoryById,
        loadCategories,
        getCategoryById
    };
});