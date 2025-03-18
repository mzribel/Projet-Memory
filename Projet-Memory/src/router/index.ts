import { createRouter, createWebHistory } from 'vue-router';
import CategoryListView from '@/views/CategoryListView.vue';
import ThemeListView from '@/views/ThemeListView.vue';
import RevisionView from '@/views/RevisionView.vue';
import CardListView from "@/views/CardListView.vue";

const routes = [
  { path: '/', name: 'Home', component: CategoryListView },
  { path: '/themes/:categoryId', name: 'ThemeListView', component: ThemeListView },
  { path: '/cards/:themeId', name: 'CardListView', component: CardListView },
  { path: '/revision', name: 'Revision', component: RevisionView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
