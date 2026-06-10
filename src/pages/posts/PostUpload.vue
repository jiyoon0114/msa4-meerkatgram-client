<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { useFileStore } from '../../store/file/useFileStore';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../auth/useAuthStore.js';

// 선택한 파일을 화면에 보여주기 위한 임시 URL 저장
const preview = ref(null);
// 실제 서버로 전송하기 위한 실제 파일 객체
const selectedFile = ref(null);
const fileStore = useFileStore();
const router = useRouter();
const authStore = useAuthStore();

const requestPostLoad = reactive({
  content: null,
  image: null
});

const content = ref(null);
// 서버가 저장한 파일 주소
const fileUri = ref(null);



const handleChangefile = async (e) => {
  // e.target은 input 태그를 가리키고 files는 input 태그에 선택한 파일들의 배열을 가리킴
  const file = e.target.files[0];
  if(file) {
    if(preview.value) {
      // 이전에 미리보기 URL을 만든적이 있다면 기존 URL을 브라우저 메모리에서 해제
    // if 안한다면 사용자가 파일을 계속 변경하면 기존 URL이 메모리에 남아 메모리 누수가 발생할 수 있음
      URL.revokeObjectURL(preview.value);
    }

    // API 서버에 파일 저장 요청
    requestPostLoad.image = await fileStore.uploadPost(file);
    // 저장한 파일의 uri return 받음

    // 선택된 파일을 브라우저에서 임시로 접근할 수 있는 URL로 변환 -> 브라우저 메모리에 생성 -> preview에 저장
    if(requestPostLoad.image) {
      selectedFile.value = file;
      preview.value = URL.createObjectURL(file);
    }
  }
}


const handleSubmit = async () => {
  try {
    if(requestPostLoad.content && requestPostLoad.image) {
      const res = await fileStore.submitUploadPost(requestPostLoad);
      authStore.reissue();
      router.push(`/posts/${res.data.id}`)
    }
    else {
      throw error;
    }
  } catch (error) {
    myErrorStore.setErrorInfo(error);
      router.replace('/error');
  }
}

onBeforeUnmount(() => {
  if(preview.value) {
    URL.revokeObjectURL(preview.value);
  }
});

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="container">
      <div class="userInput">
        <textarea name="" id="" class="content" v-model="requestPostLoad.content"></textarea>
        <div class="preview"
          v-if="preview"
          :style="{backgroundImage: `url(${preview})`}"
        ></div>
        <input type="file" 
        accept="image/*"
        @change="handleChangefile"
        >
      </div>
        <MyButton
        :btn-type="'submit'"
        :color="'gray'"
        :size="'middle'"
        :content="'Write'"
      ></MyButton>
    </div>
  </form>
</template>

<style scoped>
.container{
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.userInput {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
}
.content {
  width: 80%;
  height: 300px;
  border-radius: 10px;
  padding: 30px;
  font-size: 14px;
}
.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>