import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInAction: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: (user) => {
        return { payload: user };
      },
    },
    signOutAction: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInAction, signOutAction } = authSlice.actions;

export default authSlice.reducer;
