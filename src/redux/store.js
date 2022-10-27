import { createStore } from 'redux';
import reducers from './reducer';

// store 공간을 생성한 다음 전달된 reducers 를 저장해서 내보냄

const store = createStore(reducers);

export default store;