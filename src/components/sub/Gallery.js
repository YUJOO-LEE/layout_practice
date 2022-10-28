import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';import axios from 'axios';
import Masonry from 'react-masonry-component';
import Popup from '../common/Popup';
import { useSelector, useDispatch } from 'react-redux';

export default function Gallery() {

	const dispatch = useDispatch();
	//store 부터 전역 flickr데이터를 가져옴
	const Items = useSelector(store => store.flickrReducer.flickr);

  const [ Option, setOption ] = useState({type: 'interest'});
  const masonryOptions = { transitionDuration: '0.5s' };
  const [ Loading, setLoading ] = useState(true);
  const [ isClickable, setClickable ] = useState(true);
  const [ index, setIndex ] = useState(0);
  
  const frame = useRef(null);
  const searchInput = useRef(null);
  const pop = useRef(null);

  // 검색창 submit 처리
  const showSearch = (e)=>{
    e.preventDefault();
    if (!isClickable) return;
    setClickable(false);
    setLoading(true);
    const keyword = searchInput.current.value.trim();
    if (!keyword) {
      searchInput.current.style.border = '2px solid red';
      return false;
    } else {
      searchInput.current.style.border = '';
    }
    frame.current.classList.remove('on');
    setOption({type: 'search', tags: keyword});
    searchInput.current.value = '';
  };

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


  // interest 리스트 출력
  const showInterest = ()=>{
    if (!isClickable) return;
    setClickable(false);
    setLoading(true);
		frame.current.classList.remove('on');
    setOption({type: 'interest'});
  };

  // user별 리스트 출력
  const showUser = (userId)=>{
    if (!isClickable) return;
    setClickable(false);
    setLoading(true);
    frame.current.classList.remove('on');
    setOption({type: 'user', userid: userId});
  };

  // 기본 데이터 interest로 뿌려주기
  useEffect(()=>{
    setOption({type: 'interest'});

    // // 언마운트시 cleanup
    // return(()=>{
    //   setOption(null);
    // })
  }, []);

  // Option state값이 변경될때마다 해당 구문 호출
  // dispatch로 saga에 'FLICKR_START'라는 액션타입으로 Option 정보값을 전달
  useEffect(()=>{
    dispatch({type: 'FLICKR_START', Option});
  }, [Option]);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
      frame.current.classList.add('on');
      setClickable(true);
    }, 500);
  }, [Items]);

  return (
    <>
    <Layout name='gallery'>
      {Loading && 
        <img src={`${process.env.PUBLIC_URL}/img/spinner.gif`} className='loading' alt='' />
      }
      <div className="controls">
        <nav>
          <button onClick={showInterest}>
            Interest Gallery
          </button>
          <button onClick={()=>showUser('196649511@N03')}>
            My Gallery
          </button>
        </nav>
        <div className="searchBox">
          <form action="#" onSubmit={showSearch}>
            <input type="text"
              ref={searchInput}
              placeholder='검색어를 입력하세요' 
            />
            <button type='submit'>Search</button>
          </form>
        </div>
      </div>
      
      <div className='frame' ref={frame}>
        <Masonry
          elementType={'div'}
          options={masonryOptions}
        >
        {Items.length ? Items.map((item, idx)=>{
          return (
            <article key={idx}>
              <div className='inner'>
                <div className='pic' onClick={()=>{
                  pop.current.setOpen();
                  setIndex(idx);
                  }}>
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
                </div>
                <h2>{item.title}</h2>
                <div className="profile">
                  <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner} onError={(e)=>{
                    e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
                  }} />
                  <span onClick={()=>showUser(item.owner)}>{item.owner}</span>
                </div>
              </div>
            </article>
          );
        })
        : <div className='noData'>검색된 데이터가 없습니다.</div>
        }
        </Masonry>
      </div>
    </Layout>

    <Popup ref={pop}>
      {Items.length > 0 &&
        <img src={`https://live.staticflickr.com/${Items[index].server}/${Items[index].id}_${Items[index].secret}_b.jpg`} alt={Items[index].title} />
      }
    </Popup>
  </>
  );
}
