import React from 'react';
import { useSelector } from 'react-redux';

export default function Members() {

  const Members = useSelector((store)=>{
    return (store.memberReducer.members);
  });


  return (
    <main id='members' className='myScroll'>
      <h1>Members</h1>
      {Members.map((member, idx)=>{
        if(idx > 2) return false;

        return (
          <article key={idx}>
            <div className="inner">
              <div className="pic">
                <img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          </article>
        );
      })}
    </main>
  );
}