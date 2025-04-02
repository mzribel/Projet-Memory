<script lang="ts" setup>
import { useRoute } from 'vue-router';
import CardList from '@/components/lists/CardList.vue';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import type {Theme} from "@/types/Theme.ts";
import {onMounted, ref} from "vue";
import router from "@/router";

// la route
const route = useRoute();
let themeID:string = route.params.themeId as string ?? "";

const themeStore = useThemeStore();
let theme = ref<Theme>();

onMounted(async () => {
  theme.value = themeStore.getThemeById(themeID);
  if (!theme.value) {
    await router.push("/404")
  }
})
</script>

<template>
  <layout-default>
    <div>
      <h1 class="">Cartes dans {{ theme?.name }}</h1>
      <p class="">{{ theme?.description }}</p>

      <CardList :theme-id="themeID" />
    </div>
  </layout-default>
</template>

<style scoped>
</style>