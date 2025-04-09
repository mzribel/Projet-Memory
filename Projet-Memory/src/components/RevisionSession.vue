<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import ProgressTracker from './ProgressTracker.vue';
import RevisionCard from './RevisionCard.vue';
import { useCardStore } from "@/stores/cardStore.ts";
import { useThemeStore } from "@/stores/themeStore.ts";
import type {Card as CardType} from "@/types/Card.ts";
import {practiceComposable} from "@/composables/practice.composable.ts";
import type {Theme} from "@/types/Theme.ts";
import Card from "@/components/card/Card.vue";
import Button from "@/components/buttons/Button.vue";
import {themeDataComposable} from "@/composables/themedata.composable.ts";

const {
  getCardsToPractice,
  promoteCard,
  demoteCard,
  resetCardLevel
} = practiceComposable()

const cardStore = useCardStore();
const themeStore = useThemeStore();
const { groupCardsByDateAndTheme } = themeDataComposable();
const groupedCards = computed(() => {
  return groupCardsByDateAndTheme(cardStore.cards);
})
const cardsToReview = ref<CardType[]>([]);

const cardVisible = ref(true);
const nextCard = async (memorized:boolean) => {
  if (!currentCard.value) { return }
  if (memorized) {
    await promoteCard(currentCard.value, 5);
  } else {
    await demoteCard(currentCard.value, 5);
  }
  cardVisible.value = false;
};

const currentIndex = ref(0);

const currentCard = computed(() => {
  return cardsToReview.value[currentIndex.value] ?? null;
});

onMounted(() => {
  const selectedThemes = themeStore.themes;
  selectedThemes.forEach((theme:Theme) => {
    const allCards = cardStore.getCardsByThemeId(theme.id);
    cardsToReview.value.push(...getCardsToPractice(allCards, theme.maxLevel, theme.newCardsPerDay ?? 5));
  })
});

const isCardFlipped = ref(false);

const nextCardTransition = () => {
    currentIndex.value++;
    cardVisible.value = true; // Affiche la carte suivante
}

</script>

<template>
  <div>
    <h1>Session de révision</h1>
    <template v-if="cardsToReview && currentCard">
      <div class="practice-form">
        <Transition name="card-slide" @after-leave="nextCardTransition">
          <Card v-if="cardVisible" :key="currentCard.id" :card-data="currentCard"/>
        </Transition>
        <div class="btn-container">
          <Button @click="nextCard(true)" variant="filled" color="secondary" label="Appris 🤌"></Button>
          <Button @click="nextCard(false)" variant="outlined" color="secondary" label="Pas appris 😩"></Button>
        </div>
      </div>
    </template>

    <div v-else>
      <div>Aucune carte à réviser aujourd'hui !</div>
      <div>
        <h2>Prochaines révisions :</h2>
        <div v-for="(cards, date) in groupedCards" :key="date">
          <h3>{{ date }}</h3>
          <div v-for="(cardList, themeId) in cards" :key="themeId">
            <h4>Thème : {{ themeStore.getThemeById(themeId)?.name ?? "" }}</h4>
            <p>{{ cardList.length }} carte{{ cardList.length > 1 ? "s" : ""}} à réviser</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Transition pour la carte */
.card-slide-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.card-slide-enter {
  opacity: 0;
  transform: translateY(50px); /* Carte qui vient de 50px en bas */
}

.card-slide-enter-to {
  opacity: 1;
  transform: translateY(0); /* Carte arrive à sa position d'origine */
}

/* Animation de sortie (slide vers la droite et out) */
.card-slide-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.card-slide-leave-to {
  opacity: 0;
  transform: translateX(100px); /* Carte glisse vers la droite */
}

.practice-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.btn-container {
  display: flex;
  gap: 8px;
  z-index: 1;
}
</style>
