import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import moment from 'moment';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BtnContainer from './BtnContainer';

const NotificationComponent = ({
  messaged,
  commented,
  invitation,
  onPress,
  item,
}) => {
  console.log('🚀 ~ file: NotificationComponent.js:21 ~ item:', item);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.image}>
        <CustomImage source={{uri : item?.profile_image?.uri}} style={styles.imageBg} />
      </View>
      <View
        style={{
          marginLeft: moderateScale(20, 0.3),
          width: '80%',
        }}>
        <CustomText numberOfLines={1} style={styles.label}>
          {moment.duration(moment().diff(item?.created_at)).asDays() >= 6
            ? moment(item?.created_at).format('ll')
            : moment(item?.created_at).fromNow()}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomText
            numberOfLines={1}
            style={{
              color: Color.black,
              fontSize: moderateScale(11, 0.6),
            }}>{`${item?.users?.profileName},${item?.users?.age}`}</CustomText>
          <Icon
            name={'location-outline'}
            as={Ionicons}
            size={moderateScale(12, 0.6)}
            color={Color.themeColor}
          />
          <CustomText
            style={{fontSize: moderateScale(11, 0.6)}}>{`5 Ml`}</CustomText>
        </View>
        <CustomText numberOfLines={2} style={styles.label}>
          {item?.title}
        </CustomText>
        {item?.photo && (
          <CustomImage
            source={item?.photo}
            style={{
              width: windowWidth * 0.55,
              height: windowHeight * 0.25,
              borderRadius: moderateScale(10, 0.6),
            }}
          />
        )}
        {invitation == 1 && (
          <BtnContainer
            backgroundColor={Color.themeColor}
            color={Color.white}
            name={'heart-o'}
            type={FontAwesome}
            style={{
              width: moderateScale(30, 0.6),
              height: moderateScale(30, 0.6),
              borderRadius: moderateScale(15, 0.6),
              position: 'absolute',
              right: 10,
              bottom: 0,

              //    marginTop: moderateScale(-15, 0.3),
            }}
            iconSize={moderateScale(15, 0.6)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComponent;

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
