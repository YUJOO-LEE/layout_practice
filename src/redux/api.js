import axios from "axios";


// 데이터 받아오기
export const getFlickr = async (Option)=>{

  const key = '67f7c54ac9fe4dd292e245fbb1302b24';
  const methodInterest = 'flickr.interestingness.getList';
  const methodSearch = 'flickr.photos.search';
  const methodUser = 'flickr.people.getPhotos';
  const num = 50;

  let url = '';
  if (Option.type === 'interest') {
    url = `https://www.flickr.com/services/rest/?method=${methodInterest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  } else if (Option.type === 'search') {
    url = `https://www.flickr.com/services/rest/?method=${methodSearch}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${Option.tags}`;
  } else if (Option.type === 'user') {
    url = `https://www.flickr.com/services/rest/?method=${methodUser}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${Option.userid}`;
  }
  
  // if (!isClickable) return;
  // setClickable(false);
  // setLoading(true);
  return await axios.get(url);
  // setItems(result.data.photos.photo);

  // setTimeout(() => {
  //   setLoading(false);
  //   frame.current.classList.add('on');
  //   setClickable(true);
  // }, 500);
}

export const getYoutube = async ()=>{
  const key = 'AIzaSyAt3DBaE5XF4k3YfvLH9Y3oz79C8M1xWu0';
  const playlist = 'PLtt429gshWMp4G-VhNTFhBzBTd7GOEz-G';
  const num = 6;  
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  return await axios.get(url);
}

export const getMembers = async ()=>{
  const url = `${process.env.PUBLIC_URL}/db/members.json`;
  return await axios.get(url);
}

/*

redux 로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에
부수효과를 발생시키지 않는 순수함수 형태로 제작해야 한다.

부수효과 (side effect)
DOM등 컴포넌트가 제어해야 하는 화면의 변경점을 야기시키는 효과
Vanilla JS가 아닌 web api가 개입하는 효과, 기능

순수함수 (pure Function)
부수효과를 발생시키지 않는 Vanilla JS로만 구현된 함수

*/