import React from 'react';
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = forwardRef((props, ref)=>{
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        setOpen: ()=>setOpen(true),
      };
    }
  )

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);
  
  return (
    <AnimatePresence>
    {open && 
      <motion.aside className='pop' 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {delay: 0.5}}}
      >
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
          exit={{opacity: 0, transition: {delay: 0}}}
          className='con'>{props.children}</motion.div>
        <motion.span 
          initial={{x: 50, opacity: 0}}
          animate={{x: 0, opacity: 1, transition: {delay: 1}}}
          className='close' onClick={()=>{setOpen(false)}}
        >close</motion.span>
      </motion.aside>
    }
    </AnimatePresence>
  );
});
export default Popup;

/*

forwardRef
1. 기존의 컴포넌트 함수를 대입형 함수로 바꾸고 `forwardRef()` 안쪽에 함수를 넣어준다.
2. 화살표 함수 두번째 인수로 ref 추가
3. `forwardRef(함수)` 내부에 `useImperativeHandle()` 추가
4. 해당 함수로 객체를 반환해서 부모 컴포넌트로 전달
6. 부모 컴포넌트의 `useRef()` 로 forwardRef에서 `return` 되는 자식 참조

*/

