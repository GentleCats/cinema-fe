import { User } from '@/models/User';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUserData = (rootState: RootState) => rootState.user;

export default userSlice.reducer;
