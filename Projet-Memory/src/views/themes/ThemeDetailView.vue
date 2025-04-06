<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {onMounted, ref} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";

// la route
const route = useRoute();
let themeID:string = route.params.themeId as string ?? "";

const themeStore = useThemeStore();
let theme = ref<Theme>();

onMounted(async () => {
  await themeStore.loadThemes();
  theme.value = await themeStore.getThemeById(themeID);
  if (!theme.value) { await router.push("/404") }
})
</script>

<template>
  <layout-default>
    <div v-if="theme">
      <h1 class="">Cartes dans {{ theme?.name }}</h1>
      <p class="">{{ theme?.description }}</p>

    </div>
  </layout-default>
</template>

<style scoped>
</style>