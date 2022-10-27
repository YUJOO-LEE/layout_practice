import { useEffect, useRef, useState } from 'react';
import Header from '../common/Header'
import News from './News';
import Members from './Members';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import Anime from '../../asset/anime';

export default function Main() {

  const main = useRef(null);
  const pos = useRef([]);
  const [ Index, setIndex ] = useState(null);
  const [ Scrolled, setScrolled ] = useState(0);


  useEffect(()=>{
    let secs;
    const getPos = ()=>{
      pos.current = [];
      secs = main.current?.querySelectorAll('.myScroll');
      for (const sec of secs) {
        pos.current.push(sec.offsetTop);
      }
    }

    const activation = ()=>{
      const base = window.innerHeight / 2 * -1;
      const scroll = window.scrollY || window.pageYOffset;
      const btns = main.current?.querySelectorAll('.scrollNavi li');

      setScrolled(scroll);
      
      pos.current.map((top, i)=>{
        if (scroll >= top + base) {
          for (let el of btns) el.classList.remove('on');
          for (let sec of secs) sec.classList.remove('on');
          secs[i].classList.add('on');
          btns[i].classList.add('on');
        }
        return false;
      });
    }
    
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
      <Members></Members>
      <Pics scrolled={Scrolled} start={pos.current[3]}></Pics>
      <Vids></Vids>
      <Btns setIndex={setIndex} curIndex={Index}></Btns>
    </main>
  );
}