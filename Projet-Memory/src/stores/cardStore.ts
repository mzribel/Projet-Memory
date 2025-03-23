import { defineStore } from 'pinia';
import {onMounted, ref, computed} from 'vue';
import { db } from '@/database.ts';
import type { Card } from '@/types/Card';
import { v4 as uuidv4 } from 'uuid';

export const useCardStore = defineStore('card', () => {
    const cards = ref<Card[]>([]);
    const isLoaded = ref(false);

    const loadCards = async () => {
        try {
            const storedCards = await db.cards.toArray();
            cards.value = storedCards.map(card => JSON.parse(JSON.stringify(card)));
        } catch (error) {
            console.error('Error loading cards:', error);
        }
        isLoaded.value = true;

    }

    const addCardOrUpdateIt = async (card: Card) => {
        if (!card.id) {
            card.id = uuidv4();
        }
        await db.cards.put(JSON.parse(JSON.stringify(card)));
        await loadCards();
    }

    const getCardsById = async (id: string) => {
        return await db.cards.get(id);
    }

    const getCardsByThemeId = async (id: string) => {
        return await db.cards.where('themeId').equals(id).toArray();
    }


    const deleteCardById = async (id: string) => {
        await db.cards.delete(id);
        await loadCards();
    }

    const deleteCardByThemeId = async (id: string) => {
        await db.cards.where('themeId').equals(id).delete();
        await loadCards();
    }

onMounted(loadCards);

    return {
        cards : computed(() => cards.value),
        isLoaded : computed(() => isLoaded.value),
        addCard: addCardOrUpdateIt,
        deleteCardById,
        deleteCardByThemeId,
        loadCards,
        getCardsById,
        getCardsByThemeId
    }
}
);