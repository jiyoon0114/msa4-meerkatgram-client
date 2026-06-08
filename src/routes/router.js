import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../pages/auth/useAuthStore.js";
import PostShow from "../pages/posts/PostShow.vue";
import Registration from "../pages/auth/Registration.vue";
import PostUpload from "../pages/posts/PostUpload.vue";

const setMeta = (isAuthenticated, isguestOnly) => {
  return {
      isAuthenticated,
      isguestOnly,
    }
}

const routes = [
  {
    path: '/',
    // 루트로 와도 /posts 주소로 감
    redirect: '/posts',
    // router에 우리가 원하는 데이터를 넣어줄 수 있는 속성
    meta: setMeta(false, false)
  },
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true)
  },
  // 게시물 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false)
  },
  {
    path: '/posts/:id',
    component: PostShow,
    meta: setMeta(true, false)
  },
  {
    path:'/registration',
    component: Registration,
    meta: setMeta(false, true)
  },
  // 에러 관련
  {
    path: '/error',
    component: MyError,
    meta: setMeta(false, false)
  }, 
  {
    path: '/posts/upload',
    component: PostUpload,
    meta: setMeta(true, false)
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
// 위에 적은 router 객체들에게 loop 돌려서 처리함
// 이동할 라우터 정보, 내가 갈 라우터, 내가 다음 라우터로 이동할 수 있게 하는 함수
router.beforeEach(async (to, form, next) => {
  // authStore 
  const authStore = useAuthStore();

  // accessToken(인증)이 없을 때 토큰 재발급 시도
  if(!authStore.isLoggedIn) {
    try {
      await authStore.reissue();
    } catch (error) {
      // alert('로그인 기간이 만료되었습니다 \n다시 로그인 해 주십시오');
      // return next("/login");
    }
  }

  // 인증이 필요한 페이지인데, 로그인이 안된 경우 로그인페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next("/login");
  }

  // 게스트만 접근 가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동
  if(to.meta.isguestOnly && authStore.isLoggedIn) {
      return next("/");
  }

  // 나머지는 통과
  next();
});

export default router;