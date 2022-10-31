import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//fetch 함수 정의
export const fetchMembers = createAsyncThunk(
  // 고유 문자값 등록 (내부적으로 actionType 생성 시 활용)
  'members/requestMembers',
  // 비동기 데이터 호출 함수
  async ()=>{
    const url = `${process.env.PUBLIC_URL}/db/members.json`;
    const response = await axios.get(url);
    return response.data.members;
  }
);

// slice 함수 생성
const membersSlice = createSlice({
  // 내부적으로 Reducer 생성 시 관리할 데이터가 들어갈 프로퍼티
  name: 'members',
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchMembers.pending]: (state)=>{
      state.isLoading = true;
    },
    [fetchMembers.fulfilled]: (state, action)=>{
      state.isLoading = false;
      state.data = action.payLoad;
    },
    [fetchMembers.rejected]: (state)=>{
      state.isLoading = false;
    }
  }
});

export default membersSlice.reducer;