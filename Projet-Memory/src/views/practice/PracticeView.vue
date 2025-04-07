<script lang="ts" setup>
import RevisionSession from '@/components/RevisionSession.vue';
import CategoryList from "@/components/lists/CategoryList.vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {themeDataComposable} from "@/composables/themedata.composable.ts";
import {computed} from "vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";

const cardStore = useCardStore();
const themeStore = useThemeStore();
const { groupCardsByDateAndTheme } = themeDataComposable();
const groupedCards = computed(() => {
  return groupCardsByDateAndTheme(cardStore.cards);
})
</script>

<template>
  <layout-default>
    <div>
      <RevisionSession />
    </div>
    <br><br>
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
  </layout-default>
</template>

<style scoped>
</style>