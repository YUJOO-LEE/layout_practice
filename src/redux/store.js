import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from '@redux-saga/core';

// 미들웨어로 적용할 saga파일 Import (비동기 데이터 대신 호출해서 결과값을 action 객체로 반환)
import rootSaga from './saga';

// store 공간을 생성한 다음 전달된 reducers 를 저장해서 내보냄
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// saga 작업물이 saga 미들웨어를 통해서 적용되도록 인수 전달
sagaMiddleware.run(rootSaga);
export default store;