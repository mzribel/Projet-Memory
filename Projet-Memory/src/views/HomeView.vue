<script setup lang="ts">

import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {computed } from "vue";

import {practiceComposable} from "@/composables/practice.composable.ts";
import {useSettingsStore} from "@/stores/settingsStore.ts";
import {useFileStore} from "@/stores/fileStore.ts";
const { getCardCountToPracticeToday } = practiceComposable()
const cardsToPractice = computed(()=> { return getCardCountToPracticeToday() })
const filesStore = useFileStore()
const settingsStore = useSettingsStore();
const settings = computed(() => {
  return settingsStore.settings
})
const files = computed(() => {
  return filesStore.files
})
</script>

<template>
<layout-default>
</layout-default>
</template>

<style scoped>

</style>