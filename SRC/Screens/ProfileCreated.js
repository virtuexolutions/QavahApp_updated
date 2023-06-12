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
import {setUserToken} from '../Store/slices/auth';
import {useDispatch} from 'react-redux';
import { setUserData } from '../Store/slices/common';

const ProfileCreated = (props) => {
  const token = props?.route?.params?.token ;
  const userData = props?.route?.params?.userData ;
  console.log("🚀 ~ file: ProfileCreated.js:16 ~ ProfileCreated ~ token:", userData)
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction =  ()=>{
      Alert.alert('Are Your Sure ?', 'do you want to logout ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {navigationService.navigate('LoginScreen')}},
      ]);
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress' ,backAction)
    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../Assets/Images/ProfileLanding.jpg')}>
      <View
        style={{
          height: windowHeight * 0.5,
        }}>
        <View style={styles.imageContainer}>
          <CustomText
            style={{color: Color.black, fontSize: moderateScale(20, 0.6)}}>
            Hi,
          </CustomText>
          <CustomText isBold style={styles.text}>
            John Doe
          </CustomText>
          <CustomImage
            style={styles.image}
            source={require('../Assets/Images/dummyman6.png')}
          />
        </View>
      </View>
      <View
        style={{
          height: windowHeight * 0.5,
        }}>
        <View style={styles.downContainer}>
          <CustomText
            isBold
            style={[
              styles.text,
              {
                color: Color.white,
                width: windowWidth * 0.5,
                fontSize: moderateScale(32, 0.6),
                textTransform: 'uppercase',
                marginTop: moderateScale(15, 0.6),
              },
            ]}>
            FIND YOUR MATCH IN TORAH
          </CustomText>
          <CustomImage
            style={styles.logo}
            source={require('../Assets/Images/logo.png')}
          />
        </View>
        <CustomButton
          text={'Start'}
          textColor={Color.themeColor}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
            dispatch(setUserToken({token: token}));
            dispatch(setUserData(userData))
          }}
          bgColor={Color.white}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(10, 0.3)}
          elevation
          isBold
        />
      </View>
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
    marginTop: windowHeight * 0.1,
    // height : windowHeight * 0.23,
    // width : windowWidth * 0.4,
    paddingLeft: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(27, 0.6),
    color: Color.themeBlack,
  },
  image: {
    marginTop: moderateScale(20, 0.3),
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
