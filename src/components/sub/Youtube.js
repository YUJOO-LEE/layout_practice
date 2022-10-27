import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Popup from '../common/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { setYoutube } from '../../redux/action';

export default function Youtube() {

  const [index, setIndex] = useState(0);
  const pop = useRef(null);
  const dispatch = useDispatch();
  const vids = useSelector(store => store.youtubeReducer.youtube);

  useEffect(() => {
    const key = 'AIzaSyAKqZ1Dx9awi1lCS84qziASeQYZJqLxLSM';
    const playlist = 'PLtt429gshWMp4G-VhNTFhBzBTd7GOEz-G';
    const num = 6;  
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    axios.get(url).then((json)=>{
      dispatch(setYoutube(json.data.items));
    })
  }, [])

  return (
    <>
      <Layout name='youtube'>
        {vids?.map((data, index)=>{
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
        {vids?.length > 0 && 
          <iframe title={vids[index].snippet.title} src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
        }
      </Popup>
    </>
  );
}