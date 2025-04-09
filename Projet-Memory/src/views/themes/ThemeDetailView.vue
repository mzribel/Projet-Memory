<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {onMounted, ref, watch} from "vue";
import {computed, onMounted, ref, watch} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";
import CardList from "@/components/lists/CardList.vue";
import TitleBlock from "@/components/block/TitleBlock.vue";
import Button from "@/components/buttons/Button.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import Section from "@/components/block/Section.vue";
import Note from "@/components/block/Note.vue";
import CardListItem from "@/components/card/CardListItem.vue";
import Card from "@/components/card/Card.vue";

// la route
const route = useRoute();

const themeStore = useThemeStore();
let theme = ref<Theme>();
const categoryStore = useCategoryStore();
const cardStore = useCardStore();
const fetchThemeOr404 = async (themeId:string) => {
  theme.value = themeStore.getThemeById(themeId);

const fetchThemeOr404 = async (themeId:string) => {
  theme.value = themeStore.getThemeById(themeId);
  if (!theme.value) { await router.push("/404") }
}

onMounted(async () => {
  await fetchThemeOr404(route.params.themeId as string ?? "");
})

watch(
  () => route.params.themeId,
  (newId, oldId) => {
    fetchThemeOr404(newId as string ?? "")
  }
)

const category = computed(() => {
  if (!theme.value) { return null;}
    return categoryStore.categories.find((c) => c.id === theme?.value?.categoryId);
})
const cards = computed(() => {
  if (!theme.value) { return null;}
  return cardStore.cards.filter((c) => c.themeId === theme?.value?.id);
})

</script>

<template>
  <layout-default>
    <template v-if="theme">
    <TitleBlock>
      <template #title-left><h1>{{ theme.name }}</h1></template>
      <template #title-right>
        <Button size="large" icon="fa-solid fa-pen" type="fab-btn" variant="filled" color="secondary"></Button>
      </template>
      <template #subtitle>
        <PageSubtitle v-if="category" icon="fa-solid fa-box-archive">{{ category.name }}</PageSubtitle>
        <PageSubtitle icon="fa-solid fa-calendar">Créé le {{ theme.createdAt}}</PageSubtitle>
        <PageSubtitle icon="fa-solid fa-gear">
          <span>{{ theme.maxLevel }} {{ theme.maxLevel > 1 ? 'niveaux' : "niveau"}}</span>
          <span v-if="theme.newCardsPerDay"> - {{ theme.newCardsPerDay }} {{ theme.newCardsPerDay > 1 ? 'nouvelles cartes' : "nouvelle carte"}} par jour</span>
          </PageSubtitle>
      </template>
    </TitleBlock>

    <Section v-if="cards">
      <template #title-left><h2>CARTES</h2></template>
      <template #content>
        <div class="card-list-container">
          <Note><b>Total de cartes : </b>{{ cards.length }}</Note>
          <div class="card-list">
            <Button icon="fa-solid fa-plus" label="Ajouter une carte" variant="tonal"></Button>
            <div class="mescouillesenski">
              <Card v-for="card in cards" :show-options="true" :card-data="card"></Card>
            </div>

          </div>
        </div>
      </template>
    </Section>
    </template>
<!--    <div v-if="theme">-->
<!--      <h1 class="">Cartes dans {{ theme?.name }}</h1>-->
<!--      <p class="">{{ theme?.description }}</p>-->
<!--    </div>-->
  </layout-default>
</template>

<style scoped>
.card-list-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mescouillesenski {
  padding: 16px 0;
  display: flex;
  gap: 16px;
  row-gap: 16px;
}
</style>