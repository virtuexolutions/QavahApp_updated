import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';

const NullDataComponent = () => {
  return (
    <>
      <CustomImage
        source={require('../Assets/Images/no-data.png')}
        resizeMode={'cover'}
        style={{width: 250, height: 250}}
      />
      <CustomText
        isBold
        style={{
          color: Color.black,
          fontSize: 25,
          marginTop: moderateScale(-5, 0.6),
        }}>
        No data found!!
      </CustomText>
      <CustomText
        isBold
        style={{color: 'gray', fontSize: 15, marginTop: moderateScale(3, 0.3)}}>
        Nothing to show at this moment
      </CustomText>
    </>
  );
};

export default NullDataComponent;

const styles = StyleSheet.create({});
