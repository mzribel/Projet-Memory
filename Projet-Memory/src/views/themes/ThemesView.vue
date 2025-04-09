<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore.ts';
import ThemeList from '@/components/lists/ThemeList.vue';
import LayoutDefault from "@/layouts/LayoutDefault.vue";

const themeStore = useThemeStore();

const themes = themeStore.themes;

</script>

<template>
  <layout-default>
    <div>
      <h1 >Thèmes</h1>

      <ThemeList :themes="themes" />
    </div>
  </layout-default>
</template>

<style scoped>
</style>