import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  ActivityIndicator,
  View,
  TouchableOpacity,
   
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';

// import DatePicker from 'react-native-date-picker';

const CreatePortfolio = () => {
  const navigatioN = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  // console.log(
  //   '🚀 ~ file: CreatePortfolio.js:17 ~ CreatePortfolio ~ currentStep:',
  //   currentStep,
  // );
  //Step 1
  const [profileName, setProfileName] = useState('');
  const [governmentName, setGovernmentName] = useState('');

  //Step 2
  const [email, setEmail] = useState('');
  //Step 3
  const [gender, setGender] = useState('');
  //Step 4
  const [dob, setDob] = useState(new Date());
  //Step 5
  const [feet, setFeet] = useState('');
  const [inch, setInch] = useState('');

  //Step 6
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  //Step 7
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [number, setNumber] = useState('');

  //step 8
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(0);
  console.log(
    '🚀 ~ file: CreatePortfolio.js:75 ~ CreatePortfolio ~ time:',
    time,
  );
  const [timerLabel, settimerLabel] = useState('Resend Code ');

  const [open, setOpen] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [timeOutId, setTimeOutId] = useState(null);
  const [chunks, setChunks] = useState('');
  const [progress, setProgress] = useState(0)

  const ProfileBody = {
    step1: {
      profileName: profileName,
      governmentName: governmentName,
      phone: `${country?.callingCode}${number}`,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      birthday: moment(dob).format('YYYY-MM-DD'),
      height: {
        feet: feet,
        inches: inch,
      },
      iAm: gender,
      seeking: gender == 'woman' ? 'man' : 'woman',
      zipcode: '10001',
      location: {
        zipcode: '10001',
        state_abbr: 'NY',
        latitude: '40.750742',
        longitude: '-73.99653',
        city: 'New York',
        state: 'New York',
      },
    },
  };

  const onSelect = country => {
    // console.log('dasdasdasdads =>', country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(0));
  };

  //number validator
  const phoneNumberRegex = /^(\d{3})[-]?(\d{3})[-]?(\d{4})$/;

  const formatPhoneNumber = phoneNumber => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(phoneNumberRegex);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber;
  };

  const emailExists = async email => {
    const url = 'pr';

    setIsLoading(true)
    const response = await Post(url, {email: email}, apiHeader());
    setIsLoading(false)
    // console.log(
    //   '🚀 ~ file: CreatePortfolio.js:155 ~ emailValidate ~ response:',
    //   response?.data,
    // );
    if (!response?.data?.status) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is already taken', ToastAndroid.SHORT)
        : Alert.alert('Email is already taken');
    }
    setCurrentStep(prev => prev + 1);
    setProgress(prev => (prev+(windowWidth/7)))

  };

  

  useEffect(() => {
    if (number && number.length < 12) {
      const formattedNumber = formatPhoneNumber(number);
      // console.log(formattedNumber);
      setNumber(formattedNumber);
    }
    // else if(number && number.length == 12){
    //   const formattedNumber = formatPhoneNumber(number.substring(0,number.length -2));
    //   console.log(formattedNumber);
    //   setNumber(formattedNumber);
    // }
  }, [number]);

  useEffect(() => {
    if (currentStep == 8) {
      label();
    }
    if (time > 0) {
      var clearId = setTimeout(function () {
        settime(time - 1);
      }, 2000);
      setTimeOutId(clearId);
    }
  }, [time]);

  useEffect(() => {
    if (feet && feet > 6) {
      alert('Ft can not be more than 6');
      setFeet('');
    }
  }, [feet]);

  useEffect(() => {
    if (inch && inch > 12) {
      alert('inches can not be more than 12');
      setInch('');
    }
  }, [inch]);


  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        leftName={'left'}
        showRight ={true}
        leftPress={
          currentStep > 1 && currentStep != 8
            ? () => {
              setProgress(prev => (prev-(windowWidth/7)))
              setCurrentStep(prev => prev - 1);
              }
            : currentStep == 8
            ? () => {
                clearTimeout(timeOutId);
                settimerLabel('Resend Code '), settime(0);
                // console.log('herer');
                setProgress(prev => (prev-(windowWidth/7)))
                setCurrentStep(prev => prev - 1);
              }
            : () => {
                // console.log('herer ae fasdasdasd');
                setProgress(prev => (prev-(windowWidth/7)))
                navigatioN.goBack();
              }
        }
      />{currentStep < 8 && <View style={{width:progress,height:windowHeight*0.008, backgroundColor:Color.themeColor}}></View> }
      
      <KeyboardAwareScrollView
        style={{
          paddingTop: windowHeight * 0.1,
          backgroundColor: Color.white,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={{height: windowHeight * 0.68, justifyContent: 'center'}}>
          {currentStep == 1 ? (
            <>
              <TextInputWithTitle
                title={'Profile Name'}
                titleText={`Your First Name`}
                secureText={false}
                placeholder={`Your First Name`}
                setText={setProfileName}
                value={profileName}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={Color.veryLightGray}
                backgroundColor={'#FFFFFF'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleStlye={{
                  color: Color.themeBlack,
                  fontSize: moderateScale(35, 0.6),
                }}
                border={1}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(11, 0.6),
                  color: Color.themeLightGray,
                  width: windowWidth * 0.9,
                  lineHeight: moderateScale(15, 0.6),
                  marginTop: moderateScale(6, 0.3),
                }}>
                This is how it will appear in Qavah, and you will not be able to
                change it
              </CustomText>
              <TextInputWithTitle
                title={'Government name'}
                titleText={`Your Government Name`}
                secureText={false}
                placeholder={`Your Government Name`}
                setText={setGovernmentName}
                value={governmentName}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={Color.veryLightGray}
                backgroundColor={'#FFFFFF'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleStlye={{
                  color: Color.themeBlack,
                  fontSize: moderateScale(35, 0.6),
                  marginTop: moderateScale(30, 0.3),
                }}
                border={1}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(11, 0.6),
                  color: Color.themeLightGray,
                  width: windowWidth * 0.9,
                  lineHeight: moderateScale(15, 0.6),
                  marginTop: moderateScale(6, 0.3),
                }}>
                *Will not be shown to anyone
              </CustomText>
            </>
          ) : currentStep == 2 ? (
            <>
              <TextInputWithTitle
                title={'Email'}
                titleText={`hello@abc.com`}
                secureText={false}
                placeholder={`hello@abc.com`}
                setText={setEmail}
                value={email}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={Color.veryLightGray}
                backgroundColor={'#FFFFFF'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleStlye={{
                  color: Color.themeBlack,
                  fontSize: moderateScale(35, 0.6),
                }}
                border={1}
              />
            </>
          ) : currentStep == 3 ? (
            <>
              <CustomText
                style={[
                  {
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.3),
                    marginBottom: moderateScale(5, 0.3),
                    width: windowWidth,
                    marginTop: moderateScale(10, 0.3),
                    textAlign: 'center',
                    textTransform: 'lowercase',
                  },
                ]}>
                I Am a
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  setGender('Man');
                }}
                style={[
                  styles.cont,
                  gender == 'Man' && {backgroundColor: Color.themeColor},
                ]}
                activeOpacity={0.7}>
                <CustomText
                  style={[styles.txt6, gender == 'Man' && {color: 'white'}]}>
                  Man
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender('Woman');
                }}
                style={[
                  styles.cont,
                  gender == 'Woman' && {backgroundColor: Color.themeColor},
                ]}
                activeOpacity={0.7}>
                <CustomText
                  style={[styles.txt6, gender == 'Woman' && {color: 'white'}]}>
                  Woman
                </CustomText>
              </TouchableOpacity>
            </>
          ) : currentStep == 4 ? (
            <>
              <CustomText
                style={[
                  {
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.3),
                    marginBottom: moderateScale(5, 0.3),
                    // width : windowWidth * 0.5,
                    marginTop: moderateScale(10, 0.3),
                    // textAlign : 'center',
                  },
                ]}>
                Born Day
              </CustomText>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.birthday}
                onPress={() => {
                  setOpen(true);
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    width: '80%',
                    color: Color.black,
                  }}>
                  {moment(dob).format('ll')}
                </CustomText>
                <Icon
                  name={'calendar'}
                  as={FontAwesome}
                  size={moderateScale(20, 0.6)}
                  color={Color.themeColor}
                  onPress={() => {
                    setOpen(true);
                  }}
                />
              </TouchableOpacity>
            </>
          ) : currentStep == 5 ? (
            <>
              <CustomText
                style={[
                  {
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.3),
                    marginBottom: moderateScale(5, 0.3),
                    // width : windowWidth * 0.5,
                    marginTop: moderateScale(10, 0.3),
                    // textAlign : 'center',
                  },
                ]}>
                Height
              </CustomText>
              <View style={styles.row}>
                <TextInputWithTitle
                  titleText={`FT`}
                  placeholder={`FT`}
                  setText={setFeet}
                  value={feet}
                  viewHeight={0.07}
                  viewWidth={0.4}
                  inputWidth={0.39}
                  borderColor={Color.veryLightGray}
                  backgroundColor={'#FFFFFF'}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(10, 0.3)}
                  titleStlye={{
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.6),
                  }}
                  border={1}
                  maxLength={1}
                  keyboardType={'numeric'}
                />
                <TextInputWithTitle
                  titleText={`Inch`}
                  placeholder={`Inch`}
                  setText={setInch}
                  value={inch}
                  viewHeight={0.07}
                  viewWidth={0.4}
                  inputWidth={0.39}
                  borderColor={Color.veryLightGray}
                  backgroundColor={'#FFFFFF'}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(10, 0.3)}
                  titleStlye={{
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.6),
                  }}
                  border={1}
                  maxLength={2}
                  keyboardType={'numeric'}
                />
              </View>
              <CustomText>{`${feet}ft-${inch}in`}</CustomText>
            </>
          ) : currentStep == 6 ? (
            <>
              <TextInputWithTitle
                title={'Password'}
                titleText={`password`}
                secureText={true}
                placeholder={`password`}
                setText={setPassword}
                value={password}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={Color.veryLightGray}
                backgroundColor={'#FFFFFF'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleStlye={{
                  color: Color.themeBlack,
                  fontSize: moderateScale(35, 0.6),
                }}
                border={1}
              />

              <TextInputWithTitle
                secureText={true}
                title={'Confirm Password'}
                titleText={`Re-type Password`}
                placeholder={`Re-type Password`}
                setText={setconfirmPassword}
                value={confirmPassword}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                borderColor={Color.veryLightGray}
                backgroundColor={'#FFFFFF'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleStlye={{
                  color: Color.themeBlack,
                  fontSize: moderateScale(35, 0.6),
                  marginTop: moderateScale(30, 0.3),
                }}
                border={1}
              />
            </>
          ) : currentStep == 7 ? (
            <>
              <CustomText
                style={[
                  {
                    color: Color.themeBlack,
                    fontSize: moderateScale(11, 0.6),
                    marginBottom: moderateScale(5, 0.3),
                    marginTop: moderateScale(10, 0.3),
                  },
                ]}>
                Country
              </CustomText>
              {/* <View style={styles.birthday}> */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setShowNumberModal(true);
                }}
                style={[styles.birthday, {justifyContent: 'flex-start'}]}>
                <CountryPicker
                  {...{
                    countryCode,
                    withCallingCode,
                    onSelect,
                    withFilter,
                  }}
                  visible={showNumberModal}
                  onClose={() => {
                    setShowNumberModal(false);
                  }}
                />

                {country && (
                  <CustomText
                    style={{
                      fontSize: moderateScale(15, 0.6),
                      color: '#5E5E5E',
                    }}>{`${countryCode}(+${country?.callingCode})`}</CustomText>
                )}

                <Icon
                  name={'angle-down'}
                  as={FontAwesome}
                  size={moderateScale(20, 0.6)}
                  color={Color.themeColor}
                  onPress={() => {
                    setShowNumberModal(true);
                  }}
                  style={{
                    position: 'absolute',
                    right: moderateScale(5, 0.3),
                  }}
                />
              </TouchableOpacity>
              <CustomText
                style={[
                  {
                    color: Color.themeBlack,
                    fontSize: moderateScale(11, 0.6),
                    marginBottom: moderateScale(5, 0.3),
                    marginTop: moderateScale(50, 0.3),
                  },
                ]}>
                Phone Number
              </CustomText>
              {/* <View style={styles.birthday}> */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setShowNumberModal(true);
                }}
                style={[styles.birthday, {justifyContent: 'flex-start'}]}>
                <TextInputWithTitle
                  titleText={`Phone Number`}
                  secureText={false}
                  placeholder={`Phone Number`}
                  setText={setNumber}
                  value={number}
                  viewHeight={0.07}
                  viewWidth={0.7}
                  inputWidth={0.68}
                  borderColor={Color.veryLightGray}
                  backgroundColor={'transparent'}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(0, 0.3)}
                  titleStlye={{
                    color: Color.themeBlack,
                    fontSize: moderateScale(35, 0.6),
                  }}
                  border={0}
                  keyboardType={'numeric'}
                  maxLength={12}
                />

                <Icon
                  name={'mobile'}
                  as={FontAwesome}
                  size={moderateScale(20, 0.6)}
                  color={Color.themeColor}
                  onPress={() => {
                    setShowNumberModal(true);
                  }}
                  style={{
                    position: 'absolute',
                    right: moderateScale(5, 0.3),
                  }}
                />
              </TouchableOpacity>
              <CustomText style={styles.newhed}>
                {'We need your mobile number \n to get you signed in'}
              </CustomText>
            </>
          ) : (
            <View
              style={{alignItems: 'center', marginTop: -windowHeight * 0.2}}>
              <CustomText style={styles.txt3}>
                Please enter the 4 digit OTP sent to{' '}
                {
                  <CustomText
                    style={{
                      color: Color.themeColor,
                    }}>{`+${country?.callingCode}-${number}`}</CustomText>
                }
              </CustomText>
              <CodeField
                placeholder={'0'}
                ref={ref}
                value={code}
                onChangeText={setCode}
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
          )}
        </View>
        {/* Button */}
        <CustomButton
          text={isLoading ? (
            <ActivityIndicator color={'#FFFFFF'} size={'small'} />
          ) : (
            'Next'
          )}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          disabled={isLoading}
          onPress={() => {
            if (profileName != '' && governmentName != '' && currentStep == 1) {
              setCurrentStep(prev => prev + 1);
              setProgress(prev => (prev+(windowWidth/7)))
            } else if (email != '' && currentStep == 2) {
              if (!validateEmail(email)) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('Email invalid', ToastAndroid.SHORT)
                  : Alert.alert('Email invalid');
              } else if (!emailExists(email)) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'Email is already taken',
                      ToastAndroid.SHORT,
                    )
                  : Alert.alert('Email is already taken');
              }
            } else if (gender != '' && currentStep == 3) {
              setCurrentStep(prev => prev + 1);
              setProgress(prev => (prev+(windowWidth/7)))

            } else if (dob != '' && currentStep == 4) {
              setCurrentStep(prev => prev + 1);
              setProgress(prev => (prev+(windowWidth/7)))

            } else if (feet != '' && inch != '' && currentStep == 5) {
              setCurrentStep(prev => prev + 1);
              setProgress(prev => (prev+(windowWidth/7)))

            } else if (
              password != '' &&
              confirmPassword != '' &&
              currentStep == 6
            ) {
              if (password != confirmPassword) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('Password unmatched', ToastAndroid.SHORT)
                  : Alert.alert('Password unmatched');
              } else if (password.length < 6) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'Password should be atleast 6 characters long',
                      ToastAndroid.SHORT,
                    )
                  : Alert.alert('Password should be atleast 6 characters long');
              }
              setCurrentStep(prev => prev + 1);
              setProgress(prev => (prev+(windowWidth/7)))

            } else if (countryCode != '' && number != '' && currentStep == 7) {
              setCurrentStep(prev => prev + 1);
              settimerLabel('ReSend in '), settime(120);
              setProgress(prev => (prev+(windowWidth/7)))

            } else if (currentStep == 8) {
              clearTimeout(timeOutId);
              navigationService.navigate('MoreAboutme', {
                data: ProfileBody,
              });
            } else {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Required Field is Empty',
                    ToastAndroid.SHORT,
                  )
                : Alert.alert('Required Field is Empty');
            }
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          elevation
        />
        <DatePicker
          maximumDate={new Date()}
          modal
          open={open}
          date={dob}
          onConfirm={date => {
            setOpen(false);
            setDob(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode={'date'}
          androidVariant="iosClone"
          style={{}}
          theme={'light'}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default CreatePortfolio;

const styles = ScaledSheet.create({
  cont: {
    alignSelf: 'center',
    height: windowHeight * 0.09,
    width: windowWidth * 0.6,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    marginVertical: moderateScale(5, 0.3),
    marginRight: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(20, 0.6),
    color: Color.veryLightGray,
  },
  birthday: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    paddingRight: moderateScale(15, 0.6),
  },
  newhed: {
    textAlign: 'center',
    lineHeight: 25,
    marginTop: 35,
    color: '#5E5E5E',
    fontSize: 14,
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
