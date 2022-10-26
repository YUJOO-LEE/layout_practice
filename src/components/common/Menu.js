import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom'

const Menu = forwardRef((props, ref)=>{

  const [ open, setOpen ] = useState(false);
  const active = { color: 'orange' };
  useImperativeHandle(ref, ()=>{
    return {
      toggle: ()=>{setOpen(!open)}
    }
  })

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      const width = window.innerWidth;
      if (width > 1179) {
        setOpen(false);
      }
    })
  }, [])

  return (
    <AnimatePresence>
    {open && 
      <motion.nav id='mobileMenu'
        initial={{x: -320, opacity: 0}}
        animate={{x: 0, opacity: 1, transition: {duration: 0.5}}}
        exit={{x: -320, opacity: 0, transition: {duration: 0.5}}}
        onClick={()=>setOpen(false)}
      >
        <h1>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/img/logo_w.png`} alt='LOGO' />
          </Link>
        </h1>
        <ul id='gnb'>
          <li>
            <NavLink to='/department' activeStyle={active}>
              Department
            </NavLink>
          </li>
          <li>
            <NavLink to='/community' activeStyle={active}>
              Community
            </NavLink>
          </li>
          <li>
            <NavLink to='/gallery' activeStyle={active}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to='/youtube' activeStyle={active}>
              Youtube
            </NavLink>
          </li>
          <li>
            <NavLink to='/location' activeStyle={active}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink to='/member' activeStyle={active}>
              Member
            </NavLink>
          </li>
        </ul>
      </motion.nav>
    }
    </AnimatePresence>
  );
})
export default Menu;