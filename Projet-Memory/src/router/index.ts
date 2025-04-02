import { createRouter, createWebHistory } from 'vue-router';
import CategoryListView from '@/views/CategoryListView.vue';
import ThemeListView from '@/views/ThemeListView.vue';
import RevisionView from '@/views/RevisionView.vue';
import CardListView from "@/views/CardListView.vue";
import SettingsView from "@/views/SettingsView.vue";
import TestView from "@/views/TestView.vue";
import NotFound from "@/views/NotFound.vue";
import CategoryView from "@/views/CategoryView.vue";

const routes = [
  { path: '/', name: 'Home', component: CategoryListView },
  { path: '/categories', name: 'Categories', component: CategoryListView },
  { path: '/themes', name: 'ThemeListView', component: ThemeListView },
  { path: '/cards', name: 'CardListView', component: CardListView },
  { path: '/revision', name: 'Revision', component: RevisionView },
  { path: '/category/:categoryId', name: 'Category', component: CategoryView },
  { path: '/theme/:themeId', name: 'Theme', component: CardListView },
  { path:'/settings', name: 'Settings', component: SettingsView},
  {
    path: "/test",
    name:"Test",
    meta: {
      layout: 'footer-only'
    },
    component:
      TestView
  },
  { path: '/404', name: "Not Found !", component: NotFound },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
