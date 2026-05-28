import axios from "axios";

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

export default myAxios;