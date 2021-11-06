import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchListImageInRoom, fetchUserByUID } from '../../firebase/services';

const initialState = {
  roomList: [],
  selectedRoom: null,
  roomMembers: [],
  roomImages: [],
};

export const fetchMembersInRoom = createAsyncThunk(
  'rooms/fetchMembersInRoom',
  async (params, thunkAPI) => {
    const membersId = thunkAPI.getState().rooms.selectedRoom?.members || [];
    const promiseArray = membersId.map((uid) => fetchUserByUID(uid));
    const users = await Promise.all(promiseArray);

    return users;
  }
);

export const fetchImagesShared = createAsyncThunk(
  'rooms/fetchImagesShared',
  async (params, thunkAPI) => {
    const images = await fetchListImageInRoom(params.roomId);
    return images;
  }
);

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
    resetRoom: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembersInRoom.fulfilled, (state, action) => {
      state.roomMembers = action.payload;
    });
    builder.addCase(fetchImagesShared.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchImagesShared.fulfilled, (state, action) => {
      state.loading = false;
      state.roomImages = action.payload;
    });
    builder.addCase(fetchImagesShared.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setRooms, setSelectedRoom, resetRoom } = roomSlice.actions;

export default roomSlice.reducer;
