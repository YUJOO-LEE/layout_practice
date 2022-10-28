// 전역 공간에 초기 데이터 전달 / 기존 데이터 변경
import { combineReducers } from 'redux';


const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return state;

		case 'FLICKR_SUCCESS':
			return { ...state, flickr: action.payload }

		case 'FLICKR_FAIL':
			return { ...state, flickr: action.payload }

		default:
			return state;
	}
}

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'YOUTUBE_START':
			return state;

		case 'YOUTUBE_SUCCESS':
			return { ...state, youtube: action.payload }

		case 'YOUTUBE_FAIL':
			return { ...state, youtube: action.payload }

		default:
			return state;
	}
}

// 초기 데이터를 state 에 저장했다가 action객체가 전달되면 type에 따라서 기존 데이터 변경
const memberReducer = (state={members: []}, action)=>{
  switch(action.type){
		case 'MEMBERS_START':
			return state;

		case 'MEMBERS_SUCCESS':
			return { ...state, members: action.payload }

		case 'MEMBERS_FAIL':
			return { ...state, members: action.payload }

		default:
			return state;
  }
}

// 각각의 reducer 데이터를 하나로 합쳐서 반환
const reducers = combineReducers({ memberReducer, youtubeReducer, flickrReducer });

export default reducers;
