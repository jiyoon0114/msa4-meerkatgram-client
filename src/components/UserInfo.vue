<script setup>
import { useAuthStore } from '../pages/auth/useAuthStore';

const authStore = useAuthStore();
</script>

<template>
  <div class="container" v-if="authStore.isLoggedIn && authStore.userInfo">
    <div class="profile-box">
      <div 
      class="profile bg-image-circle"
      :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
      ></div>
    </div>
    <div class="info-box">
      <div class="nick">{{ authStore.userInfo.nick }}</div>
      <div class="write-count">posts {{ authStore.userInfo.countPosts }}</div>
      <div class="redirect-box icons">
        <div 
          class="bg-image-square redirect-icon-posts-index"
          style="background-image: url('/icon/gallery.png');"
        ></div>
        <div 
          class="bg-image-square redirect-icon-posts-create"
          style="background-image: url('/icon/plus-sign.png');"
        ></div>
        <div 
          class="bg-image-square redirect-icon-users-info"
          style="background-image: url('/icon/person.png');"
        ></div>
      </div>
    </div>
  </div>
  <hr>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
}

.redirect-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr)
}
</style>
