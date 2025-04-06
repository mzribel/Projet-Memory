import { defineStore } from 'pinia';
import {computed, onMounted, ref} from 'vue';
import { db } from '@/database';
import type { Category } from '@/types/Category';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([]);
    const isLoaded = ref(false);

    const loadCategories = async () => {
        try {
            const storedCategories = await db.categories.toArray();
            categories.value = storedCategories.map(category => JSON.parse(JSON.stringify(category)));
        } catch (error) {
            console.error('Error loading categories:', error);
        }
        isLoaded.value = true;
    };

    const addCategoryOrUpdateIt = async (category: Category) => {
        if (!category.id) {
            category.id = uuidv4();
        }
        await db.categories.put(JSON.parse(JSON.stringify(category)));
        await loadCategories();
    };

    const getCategoryById = async (id: string) => {
        return db.categories.get(id);
    }

    const deleteCategoryById = async (id: string) => {
        await db.categories.delete(id);
        await loadCategories();
    };

    return {
        categories : categories,
        isLoaded : isLoaded,
        addCategory: addCategoryOrUpdateIt,
        deleteCategoryById,
        loadCategories,
        getCategoryById
    };
});