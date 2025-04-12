import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import CategoriesView from "@/views/categories/CategoriesView.vue";
import ThemesView from "@/views/themes/ThemesView.vue";
import ThemeDetailView from "@/views/themes/ThemeDetailView.vue";
import PracticeView from "@/views/practice/PracticeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import {useSettingsStore} from "@/stores/settingsStore.ts";
import {useFileStore} from "@/stores/fileStore.ts";

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/categories', name: 'Categories', component: CategoriesView },
  { path: '/themes', name: 'ThemeListView', component: ThemesView },
  { path: '/themes/:themeId', name: 'Theme', component: ThemeDetailView },
  { path: '/practice', name: 'Practice', component: PracticeView },
  { path: '/404', name: "Not Found !", component: NotFoundView },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// TODO: possiblement déplacer ça
router.beforeEach(async (to, from, next) => {
  const categoryStore = useCategoryStore();
  const themeStore = useThemeStore();
  const cardStore = useCardStore();
  const settingsStore = useSettingsStore();
  const fileStore = useFileStore();
  await fileStore.loadFiles();
  await categoryStore.loadCategories();
  await themeStore.loadThemes();
  await cardStore.loadCards();
  await settingsStore.loadSettings();
  next();
})

export default router;
