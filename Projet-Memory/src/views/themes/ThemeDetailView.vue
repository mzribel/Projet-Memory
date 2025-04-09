<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {onMounted, ref, watch} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";
import CardList from "@/components/lists/CardList.vue";

// la route
const route = useRoute();

const themeStore = useThemeStore();
let theme = ref<Theme>();

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