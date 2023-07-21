import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';

const SubscriptionListing = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.image}>
        <CustomImage source={item?.image} style={styles.imageBg} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width:windowWidth*0.58, 
        //   backgroundColor:'black'
        }}>
        <View
          style={{
            marginLeft: moderateScale(20, 0.3),
            width: '80%',
            // alignItems:'center',
            justifyContent:'center',
            // backgroundColor:'orange'
          }}>
          <CustomText
            numberOfLines={1}
            style={{
              color: Color.black,
              fontSize: moderateScale(12, 0.6),
            }} isBold>{`${item?.name}`}</CustomText>
          <CustomText
            numberOfLines={2}
            style={{
              color: Color.black,
              fontSize: moderateScale(11, 0.6),
              width:windowWidth*0.43,
            }}>{`${item?.message}`}</CustomText>

        </View>
        <CustomText
            numberOfLines={1}
            style={{
              color: Color.veryLightGray,
              fontSize: moderateScale(11, 0.6),
              right:0,
            }}>{`${item?.time}`}</CustomText>
        
        {/* <CustomText numberOfLines={1} style={styles.label}>
            {moment.duration(moment().diff(item?.created_at)).asDays() >= 6
              ? moment(item?.created_at).format('ll')
              : moment(item?.created_at).fromNow()}
          </CustomText> */}
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionListing;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth * 0.76,
    paddingVertical: moderateScale(15, 0.6),
    // justifyContent :  'space-between',
    // height : windowHeight * 0.08,
  },
  image: {
    height: moderateScale(40, 0.3),
    width: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
  },
  imageBg: {
    height: moderateScale(50, 0.3),
    width: moderateScale(50, 0.3),
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: moderateScale(50, 0.3),
    borderColor: Color.blue,
    borderWidth: 2,
  },
  label: {
    fontSize: moderateScale(10, 0.6),
    color: Color.veryLightGray,
    // backgroundColor : 'red',
    width: '70%',
  },
});
