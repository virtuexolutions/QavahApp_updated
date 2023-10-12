import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Modal from 'react-native-modal';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Icon} from 'native-base';
import {setUserLogOut, setUserRegisteredComet} from '../Store/slices/common';
import {
  setIsEmailVerified,
  setIsMobileVerified,
  setUserLogoutAuth,
} from '../Store/slices/auth';
import { CometChat } from '@cometchat-pro/react-native-chat';

const VerificationScreen = () => {
  const dispatch = useDispatch();
  const userRegisterStatus = useSelector(state => state.commonReducer.cometRegistrationStatus)
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log(
    '🚀 ~ file: VerificationScreen.js:37 ~ VerificationScreen ~ token:',
    token,
  );
  const mobileVerified = useSelector(state => state.authReducer.numberVerified);
  const emailVerified = useSelector(state => state.authReducer.emailVerified);
  console.log(
    '🚀 ~ file: VerificationScreen.js:32 ~ VerificationScreen ~ mobileVerified:',
    mobileVerified,
    emailVerified,
  );

  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeOutId, setTimeOutId] = useState(null);
  const [time, settime] = useState(0);
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
  // console.log("🚀 ~ file: VerificationScreen.js:48 ~ VerificationScreen ~ type:", type)
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [timerLabel, settimerLabel] = useState('Resend Code ');
  const [loader, setLoader] = useState(0);

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  const leftPress = () => {
    dispatch(setMoreAboutMeRegister(body));
    navigation.goBack();
  };

  const formatPhoneNumber = phoneNumber => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(phoneNumberRegex);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber;
  };

  const sendMobileOtp = async () => {
    const url = 'send/mobile_opt';
    setLoading(true);
    const response = await Post(
      url,
      {email: userData?.email},
      apiHeader(token),
    );
    console.log(
      '🚀 ~ file: VerificationScreen.js:49 ~ sendMobileOtp ~ response:',
      response,
    );

    setLoading(false);
    if (response?.data?.status) {
      setType('phone');
      setModalVisible(true);
      console.log('OTP sent');
    } else {
      console.log('response mobile send otp', response?.data);
    }
  };
  const ConfirmMobileOTP = async () => {
    const url = 'auth/verify-otp';
    setLoading(true);
    const response = await Post(url, {otp: phoneCode}, apiHeader(token));
    setLoading(false);

    if (response?.data?.status) {
      console.log('verified');
      console.log(
        '🚀 ~ file: VerificationScreen.js:61 ~ ConfirmMobileOTP ~ response:',
        response?.data,
      );
      dispatch(setIsMobileVerified(true));
      setModalVisible(false);
      setPhoneCode('');
    } else {
      console.log(
        '🚀 ~ file: VerificationScreen.js:61 ~ ConfirmMobileOTP ~ response:',
        response?.data,
      );
    }
  };
  const sendEmailOtp = async () => {
    const url = 'auth/send-email-otp';
    setLoading(true);
    const response = await Post(
      url,
      {email: userData?.email},
      apiHeader(token),
    );
    setLoading(false);

    console.log(
      '🚀 ~ file: VerificationScreen.js:73 ~ sendEmailOtp ~ response:',
      response?.data,
    );
    if (response?.data?.status) {
      setType('email');
      setModalVisible(true);
      // console.log('Response ===== verified');
    }
  };
  const ConfirmEmailOTP = async () => {
    console.log(emailCode);
    const url = 'auth/verify-email-otp';
    setLoading(true);
    const response = await Post(url, {otp: emailCode}, apiHeader(token));
    setLoading(false);

    if (response?.data?.status) {
      console.log(
        '🚀 ~ file: VerificationScreen.js:84 ~ ConfirmEmailOTP ~ response:',
        response?.data,
      );
      dispatch(setIsEmailVerified(true));
      setModalVisible(false);
      setEmailCode('');
      // setLoader(prev => prev + 50);
    } else {
      console.log(response?.data);
    }
  };

  const registerUserCometChat = async user => {
    try{
      let cometChatUser = new CometChat.User(user?.uid);
    cometChatUser.setName(user?.profileName);
    // cometChatUser.setre
    cometChatUser.avatar = user?.profile_images[0]?.url;
    
    console.log("🚀 ~ file: IsraeliteFilters.js:489 ~ registerUserCometChat ~ cometChatUser:", cometChatUser)
    const cometChatRegisteredUser = await CometChat.createUser(
      cometChatUser,
      '07ba629476752645dbce6a6c4aad7b2fc680b511',
      // '07ba629476752645dbce6a6c4aad7b2fc680b511',
    );
    // dispatch(setUserRegisteredComet(true))
    console.log(
      '🚀 ~ file: LoginScreen.js:88 ~ registerUserCometChat ~ cometChatRegisteredUser:',
      cometChatRegisteredUser,
    );

    }catch(error){
      if(error == 'ERR_UID_ALREADY_EXISTS')
      console.log('User alraedy exists')
    }
   
    
   

    // dispatchCometAction({
    //   type: 'COMETCHAT_REGISTER',
    //   user: {...cometChatRegisteredUser},
    // });
  };

  useEffect(() => {
      registerUserCometChat(userData);
      // dispatch(setIsEmailVerified(true))
      // dispatch(setIsMobileVerified(true))
  }, [])
  





  useEffect(() => {
    if (number && number.length < 12) {
      const formattedNumber = formatPhoneNumber(number);
      setNumber(formattedNumber);
    }
  }, [number]);
  useEffect(() => {
    if (time > 0) {
      var clearId = setTimeout(function () {
        settime(time - 1);
      }, 2000);
      setTimeOutId(clearId);
    }
  }, [time]);

  // useEffect(() => {
  //   if (emailVerified) {
  //     setLoader(prev => prev + 50);
  //   }
  //   if (mobileVerified) {
  //     setLoader(prev => prev + 50);
  //   }
  // }, [emailVerified, mobileVerified]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        // leftName={'left'}
        title={'Verification'}
        // leftPress={leftPress}
      />
      <View
        style={{
          alignItems: 'center',
          height: windowHeight * 0.9,
          backgroundColor: 'white',
          //  justifyContent : 'center',
          paddingTop: windowHeight * 0.13,
          //  backgroundColor : 'red'
        }}>
        <View
          style={{
            // width : windowWidth * 0.9 ,
            // height : windowHeight * 0.5,
            paddingVertical: moderateScale(50, 0.6),
            paddingHorizontal: moderateScale(20, 0.6),

            borderRadius: moderateScale(10, 0.6),
            // justifyCosntent : 'center',
            alignItems: 'center',
            backgroundColor: '	rgba(255,248,220,0.6)',
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/lock.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'stretch'}
            />
          </View>
          <CustomText
            isBold
            style={{
              width: windowWidth * 0.8,
              textAlign: 'center',
              fontSize: moderateScale(20, 0.6),
              color: Color.black,
            }}>
            Hold On!
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.8,
              textAlign: 'center',
              fontSize: moderateScale(11, 0.6),
              color: Color.veryLightGray,
            }}>
            Please verify your phone number and email address before Entering{' '}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor : 'red',
            alignItems: 'center',
            marginTop: moderateScale(25, 0.3),
          }}>
          <View style={styles.emptyBar}>
            <LinearGradient
              colors={Color.themeBgColor}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: '100%',
                width: `${
                  mobileVerified
                    ? 100
                    : 0
                }%`,
                borderTopRightRadius: moderateScale(10, 0.3),
                borderBottomRightRadius: moderateScale(10, 0.3),
              }}></LinearGradient>
          </View>
          {/* <Icon
            name={!emailVerified ? 'lock' : 'unlock'}
            as={FontAwesome}
            size={moderateScale(15, 0.6)}
            color={Color.veryLightGray}
          /> */}
          <Icon
            name={!mobileVerified ? 'lock' : 'unlock'}
            as={FontAwesome}
            size={moderateScale(15, 0.6)}
            color={Color.veryLightGray}
          />
        </View>

        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            width: windowWidth * 0.85,
            alignItems:'center'
          }}>
          {/* <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : emailVerified ? (
                'email verified'
              ) : (
                'Verify Email'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            // isGradient
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              sendEmailOtp();
              // setLoader(prev=> prev == 0 ?50 : 0)
            }}
            disabled={emailVerified}
          /> */}
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : mobileVerified ? (
                'number verified'
              ) : (
                'Verify number'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            borderWidth={1}
            borderColor={Color.white}
            // isGradient
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              sendMobileOtp();
              // setLoader(prev=> prev == 50 ?100 : 50)
            }}
            disabled={mobileVerified}
          />
        </View>
        <CustomText
          onPress={() => {
            dispatch(setUserLogOut(), dispatch(setUserLogoutAuth()));
            dispatch(setIsEmailVerified(false));
            dispatch(setIsMobileVerified(false));
          }}
          style={{
            color: Color.veryLightGray,
            fontSize: moderateScale(12, 0.6),
            marginTop: moderateScale(10, 0.3),
          }}>
          log out
        </CustomText>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <CustomText style={styles.txt3}>
              Please enter the 4 digit OTP sent to{' '}
              {
                <CustomText
                  style={{
                    color: Color.themeColor,
                  }}>
                  {type == 'phone'
                    ? `+${country?.callingCode}-${userData?.phone}`
                    : `${userData?.email}`}
                </CustomText>
              }
            </CustomText>
            <CodeField
              placeholder={'0'}
              ref={ref}
              value={type == 'email' ? emailCode : phoneCode}
              onChangeText={type == 'email' ? setEmailCode : setPhoneCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <CustomText
                    style={[
                      styles.cellText,
                      isFocused && {color: Color.black},
                    ]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </CustomText>
                </View>
              )}
            />
            {/* <CustomText style={styles.txt3}>
              Haven't Recieved Verification Code ?{'\n'}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    settimerLabel('ReSend in '), settime(120);
                  }}>
                  <CustomText style={[styles.txt4]}>
                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText> */}
          </View>
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.65}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            // isGradient
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              type == 'email' ? ConfirmEmailOTP() : ConfirmMobileOTP();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default VerificationScreen;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(30, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor : 'red'
  },
  emptyBar: {
    width: windowWidth * 0.7,
    // marginTop : moderateScale(20,0.3),
    height: windowHeight * 0.014,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.lightGrey,
    marginRight: moderateScale(5, 0.3),
    // marginBottom : moderateScale(10,0.3),
    overflow: 'hidden',
  },
  cellRoot: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.veryLightGray,
    borderWidth: 1,
    // backgroundColor: Color.black,
    borderRadius: moderateScale(5, 0.3),
  },

  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.themeColor,
    fontSize: moderateScale(16, 0.3),
    textAlign: 'center',
  },
  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(14, 0.6),
    textAlign: 'center',
  },
  txt3: {
    // backgroundColor : 'green',
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: windowWidth * 0.65,
    marginTop: moderateScale(20, 0.3),
    lineHeight: moderateScale(20, 0.3),
    // backgroundColor : 'red'
  },
});
