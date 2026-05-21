<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios';

const posts = ref([]);
const isLastPage = ref(false);
let currentPage = 1;

// 함수 정의
const getPostPagination = async () => {
  // 마지막 페이지가 아닐 경우만 실행
  if(!isLastPage.value) {
    try {
      const url = '/api/posts';
      const params = {
        page: currentPage,
      };
      const res = await myAxios.get(url, { params });
      const data = res.data.data;
      isLastPage.value = data.LastPage;
      posts.value.push(...data.posts);
    } catch (error) {
      console.error(error);      
    }
  }
}

// 라이프 사이클
onBeforeMount(getPostPagination);


</script>

<template>
  <div class="card-container">
    <div 
      class="card"
      v-for="item in posts"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
    ></div>
  </div>
  <MyButton 
    v-if="!isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more'"
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