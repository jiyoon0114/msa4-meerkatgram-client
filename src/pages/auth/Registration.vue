<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import Myinput from '../../components/input/Myinput.vue';

const handleSubmit = async () => {

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
  ></Myinput>
  <Myinput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
  ></Myinput>
  <Myinput
    :type="'password'"
    :placeholder="'PasswordCk'"
    :readonly="false"
    :required="true"
  ></Myinput>
  <Myinput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
  ></Myinput>
  <input type="file" accept="image/*">
  <MyButton
    :btn-type="'button'"
    :color="'submit'"
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