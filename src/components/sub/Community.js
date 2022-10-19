import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

export default function Community() {

  /*
  페이지 데이터 저장

  1. 서버 DB로 저장

  2. 브라우저 내 Local stolage 내 저장
  - 저장 : localStorage.setItem('key', 'value');
  - 읽기 : localStorage.getItem('key');
  - 삭제 : localStorage.removeItem('key');
  - 전체 삭제 : localStorage.clear();

  객체의 경우 JSON.stringfy()로 문자열로 변환 후 사용 가능하다.
  만료기간이 없어서 임의로 삭제하지 않는 이상 데이터가 브라우저에 영구적으로 남아있다.
  */

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

  const input = useRef(null);
  const textarea = useRef(null);
  const editInput = useRef(null);
  const editTextarea = useRef(null);

  const [ posts, setPosts ] = useState(getLocalData());

  const resetForm = () => {
    input.current.value = '';
    textarea.current.value = '';
  }

  const createPost = () => {
    const title = input.current.value.trim();
    const content = textarea.current.value.trim();

    if (!title || !content) return;

    setPosts([
      {"title": title, "content": content},
      ...posts
    ])

    resetForm();
  };

  const editPost = (index) => {
    const title = editInput.current.value.trim();
    const content = editTextarea.current.value.trim();

    if (!title || !content) return;

    // const newData = posts.slice();
    // newData[index] = {"title": title, "content": content, "enableUpdate": false};
    setPosts(posts.map((data, i)=>{
      if (i === index) {
        data.title = title;
        data.content = content;
        data.enableUpdate = false;
      }
      return data;
    }));
  }

  const enableUpdate = (index) => {
    setPosts(posts.map((data, i)=>{
        if (i === index) {
          data.enableUpdate = true;
        } else {
          data.enableUpdate = false;
        };
        return data;
      })
    );
  }

  const disableUpdate = (index) => {
    setPosts(posts.map((data, i)=>{
        if (i === index) data.enableUpdate = false;
        return data;
      })
    );
  }

  const deletePost = (index) => {
    // const newData = posts.slice().splice(index, 1);
    // setPosts(newData);

    setPosts(posts.filter((_, i)=> i !== (index)));

    /*
    filter(함수)
    요소를 돌면서 함수의 조건을 통과하는 값만 return시켜 새로운 배열으로 반환
    */
  }

  useEffect(()=>{
    localStorage.setItem('post', JSON.stringify(posts));
  }, [posts])

  return (
    <Layout name="community">
      <div className="inputBox">
        <input type="text" 
          placeholder="제목을 입력하세요" 
          ref={input} />
        <textarea 
          placeholder="본문을 입력하세요"
          ref={textarea}
          rows='5'
        ></textarea>
        <div className="btnSet">
          <button onClick={resetForm}>CANCLE</button>
          <button onClick={createPost}>WRITE</button>
        </div>
      </div>
      <div className="listBox">
          {posts.length && posts.map((data, i)=>{
            return (
              <article key={i}>
                {data.enableUpdate
                  ? <>
                    <div className="editTxt">
                      <input
                      type="text"
                      defaultValue={data.title} 
                      ref={editInput} 
                      />
                      <textarea 
                      rows="5" 
                      defaultValue={data.content}
                      ref={editTextarea} 
                      ></textarea>
                    </div>
                    <div className='editBtnSet'>
                      <button onClick={()=>{disableUpdate(i)}}>CANCLE</button>
                      <button onClick={()=>{editPost(i)}}>UPDATE</button>
                    </div>
                    </>
                  : <>
                    <div className="txt">
                      <h3>{i}{data.title}</h3>
                      <p>{data.content}</p>
                    </div>
                    <div className='btnSet'>
                      <button onClick={()=>{enableUpdate(i)}}>EDIT</button>
                      <button onClick={()=>{deletePost(i)}}>DELETE</button>
                    </div>
                    </>
                  }
              </article>
            );
          })}
      </div>
    </Layout>
  );
}
