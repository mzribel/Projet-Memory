<script lang="ts" setup>
import type { Category } from '@/types/Category.ts';
import Button from "@/components/buttons/Button.vue";
import Block from "@/components/block/Block.vue";
import {computed} from "vue";
import {useCardStore} from "@/stores/cardStore.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits(['edit', 'delete']);

const cardStore = useCardStore();
const themeStore = useThemeStore();

const themeCount = computed(()=> {
  return themeStore.themes.filter(theme => theme.categoryId === props.category.id).length ?? 0;
})
const cardCount = computed(()=> {
  const themeIdsInCategory = themeStore.themes
    .filter(theme => theme.categoryId === props.category.id)
    .map(theme => theme.id);

  return cardStore.cards.filter(card => themeIdsInCategory.includes(card.themeId)).length;
})

</script>

<template>
  <Block type="small" class="theme-item">
    <div class="header">
      <div class="left">
        <div class="icon">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div class="title">
          <h3>{{ category.name }}</h3>
        </div>
      </div>
      <div class="right" @click.prevent>
        <Button @click.prevent="$emit('edit', category)" type="fab-btn" icon="fa-solid fa-pen" color="secondary" variant="filled"></Button>
        <Button @click.prevent="$emit('delete', category)" type="fab-btn" icon="fa-solid fa-trash-can" color="secondary" variant="filled"></Button>
      </div>
    </div>
    <div class="tags">
      <div class="tag">
        <div class="icon"><i class="fa-solid fa-archives"></i></div>
        {{ themeCount}} thème{{themeCount > 1 ? 's' : ''}}
      </div>
      <div class="tag">
        <div class="icon"><i class="fa-solid fa-layer-group"></i></div>
        {{cardCount}} carte{{cardCount > 1 ? 's' : ''}}
      </div>
    </div>
    <div v-if="category.description" class="description">
      <h4>Description :</h4>
      <p >{{ category.description }}</p>
    </div>
  </Block>
</template>

<style scoped>

@import "../../assets/css/items.scss";
</style>