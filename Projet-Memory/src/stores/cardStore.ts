import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { db } from '@/database.ts';
import type { Card } from '@/types/Card';
import { v4 as uuidv4 } from 'uuid';
import type {Theme} from "@/types/Theme.ts";

export const useCardStore = defineStore('card', () => {
    const cards = ref<Card[]>([]);
    const isLoaded = ref(false);

    const loadCards = async () => {
        try {
            const storedCards = await db.cards.toArray();
            cards.value = storedCards;
        } catch (error) {
            console.error('Error loading cards:', error);
        }
        isLoaded.value = true;
    };

    const addCardOrUpdateIt = async (card: Card, fileFront?: File, fileBack?: File) => {
        if (!card.id) {
            card.id = uuidv4();
        }

        if (fileFront) {
            const blob = new Blob([await fileFront.arrayBuffer()], { type: fileFront.type });
            await db.files.put({ id: `${card.id}-front`, file: blob });
            card.multimediaFront = `${card.id}-front`;
        }
        if (fileBack) {
            const blob = new Blob([await fileBack.arrayBuffer()], { type: fileBack.type });
            await db.files.put({ id: `${card.id}-back`, file: blob });
            card.multimediaBack = `${card.id}-back`;
        }

        console.log("card", card);
        await db.cards.put(JSON.parse(JSON.stringify(card)));
        await loadCards();
    };

    const getFileById = async (fileId: string): Promise<Blob | null> => {
        const fileEntry = await db.files.get(fileId);
        return fileEntry ? new Blob([fileEntry.file], { type: fileEntry.file.type }) : null;
    };

    const deleteCardById = async (id: string) => {
        await db.cards.delete(id);
        await db.files.delete(`${id}-front`);
        await db.files.delete(`${id}-back`);
        await loadCards();
    };

    const getCardsByThemeId = (themeId: string) => {
        return cards.value.filter(card => card.themeId === themeId);
    }

    const getCardsByThemeList = (themeList: Theme[]) => {
        return cards.value.filter(card => themeList.find(theme => theme.id === card.themeId && card.level <= theme.levelToReview));
    }

    onMounted(loadCards);

    return {
        cards: computed(() => cards.value),
        isLoaded: computed(() => isLoaded.value),
        addCardOrUpdateIt,
        deleteCardById,
        getFileById,
        loadCards,
        getCardsByThemeId,
        getCardsByThemeList,
    };
});
