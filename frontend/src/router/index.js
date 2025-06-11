import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [

  { path: '/', name: 'Home', component: Home },
  { path: '/posts/:postId', name: 'PostDetail', component: PostDetail },
  { path: '/login', name:'Login', component: Login },
  { path: '/register', name:'Register', component: Register }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
