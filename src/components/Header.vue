<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../pages/auth/useAuthStore.js';

const router = useRouter();
const authStore = useAuthStore();

const redirectMain = () => {
  router.push('/');
}

const redirectLogin = () => {
  router.push('/login');
}

const redirectRegistration = () => {
  router.push('/registration');
}

const logout = async () => {
  await authStore.logout();
  router.replace("/");
}


</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain">Meerkatgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
      v-if="!authStore.isLoggedIn" 
      :content="'Sign In'"
      :color="'gray'"
      :size="'small'"
      @click="redirectLogin"
      />
      <MyButton 
      v-if="!authStore.isLoggedIn"
      :content="'Sign Up'"
      :color="'white'"
      :size="'small'"
      @click="redirectRegistration"
      />
      <MyButton 
      v-if="authStore.isLoggedIn"
      :content="'Logout'"
      :color="'black'"
      :size="'small'"
      @click="logout"
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