<script setup lang="ts">
import {computed, ref} from "vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import DrawerCategory from "@/components/nav_drawer/components/DrawerCategory.vue";
import DrawerItem from "@/components/nav_drawer/components/DrawerItem.vue";

// Base Menu
const baseMenu = ref([
  {
    title:"Accueil",
    icon: "fa-solid fa-house",
    link: "/"
  },
  {
    title:"Réviser",
    icon: "fa-solid fa-book",
    subtitle: "24 cartes aujourd'hui",
    link: "/practice"
  },
  {
    title:"Mes catégories",
    icon: "fa-solid fa-box-archive",
    link: "/categories"
  },
  {
    title:"Mes thèmes",
    icon: "fa-solid fa-layer-group",
    link: "/themes"
  },
  {
    title:"Test",
    icon: "fa-solid fa-gear",
    link: "/test"
  }
]);

const categoriesStore = useCategoryStore();
const themesStore = useThemeStore();

const categories = computed(() => categoriesStore.categories.slice(0, 5));
const themes = computed(() => themesStore.themes.slice(0, 5));


</script>

<template>
  <div class="nav-drawer">
    <DrawerCategory>
      <DrawerItem
        v-for="item of baseMenu"
        :title="item.title"
        :icon="item.icon"
        :link="item.link"
      ></DrawerItem>
    </DrawerCategory>
    <DrawerCategory title="Thèmes" empty_message="Aucun thème">
      <template v-if="themes">
        <DrawerItem
          v-for="theme of themes"
          :title="theme.name"
          :link="`/themes/${theme.id}`">
          ></DrawerItem>
        <router-link to="/themes/" class="see-more">Voir tout</router-link>
      </template>
    </DrawerCategory>
  </div>
</template>

<style scoped lang="scss">
.nav-drawer {
  background-color: #FEF7FF;
  font-family: "Roboto", sans-serif;
  padding: 12px;
  height: 100%;
  width: 360px;
  color: #49454F;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.see-more {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  font-style: italic;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>