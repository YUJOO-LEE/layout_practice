import { useEffect, useRef, useState } from 'react';
import Header from '../common/Header'
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import Anime from '../../asset/anime';

export default function Main() {

  const main = useRef(null);
  const pos = useRef([]);
  const [ Index, setIndex ] = useState(null);
  const getPos = ()=>{
    pos.current = [];
    const secs = main.current.querySelectorAll('.myScroll');
    for (const sec of secs) {
      pos.current.push(sec.offsetTop);
    }
  }

  const activation = ()=>{
    let scroll = window.scrollY || window.pageYOffset;
    const btns = main.current.querySelectorAll('.scrollNavi li');
    
    pos.current.map((top, i)=>{
      if (scroll >= top - 81) {
        for (let el of btns) {
          el.classList.remove('on');
        }
        btns[i].classList.add('on');
      }
    });
  }

  useEffect(()=>{
    getPos();
    window.addEventListener('resize', getPos);
    activation();
    window.addEventListener('scroll', activation);
    
    return (()=>{
      window.removeEventListener('resize', getPos);
    });
  }, [])

  useEffect(()=>{
    new Anime(window, {
      prop: 'scroll',
      value: pos.current[Index],
      duration: 500
    })
  }, [Index])

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
      <Btns setIndex={setIndex} curIndex={Index}></Btns>
    </main>
  );
}