import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import * as Animatable from 'react-native-animatable';
// import Pulse from 'react-native-pulse';

const NullDataComponent = ({style}) => {
  // console.log(
  //   '🚀 ~ file: NullDataComponent.js:10 ~ NullDataComponent ~ style:',
  //   style,
  // );
  return (
    <>
      <View style={{alignItems: 'center', marginTop: moderateScale(30, 0.6)}}>
        <Animatable.View
          style={{
            width: style?.width
              ? style?.width + windowWidth * 0.03
              : windowWidth * 0.23,
            height: style?.height
              ? style?.height + windowWidth * 0.03
              : windowWidth * 0.23,
            borderRadius: style?.height
              ? style?.height + (windowWidth * 0.03) / 2
              : (windowWidth * 0.23) / 2,
            // backgroundColor : 'rgba(161,114,46 , 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // animation="pulse" easing="ease-out" iterationCount="infinite"
        >
          {/* <Pulse
            color="rgba(161,114,46 , 0.8)"
            numPulses={6}
            diameter={windowWidth * 0.5}
            // speed={10}
            // duration={20}
          /> */}
          <CustomImage
            source={require('../Assets/Images/banner3.jpg')}
            resizeMode={'cover'}
            style={{
              width: style?.width ? style?.width : windowWidth * 0.2,
              height: style?.height ? style?.height : windowWidth * 0.2,
              borderRadius: (windowWidth * 0.2) / 2,
            }}
          />
        </Animatable.View>
        {/* <CustomText
          isBold
          style={{
            color: Color.black,
            fontSize: style?.fontSize ? style?.fontSize : moderateScale(22,0.6),
            marginTop: moderateScale(-5, 0.6),
          }}>
          No data found!!
        </CustomText> */}
        <CustomText
          // isBold
          style={{
            color: 'gray',
            fontSize: style?.fontSize
              ? style?.fontSize - 5
              : moderateScale(12, 0.6),
            marginTop: moderateScale(3, 0.3),
            width: windowWidth * 0.8,
            textAlign: 'center',
          }}>
          We are unable to find any potential matches right now. Try changing
          your preferences to see who is nearby
        </CustomText>
      </View>
    </>
  );
};

export default NullDataComponent;

const styles = StyleSheet.create({});
