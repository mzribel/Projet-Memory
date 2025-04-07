<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import ProgressTracker from './ProgressTracker.vue';
import RevisionCard from './RevisionCard.vue';
import { useCardStore } from "@/stores/cardStore.ts";
import { useThemeStore } from "@/stores/themeStore.ts";
import type {Card} from "@/types/Card.ts";
import {practiceComposable} from "@/composables/practice.composable.ts";
import type {Theme} from "@/types/Theme.ts";
const {
  getCardsToPractice,
  promoteCard,
  demoteCard,
  resetCardLevel
} = practiceComposable()


const cardStore = useCardStore();
const themeStore = useThemeStore();
const cardsToReview = ref<Card[]>([]);

const nextCard = async (memorized:boolean) => {
  if (!currentCard.value) { return }
  if (memorized) {
    await promoteCard(currentCard.value, 5);
  } else {
    await demoteCard(currentCard.value, 5);
  }
  cardsToReview.value = cardsToReview.value.filter((card) => card.id !== currentCard.value.id);
};
const currentIndex = ref(0);

const currentCard = computed(() => {
  return cardsToReview.value[0] ?? null;
});

onMounted(() => {
  const selectedThemes = themeStore.themes;
  selectedThemes.forEach((theme:Theme) => {
    const allCards = cardStore.getCardsByThemeId(theme.id);
    cardsToReview.value.push(...getCardsToPractice(allCards, theme.maxLevel, theme.newCardsPerDay ?? 5));
  })
});
</script>

<template>
  <div>
    <h1>Session de révision</h1>
    <RevisionCard
        v-if="cardsToReview.length > 0"
        :card="cardsToReview[currentIndex]"
        @memorized="nextCard(true)"
        @forgotten="nextCard(false)"
        @next=""
    />
    <p v-else>Aucune carte à réviser aujourd'hui !</p>
  </div>
</template>

<style scoped>
</style>
