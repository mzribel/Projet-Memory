<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore.ts';
import ThemeList from '@/components/lists/ThemeList.vue';
import type { Theme } from '@/types/Theme.ts';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import TitleBlock from "@/components/block/TitleBlock.vue";
import Button from "@/components/buttons/Button.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";
import Note from "@/components/block/Note.vue";
import Card from "@/components/card/Card.vue";
import Section from "@/components/block/Section.vue";

const themeStore = useThemeStore();

const themes = themeStore.themes;

const addThemeToCategory = (theme: Theme, categorieId: number) => {
  // themeStore.addTheme(theme);
};
</script>

<template>
  <layout-default>
    <template v-if="themes">
      <TitleBlock>
        <template #title-left><h1>Mes thèmes</h1></template>
      </TitleBlock>

    <Section>
      <template #title-left><h2>Tous les thèmes</h2></template>
      <template #content>
        <div class="theme-list-container">
          <Note><b>Total de thèmes : </b>{{ themes.length }}</Note>
          <ThemeList :themes="themes" />
        </div>
      </template>
    </Section>
    </template>
  </layout-default>
</template>

<style scoped>
.theme-list-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>