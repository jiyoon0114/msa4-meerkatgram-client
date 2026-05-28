import { defineStore } from "pinia";
import { computed, ref } from 'vue';
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

// 앞에 use + 기능 + store가 붙여서 이름 짓기
const usePostIndexStore = defineStore('postIndex', () => {
  // 1. state(ref)
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);
  
  // 2. Getters (computed) -> state값을 가공해서 가져오고 싶은데 원본은 변경하지 않고 가져오고 싶을때 사용함
  const getNextPageNumber = computed(() => currentPage.value + 1);
  
  // 3. Actions (function)
  const clearPostIndex = () => {
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }

  const getPostPagination = async (page = 1) => {
    // 마지막 페이지가 아닐 경우만 실행
    if(!isLastPage.value) {
      try {
        const url = '/api/posts';
        const params = {
          page: page,
        };
        const res = await myAxios.get(url, { params });
        const data = res.data.data;
        isLastPage.value = data.LastPage;
        items.value.push(...data.posts);
    
        currentPage.value++;
      } catch (error) {
        console.error(error);
        useMyErrorStore().setErrorInfo(error);
      }
    }
  }
  return {
    // state
    items,
    isLastPage,

    //getters
    getNextPageNumber,

    //actions
    getPostPagination,
    clearPostIndex
  }
});

export default usePostIndexStore;