import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
import {useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Modal from 'react-native-modal';

const VerificationScreen = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(
    '🚀 ~ file: VerificationScreen.js:11 ~ VerificationScreen ~ userData:',
    userData,
  );
  const token = useSelector(state => state.authReducer.token);

  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, settime] = useState(0);
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
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

  const verifyMobile = async () => {
    const url = 'send/email_opt';
    setLoading(true);
    const response = await Post(
      url,
      {phone: userData?.phone},
      apiHeader(token),
    );
    console.log(
      '🚀 ~ file: VerificationScreen.js:49 ~ verifyMobile ~ response:',
      response,
    );

    setLoading(false);
    if (response != undefined) {
      console.log('OTP sent');
    }
  };
  const ConfirmMobileOTP = async () => {
    const url = 'auth/verify-otp';
    setLoading(true);
    const response = await Post(url, {phone: userData?.email, otp: phoneCode});
    setLoading(false);

    console.log(
      '🚀 ~ file: VerificationScreen.js:61 ~ ConfirmMobileOTP ~ response:',
      response,
    );

    if (response != undefined) {
      console.log('verified');
    }
  };
  const verifyEmail = async () => {
    const url = 'send/email_opt';
    setLoading(true);
    const response = await Post(
      url,
      {email: userData?.email},
      apiHeader(token),
    );
    setLoading(false);

    console.log(
      '🚀 ~ file: VerificationScreen.js:73 ~ verifyEmail ~ response:',
      response,
    );
    if (response != undefined) {
      console.log('Response ===== verified');
    }
  };
  const ConfirmEmailOTP = async () => {
    const url = 'auth/verify-otp';
    setLoading(true);
    const response = await Post(url, {email: userData?.email, otp: emailCode});
    setLoading(false);
    console.log(
      '🚀 ~ file: VerificationScreen.js:84 ~ ConfirmEmailOTP ~ response:',
      response,
    );

    if (response != undefined) {
      console.log('verified');
    }
  };

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

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        leftName={'left'}
        title={'Verification'}
        leftPress={leftPress}
      />
      <View
        style={{
          alignItems: 'center',
          //   marginTop:moderateScale(10,.3),
          justifyContent: 'center',
          //   alignItems: 'center',
          // backgroundColor: 'black',
          height: windowHeight * 0.9,
        }}>
        <CustomButton
          text={'Verify Email'}
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
            setType('email');
            setModalVisible(true);
            verifyEmail()
          }}
        />
        <CustomButton
          text={'Verify Phone'}
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
            setType('phone');
            setModalVisible(true);
            verifyMobile()
          }}
        />
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
                    ? `+${country?.callingCode}-${number}`
                    : `${userData?.email}`}
                </CustomText>
              }
            </CustomText>
            <CodeField
              placeholder={'0'}
              ref={ref}
              value={phoneCode}
              onChangeText={setPhoneCode}
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
            <CustomText style={styles.txt3}>
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
            </CustomText>
          </View>
          <CustomButton
            text={'verify'}
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
               type == 'email' ? ConfirmEmailOTP() : ConfirmMobileOTP()              
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
    width: windowWidth * 0.85,
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor : 'red'
  },

  cellRoot: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
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
    fontSize: moderateScale(36, 0.3),
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
