import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFlickr = createAsyncThunk(
  'flickr/requestFlickr',
  async (option)=>{
    const key = '67f7c54ac9fe4dd292e245fbb1302b24';
    const methodInterest = 'flickr.interestingness.getList';
    const methodSearch = 'flickr.photos.search';
    const methodUser = 'flickr.people.getPhotos';
    const num = 50;

    let url = '';
    if (option.type === 'interest') {
      url = `https://www.flickr.com/services/rest/?method=${methodInterest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    } else if (option.type === 'search') {
      url = `https://www.flickr.com/services/rest/?method=${methodSearch}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${option.tags}`;
    } else if (option.type === 'user') {
      url = `https://www.flickr.com/services/rest/?method=${methodUser}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${option.userid}`;
    }

    const response = await axios.get(url);
    return response.data.photos.photo;
  }
);

const flickrSlice = createSlice({
  name: 'flickr',
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchFlickr.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFlickr.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchFlickr.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export default flickrSlice.reducer;