import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Popup from '../common/Popup';

export default function Pics(props) {

  const pop = useRef(null);
  const [ Index, setIndex ] = useState(0);
  const Pics = useSelector(store=> store.flickrReducer.flickr);
  const position = (props.scrolled - props.start) || 0;
  const pics = useRef(null);
  //const picsWidth = pics.current?.offsetWidth;
  const picsHeight = window.innerHeight;

  return (
    <>
    <main id='pics' className='myScroll' ref={pics}>
      <h1 style={{left: position / picsHeight * 200 + '%', opacity: position / picsHeight + 1}}>FLICKR</h1>
      <h2 style={{top: Math.min(position / picsHeight * 200, 100) + '%', opacity: position / picsHeight + 1}}>{position}, {picsHeight}</h2>
      <p style={{left: position}}></p>

      <ul>
        {Pics?.map((pic, idx)=>{
          if (idx > 3) return;
          return (
            <li key={pic.id} onClick={()=>{
              pop.current.setOpen();
              setIndex(idx);
              }}>
              <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
            </li>
          );
        })}
      </ul>
    </main>

    <Popup ref={pop}>
      {Pics?.length > 0 &&
        <img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
      }
    </Popup>
    </>
  );
}