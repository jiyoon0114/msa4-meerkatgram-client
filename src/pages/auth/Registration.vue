<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import Myinput from '../../components/input/Myinput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from './useAuthStore.js';
import { useRouter } from 'vue-router';

const fileStore = useFileStore();
const authStore = useAuthStore();
const router = useRouter();

// 선택한 파일을 화면에 보여주기 위한 임시 URL 저장
const preview = ref(null);
// 실제 서버로 전송하기 위한 실제 파일 객체
const selectedFile = ref(null);
const registrationData = reactive({
  email:'',
  password:'',
  passwordCk:'',
  nickname:'',
  profile:''
});

const handleSubmit = async () => {
  try {
    await authStore.registration(registrationData);
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    router.replace("/login");
  } 
  catch (error) {
    const data = error.response.data;
    if(data.code === "E11") {
      alert(data.data);
    }
    else if(data.code === "E21") {
      alert("잘못된 양식입니다");
    }
    else {
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
      router.replace("/");
    }
  }
}

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
    const fileUri = await fileStore.uploadProfile(file);
    // 선택된 파일을 브라우저에서 임시로 접근할 수 있는 URL로 변환 -> 브라우저 메모리에 생성 -> preview에 저장
    if(fileUri) {
      registrationData.profile = fileUri;
      selectedFile.value = file;
      preview.value = URL.createObjectURL(file);
    }
  }
}

onBeforeUnmount(() => {
  if(preview.value) {
    URL.revokeObjectURL(preview.value);
  }
});
</script>

<template>
  <!-- 기존의 submit 이벤트를 우리가 만든 함수로 변경함 -->
<form @submit.prevent="handleSubmit">
  <Myinput
    :type="'email'"
    :placeholder="'email'"
    :readonly="false"
    :required="true"
    v-model="registrationData.email"
  ></Myinput>
  <Myinput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    v-model="registrationData.password"
  ></Myinput>
  <Myinput
    :type="'password'"
    :placeholder="'PasswordCk'"
    :readonly="false"
    :required="true"
    v-model="registrationData.passwordCk"
  ></Myinput>

  <Myinput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
    v-model="registrationData.nickname"
  ></Myinput>

  <div class="preview"
    v-if="preview"
    :style="{backgroundImage: `url(${preview})`}"
  ></div>

  <input type="file" 
  accept="image/*"
  @change="handleChangefile"
  >
  
  <MyButton
    :btn-type="'submit'"
    :color="'white'"
    :size="'middle'"
    :content="'Sign up'"
  ></MyButton>

</form>
</template>

<style scoped>
form {
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
