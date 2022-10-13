export default function Layout(props) {

  // 문자열 + js 동시 사용(백틱 사용) 시 중괄호로 백틱을 감싸준다.
  return (
    <section className={`content ${props.name}`}>
      <figure></figure>
      <div className='inner'>
        <h1>{props.name}</h1>
        {props.children}
      </div>
    </section>
  );
}

// children = innerHTML