<script lang="ts" setup>
import type { Theme } from '@/types/Theme.ts';
import router from "@/router";
import { useThemeStore } from "@/stores/themeStore.ts";

const props = defineProps<{ theme: Theme }>();
const themeStore = useThemeStore();


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

</script>

<template>
  <div class="">
    <div>
      <h3 class="">{{ theme.name }}</h3>
      <p class="">
        {{ theme.description || 'Pas de description' }} - {{ theme.cardCount }} carte(s)
      </p>
    </div>
    <div >
      <router-link :to="`/themes/${theme.id}`"><button>Voir les cartes</button></router-link>
      <button @click="$emit('edit', theme)" >Modifier</button>
      <button @click="$emit('delete', theme.id)" >Supprimer</button>

      <label class="switch">
        <input type="checkbox" :checked="theme.isThemeSelected" @change="toggleThemeSelection">
        <span class="slider"></span>
      </label>

      <div v-if="theme.isThemeSelected">
        <label for="levelToReview">Niveau de révision</label>
        <select id="levelToReview" v-model="theme.levelToReview" @change="updateThemeSelectedLevel(theme)">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
