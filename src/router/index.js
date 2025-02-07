import { createRouter, createWebHistory } from 'vue-router';
import Categories from '../pages/Categories.vue';
import DetailsMeal from '../pages/DetailsMeal.vue';
import Index from '../pages/index.vue';

const routes = [
  {
    path: '/',

    name: 'Index',
    component: Index,
  },
  {
    path: '/details/:id',
    name: 'DetailsMeal',
    component: DetailsMeal,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
