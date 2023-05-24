import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import LinearGradient from 'react-native-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'



const ViewPost = ({setRef, item , image}) => {
    const [comment , setComment] = useState('')
  console.log('🚀 ~ file: ViewPost.js:11 ~ ViewPost ~ item:', image);
  return (
    <RBSheet
      ref={ref => {
        setRef(ref);
      }}
      closeOnDragDown={true}
      height={windowHeight * 0.83}
      // closeOnPressMask={true}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          // justifyContent: "center",
          alignItems: 'center',
          borderTopEndRadius: moderateScale(30, 0.6),
          borderTopLeftRadius: moderateScale(30, 0.6),
          overflow: 'hidden',
        },
      }}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Color.white,
          position: 'absolute',
          zIndex: -1,
          height : windowHeight * 0.83
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(50, 0.6),
          alignItems: 'center',
        }}>
        <View style={styles.image}>
          {/* <SharedElement id={`item.${item.key}.image_url`}>  */}
          <CustomImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={image}
            // resizeMode={'contain'}
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
      }}
    >
      <View style={{
        flexDirection : 'row',
        height : windowHeight * 0.05 , 
        paddingLeft : moderateScale(30,0.6),
        // backgroundColor : 'red'
      }}>
        <Icon
           name={'heart-o'}
           as={FontAwesome}
           color={Color.white}
           size={moderateScale(27,0.6)}
           />
            <Icon
           name={'message1'}
           as={AntDesign}
           color={Color.white}
           size={moderateScale(27,0.6)}
           style={{
            marginLeft : moderateScale(20,0.3)
           }}
           />
           
      </View>
      <CustomText style={{
        fontSize : moderateScale(12,0.6),
        color : Color.white,
        paddingLeft : moderateScale(30,0.6),
      }}>2.4k likes</CustomText>
    </LinearGradient>
        </View>
        <CustomText style={styles.heading}>
          {item?.name},{item?.age}
        </CustomText>
        <CustomText
          style={[
            {
              width: windowWidth * 0.9,
              color: Color.veryLightGray,
              marginTop: moderateScale(10, 0.3),
              lineHeight: moderateScale(20, 0.6),
              fontSize: moderateScale(12, 0.6),
              // backgroundColor : 'red'
            },
          ]}>
          {
            'I really like dancing. Dancing is a part of my life. Do you want to dance with me? I will teach you to dance, you will not regret doing it. See You tomorrow !'
          }
        </CustomText>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: windowWidth * 0.9,
            marginTop: moderateScale(20, 0.3),
          }}
          activeOpacity={0.8}
          onPress={() => {}}>
          <CustomText
            style={{
              color: Color.themeColor,
              fontSize: moderateScale(12, 0.6),
            }}>
            View All Comments
          </CustomText>
          <Icon
            name={'arrow-forward'}
            as={Ionicons}
            size={moderateScale(17, 0.6)}
            color={Color.themeColor}
            style={
              {
                //   marginLeft: moderateScale(5, 0.3),
              }
            }
          />
        </TouchableOpacity>
        <CustomText
          style={[
            {
              width: windowWidth * 0.9,
              color: Color.veryLightGray,
              marginTop: moderateScale(10, 0.3),
              lineHeight: moderateScale(20, 0.6),
              fontSize: moderateScale(12, 0.6),
              textTransform: 'lowercase',
              // backgroundColor : 'red'
            },
          ]}>
          {<CustomText isBold>Richardh</CustomText>} Be careful, the sun can
          hurt your beautiful face. It would be better if I were your light.
        </CustomText>
        <TextInputWithTitle
            iconName={'logo-google-playstore'}
            iconType={Ionicons}
            titleText={'Add a comments'}
            secureText={false}
            placeholder={'Add a comments'}
            setText={setComment}
            rightIcon
            value={comment}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            border={1}
            borderColor={Color.veryLightGray}
            // backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={comment ? Color.themeColor : Color.veryLightGray}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
      </ScrollView>
    </RBSheet>
  );
};

export default ViewPost;

const styles = ScaledSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight * 0.5,
    backgroundColor: '#DDDDDD',
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.black,
    // marginLeft: moderateScale(20, 0.3),
    marginTop: moderateScale(20, 0.3),
    width: windowWidth * 0.9,
  },
});
