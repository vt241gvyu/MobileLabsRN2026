import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { saveUser } = usersSlice.actions;

export default usersSlice.reducer;
