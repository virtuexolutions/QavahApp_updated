import {StyleSheet, Text, View, TouchableOpacity , ToastAndroid , Platform} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../Components/CustomImage';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
// import {SharedElement} from 'react-navigation-shared-element';
import {ScrollView} from 'react-native';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import BtnContainer from '../Components/BtnContainer';
import {Icon} from 'native-base';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import IconWithName from '../Components/IconWithName';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../Components/CustomButton';
import {useSelector} from 'react-redux';
import ImageContainer from '../Components/ImageContainer';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';

const UserDetail = props => {
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation()
  const user = useSelector(state => state.commonReducer.userData);
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: UserDetail.js:30 ~ UserDetail ~ item:', item);
  // console.log('data =============>>>>>>>>>>', item?.gallery_images[0]);
  const fromSearch = props?.route?.params?.fromSearch;
  console.log("🚀 ~ file: UserDetail.js:43 ~ UserDetail ~ fromSearch:", fromSearch)

  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(fromSearch ? item : user);
  
  console.log("🚀 ~ file: UserDetail.js:35 ~ UserDetail ~ userData:", userData)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState('');
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [multiImages, setMultiImages] = useState([
    {id: 1, uri: require('../Assets/Images/image1.jpeg')},
    {id: 2, uri: require('../Assets/Images/image2.jpeg')},
    {id: 3, uri: require('../Assets/Images/image3.jpeg')},
    {id: 4, uri: require('../Assets/Images/image4.jpeg')},
    {id: 5, uri: require('../Assets/Images/image4.jpeg')},
    {id: 6, uri: require('../Assets/Images/image5.jpeg')},
  ]);

  const reportUser = async ()=>{
    const url = ''
    const response = await Post(url, {targetsUid : userData?.id })
    if(response != undefined){
      
      console.log("🚀 ~ file: UserDetail.js:64 ~ reportUser ~ response:", response)
   
    }
  }

 
  // const images = [require('../Assets/Images/woman1.jpeg')];
  // console.log('🚀 ~ file: UserDetail.js:50 ~ UserDetail ~ images:', images);
  const [image, setImage] = useState({})
  console.log("🚀 ~ file: UserDetail.js:65 ~ UserDetail ~ image:", image)

  const handleLike = async()=>{
    const url = 'swap/liked';
    const response = await Post(
      url,
      {targetsUid: userData?.id},
      apiHeader(token),
    );
    if (response?.data?.status == true) {
        navigation.goBack()
    }
    else {
        Platform.OS == 'android'
          ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
          : alert(response?.data?.error);
      }
  }
  const handleDisLike = async()=>{
    const url = 'swap/disliked';
    const response = await Post(
      url,
      {targetsUid: userData?.id},
      apiHeader(token),
    );
    if (response?.data?.status == true) {
        navigation.goBack()
    }
    else {
        Platform.OS == 'android'
          ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
          : alert(response?.data?.error);
      }
  }
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // height: windowHeight * 0.4,
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}>
        <View style={styles.image}>
          {/* <SharedElement id={`item.${item.key}.image_url`}>  */}
          <CustomImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={
              
              userData?.profile_images[0]?.url ?
              {uri:userData?.profile_images[0]?.url}:
              require('../Assets/Images/image1.jpeg')
              // : require('../Assets/Images/image1.jpeg')
            }
            resizeMode={'contain'}
          />
          {!fromSearch && (
            <Icon
              name={'left'}
              as={AntDesign}
              size={moderateScale(20, 0.6)}
              color={Color.veryLightGray}
              style={{
                position: 'absolute',
                left: 20,
                top: 20,
                zIndex: 1,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          )}
          {/* </SharedElement>  */}
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            {/* {fromSearch && ( */}
            <BtnContainer
              backgroundColor={fromSearch ? 'white' : Color.themeColor}
              color={!fromSearch ? 'white' : Color.veryLightGray}
              name={fromSearch ? 'close-sharp' : 'pencil'}
              type={fromSearch ? Ionicons : FontAwesome}
              style={{
                width: moderateScale(55, 0.6),
                height: moderateScale(55, 0.6),
                borderRadius: moderateScale(27, 0.6),
                // backgroundColor : 'red'
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: moderateScale(-5, 0.3),
              }}
              onPress={() => {
                !fromSearch ? navigationService.navigate('PersonalInfo') : handleDisLike();
              }}
              iconSize={moderateScale(30, 0.6)}
            />
            {/* )} */}
            {fromSearch && (
              <BtnContainer
                backgroundColor={Color.themeColor}
                color={Color.white}
                name={'heart-o'}
                type={FontAwesome}
                style={{
                  width: moderateScale(70, 0.6),
                  height: moderateScale(70, 0.6),
                  borderRadius: moderateScale(35, 0.6),
                  marginTop: moderateScale(-15, 0.3),
                }}
                iconSize={moderateScale(40, 0.6)}
                onPress={handleLike}
              />
            )}
            <View style={styles.likeContainer}>
              <Icon
                name={'heart-o'}
                as={FontAwesome}
                size={moderateScale(15, 0.6)}
                color={Color.themeColor}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.veryLightGray,
                }}>
                90k
              </CustomText>
            </View>
          </View>
          {fromSearch && (
            <View
              style={{
                alignSelf: 'center',
                width: windowWidth * 0.7,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor : 'red',
                marginTop: moderateScale(20, 0.3),
              }}>
              <TouchableOpacity
                style={styles.israelite}
                activeOpacity={0.9}
                onPress={() => {
                  navigationService.navigate('Israeliteinfo');
                }}>
                <CustomImage
                  source={require('../Assets/Images/hebrew.png')}
                  resizeMode={'contain'}
                  style={{
                    width: windowWidth * 0.28,
                    height: windowHeight * 0.04,
                  }}
                  onPress={() => {
                    navigationService.navigate('Israeliteinfo',{user:userData});
                  }}
                />
              </TouchableOpacity>
              <Icon
                name={'chevron-down-circle-outline'}
                as={Ionicons}
                size={moderateScale(45, 0.6)}
                color={Color.themeColor}
                style={{
                  marginLeft: moderateScale(10, 0.3),
                  position: 'absolute',
                  right: moderateScale(0, 0.6),
                }}
                onPress={() => {
                  props?.navigation.goBack();
                }}
              />
            </View>
          )}
          <CustomText style={styles.heading}>
            {`${userData?.profileName}`}
          </CustomText>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            <IconWithName
              iconName={'briefcase'}
              iconType={FontAwesome}
              text={userData?.employmentStatus}
              imageStyle={{
                marginRight: moderateScale(15, 0.3),
              }}
              width={windowWidth * 0.41}
            />
            <IconWithName
              iconName={'building'}
              iconType={FontAwesome}
              text={userData?.state}
              imageStyle={{
                marginRight: moderateScale(15, 0.3),
              }}
              width={windowWidth * 0.41}
            />
            <IconWithName
              iconName={'md-location-sharp'}
              iconType={Ionicons}
              text={userData?.city}
              imageStyle={{
                marginRight: moderateScale(15, 0.3),
              }}
              width={windowWidth * 0.41}
            />
            <IconWithName
              iconName={'human-male-child'}
              iconType={MaterialCommunityIcons}
              text={userData?.livingSituation}
              imageStyle={{
                marginRight: moderateScale(15, 0.3),
              }}
              width={windowWidth * 0.41}
            />
            <IconWithName
              iconName={'calendar'}
              iconType={FontAwesome}
              text={userData?.age ? `${userData?.age} years` : '-'}
              imageStyle={{
                marginRight: moderateScale(15, 0.3),
              }}
              width={windowWidth * 0.41}
            />
          </View>
          <CustomText
            style={[styles.heading, {fontSize: moderateScale(13, 0.6)}]}>
            About Me
          </CustomText>
          <CustomText
            style={[
              {
                width: windowWidth * 0.8,
                color: Color.veryLightGray,
                marginLeft: moderateScale(20, 0.3),
                marginTop: moderateScale(10, 0.3),
                lineHeight: moderateScale(20, 0.6),
                fontSize: moderateScale(10, 0.6),
                // backgroundColor : 'red'
              },
            ]}>
            {userData?.aboutMe}
          </CustomText>
          <View
            style={{
              alignSelf: 'center',
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText
              style={[
                {fontSize: moderateScale(13, 0.6), color: Color.themeBlack},
              ]}>
              Gallery
            </CustomText>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              activeOpacity={0.8}
              onPress={() => {
                fromSearch
                  ? navigationService.navigate('Profile', {
                      data: userData,
                      fromSearch: fromSearch,
                    })
                  : navigationService.navigate('Profile', {
                      data: userData,
                      fromSearch: fromSearch,
                    });
              }}>
              <CustomText
                style={{
                  color: Color.themeColor,
                  fontSize: moderateScale(10, 0.6),
                }}>
                See All
              </CustomText>
              <Icon
                name={'arrow-forward'}
                as={Ionicons}
                size={moderateScale(15, 0.6)}
                color={Color.themeColor}
                style={{
                  marginLeft: moderateScale(5, 0.3),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: windowWidth * 0.9,
            }}>
            {userData?.gallery_images?.map((item, index) => {
              console.log('data image =====>>>>', item?.url);
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    setIsVisible(true);
                  }}
                  activeOpacity={0.8}
                  key={index}
                  style={{
                    borderRadius: moderateScale(10, 0.6),
                    width:
                      index < 2
                        ? (windowWidth * 0.86) / 2
                        : (windowWidth * 0.86) / 3,
                    height:
                      index < 2 ? windowHeight * 0.3 : windowHeight * 0.15,
                    overflow: 'hidden',
                    marginTop: moderateScale(10, 0.3),
                  }}>
                  <CustomImage
                    onPress={() => {
                      setSelectedIndex(index);
                      setIsVisible(true);
                      setImage(item)
                    }}
                    source={{uri: item?.url}}
                    // resizeMode={'contain'}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {/* <View style={styles.imageView}>
          
            {multiImages.map((item, index) => {
            return (
              <ImageContainer
                data={multiImages}
                setData={setMultiImages}
                item={item}
                setIndex={setIndex}
                index={index}
                showMultiImageModal={showMultiImageModal}
                setShowMultiImageModal={setShowMultiImageModal}
                // onPress={drag}
              />
            );
          })}

          </View> */}
          {fromSearch && (
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <CustomText
                style={{
                  color: Color.white,
                  fontSize: moderateScale(14, 0.6),
                  marginRight: moderateScale(10, 0.3),
                }}>
                Report/Flag User
              </CustomText>
              <Icon
                name={'flag'}
                as={Entypo}
                color={Color.white}
                size={moderateScale(20, 0.6)}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    
      <ImageView
        images={image?.url}
        imageIndex={selectedIndex}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      />
        <ImagePickerModal
          show={showMultiImageModal}
          setShow={setShowMultiImageModal}
          setMultiImages={setMultiImages}
          images={multiImages}
          index={index}
        />
    </>
  );
};
// UserDetail.sharedElements = route => {
//   const {item} = route.params;
//   return [
//     {
//       id: `item.${item.id}.image_url`,
//       animation: 'move',
//       resize: 'clip',
//     },
//   ];
// };

export default UserDetail;

const styles = ScaledSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight * 0.4,
    backgroundColor: '#EEEEEE',
  },
  container: {
    marginTop: moderateScale(-30, 0.3),
    minHeight: windowHeight * 0.65,
    width: windowWidth,
    backgroundColor: Color.white,
    borderTopLeftRadius: moderateScale(35, 0.6),
    borderTopRightRadius: moderateScale(35, 0.6),
  },
  row: {
    paddingHorizontal: moderateScale(20, 0.6),
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-evenly',
    marginTop: moderateScale(-25, 0.3),
  },
  likeContainer: {
    backgroundColor: 'white',
    height: moderateScale(55, 0.6),
    width: moderateScale(55, 0.6),
    borderRadius: moderateScale(27, 0.6),
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
  israelite: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.15,
    backgroundColor: Color.themeColor,
    borderRadius: moderateScale(8, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
  },
  heading: {
    fontSize: moderateScale(24, 0.6),
    color: Color.themeBlack,
    marginLeft: moderateScale(20, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  btn: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.themeColor,
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.6),
    flexDirection: 'row',
  },
  imageView: {
    width: windowWidth * 0.95,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(15, 0.3),
    height: windowHeight * 0.35,
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal:moderateScale(15,0.3),
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
