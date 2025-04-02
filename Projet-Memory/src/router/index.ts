import { createRouter, createWebHistory } from 'vue-router';
import SettingsView from "@/views/settings/SettingsView.vue";
import TestView from "@/views/test/TestView.vue";
import HomeView from "@/views/HomeView.vue";
import CategoriesView from "@/views/categories/CategoriesView.vue";
import CategoryDetailView from "@/views/categories/CategoryDetailView.vue";
import ThemesView from "@/views/themes/ThemesView.vue";
import ThemeDetailView from "@/views/themes/ThemeDetailView.vue";
import PracticeView from "@/views/practice/PracticeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  { path: "/test", name:"Test", component: TestView }, // TODO : Remove

  { path: '/', name: 'Home', component: HomeView },
  { path: '/categories', name: 'Categories', component: CategoriesView },
  { path: '/categories/:categoryId', name: 'Category', component: CategoryDetailView },
  { path: '/themes', name: 'ThemeListView', component: ThemesView },
  { path: '/themes/:themeId', name: 'Theme', component: ThemeDetailView },
  { path: '/practice', name: 'Practice', component: PracticeView },
  { path: '/settings', name: 'Settings', component: SettingsView},
  { path: '/404', name: "Not Found !", component: NotFoundView },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
