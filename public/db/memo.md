axios vs fetch

서드파티 라이브러리 설치 필요

XSRF qhghgowna

data 속성 사용

data object 포함

자동으로 json 데이터 

요청취소 가능 타임아웃 가능

HTTP 요청 가로챌 수 있음

download 요청에 대해 기본적인 지원



import axios from 'axios';

axios.get(경로).then((json)=>{
  받아온 데이터 처리;
})


useEffect 로 랜더링 할때 적용
