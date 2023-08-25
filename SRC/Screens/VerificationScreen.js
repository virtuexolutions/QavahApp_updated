import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight} from '../Utillity/utils';
import { Cursor } from 'react-native-confirmation-code-field';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const VerificationScreen = () => {
    const userData = useSelector(state => state.commonReducer.userData)
    console.log("🚀 ~ file: VerificationScreen.js:11 ~ VerificationScreen ~ userData:", userData)
    const token = useSelector(state=> state.authReducer.token)

  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [loading, setLoading] = useState(false)

const verifyMobile =()=>{
    
    const url = 'send/mobile_opt'
    setLoading(true)
    const response = Post(url, {email:userData?.email}, apiHeader(token))
    console.log("🚀 ~ file: VerificationScreen.js:25 ~ verifyMobile ~ response:", response)
    setLoading(false)
    if(response != undefined){
        
    }

}






  return (
    <View style={{alignItems: 'center', marginTop: -windowHeight * 0.2}}>
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
          setEmailVerify(true);
        }}
      />
      {emailVerify && (
        <CodeField
          placeholder={'0'}
          ref={ref}
          value={emailCode}
          onChangeText={setEmailCode}
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
                style={[styles.cellText, isFocused && {color: Color.black}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
      )}
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
          setPhoneVerify(true);
        }}
      />
      {phoneVerify && (
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
                style={[styles.cellText, isFocused && {color: Color.black}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
      )}

    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({});
