import {StyleSheet, Text, View, TouchableOpacity, Alert, Platform, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import { mode } from 'native-base/lib/typescript/theme/tools';

const ReportModal = ({isVisible, setIsVisible, onPress, reason, setReason,userData}) => {
  const token = useSelector(state => state.authReducer.token);
  

  const reportOption = [
    'Fake profile/Scam',
    'Inappropriate profile photo',
    'Inappropriate bio',
    'Underage user',
    'offline behaviour',
    'Someone is in danger',
  ];

  const handlePrompt = () => {
    if([undefined , null , ''].includes(reason)){
    return  Platform.OS == 'android' ?
      ToastAndroid.show('Please Select some reason first' , ToastAndroid.SHORT) :
      alert('Please Select some reason first')
    }
    Alert.alert(
      'Confirmation',
      'Are you sure you want to perform this action?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            onPress();
          },
        },
      ],
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
      
        <CustomText
          style={{
            color: Color.darkGray,
            fontSize:moderateScale(18,0.6),
            textAlign:'center',
            marginBottom:moderateScale(10,0.3)

          }}>
          Report
        </CustomText>
        <CustomText
          style={{
            color: Color.veryLightGray,
            fontSize:moderateScale(13,0.6),
            textAlign:'center',
            marginBottom:moderateScale(10,0.3)

          }}>
          we won't tell {userData?.profileName}
        </CustomText>
       
        {reportOption.map((data, index)=>{
        return (<CustomText
          style={{
            marginTop:moderateScale(5,0.3),
            paddingVertical:moderateScale(8,0.6),
            color: reason == data ? 'white' :Color.themeColor,
            width:windowWidth *0.5,
            justifyContent:'center',
            textAlign:'center',
            fontSize:moderateScale(10,0.6),
            borderColor:Color.veryLightGray,
            backgroundColor: reason == data ? Color.themeColor:'transparent',
            borderWidth:1,
            borderRadius:moderateScale(10,0.6)
          }} 
          onPress={()=>{
            setReason(data)
            // handlePrompt()
          }}>
         {data}
        </CustomText>) 
      })}

        <View style={{flexDirection:'row' , width : windowWidth * 0.55 , justifyContent : 'space-between' , marginTop : moderateScale(20,0.3)}}>
        <CustomButton
          text={'Cancel'}
          textColor={Color.white}
          width={windowWidth * 0.25}
          height={windowHeight * 0.05}
          marginTop={moderateScale(10, 0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(25, 0.3)}
          elevation
          onPress={() => {
            // handlePrompt();
            setIsVisible(false);
          }}
          fontSize={moderateScale(12, 0.6)}
        />
         <CustomButton
          text={'Report'}
          textColor={Color.white}
          width={windowWidth * 0.25}
          height={windowHeight * 0.05}
          marginTop={moderateScale(10, 0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(25, 0.3)}
          elevation
          onPress={() => {
            handlePrompt();
            // setIsVisible(false);
          }}
          fontSize={moderateScale(12, 0.6)}
        />
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.6,
  },
  circle: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(30, 0.6),
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  container2: {
    // height: windowHeight * 0.13,
    paddingVertical: moderateScale(10, 0.6),
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
