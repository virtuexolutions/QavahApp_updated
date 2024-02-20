import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {windowWidth} from '../Utillity/utils';
import {useSelector} from 'react-redux';
import CustomImage from './CustomImage';

const {height, width} = Dimensions.get('window');

const PlanCard = ({title, price, selected, item, text}) => {
  console.log('🚀 ~ PlanCard ~ item:', item);
  const user = useSelector(state => state.commonReducer.userData);
  const [subscribed, setSubscribed] = useState({});

  const splitedItem = title.split(' ');

  useEffect(() => {
    if (user?.subscription) {
      let result = user?.subscription?.find(
        (data, index) =>
        data?.pkg_catogery.toLowerCase() == text.toLowerCase() &&
        data?.pkg_name.toLowerCase() == item?.title.toLowerCase()
        )
        setSubscribed([undefined , null , ''].includes(result) ? {} : result);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor:
            selected?.title == item?.title
              ? Color.themeColor
              : Color.veryLightGray,
        },
      ]}>
      <View style={styles.iconContainer}>
        <CustomText
          numberOfLines={2}
          style={[
            styles.Txt1,
            {
              fontSize: moderateScale(22, 0.6),
              width: windowWidth * 0.4,
              // backgroundColor:'red',
              color:
                selected?.title == item?.title
                  ? Color.themeColor
                  : Color.veryLightGray,
            },
          ]}
          bold>
          {title}
        </CustomText>
        {/* <CustomText>{subscribed ? 'yes' : 'no '}</CustomText>
         */}
         {/* <View style={{
          width:"100%", height:"100%",
          borderColor: Color.red, borderWidth:2}}>
            </View> */}

{
  Object.keys(subscribed).length > 0 && <CustomImage
         source={require('../Assets/Images/subscribed.png')}
         resizeMode="cover"
         
         style={{width:60, height:60,
         
        position:"absolute", top:-10,  right:-30, left:-48 }}
         />
}
        {selected?.title == item?.title && (
          <Icon
            name={'checkcircleo'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.themeColor}
            style={{top: -5}}
            onPress={() => {}}
          />
        )}
      </View>
      <CustomText
        numberOfLines={7}
        style={[
          styles.Txt1,
          {
            fontSize: moderateScale(10, 0.6),
            color: Color.veryLightGray,
            marginTop: moderateScale(20, 0.3),
          },
        ]}>
        {
          // selected?.pkg_catogery == 'platinum' && splitedItem[0] != 'Qavah'
          //   ? item?.description
          //   :
          `Plan Includes \n\n -> ${
            item?.lovenotes ? item?.lovenotes : '0'
          } Love Notes \n\n -> ${
            item?.spotlights ? item?.spotlights : '0'
          } spot lights \n\n `
        }
      </CustomText>
      <CustomText
        style={[
          styles.Txt1,
          {
            fontSize: moderateScale(15, 0.6),
            marginTop: moderateScale(5, 0.3),
            color: selected?.title
              ? selected?.title == item?.title
                ? Color.themeColor
                : 'black'
              : selected?.title == item?.title
              ? Color.themeColor
              : 'black',
            position: 'absolute',
            bottom: 10,
            left: 10,
          },
        ]}
        bold>
        ${price}
      </CustomText>
    </View>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.55,
    height: height * 0.3,
    borderRadius: 5,

    borderWidth: 1,
    margin: moderateScale(10, 0.3),
    padding: moderateScale(10, 0.6),
    // marginLeft: moderateScale(20, 0.3),
  },
  iconContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
});
