import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Constants from '../Assets/Utilities/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import {imageUrl} from '../Config';

const IconWithName = ({
  imageStyle,
  item,
  iconType,
  iconName,
  width,
  text,
  onPress,
}) => {
  const [tintColor, setTintColor] = useState('');

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, width && {width: width}]}
      onPress={onPress}>
      <Icon
        name={iconName}
        as={iconType}
        size={moderateScale(15, 0.6)}
        color={Color.veryLightGray}
        style={imageStyle}
      />
      <CustomText
        numberOfLines={2}
        style={[
          // Constants.h5,
          {
            width: windowWidth * 0.25,
            color: Color.veryLightGray,
           
            fontSize : moderateScale(13,0.6)
            // backgroundColor : 'red'
          },
        ]}>
        {text ? text : 'Not Mentioned'}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    // borderWidth: 0.5,
    borderRadius: moderateScale(5, 0.3),
    borderColor: Color.lightGrey,
    marginTop: moderateScale(10, 0.3),
    marginRight: moderateScale(15, 0.3),
  flexDirection: 'row',
    paddingHorizontal: moderateScale(5, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    alignItems: 'center',
  
  },
  image: {
    width: moderateScale(50, 0.3),
    height: moderateScale(50, 0.3),
    marginRight: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
  },
});

export default IconWithName;
