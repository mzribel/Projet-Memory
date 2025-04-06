<script lang="ts" setup>
import Navbar from './../components/Navbar.vue';
import NavDrawer from "@/components/nav_drawer/NavDrawer.vue";
import Footer from "@/components/Footer.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {onBeforeMount, onMounted, ref } from "vue";

const themeStore = useThemeStore();

const cardStore = useCardStore();

const categoryStore = useCategoryStore();
const isLoaded = ref(false);

onBeforeMount(async () => {
  await themeStore.loadThemes();
  await cardStore.loadCards();
  await categoryStore.loadCategories();
  isLoaded.value = true;
})

</script>
<template v-if="isLoaded">
  <Navbar />
  <main>
    <NavDrawer :categories="[]" :themes="[]"></NavDrawer>
    <div class="content-ctn">
      <div id="content">
        <slot/>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
main {
  padding-top: 50px;
}
</style>