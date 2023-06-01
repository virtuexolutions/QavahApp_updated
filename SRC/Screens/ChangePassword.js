import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import {Post} from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const navigation = useNavigation()
  const token = useSelector((State)=>State.authReducer.token)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [confirmNewPass, setConfirmNewPass] = useState('');

  const handleChangePassword = async () => {
    const url = 'setting/change-password';

    const body = {
      old_password: currentPassword,
      new_password: newPass,
      confirm_password: confirmNewPass,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is empty`, ToastAndroid.SHORT)
          : alert(`${key} is empty`);
      }
    }

    if (newPass != confirmNewPass) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`New Password much be matched`, ToastAndroid.SHORT)
        : alert(`New Password much be matched`);
    }
    if (newPass.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `password much be atleast 8 digit`,
            ToastAndroid.SHORT,
          )
        : alert(`password much be atleast 8 digit`);
    }

    setisLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setisLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`Password has been changed successfully`, ToastAndroid.SHORT)
        : alert(`Password has been changed successfully`);
        navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        title={'Change Password'}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      <View style={styles.container}>
        <TextInputWithTitle
          title={'Current Password'}
          titleText={`Current Password`}
          secureText={true}
          placeholder={`Current Password`}
          setText={setCurrentPassword}
          value={currentPassword}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(50, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
        />
        <TextInputWithTitle
          title={'new Password'}
          titleText={`new Password`}
          secureText={true}
          placeholder={`new Password`}
          setText={setNewPass}
          value={newPass}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
        />
        <TextInputWithTitle
          title={'Confirm New password'}
          titleText={`Confirm New password`}
          secureText={true}
          placeholder={`Confirm New password`}
          setText={setConfirmNewPass}
          value={confirmNewPass}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
        />
        <CustomButton
          text={'Save'}
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.07}
          marginTop={moderateScale(50, 0.3)}
          bgColor={Color.themeColor}
          onPress={handleChangePassword}
          borderRadius={moderateScale(15, 0.3)}
          elevation
          disabled={isLoading}
        />
      </View>
    </>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.95,
    backgroundColor: Color.white,
    alignItems: 'center',
    // justifyContent : 'center'
  },
  cont: {
    alignSelf: 'center',
    height: windowHeight * 0.07,
    width: windowWidth * 0.35,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.veryLightGray,
    marginVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
  },
  txt6: {
    fontSize: moderateScale(14, 0.6),
    color: Color.veryLightGray,
  },
});
export default ChangePassword;
