import type { Card } from '@/types/Card';

export const themeDataComposable = () => {
    type GroupedCards = Record<string, Record<string, Card[]>>;

    const groupCardsByDateAndTheme = (cards: Card[]): GroupedCards => {
        const result: GroupedCards = {};

        cards.forEach(card => {
            if (!card.nextReviewAt) return;

            const reviewDate = card.nextReviewAt.slice(0, 10); // YYYY-MM-DD
            const themeId = card.themeId;

            if (!result[reviewDate]) {
                result[reviewDate] = {};
            }

            if (!result[reviewDate][themeId]) {
                result[reviewDate][themeId] = [];
            }

            result[reviewDate][themeId].push(card);
        });

        return result;
    }

    return {
        groupCardsByDateAndTheme,
    }
}