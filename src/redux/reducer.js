// 전역 공간에 초기 데이터 전달 / 기존 데이터 변경
import { combineReducers } from 'redux';

const initMember = {
  "members": [
    {
      "name": "Julia",
      "position": "President",
      "pic": "member1.jpg"
    },
    {
      "name": "David",
      "position": "Vice President",
      "pic": "member2.jpg"
    },
    {
      "name": "Emily",
      "position": "UI Designer",
      "pic": "member3.jpg"
    },
    {
      "name": "Paul",
      "position": "Front-end Engineer",
      "pic": "member4.jpg"
    },
    {
      "name": "Sara",
      "position": "Back-end Engineer",
      "pic": "member5.jpg"
    },
    {
      "name": "Michael",
      "position": "Project Manager",
      "pic": "member6.jpg"
    }
  ]
}


// 초기 데이터를 state 에 저장했다가 action객체가 전달되면 type에 따라서 기존 데이터 변경
const memberReducer = (state=initMember, action)=>{
  switch(action.type){
    case 'SET_MEMBERS':
      return { ...state, members: action.payload }
    
    default:
      return state;
  }
}

const youtubeReducer = (state=[], action)=>{
  switch(action.type){
    case 'SET_YOUTUBE':
      return{
        ...state, youtube: action.payload
      }

    default:
      return state;
  }
}


// 각각의 reducer 데이터를 하나로 합쳐서 반환
const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
