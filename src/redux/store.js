import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roomModalReducer from './slices/roomModalSlice';
import roomReducer from './slices/roomSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isAddRoomVisible: roomModalReducer,
    rooms: roomReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
