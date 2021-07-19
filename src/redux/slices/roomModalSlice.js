import { createSlice } from '@reduxjs/toolkit';

const initialState = { isVisible: false };

export const roomModalSlice = createSlice({
  name: 'roomModal',
  initialState,
  reducers: {
    setRoomModalVisible: {
      reducer: (state, action) => {
        state.isVisible = action.payload;
      },
      prepare: (isVisible) => {
        return { payload: isVisible };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoomModalVisible } = roomModalSlice.actions;

export default roomModalSlice.reducer;
