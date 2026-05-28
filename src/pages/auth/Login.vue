<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import Myinput from '../../components/input/Myinput.vue';
import MyStrikeThroughBehindWord from '../../components/decoration/MyStrikeThroughBehindWord.vue';
import { useAuthStore } from './useAuthStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const loginFrom = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  await authStore.login(loginFrom);
  router.replace("/");
}

</script>

<template>
  <!-- 기존의 submit 이벤트를 우리가 만든 함수로 변경함 -->
<form @submit.prevent="handleSubmit">
  <Myinput
    :type="'email'"
    :placeholder="'email'"
    :readonly="false"
    :required="true"
    v-model="loginFrom.email"
  ></Myinput>
  <Myinput
    :type="'password'"
    :placeholder="'password'"
    :readonly="false"
    :required="true"
    v-model="loginFrom.password"
  ></Myinput>

  <MyButton
    :btn-type="'submit'"
    :color="'gray'"
    :size="'middle'"
    :content="'Log In'"
  ></MyButton>

  <MyStrikeThroughBehindWord
    :content="'or'"
  ></MyStrikeThroughBehindWord>

  <MyButton
    :btn-type="'button'"
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
</style>