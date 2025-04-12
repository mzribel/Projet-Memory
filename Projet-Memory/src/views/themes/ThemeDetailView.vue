<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {computed, onMounted, ref, watch} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";
import TitleBlock from "@/components/block/TitleBlock.vue";
import Button from "@/components/buttons/Button.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import Section from "@/components/block/Section.vue";
import Note from "@/components/block/Note.vue";
import Card from "@/components/card/Card.vue";
import CardList from "@/components/lists/CardList.vue";
import ThemeForm from "@/components/forms/ThemeForm.vue";
import Modal from "@/components/modal/Modal.vue";

// la route
const route = useRoute();

const themeStore = useThemeStore();
let theme = computed(()=> {
  return themeStore.getThemeById(route.params.themeId as string?? "")
})
const categoryStore = useCategoryStore();
const cardStore = useCardStore();
const fetchThemeOr404 = async (themeId:string) => {
  if (!theme.value) { await router.push("/404") }
}

const themeModalRef = ref<InstanceType<typeof Modal> | null>(null);
const editTheme = () => {
  themeModalRef.value?.openModal();
};

const saveTheme = async (theme:Theme) => {
  if (!theme) {return;}
  await themeStore.addThemeOrUpdateIt(theme);
  themeModalRef.value?.closeModal();
};

onMounted(async () => {
  await fetchThemeOr404(route.params.themeId as string ?? "");
})

watch(
  () => route.params.themeId,
  (newId) => {
    fetchThemeOr404(newId as string ?? "")
  }
)

const category = computed(() => {
  if (!theme.value) { return null;}
    return categoryStore.categories.find((c) => c.id === theme?.value?.categoryId);
});
const cards = computed(() => {
  if (!theme.value) { return null;}
  return cardStore.cards.filter((c) => c.themeId === theme?.value?.id);
});

</script>

<template>
  <layout-default>
    <template v-if="theme">
    <TitleBlock>
      <template #title-left><h1>{{ theme.name }}</h1></template>
      <template #title-right>
        <Button @click="editTheme" size="large" icon="fa-solid fa-pen" type="fab-btn" variant="filled" color="secondary"></Button>
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
          <CardList :cards="cards" :theme-id="theme.id"></CardList>
        </div>
      </template>
    </Section>
    </template>
    <Modal
      ref="themeModalRef"
      :title="theme ? 'Modifier le thème' : 'Créer un nouveau thème'"
    >
      <template #body>
        <ThemeForm v-if="theme"
          :theme="theme ?? null"
          @save="saveTheme"
          @close="themeModalRef?.closeModal"
        />
      </template>
    </Modal>
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
  flex-wrap: wrap;
}
</style>