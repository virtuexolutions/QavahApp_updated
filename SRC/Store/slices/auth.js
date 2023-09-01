import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  locationEnabled: true,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated : false ,
  emailVerified : false,
  numberVerified : false,
  profileVerified : null ,
 
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
    setIsLocationEnabled(state, action){
      state.locationEnabled = action.payload
    },
    setIsMobileVerified(state, action){
      state.numberVerified = action.payload
    },
    setIsEmailVerified(state, action){
      state.emailVerified = action.payload
    },
    setIsProfileVerified(state, action){
      state.profileVerified = action.payload
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
  setIsLocationEnabled,
  setIsMobileVerified,
  setIsEmailVerified,
  setIsProfileVerified
  
} = AuthSlice.actions;

export default AuthSlice.reducer;
