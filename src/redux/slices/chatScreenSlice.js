import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screen: 'chat-list',
};

export const chatScreenSlice = createSlice({
  name: 'chatScreen',
  initialState,
  reducers: {
    setChatScreenMobile: {
      reducer: (state, action) => {
        state.screen = action.payload;
      },
      prepare: (screen) => {
        return { payload: screen };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatScreenMobile } = chatScreenSlice.actions;

export default chatScreenSlice.reducer;
