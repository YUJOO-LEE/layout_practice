import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Pics(props) {

  const Pics = useSelector(store=> store.flickrReducer.flickr);
  const position = (props.scrolled - props.start) || 0;
  const pics = useRef(null);
  //const picsWidth = pics.current?.offsetWidth;
  const picsHeight = window.innerHeight;
  const docHeight = document.innerHeight;

  return (
    <main id='pics' className='myScroll' ref={pics}>
      <h1 style={{left: position / picsHeight * 200 + '%', opacity: position / picsHeight + 1}}>FLICKR</h1>
      <h2 style={{top: Math.min(position / picsHeight * 200, 100) + '%', opacity: position / picsHeight + 1}}>{position}, {picsHeight}</h2>
      <p style={{left: position}}></p>

      <ul>
        {Pics.map((pic, idx)=>{
          if (idx > 3) return;
          return (
            <li key={pic.id}>
              <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}