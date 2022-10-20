import React, { useEffect, useState } from 'react';

export default function News() {

  const getLocalData = () => {
    const dummyPosts = [
      { title: 'TITLE01', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE02', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE03', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE04', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE05', content: "HERE COMES DESCRIPTION IN DETAILS."}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }

  const [ Posts ] = useState(getLocalData());

  useEffect(()=>{
    localStorage.setItem('post',JSON.stringify(Posts));
  }, []);

  return (
    <main id='news' className='myScroll'>
      <h1>News</h1>
      {Posts.map((post, i)=>{
        if(i > 4) return;

        return (
          <article key={i}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </article>
        );
      })}
    </main>
  );
}