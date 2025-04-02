<script setup lang="ts">
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { useRoute } from 'vue-router';
import { onMounted, ref} from "vue";
import type {Theme} from "@/types/Theme.ts";
import router from "@/router";
import {useThemeStore} from "@/stores/themeStore.ts";

// la route
const route = useRoute();
let themeID:string = route.params.themeId as string ?? "";

const themeStore = useThemeStore();
let theme = ref<Theme>();

onMounted(async () => {
  theme.value = await themeStore.getThemeById(themeID);
  if (!theme.value) {
    await router.push("/404")
  }
})
</script>

<template>
  <layout-default>
    <div v-if="theme">
      {{ theme.name }}
    </div>
  </layout-default>
</template>

<style scoped>

</style>