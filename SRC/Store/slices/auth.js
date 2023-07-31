import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated : false ,
  matched: false,

};

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;

    },
    
    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
      state.isLoggedIn = false;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
    },
    setIsLoggedIn(state,action){
      state.isLoggedIn = true;
    },
    setIsMatched(state,action){
      state.matched = action.payload;
    }
  },
});

export const {
  
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  setIsLoggedIn,
  setIsMatched
  
} = AuthSlice.actions;

export default AuthSlice.reducer;
