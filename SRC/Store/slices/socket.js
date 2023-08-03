import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  matched : false,
  isSubscribed : false,
  pusherInstance : null,
  otherData : {}
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
      console.log('Matched ======>>', action.payload)
      state.matched = action.payload;
    },
    setIsSubscribed(state,action){
      state.isSubscribed = action.payload
    },
    setPusherInstance(state,action){
      state.pusherInstance = action.payload
    },
    setotherData(state,action){
      console.log(action.payload)
      state.otherData = action.payload
    }

  },
});

export const { updateSocket , setIsMatched  , setIsSubscribed , setPusherInstance , setotherData} = socketSlice.actions;

export default socketSlice.reducer;
