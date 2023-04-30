import { createSlice } from '@reduxjs/toolkit';
import { connectSocket } from './socket';

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const connectSocketThunk = (address) => (dispatch) => {
  const socket = connectSocket(address);

  dispatch(setSocket(socket));
};

export default socketSlice.reducer;
