import React from 'react'
import {  TouchableOpacity } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';
const BtnContainer = ({ onPress, name, backgroundColor, color , type  , style , iconSize}) => (
// return(
    <TouchableOpacity
    style={[styles.singleButton, { backgroundColor } , style && style]}
    onPress={onPress}
    activeOpacity={0.85}
    >
    <Icon
      name={name}
      as={type}
      size={iconSize ? iconSize : moderateScale(25,0.6)}
      color={color}
      />
  </TouchableOpacity>
)
// }


const styles = ScaledSheet.create({
    singleButton: {
        backgroundColor: 'transparent',
        height : moderateScale(50,0.6),
        width : moderateScale(50,0.6),
      borderRadius: moderateScale(25,0.6),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: 2,
    },
})
export default BtnContainer