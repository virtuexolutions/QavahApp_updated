import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
// import Fireworks from 'react-native-fireworks';
import Firework from './Firework';

const MatchModal = ({isVisible, setIsVisible}) => {
  // const icons = [
  //   <Icon name={'star-outlined'} as={Entypo} color={Color.themeColor} size={6} />,
  //   <Icon name={'star-outlined'} as={Entypo} color={Color.themeColor} size={6} />,
  //   // <Icon name={'diamond'} as={MaterialCommunityIcons} color={Color.themeColor} size={6} />,
  //   // <Icon name={'exclamation'} as={FontAwesome} color={Color.themeColor} size={6} />,
  //   <Icon name={'exclamation'} as={FontAwesome} color={Color.themeColor} size={6} />,
  // ];
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
          isBold
          style={{
            color: Color.themeColor,
            fontSize: moderateScale(20, 0.6),
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          CHEERS!
        </CustomText>
        <CustomText
          style={{
            color: Color.veryLightGray,
            fontSize: moderateScale(25, 0.6),
            textAlign: 'center',
          }}>
          It's a Match
        </CustomText>
        {/* <Fireworks
        speed={3}
        density={8}
        colors={['#ff0', '#ff3', '#cc0', '#ff4500', '#ff6347']}
        iterations={5}
        height={150}
        width={100}
        zIndex={2}
        circular={true}
      /> */}
        {/* <Firework
          speed={3}
          density={1}
          colors={['#A1722E','#A1721a']}
          iterations={1000}
          height={150}
          width={100}
          zIndex={2}
          circular={true}
          data={icons}
        /> */}
          <Lottie source={require('../Assets/Images/animation.json')} autoPlay loop />
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(20, 0.3),
            width: windowWidth * 0.9,
            // height: windowHeight * 0.5,
            // backgroundColor:'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              width: moderateScale(50, 0.6),
              height: moderateScale(50, 0.6),
              borderRadius: moderateScale(25, 0.6),
              zIndex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: windowHeight * 0.1,
            }}>
            <Icon
              name={'heart'}
              as={FontAwesome}
              color={Color.themeColor}
              size={moderateScale(27, 0.6)}
            />
          </View>
          <View
            style={{
              width: windowHeight * 0.2,
              height: windowHeight * 0.27,
              backgroundColor: 'black',
              borderBottomWidth: 15,
              borderWidth: 3,
              borderColor: Color.themeColor,
              borderRadius: moderateScale(10, 0.6),
              transform: [{rotate: '-20deg'}],
              overflow: 'hidden',
            }}>
            <CustomImage
              style={{width: '100%', height: '100%'}}
              source={require('../Assets/Images/image1.jpeg')}
            />
          </View>
          <View
            style={{
              marginTop: moderateScale(90, 0.3),
              width: windowHeight * 0.2,
              height: windowHeight * 0.27,
              backgroundColor: 'black',
              borderBottomWidth: 15,
              borderWidth: 3,
              borderColor: Color.themeColor,
              borderRadius: moderateScale(10, 0.6),
              transform: [{rotate: '20deg'}],
              overflow: 'hidden',
            }}>
            <CustomImage
              style={{width: '100%', height: '100%'}}
              source={require('../Assets/Images/banner.jpg')}
            />
          </View>
        </View>
        <View
          style={{
            // position : 'absolute',
            width: moderateScale(50, 0.6),
            height: moderateScale(50, 0.6),
            borderRadius: moderateScale(25, 0.6),
            // zIndex : 1,
            backgroundColor: Color.themeColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(50, 0.3),
            // bottom : windowHeight * 0.1,
          }}>
          <Icon
            name={'chatbubble-outline'}
            as={Ionicons}
            color={Color.white}
            size={moderateScale(27, 0.6)}
          />
        </View>
        <CustomText
          style={{
            marginTop: moderateScale(30, 0.3),
            color: Color.veryLightGray,
            fontSize: moderateScale(15, 0.6),
            // textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          Skip
        </CustomText>
      </View>
    </Modal>
  );
};

export default MatchModal;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 1,
    // marginTop: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    // marginTop: moderateScale(30, 0.3),
    overflow: 'hidden',
    height: windowHeight,
    // justifyContent: 'center',
    paddingTop: windowHeight * 0.1,
    alignItems: 'center',
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
