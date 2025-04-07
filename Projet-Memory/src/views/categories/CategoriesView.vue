<script lang="ts" setup>
import CategoryList from '@/components/lists/CategoryList.vue';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";

let categoryStore = useCategoryStore();

</script>

<template>
    <layout-default>
      <div>
        <h1 class="">Catégories</h1>
        <CategoryList />
      </div>
    </layout-default>

</template>

<style scoped>
</style>