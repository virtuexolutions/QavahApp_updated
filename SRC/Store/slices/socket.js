import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  matched : false,
  isSubscribed : false,
  pusherInstance : null,
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
    },
    setIsSubscribed(state,action){
      state.isSubscribed = action.payload
    },
    setPusherInstance(state,action){
      state.isSubscribed = action.payload
    },

  },
});

export const { updateSocket , setIsMatched  , setIsSubscribed , setPusherInstance} = socketSlice.actions;

export default socketSlice.reducer;
