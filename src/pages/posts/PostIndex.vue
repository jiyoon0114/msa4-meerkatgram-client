<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import usePostIndexStore from '../../store/post/usePostIndexStore';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

// ---------------- 스토어로 이관 start -----------------------
// 함수 정의
// const getPostPagination = async (page = 1) => {
//   // 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value) {
//     try {
//       const url = '/api/posts';
//       const params = {
//         page
//       };
//       const res = await myAxios.get(url, { params });
//       const data = res.data.data;
//       isLastPage.value = data.LastPage;
//       posts.value.push(...data.posts);

//       currentPage++;
//     } catch (error) {
//       console.error(error);      
//     }
//   }
// }
// ---------------- 스토어로 이관 end -----------------------
const postIndexStore = usePostIndexStore();
const router = useRouter();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error)
    router.replace('/error');
  }
}

const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber)
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`)
}

// 라이프 사이클
onBeforeMount(() => getPagination());
onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>
  <div class="card-container">
    <div 
      class="card"
      v-for="item in postIndexStore.items"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
      @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton 
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more'"
    @click="getNextPage"
  />
</template>

<style scoped>
.card-container {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
