import { createRouter, createWebHistory } from 'vue-router';
import CategoryListView from '@/views/CategoryListView.vue';
import ThemeListView from '@/views/ThemeListView.vue';
import RevisionView from '@/views/RevisionView.vue';
import CardListView from "@/views/CardListView.vue";
import SettingsView from "@/views/SettingsView.vue";

const routes = [
  { path: '/', name: 'Home', component: CategoryListView },
  { path: '/categories', name: 'Categories', component: CategoryListView },
  { path: '/themes', name: 'ThemeListView', component: ThemeListView },
  { path: '/cards', name: 'CardListView', component: CardListView },
  { path: '/revision', name: 'Revision', component: RevisionView },
  { path:'/settings', name: 'Settings', component: SettingsView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
