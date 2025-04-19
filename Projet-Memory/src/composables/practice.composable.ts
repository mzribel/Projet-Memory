import type {Card} from "@/types/Card.ts";
import arrayShuffle from "array-shuffle";
import {computed} from "vue";
import {useCardStore} from "@/stores/cardStore.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import type {Theme} from "@/types/Theme.ts";

export const practiceComposable = () => {
    // Intervalles de révisions
    const reviewInterval = (n:number, initial:number=1, factor:number=2) => {
        return Math.round(initial*Math.pow(factor, n));
    }
    const generateReviewInterval = (count:number=7, initial:number=1, factor:number=2) => {
        return Array.from({ length: count}, (_, i) => reviewInterval(i, initial, factor));
    }


    const categoryStore = useCategoryStore();
    const themeStore = useThemeStore();
    const cardStore = useCardStore();


    const formatDateToLocalISO = (date: Date): string => {
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 10);
    };

    // Calcul de la nouvelle date de révision
    const getNextReviewDate = (level: number, factor:number=2) => {
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + reviewInterval(level-1, 1, factor));
        newDate.setHours(0, 0, 0, 0);
        return formatDateToLocalISO(newDate);
    };

    // Récupération des cartes
    const cardIsDue = (card:Card, maxLevel:number) => {
        const now = new Date();

        // Pas de niveau défini ou niveau maximum dépassé
        if (!card.currentLevel || card.currentLevel >= maxLevel) return false;

        // La carte est due si pas de date de review ou date de review passée
        if (!card.nextReviewAt) return;
        // Comparaison des dates
        return (!card.nextReviewAt || new Date(card.nextReviewAt) <= now);
    }

    const isCardFirstReviewToday = (card:Card) => {
        const today = formatDateToLocalISO(new Date())
        return card.currentLevel === 1 &&
            card.firstReviewedAt &&
            formatDateToLocalISO(new Date(card.firstReviewedAt)) == today;
    }

    const getNewCards = (cards:Card[]|null, newCardsPerDay?:number) => {
        if (cards == null) cards = cardStore.cards;
        // Récupère les cartes de niveau 1 révisées ajd
        if (newCardsPerDay) {
            const reviewedToday = cards.reduce((count, card) => {
                // Vérifie si la carte est de niveau 1 et révisée aujourd'hui
                return isCardFirstReviewToday(card) ? count + 1 : count;
            }, 0);

            if (reviewedToday >= newCardsPerDay) { return [] }
        }

        let newCards = cards.filter((card: Card) => !card.currentLevel)
        // Pas de limite, ou nombre de cartes sous la limite
        if (!newCardsPerDay || newCards.length <= newCardsPerDay) {
            return newCards;
        }

        // Shuffle les cartes et en retourne un nombre correspondant à la limite
        return arrayShuffle(newCards).slice(0, newCardsPerDay);
    }

    const getCardsToPractice = (cards:Card[], maxLevel:number, newCardsPerDay?:number) => {
        let cardsToPractice: Card[] = [];

        // Cartes dues aujourd'hui
        cardsToPractice = cards
            .filter((card: Card) => cardIsDue(card, maxLevel))
            .sort((a: Card, b: Card) => b.currentLevel - a.currentLevel);

        // Nouvelles cartes
        cardsToPractice.push(... getNewCards(cards, newCardsPerDay));
        return cardsToPractice;
    }

    const getCardsToPracticeTodayByTheme = (themes:Theme[]=themeStore.themes, cards:Card[]=cardStore.cards) => {
        let result:{themeId:string, cards:Card[], newCards:number}[] = [];

        themes.forEach(theme => {
            let themeCards = cards.filter((card: Card) => theme.id === card.themeId)
            let dueCards = themeCards
                .filter((card: Card) => cardIsDue(card, theme.maxLevel))
                .sort((a: Card, b: Card) => b.currentLevel - a.currentLevel);
            let newCardsCount = getNewCards(themeCards, theme.newCardsPerDay).length;

            result.push({themeId:theme.id, cards:dueCards, newCards:newCardsCount});
        })
        return result;
    }

    const getThemesToPracticeByPeriod = (themes:Theme[]=themeStore.themes, cards:Card[]=cardStore.cards, date:"past"|"today"|"future"|"all") => {
        let result:{themeId:string, cards:Card[], newCards:number}[] = [];

        themes.forEach(theme => {
            let themeCards = cards.filter((card: Card) => theme.id === card.themeId)
            let dueCards = themeCards
                .filter((card: Card) => {
                    if (!card.nextReviewAt) return false;
                    const reviewDate = new Date(card.nextReviewAt);
                    const now = new Date();
                    reviewDate.setHours(0, 0, 0, 0);
                    now.setHours(0, 0, 0, 0);
                    switch (date) {
                        case "past":
                            return cardIsDue(card, theme.maxLevel) && reviewDate < now;
                        case "today":
                            return cardIsDue(card, theme.maxLevel) && reviewDate == now;
                        case "future":
                            return reviewDate > now;
                        default:
                            return true;
                    }
                })
                .sort((a: Card, b: Card) => b.currentLevel - a.currentLevel);
            const count = getNewCards(null, theme.newCardsPerDay).length;
            let newCardsCount = date == "today" ? count : 0;

            if (dueCards.length || newCardsCount) result.push({themeId:theme.id, cards:dueCards, newCards:newCardsCount});
        })
        return result;
    }
    // Actions sur les cartes
    const reviewCard = async (card:Card, maxLevel:number, direction:1|-1=1) => {
        let cardStore = useCardStore();

        const now = new Date();

        card.lastReviewedAt = now.toISOString();
        if (!card.firstReviewedAt) card.firstReviewedAt = now.toISOString();

        card.currentLevel = direction > 0 ?
            Math.min((card.currentLevel ?? 0)+direction, maxLevel) :
            Math.max((card.currentLevel ?? 0)+direction, 1)

        // On a atteint le niveau maximum
        if (card.currentLevel >= maxLevel) {
            card.nextReviewAt = undefined;
            return;
        }

        // Calcul de la prochaine date
        card.nextReviewAt = getNextReviewDate(card.currentLevel) // Sauvegarde
        await cardStore.addCardOrUpdateIt(card);
    }
    const promoteCard = (card:Card, maxLevel:number) => {
        return reviewCard(card, maxLevel, 1)
    }
    const demoteCard = (card:Card, maxLevel:number) => {
        return reviewCard(card, maxLevel, -1)
    }
    const resetCardLevel = async (card:Card) => {
        let cardStore = useCardStore();

        card.currentLevel = 0;
        card.nextReviewAt = undefined;
        card.lastReviewedAt = undefined;
        card.firstReviewedAt = undefined;
        await cardStore.addCardOrUpdateIt(card);
    }

    const getCardCountToPracticeToday = () => {
        return getCardsToPracticeTodayByTheme()
            .reduce((acc, theme) => acc + theme.cards.length + theme.newCards, 0)
    }

    return {
        reviewInterval,
        generateReviewInterval,
        getCardsToPractice,
        promoteCard,
        demoteCard,
        resetCardLevel,
        getCardsToPracticeTodayByTheme,
        getCardCountToPracticeToday,
        getThemesToPracticeByPeriod,
        formatDateToLocalISO
    }
}