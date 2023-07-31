import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  matched : false
};

const socketSlice = createSlice({
  name: "socketReducer",
  initialState: initialState,
  reducers: {
    updateSocket(state, action) {
      console.log(
        "in reduxx============>",
        action.payload,
        "fffffffffffdfsdsdsd"
      );
      state.socket = action.payload;
    },
    setIsMatched(state,action){
      state.matched = action.payload;
    }
  },
});

export const { updateSocket , setIsMatched } = socketSlice.actions;

export default socketSlice.reducer;
