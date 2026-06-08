import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  // State

  // Getters

  // Actions
  const uploadProfile = async (file) => {
    try {
      const url = '/api/files/profiles';

      // FormData 객체 생성
      const data = new FormData();
      data.append('file', file);

      // Content-Type 헤더를 multipart/form-data로 설정하여 파일 업로드 요청
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    } catch (error) {
        console.error(error);
        return null;
    }
  }

    const uploadPost = async (file) => {
    try {
      const url = '/api/files/posts';

      // FormData 객체 생성
      const data = new FormData();
      data.append('file', file);

      // Content-Type 헤더를 multipart/form-data로 설정하여 파일 업로드 요청
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    } catch (error) {
        console.error(error);
        return null;
    }
  }

  const submitUploadPost = async (requestPostLoad) => {
      try {
        const url = '/api/posts'
        const res = await myAxios.post(url, requestPostLoad);
        return res.data;
      } catch (error) {
        console.error(error);
        return null;
      }
  }

  return {
    uploadProfile,
    uploadPost,
    submitUploadPost
  }
});
