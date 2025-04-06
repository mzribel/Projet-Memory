<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {practiceComposable} from "@/composables/practice.composable.ts";
import type {Theme} from "@/types/Theme.ts";
import vue from "@vitejs/plugin-vue";
import type {Card} from "@/types/Card.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import arrayShuffle from 'array-shuffle';


const {
  getCardsToPractice,
  promoteCard,
  demoteCard,
  resetCardLevel
} = practiceComposable()

// const modalRef = ref<ComponentPublicInstance<{ openModal: () => void }> | null>(null);
// const showModal = () => { modalRef?.value?.openModal(); };
// const card = {
//   id: "1",
//   themeId: "1",
//   front: "Capitale de mon cul",
//   back: "Back",
//   level: 2
// }

const themeID = "1bcad111-4b55-498b-92b1-8f74835ee51a";
const theme = ref<Theme|null>(null);
const cards = ref<Card[]>([]);

const themeStore = useThemeStore();
const cardStore = useCardStore();

onMounted(async () => {
  theme.value = themeStore.getThemeById(themeID) ?? null;
  cards.value = cardStore.getCardsByThemeId(themeID);
})

const newCards = computed(()=> {
  return getCardsToPractice(cards.value, theme.value.maxLevel, theme.value.newCardsPerDay);
});

</script>

<template>
  <layout-default>
<!--    <Button label="Open modal" @click="showModal" variant="outlined"></Button>-->
<!--    <Modal ref="modalRef" title="Mes couilles en ski" description="c'est nike">-->
<!--      <template #body>-->
<!--        <Card :card-data="card"/>-->
<!--      </template>-->
<!--    </Modal>-->
    <div v-if="theme">
      <div class="theme-container">
        <template v-for="(value, name, index) in theme">
          <div>{{ name }}</div>
          <div>{{ value }}</div>
        </template>
      </div>
      <br>
      <div class="cards-container">
        <div v-for="(card, index) in cards">
          {{ index + 1 }} -- {{ card.front }} | {{ card.back}} | {{ card.currentLevel ?? 0 }} |
            {{ card.nextReviewAt ?? ""}} | {{ card.lastReviewedAt ?? "" }}
          <button v-if="card.currentLevel" @click="resetCardLevel(card)">Reset</button>
        </div>
      </div>
      <h3>Cartes à réviser</h3>
      <div v-for="(card, index) in newCards">
        {{ index + 1 }} -- {{ card.front }} | {{ card.back}} | {{ card.currentLevel ?? 0 }}
        <button @click="promoteCard(card, theme.maxLevel)">Promote</button>
        <button @click="demoteCard(card, theme.maxLevel)">Demote</button>
      </div>
    </div>
  </layout-default>
</template>

<style scoped lang="scss">
.theme-container {
  display: grid;
  grid-template-columns: auto auto;
}
</style>