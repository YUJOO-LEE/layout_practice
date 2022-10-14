import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Youtube() {

  const key = 'AIzaSyAKqZ1Dx9awi1lCS84qziASeQYZJqLxLSM';
  const playlist = 'PLtt429gshWMp4G-VhNTFhBzBTd7GOEz-G';
  const num = 6;  
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(url).then((json)=>{
      setVideos(json.data.items);
    })
  }, [])

  return (
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
            <div className="pic">
              <img src={data.snippet.thumbnails.standard.url} alt={title} />
            </div>
          </article>
        );
      })}
    </Layout>
  );
}