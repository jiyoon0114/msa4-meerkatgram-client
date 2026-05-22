import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore('myErrorStore', () => {
    // 1.State (ref)
    const isError = ref(false);
    const errorCode = ref('');
    const errorMsg = ref('');

    // 2. Getter (computed)

    // 3. Actions (function)
    const setErrorInfo = (error) => {
        // ?. : error에 response가 있으면 data에 접근하고 없으면 접근 하지 마라
        const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message:'예기치 못한 에러 발생했습니다'};
        errorCode.value = errorData.code;
        errorMsg.value = errorData.message;
        isError.value = true;
    }

    const clearErrorInfo = () => {
        errorCode.value = '';
        errorMsg.value = '';
        isError.value = false;
    }

    return {
        isError,
        errorCode,
        errorMsg,
        setErrorInfo,
        clearErrorInfo
    }
});