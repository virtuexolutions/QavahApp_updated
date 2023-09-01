import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {Icon, ScrollView} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {
  setIsEmailVerified,
  setIsLoggedIn,
  setIsMobileVerified,
  setIsProfileVerified,
  setUserLogin,
  setUserToken,
  setWalkThrough,
} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';
import Header from '../Components/Header';
import {setCommetChatUserData, setUserData} from '../Store/slices/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CometChat } from '@cometchat-pro/react-native-chat';



const LoginScreen = ({route}) => {
  const navigationN = useNavigation();
  const dispatch = useDispatch();
  const text = route?.params?.text;
  console.log('🚀 ~ file: LoginScreen.js:30 ~ LoginScreen ~ text:', text);
  const disptach = useDispatch();
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const authKey = '07ba629476752645dbce6a6c4aad7b2fc680b511';
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // console.log(
    //   '🚀 ~ file: LoginScreen.js:38 ~ handleLogin ~ loginFor',
    //   loginFor,
    // );
    const url = 'auth/login';
    const body = {
      email: email.trim(),
      password: password,
    };
    if (email == '' || password == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Required Field is empty', ToastAndroid.SHORT)
        : alert('Required Field is empty');
    }
    if (!validateEmail(email.trim())) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please use valid email', ToastAndroid.SHORT)
        : alert('Please use valid email');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    if (response?.data?.status) {
    
      // return console.log('response ========>' , response?.data?.user)
      dispatch(setUserData(response?.data?.user));
      dispatch(setIsMobileVerified(response?.data?.user?.mobile_verified ==  1 ? true : false))
      dispatch(setIsEmailVerified(response?.data?.user?.email_verified  ==  1 ? true : false))
      dispatch(setIsProfileVerified(response?.data?.user?.user_profile_verified))
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setIsLoggedIn());
      LoginUser(response?.data?.user?.uid)
    } else {
      console.log(response?.data?.message);
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT)
        : alert(response?.data?.message);
    }
  };

  const LoginUser = (uid) => {
    console.log('In login commet chat==============????')
    CometChat.login(uid, authKey).then(
      user => {
        console.log('Login Successful:', {user});
        dispatch(setCommetChatUserData(true))
      },
      error => {
        console.log('Login failed with exception:', {error});
      },
    );
  };

  // useEffect(() => {
  //   // configureCometChat()
  //   LoginUser();

  //   return()=>{
  //     setUserData(false)
  //   }
  // }, [])



  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
      style={{
        minHeight: windowHeight,
        backgroundColor: Color.white,
        flexGrow: 0,
      }}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Icon
        name={'left'}
        as={AntDesign}
        size={moderateScale(25, 0.3)}
        color={Color.themeLightGray}
        onPress={() => {
          navigationN.goBack();
        }}
        style={{
          position: 'absolute',
          left: moderateScale(10, 0.3),
        }}
      />
  <View
        style={{
          width: windowWidth * 0.37,
          height: windowHeight * 0.17,
          marginTop: windowHeight * 0.05,
        }}>
        <CustomImage
          source={require('../Assets/Images/splashLogo.png')}
          resizeMode={'contain'}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <TextInputWithTitle
        iconName={'user'}
        iconType={FontAwesome}
        titleText={`Enter Your email`}
        secureText={false}
        placeholder={`Enter Your email`}
        setText={setEmail}
        value={email}
        viewHeight={0.07}
        viewWidth={0.9}
        inputWidth={0.86}
        borderColor={'#ffffff'}
        backgroundColor={'#FFFFFF'}
        marginTop={windowHeight * 0.1}
        color={Color.themeColor}
        placeholderColor={Color.themeLightGray}
        borderRadius={moderateScale(10, 0.3)}
        elevation
      />
      <TextInputWithTitle
        iconName={'lock'}
        iconType={FontAwesome}
        titleText={'password'}
        secureText={true}
        placeholder={'password'}
        setText={setPassword}
        value={password}
        viewHeight={0.07}
        viewWidth={0.9}
        inputWidth={0.86}
        backgroundColor={'#FFFFFF'}
        marginTop={moderateScale(15, 0.6)}
        color={Color.themeColor}
        placeholderColor={Color.themeLightGray}
        // borderRadius={moderateScale(25, 0.3)}
        marginBottom={moderateScale(10, 0.3)}
        elevation
      />
      <CustomText
        onPress={() => {
          navigationService.navigate('EnterPhone', {fromForgot: true});
        }}
        style={[
          styles.txt3,
          {
            color: Color.themeColor,
            marginTop: moderateScale(20, 0.3),
          },
        ]}>
        {'Forgot Password?'}
      </CustomText>

      <CustomButton
        text={
          isLoading ? (
            <ActivityIndicator color={'#FFFFFF'} size={'small'} />
          ) : (
            'Login'
          )
        }
        textColor={Color.white}
        width={windowWidth * 0.9}
        height={windowHeight * 0.08}
        marginTop={moderateScale(10, 0.3)}
        onPress={handleLogin}
        bgColor={Color.themeColor}
        borderRadius={moderateScale(15, 0.3)}
      />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
    backgroundColor: 'green',
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.veryLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
