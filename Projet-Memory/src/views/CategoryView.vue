<script setup lang="ts">

import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import { useRoute } from 'vue-router';
import { onMounted, ref} from "vue";
import type {Category} from "@/types/Category.ts";
import router from "@/router";

// la route
const route = useRoute();
let categoryID:string = route.params.categoryId as string ?? "";

const categoryStore = useCategoryStore();
let category = ref<Category>();

onMounted(async () => {
  category.value = await categoryStore.getCategoryById(categoryID);
  if (!category) { await router.push("/404") }
})
</script>

<template>
    <layout-default>
      <div v-if="category">
        {{ category.name }}
      </div>
    </layout-default>
</template>

<style scoped>

</style>