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
import Block from "@/components/block/Block.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";
import TitleBlock from "@/components/block/TitleBlock.vue";

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
    slideDirection.value = "right";
  } else {
    await demoteCard(currentCard.value, 5);
    slideDirection.value = "left";
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

const slideDirection = ref<"right"|"left">("left");
const transitionName = computed(()=> {
  return 'card-slide-'+slideDirection.value;
})


const nextCardTransition = () => {
    currentIndex.value++;
    cardVisible.value = true; // Affiche la carte suivante
}

</script>

<template>
  <div>
    <TitleBlock>
      <template #title-left><h1>Révisions du jour</h1></template>
    </TitleBlock>
    <template v-if="cardsToReview && currentCard">
      <div class="practice-form">
        <Transition :name="transitionName" @after-leave="nextCardTransition">
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
.card-slide-right-enter-active,
.card-slide-left-enter-active{
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.card-slide-right-enter,
.card-slide-left-enter {
  opacity: 0;
  transform: translateY(50px); /* Carte qui vient de 50px en bas */
}

.card-slide-left-enter-to,
.card-slide-right-enter-to{
  opacity: 1;
  transform: translateY(0); /* Carte arrive à sa position d'origine */
}

/* Animation de sortie (slide vers la droite et out) */
.card-slide-right-leave-active,
.card-slide-left-leave-active{
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.card-slide-right-leave-to,
.card-slide-left-leave-to {
  opacity: 0;
}

.card-slide-left-leave-to {
  transform: translateX(-100px); /* Carte glisse vers la gauche */
}
.card-slide-right-leave-to {
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
