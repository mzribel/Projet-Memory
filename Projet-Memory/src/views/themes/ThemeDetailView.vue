<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {onMounted, ref} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";
import CardList from "@/components/lists/CardList.vue";

// la route
const route = useRoute();
let themeID:string = route.params.themeId as string ?? "";

const themeStore = useThemeStore();
let theme = ref<Theme>();

onMounted(async () => {
  theme.value = themeStore.getThemeById(themeID);
  if (!theme.value) { await router.push("/404") }
})
</script>

<template>
  <layout-default>
    <div v-if="theme">
      <h1 class="">Cartes dans {{ theme?.name }}</h1>
      <p class="">{{ theme?.description }}</p>
      <card-list :theme-id="theme?.id"></card-list>
    </div>
  </layout-default>
</template>

<style scoped>
</style>