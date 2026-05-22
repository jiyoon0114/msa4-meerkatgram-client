import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";

const routes = [
  {
    path: '/',
    // 루트로 와도 /posts 주소로 감
    redirect: '/posts'
  },
  {
    path: '/posts',
    component: PostIndex
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;