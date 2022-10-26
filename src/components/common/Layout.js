import { useRef, useEffect } from 'react';

export default function Layout(props) {
  const frame = useRef(null);
  useEffect(()=>{
    // 마운트 되었을 때
    frame.current.classList.add('on');

    return ()=>{
      // 언마운트 되었을 때 특수경우 아니면 잘 쓰지 않음
    }
  }, []);
  // useEffect(콜백함수, 뎁스: 함수 반복시 사용);


  // 문자열 + js 동시 사용(백틱 사용) 시 중괄호로 백틱을 감싸준다.
  return (
    <section className={`content ${props.name}`} ref={frame}>
      <figure>
        <img src={`${process.env.PUBLIC_URL}/img/${props.name}.jpg`}></img>
      </figure>
      <div className='inner'>
        <h1>{props.name}</h1>
        {props.children}
      </div>
    </section>
  );
}


/*

useEffect

- 컴포넌트가 마운트 되었을 때

=> 처음 나타났을 때
=> props로 받은 값을 컴포넌트의 로컬 상태로 설정할 때
=> 외부 API요청이 있을 때
=> setInterval, setTimeout 통해 작업이 예약될 때

- 컴포넌트가 언마운트 되었을 때

=> 사라질 때
=> clearInterval, clearTimeout 되었을 때
=> 라이브러리 인스턴스가 제거 되었을 때

- 컴포넌트가 업데이트 되었을 때

=> 특정 props가 바뀔 때


*/