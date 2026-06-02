import axios from "axios";
import { useAuthStore } from "../pages/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const myAxios = axios.create({
  // Axios 호출 시, url 가장 앞에 자동으로 연결해서 동작
  // 배포용 테스트용 url이 다르기 때문에 env에 변수값 저장하고 불러옴
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    // 우리가 보내는 데이터 타입이 json이라는 소리
    'Content-Type':'application/json',
  },

  // 크로스 도메인(서로 다른 도메인)에 요청을 보낼때, 
  // credential 정보를 담아서 보낼지 여부를 설정하는 값
  //    credential 정보: cookies, header authorization 항목 등등
  withCredentials: true,  
});

// myAxios가 서버에 요청 보내기 전에 하는 처리
// config: axios 보낼때 들어가 있는 모든 정보를 가짐
myAxios.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  let accessToken = authStore.accessToken;
  const denyUrl = /^\/api\/reissue-token$/; // 리트라이 제외 URL 설정 -> 무한 루프 방지
  
  if(!denyUrl.test(config.url) && authStore.isLoggedIn) {
    // 액세스 토큰 만료 확인
    const claims = jwtDecode(accessToken);
    // 현재 시간의 유닉스 타임스탬프 반환
    const now = dayjs().unix();
    // claims의 exp를 dayjs unix에 맞게 포멧 맞추고 5분빽고
    const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

    if(now >= expTime) {
      try {
        await authStore.reissue();
        accessToken = authStore.accessToken;
      } catch (error) {
        console.error(error?.response);
      }
    }
  } 
  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default myAxios;