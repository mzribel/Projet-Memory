<script setup lang="ts">

import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {computed } from "vue";

import {practiceComposable} from "@/composables/practice.composable.ts";
const { getCardCountToPracticeToday } = practiceComposable()
const cardsToPractice = computed(()=> { return getCardCountToPracticeToday() })
</script>

<template>
<layout-default>
{{ cardsToPractice}}
</layout-default>
</template>

<style scoped>

</style>