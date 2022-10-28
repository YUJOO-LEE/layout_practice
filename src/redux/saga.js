/*

takeLatest (제일 마지막 요청만 수행)
takeEvery (모든 요청을 전부 수행)

all (saga 관련 메서드들을 비동기적으로 호출)
put (saga에서 만들어진 액션객체를 리듀서에 전달, redux의 dispatch)
fork (saga명령어 실행 함수)
call (saga에서 api관련 axios함수를 호출할 때 사용하는 함수, 두번째 인수값 전달 가능)

*/

import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMembers } from './api';
import * as types from './actionType';

// 컴포넌트에서 action타입 요청 시 app.js 에 있는 axios 함수를 연결해서 호출
function* returnFlickr(action) {
  try {
    // 컴포넌트에서 getFlickr에 필요한 옵션 객체값만 action에 담아서 전달하면 saga가 call메서드로 getFlickr를 호출하면서 액션으로 받은 옵션을 getFlickr에 바인딩
    const response = yield call(getFlickr, action.Option);
    yield put({type: types.FLICKR.success, payload: response.data.photos.photo});
  } catch (error) {
    yield put({type: types.FLICKR.fail, payload: error});
  }
}

// 요청받은 action 타입에 따라서 함수 호출
function* callFlickr() {
  // 컴포넌트에서 FLICKR_START타입 액션객체가 전달되면 해당 이벤트를 takeLatest가 받아서 returnFlickr 함수 호출
  yield takeLatest(types.FLICKR.start, returnFlickr);
}

function* returnYoutube() {
  try {
    const response = yield call(getYoutube);
    yield put({type: types.YOUTUBE.success, payload: response.data.items});  
  } catch (error) {
    yield put({type: types.YOUTUBE.fail, payload: error});
  }
}

function* callYoutube() {
  yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

function* returnMembers() {
  try {
    const response = yield call(getMembers);
    yield put({type: types.MEMBERS.success, payload: response.data.members});
  } catch (error) {
    yield put({type: types.MEMBERS.fail, payload: error});
  }
}

function* callMembers() {
  yield takeLatest(types.MEMBERS.start, returnMembers);
}


// store.js 에 의해 reducer에 미들웨어로 적용할 rootSaga 함수 생성
export default function* rootSaga(){
  yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}