<script lang="ts" setup>
import CategoryList from '@/components/lists/CategoryList.vue';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import ThemeList from "@/components/lists/ThemeList.vue";
import Note from "@/components/block/Note.vue";
import Section from "@/components/block/Section.vue";
import TitleBlock from "@/components/block/TitleBlock.vue";
import {computed, ref} from "vue";

const categoryStore = useCategoryStore();
const categories = computed(()=>categoryStore.categories);
</script>

<template>
    <layout-default>
      <template v-if="categories">
        <TitleBlock>
          <template #title-left><h1>Mes catégories</h1></template>
        </TitleBlock>
        <Section>
          <template #title-left><h2>Toutes les catégories</h2></template>
          <template #content>
            <div class="theme-list-container">
              <Note><b>Total de catégories : </b>{{ categories.length }}</Note>
              <CategoryList :categories="categories"/>
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
  gap: 8px;
}
</style>