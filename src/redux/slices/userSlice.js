import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const initialState = { userInfo: null };

export const createUser = createAsyncThunk(
  'user/createUser',
  async (params) => {
    await auth.createUserWithEmailAndPassword(params.email, params.password);
    await auth.currentUser.updateProfile({
      displayName: params.name,
      photoURL: `https://ui-avatars.com/api/?background=random&color=fff&name=${params.name}`,
    });

    const { uid, displayName, photoURL, email, providerId } = auth.currentUser;

    await addDocument('users', {
      uid,
      displayName,
      photoURL,
      email,
      providerId,
      keywords: generateKeywords(displayName.toLowerCase()),
    });

    return {
      uid,
      displayName,
      photoURL,
      email,
    };
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInAction: {
      reducer: (state, action) => {
        state.userInfo = action.payload;
      },
      prepare: (user) => {
        return { payload: user };
      },
    },
    signOutAction: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loadingCreate = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.userInfo = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loadingCreate = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { signInAction, signOutAction } = userSlice.actions;

export default userSlice.reducer;
