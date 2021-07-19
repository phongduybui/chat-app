import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roomModalReducer from './slices/roomModalSlice';
import roomReducer from './slices/roomSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isAddRoomVisible: roomModalReducer,
    rooms: roomReducer,
  },
});
