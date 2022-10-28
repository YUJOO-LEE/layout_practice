import './scss/style.scss';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// common
import Footer from './components/common/Footer';
import Header from './components/common/Header';

// main
import Main from './components/main/Main';

// sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Youtube from './components/sub/Youtube';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'MEMBERS_START',
    });
    dispatch({
      type: 'FLICKR_START',
      Option: {type: 'interest'}
    });
    dispatch({
      type: 'YOUTUBE_START',
    });
  }, [])
  // 최초 렌더링 후 store에 youtube 데이터가 저장됨

  return (
    <>
      {/* 

      Switch 는 같은 경로의 라우터 연결 시 구체적인 라우터 하나만 적용한다.
      한개의 컴포넌트로 경로 별 출력 내용을 구분하기 위해 prop으로 구분 값을 넘긴다.

      **exact**
      정확하게 그 경로일 때만 불러오기.
      없으면 path로 시작하는 모든 경로에 불러온다.

       */}
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/' render={()=><Header type={'sub'} />}></Route>
      </Switch>

      <Route path='/department' component={Department} />
      <Route path='/youtube' component={Youtube} />
      <Route path='/gallery' component={Gallery} />
      <Route path='/community' component={Community} />
      <Route path='/location' component={Location} />
      <Route path='/member' component={Member} />
      
      <Footer />
    </>
  );
}

export default App;


/*

라우터

*/