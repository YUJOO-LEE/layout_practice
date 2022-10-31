import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Popup from '../common/Popup';

export default function Youtube() {

  const videos = useSelector(store=>store.youtube.data);
  const [index, setIndex] = useState(0);
  const pop = useRef(null);

  return (
    <>
      <Layout name='youtube'>
        {videos.map((data, index)=>{
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
        {videos.length > 0 && 
          <iframe title={videos[index].snippet.title} src={`https://www.youtube.com/embed/${videos[index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
        }
      </Popup>
    </>
  );
}