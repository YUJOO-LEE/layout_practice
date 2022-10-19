import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

export default function Community() {

  const dummyPosts = [
    { title: 'HELLO1', content: "HERE COMES DESCRIPTION DETAIL."},
    { title: 'HELLO2', content: "HERE COMES DESCRIPTION DETAIL."},
    { title: 'HELLO3', content: "HERE COMES DESCRIPTION DETAIL."},
    { title: 'HELLO4', content: "HERE COMES DESCRIPTION DETAIL."},
    { title: 'HELLO5', content: "HERE COMES DESCRIPTION DETAIL."}
  ]

  const input = useRef(null);
  const textarea = useRef(null);
  const editInput = useRef(null);
  const editTextarea = useRef(null);

  const [ posts, setPosts ] = useState(dummyPosts);

  const resetForm = () => {
    input.current.value = '';
    textarea.current.value = '';
  }

  const createPost = () => {
    const title = input.current.value.trim();
    const content = textarea.current.value.trim();

    if (!title || !content) return;

    setPosts([...posts,
      {"title": title, "content": content}
    ])

    resetForm();
  };

  const editPost = (id) => {
    const title = editInput.current.value.trim();
    const content = editTextarea.current.value.trim();

    if (!title || !content) return;

    const newData = posts.slice();
    newData[id] = {"title": title, "content": content, "enableUpdate": false};
    setPosts(newData);
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
    console.log(posts);
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
          {posts.slice().map((data, i)=>{
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
                      <h3>{data.title}</h3>
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
