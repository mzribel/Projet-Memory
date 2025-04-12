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
import Section from "@/components/block/Section.vue";
import ThemeItem from "@/components/items/ThemeItem.vue";
import Note from "@/components/block/Note.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";

const {
  getCardsToPractice,
  promoteCard,
  demoteCard,
  resetCardLevel,
  getThemesToPracticeByPeriod
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

const isPracticing = ref(false);
const togglePractice = () => {
  isPracticing.value = !isPracticing.value;
}

const todayThemes = computed(() => {
  console.log(getThemesToPracticeByPeriod(themeStore.themes, cardStore.cards, "today"))
  return getThemesToPracticeByPeriod(themeStore.themes, cardStore.cards, "today");
})
const pastThemes = computed(() => {
  return getThemesToPracticeByPeriod(themeStore.themes, cardStore.cards, "past");
})
const futureThemes = computed(() => {
  return getThemesToPracticeByPeriod(themeStore.themes, cardStore.cards, "future");
})

const countCardsByLevel = (cards: CardType[]) => {
  return cards.reduce((acc, card) => {
    // Increment the count for the current level
    acc[card.currentLevel] = (acc[card.currentLevel] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
};

const groupByDate = (themes:{themeId: string, cards: CardType[], newCards: number}[]) => {
  const result:{date:string, themes:{themeId: string, cards: CardType[]}[]}[] = [];

  for (let theme of themes) {
    for (let card of theme.cards) {
      if (!card.nextReviewAt) return;
      let group = result.find(element => element.date == card.nextReviewAt);
      if (!group) {
        result.push({
          date:card.nextReviewAt,
          themes: [{
            themeId:theme.themeId,
            cards: [card],
          }]
        })
      } else {
        let groupTheme = group.themes.find(groupTheme => groupTheme.themeId == card.themeId);
        if (!groupTheme) {
          group.themes.push({
            themeId:theme.themeId,
            cards: [card],
          })
        } else {
          groupTheme.cards.push(card);
        }
      }

    }
  }
  return result;
}
</script>

<template>
  <div>
    <TitleBlock :align-center-title="true">
      <template #title-left><h1>Révisions du jour</h1></template>
      <template #title-right v-if="cardsToReview">
        <Button
          :icon="isPracticing ? 'fa-solid fa-stop' : 'fa-solid fa-play'"
          :label="isPracticing ? 'Arrêter la session' : 'Commencer la session'"
          variant="filled" color="secondary"
          @click="togglePractice"></Button>
      </template>
    </TitleBlock>

    <template v-if="isPracticing">
      <div class="practice-ctn" v-if="cardsToReview && currentCard">
        <div class="practice-form">
          <Transition :name="transitionName" @after-leave="nextCardTransition">
            <Card v-if="cardVisible" :key="currentCard.id" :card-data="currentCard"/>
          </Transition>
          <div class="btn-container">
            <Button @click="nextCard(false)" variant="outlined" color="secondary" label="Pas appris 😩"></Button>
            <Button @click="nextCard(true)" variant="filled" color="secondary" label="Appris 🤌"></Button>
          </div>
        </div>
      </div>
      <div v-else class="no-content padding"> Rien à réviser !</div>
    </template>

    <div v-else class="flex column row-gap-16">
      <Section class="flex column row-gap-8">
        <template #title-left><h2>Aujourd'hui</h2></template>
        <template #content>
          <div v-if="todayThemes.length" v-for="theme of todayThemes" class="flex column row-gap-8">
            <Note>
              <h3>{{ themeStore.getThemeById(theme.themeId)?.name ?? 'Thème perdu' }}</h3>
              <div class="details">
                <div class="levels">
                      <span v-if="theme.newCards">
                        <b>Niveau 0</b>: {{ theme.newCards }} carte{{theme.newCards > 1 ? 's' : ''}} (nouvelles cartes !)
                      </span>
                      <span v-for="(count, level) of countCardsByLevel(theme.cards)">
                        <b>Niveau {{ level }}:</b> {{ count }} carte{{count > 1 ? 's' : ''}}
                      </span>
                </div>
              </div>
            </Note>
          </div>
          <div v-else class="no-content padding">Aucune carte à apprendre aujourd'hui !</div>
        </template>
      </Section>
      <Section>
        <template #title-left><h2>En retard</h2></template>
        <template #content>
          <div v-for="date of groupByDate(pastThemes)" v-if="groupByDate(pastThemes)?.length" class="flex column row-gap-8">
            <h4>{{ date.date }}</h4>
            <div v-for="theme of date.themes">
              <h3>{{ themeStore.getThemeById(theme.themeId)?.name ?? 'Thème perdu' }}</h3>
              <div class="details">
                <div class="levels">
                      <span v-for="(count, level) of countCardsByLevel(theme.cards)">
                        <b>Niveau {{ level }}:</b> {{ count }} carte{{count > 1 ? 's' : ''}}
                      </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-content padding">Aucun thème en retard.</div>
        </template>
      </Section>
      <div>
        <TitleBlock class="second">
          <template #title-left><h1>Prochaines révisions</h1></template>
        </TitleBlock>
          <Section v-for="date in groupByDate(futureThemes)" :key="date.date" v-if="groupByDate(futureThemes)?.length">
            <template #title-left><h2>{{ date.date }}</h2></template>
            <template #content>
              <Note v-for="theme of date.themes" :show-bar="true" :key="theme.themeId">
                    <h3>{{ themeStore.getThemeById(theme.themeId)?.name ?? 'Thème perdu' }}</h3>
                    <div class="details">
                      <div class="levels">
                      <span v-for="(count, level) of countCardsByLevel(theme.cards)">
                        <b>Niveau {{ level }}:</b> {{ count }} carte{{count > 1 ? 's' : ''}}
                      </span>
                      </div>
                    </div>
              </Note>
            </template>
          </Section>
        <div v-else class="no-content padding">Aucune révision future prévue !</div>
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

.no-content.padding {
  padding: 32px 0;
}

.second {
  margin-top: 32px;
}
</style>
