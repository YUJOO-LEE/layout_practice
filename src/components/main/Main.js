import { useEffect, useRef } from 'react';
import Header from '../common/Header'
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

export default function Main() {

  const main = useRef(null);
  const pos = useRef([]);
  const getPos = () => {
    const secs = main.current.querySelectorAll('.myScroll');
    for (const sec of secs) {
      pos.current.push(sec.offsetTop);
    }
    console.log(pos.current);
  }

  useEffect(()=>{
    getPos();
  }, [])

  /*

  리얼돔 사용
  - input focus, 특정 DOM 크기 측정 등

  document.querySelector - 명령형 (찾는 경로 지정)
  ref.current.querySelector - 선언형 (ref 내에서 알아서 검색)
  
  */

  return (
    <main ref={main}>
      <Header type={'main'}></Header>
      <Visual></Visual>
      <News></News>
      <Pics></Pics>
      <Vids></Vids>
    </main>
  );
}