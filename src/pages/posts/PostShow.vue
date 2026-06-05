<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { usePostShowStore } from '../../store/post/usePostShowStore';
import { useAuthStore } from '../auth/useAuthStore';

// route.params에는 라우터에서 정의한 동적 세그먼트들이 담겨있음
// router는 라우터를 조작할 수 있는 객체, route는 현재 라우터에 대한 정보가 담긴 객체
// 라우터에서 파라미터로 전달된 postId를 가져오기 위해 useRoute 훅을 사용
const route = useRoute();
const postShowStore = usePostShowStore();
const authStore = useAuthStore();

onBeforeMount(async () => {
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    const msg = error?.response?.message ? error.response?.message : "포스트획득 실패"
    alert(msg);
  }
});

onBeforeUnmount(postShowStore.clearPostShow);

</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="img" :style="{ backgroundImage: `url(${postShowStore.post.image})` }"></div>
  <div class="option-box">
    <div class="delete-box">
      <div class="option-delete"
      v-if="postShowStore.post.userId === authStore.userInfo.id"
      ></div>
    </div>
    <div class="like-box">
      <span>1999</span>
      <div class="like-icon"></div>
    </div>
  </div>
  <!-- <p>{{ postShowStore.post.content }}</p> -->
  <textarea name="" id="" class="content" readonly>{{ postShowStore.post.content }}</textarea>
</div>
</template>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.img {
  padding-top: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.option-box {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.like-box {
  display: flex;
  gap: 10px;
}

.option-delete {
  width: 40px;
  height: 50px;
  background-image: url('/icon/trash-can.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.like-icon {
  width: 40px;
  height: 40px;
  background-image: url('/icon/heart-fill.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  width: 100%;
  height: 200px;
  resize: none;
  overflow: hidden;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  text-align: center;
  font-size: 16px;
}
</style>
