import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {shape, string, number} from 'prop-types';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
// import {SharedElement} from 'react-navigation-shared-element';

let startAncestor;
let startNode;

const Card = memo(({card, height, setCards, cards, fromSpotLight}) => {
  const userData = useSelector(state => state.commonReducer.userData);
 
  const [subscription, setSubscription] = useState(
    userData?.subscription?.length > 0 ? true : false,
  );

  useEffect(() => {
    setCards && setCards(card?.id);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate('UserDetail', {
          item: card,
          fromSearch: true,
        });
      }}
      activeOpacity={1}
      style={[styles.card, {height: height}]}>
      {/* <SharedElement id={`item.${card.key}.image_url`}> */}
      <CustomImage
        style={styles.image}
        onPress={() => {
          navigationService.navigate('UserDetail', {
            item: card,
            fromSearch: true,
          });
        }}
        source={{
          uri: card?.profile_images[0]?.url,
        }}
        resizeMethod={'stretch'}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        colors={['#ffffff00', '#000000']}
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
          shadowOffset: {height: 2, width: 0},
          shadowOpacity: 1,
          shadowRadius: 4,
          width: '100%',
          paddingBottom: moderateScale(20, 0.3),
          paddingTop: moderateScale(120, 0.3),
        }}>
        <View style={styles.view}>
          <View>
            <CustomText
              style={
                styles.text
              }>{`${card?.profileName}, ${card?.age}`}</CustomText>
            <CustomText style={styles.text1}>
              {`${card?.location?.state}, ${card?.location?.city}`}
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name={'location-outline'}
                as={Ionicons}
                size={moderateScale(17, 0.6)}
                color={Color.themeColor}
              />
              <CustomText isBold style={styles.text}>{`5 Ml`}</CustomText>
            </View>
            <TouchableOpacity
              style={styles.israelite}
              activeOpacity={0.9}
              onPress={() => {
                if (subscription) {
                  navigationService.navigate('Israeliteinfo',{user : card});
                } else {
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Subscription needed',
                        ToastAndroid.SHORT,
                      )
                    : alert('Subscription needed');
                }
              }}>
              <CustomImage
                source={require('../Assets/Images/hebrew.png')}
                resizeMode={'contain'}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.03,
                  // tintColor : Color.themeColor
                }}
                onPress={() => {
                  if (subscription) {
                    navigationService.navigate('Israeliteinfo',{user : card});
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                          'Subscription needed',
                          ToastAndroid.SHORT,
                        )
                      : alert('Subscription needed');
                  }
                }}
              />
            </TouchableOpacity>
            {/* <Icon
            		name={'chevron-up-circle-outline'}
            		as={Ionicons}
            		size={moderateScale(45, 0.6)}
            		color={Color.themeColor}
            		style={{
              		width: '100%',
              		textAlign: 'right',
              		// right: moderateScale(20, 0.6),
            		}}
            		onPress={() => {
              		navigationService.navigate('UserDetail', {
                		item: card,
                		fromSearch: true,
              		});
            		}}
          		/> */}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default Card;

const styles = ScaledSheet.create({
  card: {
    // height: windowHeight * 0.72,
    borderRadius: moderateScale(20, 0.6),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
  },

  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    textShadowColor: Color.black,
    // textShadowRadius: moderateScale(30, 0.6),
  },
  text1: {
    fontSize: moderateScale(15, 0.6),
    color: Color.veryLightGray,
    textShadowColor: Color.black,
    // textShadowRadius: moderateScale(30, 0.6),
  },
  view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  israelite: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    // backgroundColor: Color.themeColor,
    borderRadius: moderateScale(8, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Color.themeColor,
    borderWidth: 1,
  },
});
