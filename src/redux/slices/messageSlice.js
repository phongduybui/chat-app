import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: {
      reducer: (state, action) => {
        state.messages = action.payload;
      },
      prepare: (messages) => {
        return { payload: messages };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
