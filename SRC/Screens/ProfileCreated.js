import {Alert, BackHandler, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Passions from './Passions';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {setIsLoggedIn, setUserToken} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import { setUserData } from '../Store/slices/common';

const ProfileCreated = (props) => {
  // const token = props?.route?.params?.token ;
  // const userData = props?.route?.params?.userData ;
  const userData = useSelector(state=> state?.commonReducer?.userData)
  const token = useSelector(state=> state?.authReducer?.token)
  console.log("🚀 ~ file: ProfileCreated.js:16 ~ ProfileCreated ~ token:", userData)
  // console.log("🚀 ~ file: ProfileCreated.js:16 ~ ProfileCreated ~ token:", userData?.profile_images[0]?.url)
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction =  ()=>{
      Alert.alert('Are Your Sure ?', 'do you want to logout ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => { navigationService.navigate('LoginScreen') }},
      ]);
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress' ,backAction)
    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={ require('../Assets/Images/ProfileLanding2.jpg')}>
   
        <View style={styles.imageContainer}>
          <CustomText
            style={{color: Color.black, fontSize: moderateScale(20, 0.6)}}>
            Hi,
          </CustomText>
          <CustomText isBold style={styles.text}>
            {userData?.profileName}
          </CustomText>
          <CustomImage
            style={styles.image}
            source={userData?.profile_images[0]?.url ? {uri : userData?.profile_images[0]?.url }:  require('../Assets/Images/user.png')}

          />
        {/* </View> */}
      </View>
    
        <CustomButton
          text={'Start'}
          textColor={Color.themeColor}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          onPress={() => {
            // navigationService.navigate('TabNavigation')
            // dispatch(setUserToken({token: token}));
            // dispatch(setUserData(userData))
            dispatch(setIsLoggedIn());
          }}
          bgColor={Color.white}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(10, 0.3)}
          elevation
          isBold
          containerStyle={{
            position : 'absolute',
            bottom    : moderateScale(35,0.6)
          }}
        />
    </ImageBackground>
  );
};

export default ProfileCreated;
const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  imageContainer: {
    marginTop: windowHeight * 0.02,
    // height : windowHeight * 0.23,
    // width : windowWidth * 0.4,
    paddingLeft: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(27, 0.6),
    color: Color.themeBlack,
  },
  image: {
    // marginTop: moderateScale(20, 0.3),
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    borderWidth: 3,
    borderColor: Color.themeColor,
  },
  downContainer: {
    marginTop: moderateScale(20, 0.3),
    paddingLeft: moderateScale(20, 0.6),
  },
  logo: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.12,
  },
});
