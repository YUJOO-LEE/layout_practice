import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector } from 'react-redux';

export default function Youtube() {

  const vids = useSelector(store => store.youtubeReducer.youtube);
  // 최초 렌더링 시 store는 초기값인 빈 배열이다가 렌더 후 store에 담겨서 변화됨
  const [index, setIndex] = useState(0);
  const pop = useRef(null);


  // 초기값을 배열로 넣어주었으므로 옵셔널 체이닝 불필요
  return (
    <>
      <Layout name='youtube'>
        {vids.map((data, index)=>{
          let title = data.snippet.title;
          let description = data.snippet.description;
          let date = data.snippet.publishedAt;

          if(title.length > 30) title = title.substring(0, 30) + '...';
          if(description.length > 100) description = description.substring(0, 100) + '...';
          date = date.split('T')[0];

          return (
            <article key={index}>
              <div className="txt">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
              </div>
              <div className="pic" onClick={()=>{ pop.current.setOpen(true); setIndex(index)}}>
                <img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
              </div>
            </article>
          );
        })}
      </Layout>
      <Popup ref={pop}>
        {vids.length > 0 && 
          <iframe title={vids[index].snippet.title} src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
        }
      </Popup>
    </>
  );
}