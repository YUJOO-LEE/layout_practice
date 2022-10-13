import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  const active = { color: 'red' };
  return (
    <header className={props.type}>
      <div className="inner">
        <h1>
          <NavLink exact to='/'>
            LOGO
          </NavLink>
        </h1>
        <ul id="gnb">
          <li>
            <NavLink exact to='/department' activeStyle={active}>
              Department
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/community' activeStyle={active}>
              Community
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/gallery' activeStyle={active}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/youtube' activeStyle={active}>
              Youtube
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/location' activeStyle={active}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/member' activeStyle={active}>
              Member
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

/*

Link
NavLink

모두 HTML a태그 대신 페이지 링크 기능을 하는 태그이다.

둘의 가장 큰 차이는 active 상태 반환이 가능하다는 것이다.

NavLink 는 activeStyle, activeClassName 등을 사용 가능하다.
- 라우터 버전 6부터는 active@ 가 삭제되고 style, className 만 사용 가능한데, 값에서 isActive 조건문으로 동일한 기능 구현이 가능하다.

*/