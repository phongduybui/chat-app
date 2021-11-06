import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screen: 'chat-list',
  // screen === 'chat-list' || 'chat-content' || 'chat-info'
  //(3 sections on ChatPage)
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
    resetScreens: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatScreenMobile, resetScreens } = chatScreenSlice.actions;

export default chatScreenSlice.reducer;
