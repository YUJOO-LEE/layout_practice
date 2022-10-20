import React, { useRef } from 'react';
import Anime from '../../asset/anime';

const btn = {
  position: 'absolute',
  top: 120,
  left: 100
}

export default function Visual(){

  const box = useRef(null);

  return (
    <figure id='visual' className='myScroll'>
      <button 
        style={btn}
        onClick={()=>{
          new Anime(window, {
            prop: 'scroll',
            value: 1000,
            duration: 500
          })
        }}
      >Click</button>
    </figure>
  );

}