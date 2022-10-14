import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faBars } from '@fortawesome/free-solid-svg-icons' 


export default function Header(props) {
  const active = { color: 'orange' };
  return (
    <header className={props.type}>
      <div className="inner">
        <h1>
          <Link to='/'>
            LOGO
          </Link>
        </h1>
        <ul id="gnb">
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
        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
}

/*

Link
NavLink

모두 HTML a태그 대신 페이지 링크 기능을 하는 태그이다.

둘의 가장 큰 차이는 active 상태 반환이 가능하다는 것이다.

NavLink 는 activeStyle, activeClassName 등을 사용 가능하다.
- 라우터 버전 6부터는 active@ 가 삭제되고 style, className 만 사용 가능한데, 값에서 isActive 조건문으로 동일한 기능 구현이 가능하다.

*/