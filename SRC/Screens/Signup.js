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
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButton from '../Components/CustomButton';
import {Icon, ScrollView} from 'native-base';
import {setUserLogin, setUserToken, setWalkThrough} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomDropDown from '../Components/CustomDropDown';
import navigationService from '../navigationService';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import ImagePickerModal from '../Components/ImagePickerModal';
import {setSelectedRole} from '../Store/slices/common';
import LinearGradient from 'react-native-linear-gradient';

const Signup = () => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  console.log(
    '🚀 ~ file: Signup.js:33 ~ Signup ~ SelecteduserRole:',
    SelecteduserRole,
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState({});
  const [userRole, setUserRole] = useState('Qbid Member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState(''); //for negotiator
  const [jobStatus, setJobStatus] = useState(''); //for negotiator
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [services, setServices] = useState([]); //for negotiator
  const [language, setLanguage] = useState([]); //for negotiator

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  // const formData = new FormData();

  // const SignUp = async () => {
  //   const params = {
  //     role: userRole,
  //     first_name: `${firstName}`,
  //     last_name: `${lastName}`,
  //     companyName: companyName,
  //     email: email,
  //     phone: contact,
  //     password: password,
  //     c_password: confirmPassword,
  //   };

  //   for (let key in params) {
  //     if (params[key] === '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
  //         : Alert.alert(` ${key} field is empty`);
  //     }
  //     formData.append(key, params[key]);
  //   }
  //   formData.append('image', image);
  //   console.log(JSON.stringify(formData, null, 2));
  //   if (isNaN(contact)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
  //       : Alert.alert('phone is not a number');
  //   }
  //   if (!validateEmail(email)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
  //       : Alert.alert('email is not validate');
  //   }
  //   if (password.length < 8) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Password should atleast 8 character long',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Password should atleast 8 character long');
  //   }
  //   if (password != confirmPassword) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
  //       : Alert.alert('Password does not match');
  //   }

  //   const url = 'register';
  //   setIsLoading(true);
  //   const response = await Post(url, formData, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     //  return  console.log("response?.data", response?.data?.data);
  //     Platform.OS === 'android'
  //       ? ToastAndroid.show('User Registered Succesfully', ToastAndroid.SHORT)
  //       : Alert.alert('User Registered Succesfully');
  //     dispatch(setUserData(response?.data?.data?.user_details));
  //     dispatch(setUserLogin(response?.data?.data?.token));
  //   }
  // };
  const UserRoleArray = ['Qbid Negotiator', 'Qbid Member'];
  useEffect(() => {
    dispatch(setSelectedRole(userRole));
  }, [userRole]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}
        // locations ={[0, 0.5, 0.6]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: windowHeight * 0.1,
            paddingBottom: moderateScale(20, 0.3),
          }}>
          <View>
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image?.uri}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/dummyman6.png')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={[
                styles.edit,
                {
                  backgroundColor: '#EEEEEE',
                },
              ]}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.Heading}>User Type</Text> */}

          <TextInputWithTitle
            titleText={'First Name'}
            secureText={false}
            placeholder={'First Name'}
            setText={setFirstName}
            value={firstName}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Last Name'}
            secureText={false}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />

          <TextInputWithTitle
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Contact'}
            secureText={false}
            placeholder={'Contact'}
            setText={setContact}
            value={contact}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Address'}
            secureText={false}
            placeholder={'Address'}
            setText={setAddress}
            value={address}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
          <TextInputWithTitle
            titleText={'City'}
            secureText={false}
            placeholder={'City'}
            setText={setCity}
            value={city}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />

          <TextInputWithTitle
            titleText={'Password'}
            secureText={true}
            placeholder={'Password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
            // marginBottom={moderateScale(10, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Confirm Password'}
            secureText={true}
            placeholder={'Confirm Password'}
            setText={setConfirmPassword}
            value={confirmPassword}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
            // marginBottom={moderateScale(10, 0.3)}
          />
       
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.85,
              // backgroundColor : 'red',
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={checked ? 'check-square-o' : 'checkbox-passive'}
              as={checked ? FontAwesome : Fontisto}
              color={Color.purple}
              onPress={() => {
                setChecked(!checked);
              }}
              size={moderateScale(13, 0.3)}
            />
            <CustomText
              onPress={() => {
                // navigationService.navigate('EnterPhone', {fromForgot: true});
              }}
              style={[
                styles.txt3,
                {
                  color: Color.white,
                  marginHorizontal: moderateScale(10, 0.3),
                },
              ]}>
              I Accept{' '}
              {
                <CustomText
                  isBold
                  style={[
                    styles.txt3,
                    {
                      color: Color.black,
                    },
                  ]}>
                  Terms And Conditions
                </CustomText>
              }
            </CustomText>
          </View>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Register'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
            }}
            bgColor={Color.themeColor}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(5, 0.3)}
          />
          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {'Already have an account? '}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('LoginScreen')}>
              <CustomText
                style={[
                  styles.txt4,
                  {
                    color:
                    Color.black,
                  },
                ]}>
                {'Sign In'}
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
      </LinearGradient>
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
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
    color: Color.blue,
    fontSize: moderateScale(12, 0.6),
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
    color: Color.blue,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  edit: {
    padding : 5,
    backgroundColor: Color.blue,
    // width: moderateScale(25, 0.3),
    // height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    // marginLeft: moderateScale(2.5, 0.3),
    // marginTop: moderateScale(2.5, 0.3),
  },
  userTypeContainer: {
    width: windowWidth * 0.9,
    // backgroundColor : Color.red,
    paddingTop: moderateScale(20, 0.3),
    paddingBottom: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: moderateScale(14, 0.3),
    width: moderateScale(14, 0.3),
    borderRadius: moderateScale(7, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
    // fontWeight : 'bold'
    // backgroundColor : 'red'
  },
});
