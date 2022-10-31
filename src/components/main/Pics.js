import React, { useRef } from 'react';

export default function Pics(props) {

  const position = (props.scrolled - props.start) || 0;
  const pics = useRef(null);
  //const picsWidth = pics.current?.offsetWidth;
  const picsHeight = window.innerHeight;

  return (
    <main id='pics' className='myScroll' ref={pics}>
      <h1 style={{left: position / picsHeight * 200 + '%', opacity: position / picsHeight + 1}}>FLICKR</h1>
      <h2 style={{top: Math.min(position / picsHeight * 200, 100) + '%', opacity: position / picsHeight + 1}}>{position}, {picsHeight}</h2>
      <p style={{left: position}}></p>
    </main>
  );
}