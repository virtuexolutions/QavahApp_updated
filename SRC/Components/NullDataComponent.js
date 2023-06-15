import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';

const NullDataComponent = ({style}) => {
  // console.log(
  //   '🚀 ~ file: NullDataComponent.js:10 ~ NullDataComponent ~ style:',
  //   style,
  // );
  return (
    <>
      <View style={{flex: 1, alignItems: 'center'}}>
        <CustomImage
          source={require('../Assets/Images/no-data.png')}
          resizeMode={'cover'}
          style={{
            width: style?.width ? style?.width : windowWidth * 0.65,
            height: style?.height ? style?.height : windowHeight * 0.35,
          }}
        />
        <CustomText
          isBold
          style={{
            color: Color.black,
            fontSize: style?.fontSize ? style?.fontSize : 25,
            marginTop: moderateScale(-5, 0.6),
          }}>
          No data found!!
        </CustomText>
        <CustomText
          isBold
          style={{
            color: 'gray',
            fontSize: style?.fontSize ? style?.fontSize-5 : 15,
            marginTop: moderateScale(3, 0.3),
          }}>
          Nothing to show at this moment
        </CustomText>
      </View>
    </>
  );
};

export default NullDataComponent;

const styles = StyleSheet.create({});
