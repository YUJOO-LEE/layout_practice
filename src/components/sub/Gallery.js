import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';import axios from 'axios';
import Masonry from 'react-masonry-component';

export default function Gallery() {
  const key = '67f7c54ac9fe4dd292e245fbb1302b24';
  const methodInterest = 'flickr.interestingness.getList';
  const methodSearch = 'flickr.photos.search';
  const num = 20;

  const interestUrl = `https://www.flickr.com/services/rest/?method=${methodInterest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  const searchUrl = `https://www.flickr.com/services/rest/?method=${methodSearch}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=ocean`;

  const masonryOptions = {
    transitionDuration: '0.5s'
  }

  const [ Items, setItems ] = useState([]);
  const frame = useRef(null);

  async function getFlick(url) {
    const result = await axios.get(url);
    setItems(result.data.photos.photo);
    frame.current.classList.add('on');
  }

  useEffect(()=>{
    getFlick(interestUrl);
  }, [interestUrl]);

  /*

  쿼리 스트링

  사용자가 입력 데이터를 전달하는 방법 중 하나로 url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것이다.

  url에 붙여서 추가적인 정보(클라이언트가 어떤 특정 리소스에 점근하고 싶어하는지)를 서버에 전달한다.

  형식
  - 정해진 엔드포인트 주소 이후에 ?를 쓰는 것으로 쿼리스트링이 시작함을 알린다.
  - parameter = value 로 필요한 파라미터의 값을 표기한다.
  - 파라미터가 여러개일 경우 &를 붙여서 연결한다.
  - 엔드포인트 주소/추가 주소?파라미터=값&파라미터=값


  */

  return (
    <Layout name='gallery'>
      <button
        onClick={()=>{
          frame.current.classList.remove('on');
          getFlick(interestUrl);
        }}
      >
        Interest Gallery
      </button>
      <button
        onClick={()=>{
          frame.current.classList.remove('on');
          getFlick(searchUrl);
        }}
      >
        Search Gallery
      </button>
      
      <div className='frame' ref={frame}>
        <Masonry
          elementType={'div'}
          options={masonryOptions}
        >
        {Items.map((item, idx)=>{
          return (
            <article key={idx}>
              <div className='inner'>
                <div className='pic'>
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
                </div>
                <h2>{item.title}</h2>
              </div>
            </article>
          );
        })}
        </Masonry>
      </div>
    </Layout>
  );
}