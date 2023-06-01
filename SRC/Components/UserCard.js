import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import BtnContainer from './BtnContainer';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import CustomTextWithMask from './CustomTextWithMask';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';

const UserCard = ({onClosePress, onheartPress, style, item, hideBtns}) => {
  // console.log("🚀 ~ file: UserCard.js:17 ~ UserCard ~ item:", item?.profile_images[0]?.url)
  const profile_image = item?.profile_images[0]?.url;
  console.log(
    '🚀 ~ file: UserCard.js:19 ~ UserCard ~ profile_image:',
    profile_image,
  );

  return (
    <TouchableOpacity
      style={[styles.card, style && style]}
      activeOpacity={0.9}
      onPress={() => {
        !hideBtns &&
          navigationService.navigate('UserDetail', {
            item: item,
            fromSearch: true,
          });
      }}>
      <CustomImage
        onPress={() => {
          !hideBtns &&
          navigationService.navigate('UserDetail', {
            item: item,
            fromSearch: true,
          });
        }}
        source={{uri: item?.profile_images[0]?.url}}
        style={[
          {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          },
        ]}
      />
      {/* <View
        style={[
          {
            position: 'absolute',
            zIndex: 1,
            // left: moderateScale(10, 0.6),
            bottom: 0,
            top: moderateScale(0, 0.6),
            width: windowWidth * 0.9,
            backgroundColor : 'rgba(0,0,0,0.5)' ,
            height : windowHeight * 0.06 ,
           
          },
        ]}> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        colors={['#000000', '#ffffff00']}
        style={{
          position: 'absolute',
          top: 0,
          // justifyContent: 'flex-end',
          shadowOffset: {height: 2, width: 0},
          shadowOpacity: 1,
          shadowRadius: 4,
          width: '100%',
          paddingBottom: moderateScale(60, 0.6),
          justifyContent: 'center',
          paddingLeft: moderateScale(10, 0.6),
          paddingTop: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(15, 0.6),
            width: '90%',
          }}>
          {`${item?.profileName}, ${item?.age}`}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name={'location-outline'}
            as={Ionicons}
            size={moderateScale(14, 0.6)}
            color={Color.white}
          />
          <CustomText
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
            }}>{`5 Ml`}</CustomText>
        </View>
      </LinearGradient>

      {hideBtns ? (
        <></>
      ) : (
        <View style={styles.absoluteContainer}>
          <BtnContainer
            backgroundColor={Color.white}
            color={Color.veryLightGray}
            name={'close-sharp'}
            type={Ionicons}
            style={{
              width: moderateScale(40, 0.6),
              height: moderateScale(40, 0.6),
              borderRadius: moderateScale(20, 0.6),

              //    marginTop: moderateScale(-15, 0.3),
            }}
            iconSize={moderateScale(20, 0.6)}
            onPress={() => {}}
          />
          <BtnContainer
            backgroundColor={Color.themeColor}
            color={Color.white}
            name={'heart-o'}
            type={FontAwesome}
            style={{
              width: moderateScale(40, 0.6),
              height: moderateScale(40, 0.6),
              borderRadius: moderateScale(20, 0.6),

              //    marginTop: moderateScale(-15, 0.3),
            }}
            iconSize={moderateScale(20, 0.6)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = ScaledSheet.create({
  card: {
    width: windowWidth * 0.42,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(10, 0.6),
    marginVertical: moderateScale(10, 0.3),
    overflow: 'hidden',
    // marginLeft : moderateScale(10,0.3),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  absoluteContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: moderateScale(15, 0.6),
  },
});
