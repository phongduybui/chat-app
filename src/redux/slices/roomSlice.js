import { createSlice } from '@reduxjs/toolkit';

const initialState = { roomList: [], selectedRoom: null };

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: {
      reducer: (state, action) => {
        state.roomList = action.payload;
      },
      prepare: (rooms) => {
        return { payload: rooms };
      },
    },
    setSelectedRoom: {
      reducer: (state, action) => {
        state.selectedRoom = action.payload;
      },
      prepare: (selectedRoom) => {
        return { payload: selectedRoom };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRooms, setSelectedRoom } = roomSlice.actions;

export default roomSlice.reducer;
