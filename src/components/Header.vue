<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';

// TODO: 로그인 추가시 변경 필요 START
const isloggedIN = ref(false); // true: 로그인 되어 있음

// TODO: 로그인 추가시 변경 필요 END

</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title">Meerkatgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
      v-if="!isloggedIN" 
      :content="'Sign In'"
      :color="'gray'"
      :size="'small'"
      />
      <MyButton 
      v-if="!isloggedIN"
      :content="'Sign Up'"
      :color="'white'"
      :size="'small'"
      />
      <MyButton 
      v-if="isloggedIN"
      :content="'Logout'"
      :color="'black'"
      :size="'small'"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 23px;
}
.title-box {
  display: flex;
  align-items: center;
}
.header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.btn-box {
  display: flex;
  gap: 10px;
}
</style>