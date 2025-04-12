<script lang="ts" setup>
import type { Theme } from '@/types/Theme.ts';
import { useThemeStore } from "@/stores/themeStore.ts";
import {practiceComposable} from "@/composables/practice.composable.ts";
import Block from "@/components/block/Block.vue";
import Button from "@/components/buttons/Button.vue";
import Note from "@/components/block/Note.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
const props = defineProps<{
  theme: Theme
}>();
const themeStore = useThemeStore();

const categoryStore = useCategoryStore();
const cardStore = useCardStore();

const { generateReviewInterval } = practiceComposable();

const toggleThemeSelection = () => {
  if (props.theme.isThemeSelected) {
    themeStore.setThemeUnselected(props.theme.id);
  } else {
    themeStore.setThemeSelected(props.theme.id);
  }
};

const updateThemeSelectedLevel = (theme: Theme) => {
  themeStore.addThemeOrUpdateIt(theme);
};

const cardCount = computed(() => {
  return cardStore.cards.filter(card => card.themeId == props.theme.id).length;
})
const categoryName = computed(() => {
  return categoryStore.categories.find(c => c.id == props.theme.categoryId)?.name ?? "";
})

</script>

<template>
  <router-link :to="`/themes/${theme.id}`">
  <Block type="small" class="theme-item">
    <div class="header">
      <div class="left">
        <div class="icon">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div class="title">
          <h3>{{ theme.name }}</h3>
          <p v-if="categoryName" class="category">{{ categoryName}}</p>
        </div>
      </div>
      <div class="right" @click.prevent>
        <Button @click.prevent="$emit('edit', theme)" type="fab-btn" icon="fa-solid fa-pen" color="secondary" variant="filled"></Button>
        <Button @click.prevent="$emit('delete', theme)" type="fab-btn" icon="fa-solid fa-trash-can" color="secondary" variant="filled"></Button>
      </div>
    </div>
    <div class="tags">
      <div class="tag">
        <div class="icon"><i class="fa-solid fa-list-check"></i></div>
        {{ cardCount }} cartes
      </div>
    </div>
    <div v-if="theme.description" class="description">
      <h4>Description :</h4>
      <p v-if="theme.description">{{ theme.description }}</p>
    </div>
  </Block>
  </router-link>
</template>

<style scoped lang="scss">

@use "../../assets/css/items.scss";














.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(14px);
}
</style>
