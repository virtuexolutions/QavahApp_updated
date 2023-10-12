import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Swiper from 'react-native-deck-swiper';
import Card from '../Components/Card';
import OverlayLabel from '../Components/OverlayLabel';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import IconWithName from '../Components/IconWithName';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';

import BtnContainer from '../Components/BtnContainer';
import navigationService from '../navigationService';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import NullDataComponent from '../Components/NullDataComponent';
import SuperLikeModal from '../Components/SuperLikeModal';

const SpotLight = () => {
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  const isFocused = useIsFocused();
  const [fromSpotLight, setFromSpotlight] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [spotLightData, setSpotLightData] = useState([]);
  // console.log(
  //   '🚀 ~ file: SpotLight.js:41 ~ SpotLight ~ setSpotLightData:',
  //    spotLightData
  // );

  const [isSuperLikeVisible, setSuperLikeVisible] = useState(false);

  const [theyAreYourType, setTheyAreYourType] = useState([]);
  // console.log("🚀 ~ file: SpotLight.js:56 ~ theyAreYourType:", theyAreYourType[0]?.profile_images)
  const [YourAreThereType, setYourAreThereType] = useState([]);
  // console.log("🚀 ~ file: SpotLight.js:49 ~ SpotLight ~ theyAreYourType:", theyAreYourType)

  const [isLoading, setIsLoading] = useState(true);
  const [photoCards, setPhotoCards] = useState([
    {
      profileName: 'Austin Wade',
      age: 22,
      photo: require('../Assets/Images/woman5.jpeg'),
      key: 'caseex6qfO4TPMYyhorner',
      profile_images: [
        '../Assets/Images/image1.jpeg',
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Aleksander Borzenets',
      age: 28,
      photo: require('../Assets/Images/banner.jpg'),
      key: 'ozda-XbeP0k',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Don Delfin Espino',
      age: 29,
      photo: require('../Assets/Images/banner2.jpg'),
      key: 'nBywXevf_jE-',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Eduardo Dutra',
      age: 30,
      photo: require('../Assets/Images/banner3.jpg'),
      key: 'ZHy0efLnzVc',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Wesley Tingey',
      age: 21,
      photo: require('../Assets/Images/banner.jpg'),
      key: 'TvPCUHten1o',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Gift Habeshaw',
      age: 26,
      photo: require('../Assets/Images/banner1.jpg'),
      key: 'dlbiYGwEe9U',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Henri Pham',
      age: 30,
      photo: require('../Assets/Images/banner2.jpg'),
      key: 'Ml4tr2WO7JE',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Nico Marks',
      age: 24,
      photo: require('../Assets/Images/banner3.jpg'),
      key: 'mFcc5b_t74Q',
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Sirio',
      age: 28,
      photo: require('../Assets/Images/banner.jpg'),
      key: "Ty4f_NOFO60'",
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Teymi Townsend',
      age: 30,
      photo: require('../Assets/Images/banner2.jpg'),
      key: "AvLHH8qYbAI'",
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
        require('../Assets/Images/woman1.jpeg'),
        require('../Assets/Images/woman2.jpeg'),
        require('../Assets/Images/woman3.jpeg'),
        require('../Assets/Images/woman4.jpeg'),
        require('../Assets/Images/woman5.jpeg'),
      ],
    },
    {
      profileName: 'Caique Silva',
      age: 20,
      photo: require('../Assets/Images/banner3.jpg'),
      key: "3ujVzg9i2EI'",
      profile_images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
      ],
    },
    {
      profileName: 'David Yanutenama',
      age: 21,
      photo: require('../Assets/Images/banner1.jpg'),
      key: "5AoO7dBurMw'",
      profile_images: [
        '../Assets/Images/image1.jpeg',
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
      ],
    },
  ]);

  const dummyArray = [
    require('../Assets/Images/woman1.jpeg'),
    require('../Assets/Images/woman2.jpeg'),
    require('../Assets/Images/woman3.jpeg'),
    require('../Assets/Images/woman4.jpeg'),
  ];

  const getSpotLightData = async () => {
    setSpotLightData([])
    const url = 'user_spotlights';
    setIsLoading(true);
    const response = await Get(url, token);

    if (response != undefined) {
      response?.data.users.map((item, index) => {
        // console.log('data -=========== > ', JSON.stringify(item , null ,2)),
        return (
          item.user_spotlights.length > 0 &&
          setSpotLightData(prev => [...prev, item])
        );
      });
    }
    setIsLoading(false);
  };


  const getTheyAreYourType = async () => {
    const url = 'seeking/theyareyourtype';
    setIsLoading(true);
    const response = await Post(url, { targetsUid: user.id }, apiHeader(token));

    if (response != undefined) {
      setTheyAreYourType(response?.data?.peoples);
    }

    setIsLoading(false);
  };


  const getYourAreThereType = async () => {

     
    const url = 'seeking/youaretheretype';
    setIsLoading(true);
    const response = await Get(url,token);
    //  console.log("NEW SPOTLIGHT DATA",response?.data?.peoples[0]?.profile_images)
    if (response != undefined) {
    // console.log("🚀 ~ file: SpotLight.js:320 ~ getYourAreThereType ~ response:", response?.data?.peoples)

      setYourAreThereType(response?.data?.peoples);
    }

    setIsLoading(false);
 
  };






  useEffect(() => {
   
    getSpotLightData();
    getTheyAreYourType();
    getYourAreThereType();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        showRight={true}
        rightName={'bell'}
        title={'SpotLight'}
        leftName={'menufold'}
        leftType={AntDesign}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      {isLoading ? (
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Color.themeColor} size={'large'} />
        </View>
      ) : (
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
          {/* <View style={styles.image}>
          <CustomImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../Assets/Images/woman1.jpeg')}
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
                <CustomText style={styles.text}>{`Jennifer, 22`}</CustomText>
                <CustomText style={styles.text1}>{`Model Fashion`}</CustomText>
              </View>
            </View>
          </LinearGradient>
        </View> */}
          <View
            style={{
              height: windowHeight * 0.48,
              width: windowWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {spotLightData.length > 0 ? (
              <Swiper
                animateCardOpacity
                style={styles.mainContainer}
                containerStyle={styles.subcontainer}
                cards={spotLightData}
                renderCard={(item, index) => (
                  <Card
                    card={item}
                    height={windowHeight * 0.45}
                    fromSpotLight={fromSpotLight}
                  />
                )}
                cardIndex={0}
                cardVerticalMargin={moderateScale(5, 0.6)}
                backgroundColor="white"
                stackSize={2}
                infinite
                showSecondCard={true}
                animateOverlayLabelsOpacity
                swipeBackCard
                onSwipedLeft={async (index, item) => {

                  const url = 'swap/disliked';
                  const response = await Post(
                    url,
                    { targetsUid: item?.id },
                    apiHeader(token),
                  );

                  if (response?.data?.status == true) {
                    const filteredData2 = spotLightData.filter(
                      (data, index) =>
                        response?.data?.peoples?.match_id != data?.id,
                    );

                    setSpotLightData(filteredData2);
                  } else {
                    console.log('in else');
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                        response?.data?.error,
                        ToastAndroid.SHORT,
                      )
                      : Alert.alert(response?.data?.error);
                  }
                }}
                disableBottomSwipe={true}
                onSwipedRight={async (index, item) => {
                  const url = 'swap/liked';
                  // console.log({targetsUid: selectedId});
                  const response = await Post(
                    url,
                    { targetsUid: item?.id },
                    apiHeader(token),
                  );
                  if (response?.data?.status) {

                    setSpotLightData(
                      spotLightData.filter(
                        (data, index) =>
                          response?.data?.peoples?.match_id != data?.id,
                      ),
                    );
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                        response?.data?.error,
                        ToastAndroid.SHORT,
                      )
                      : Alert.alert(response?.data?.error);
                  }
                }}
                onSwipedTop={async (index, item) => {
                  // console.log("🚀 ~ file: SpotLight.js:463 ~ onSwipedTop={ ~ item:", item?.id)

                  const url = 'swap/superLiked';
                  const response = await Post(url, { targetsUid: item?.id }, apiHeader(token))
                  // console.log("🚀 ~ file: SpotLight.js:468 ~ onSwipedTop={ ~ response:", response?.data)
                  if (response?.data?.status) {


                    setSpotLightData(spotLightData.filter((data, index) => response?.data?.peoples?.only?.match_id != data?.id))
                    // console.log("🚀 ~ file: SpotLight.js:464 ~ onSwipedTop={ ~ response:", response?.data)

                  } else {
                    Platform.OS == 'android' ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT) : Alert.alert(response?.data?.error)
                  }

                  // setSuperLikeVisible(true);
                }}

                overlayLabels={{
                  left: {
                    title: 'LO',
                    element: <OverlayLabel label="LO" color="#E5566D" />,
                    style: {
                      wrapper: {
                        alignItems: 'flex-end',
                        right: moderateScale(30, 0.3),
                      },
                    },
                  },
                  right: {
                    title: 'KAN',
                    element: <OverlayLabel label="KAN" color="#4CCC93" />,
                    style: {
                      wrapper: {
                        alignItems: 'flex-start',
                        // alignItems: 'flex-start',
                        left: moderateScale(30, 0.3),
                      },
                    },
                  },
                  top: {
                    element: <OverlayLabel label="SUPER FANCY" color="blue" />,
                    title: 'SUPER FANCY',
                    style: {
                      wrapper: {
                        // alignItems: 'flex-end',
                        flexDirection: 'column',
                        bottom: moderateScale(80, 0.6),
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    },
                  },
                }}
              />
            ) : (
              <NullDataComponent />
            )}
          </View>
          <CustomText
            isBold
            style={{
              width: windowWidth * 0.9,
              fontSize: moderateScale(20, 0.6),
              marginTop: moderateScale(20, 0.3),
            }}>
            They're your type
          </CustomText>
          <FlatList
            data={theyAreYourType}
            ListEmptyComponent={
              <NullDataComponent
                style={{
                  width: windowWidth * 0.15,
                  height: windowWidth * 0.15,
                  fontSize: moderateScale(15, 0.6),
                  borderWidth: 2,
                  borderColor: Color.themeColor,
                  marginTop: moderateScale(30, 0.3)
                }}
              />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(20, 0.3),
              paddingVertical: moderateScale(5, 0.6),
              // alignItems: 'center',
            }}
            style={{
              flexGrow: 0,
              // marginBottom : moderateScale(20,0.3)
              // height: windowHeight * 0.4,
              // backgroundColor : Color.themeColor
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    width: windowWidth * 0.42,
                    height: windowHeight * 0.2,
                    backgroundColor: Color.veryLightGray,
                    borderRadius: moderateScale(15, 0.6),
                    overflow: 'hidden',
                    // marginTop: moderateScale(20, 0.3),
                    marginRight: moderateScale(10, 0.3),
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigationService.navigate('UserDetail', {
                      item: item,
                      fromSearch: true,
                    });
                  }}>
                  <CustomImage
                    onPress={() => {
                      navigationService.navigate('UserDetail', {
                        item: item,
                        fromSearch: true,
                      });
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{uri:item?.profile_images[0].url}}
                  />
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.9 }}
                    colors={['#000000', '#ffffff00']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      // justifyContent: 'flex-end',
                      shadowOffset: { height: 2, width: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      width: '100%',
                      paddingBottom: moderateScale(50, 0.6),
                      justifyContent: 'center',
                      paddingLeft: moderateScale(10, 0.6),
                      paddingTop: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                      numberOfLines={2}
                      style={{
                        color: Color.white,
                        fontSize: moderateScale(12, 0.6),
                        width: '90%',
                      }}>
                      {`${item?.profileName},${item?.location?.city}`}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'location-outline'}
                        as={Ionicons}
                        size={moderateScale(12, 0.6)}
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
                      onPress={async () => {
                        // console.log("🚀 ~ file: SpotLight.js:647 ~ onPress={ ~ item:", item)

                        const url = 'swap/disliked';
                        const response = await Post(
                          url,
                          { targetsUid: item?.id },
                          apiHeader(token),
                        );
                        // console.log("🚀 ~ file: SpotLight.js:655 ~ onPress={ ~ response:", response?.data)

                        if (response?.data?.status) {
                          const filteredData2 = theyAreYourType.filter(
                            (data, index) =>
                              response?.data?.peoples?.match_id != data?.id,
                          );

                          setTheyAreYourType(filteredData2);
                        } else {
                          console.log('in else');
                          Platform.OS == 'android'
                            ? ToastAndroid.show(
                              response?.data?.error,
                              ToastAndroid.SHORT,
                            )
                            : Alert.alert(response?.data?.error);
                        }
                      }}
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
                      onPress={async () => {
                        const url = 'swap/liked';
                        // console.log({targetsUid: selectedId});
                        const response = await Post(
                          url,
                          { targetsUid: item?.id },
                          apiHeader(token),
                        );
                        if (response?.data?.status) {

                          setTheyAreYourType(
                            theyAreYourType.filter(
                              (data, index) =>
                                response?.data?.peoples?.match_id != data?.id,
                            ),
                          );
                        } else {
                          Platform.OS == 'android'
                            ? ToastAndroid.show(
                              response?.data?.error,
                              ToastAndroid.SHORT,
                            )
                            : Alert.alert(response?.data?.error);
                        }
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <CustomText
            isBold
            style={{
              width: windowWidth * 0.9,
              fontSize: moderateScale(20, 0.6),
              marginTop: moderateScale(20, 0.3),
            }}>
            You're their type
          </CustomText>
          {/* <View
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
            text={'Model Fashion'}
            imageStyle={{
              marginRight: moderateScale(15, 0.3),
            }}
            width={windowWidth * 0.41}
          />
          <IconWithName
            iconName={'building'}
            iconType={FontAwesome}
            text={'Fashion Center'}
            imageStyle={{
              marginRight: moderateScale(15, 0.3),
            }}
            width={windowWidth * 0.41}
          />
          <IconWithName
            iconName={'md-location-sharp'}
            iconType={Ionicons}
            text={'Jakarta, Indonesia'}
            imageStyle={{
              marginRight: moderateScale(15, 0.3),
            }}
            width={windowWidth * 0.41}
          />
          <IconWithName
            iconName={'user-graduate'}
            iconType={FontAwesome5}
            text={'Fashion School'}
            imageStyle={{
              marginRight: moderateScale(15, 0.3),
            }}
            width={windowWidth * 0.41}
          />
        </View> */}

          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginTop: moderateScale(20, 0.3),
              flexWrap: 'wrap',
            }}>
            {YourAreThereType.length > 0 ? YourAreThereType?.map((x, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigationService.navigate('UserDetail', {
                      item: x,
                      fromSearch: true,
                    });
                  }}
                  style={{
                    width: windowWidth * 0.42,
                    height: windowHeight * 0.2,
                    backgroundColor: Color.veryLightGray,
                    borderRadius: moderateScale(15, 0.6),
                    overflow: 'hidden',
                    marginTop: moderateScale(20, 0.3),
                  }}>
                  <CustomImage
                    onPress={() => {
                      navigationService.navigate('UserDetail', {
                        item: x,
                        fromSearch: true,
                      });
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{uri:x?.profile_images[0].url}}
                  />
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.9 }}
                    colors={['#000000', '#ffffff00']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      // justifyContent: 'flex-end',
                      shadowOffset: { height: 2, width: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      width: '100%',
                      paddingBottom: moderateScale(50, 0.6),
                      justifyContent: 'center',
                      paddingLeft: moderateScale(10, 0.6),
                      paddingTop: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                      numberOfLines={2}
                      style={{
                        color: Color.white,
                        fontSize: moderateScale(12, 0.6),
                        width: '90%',
                      }}>
                      {`${x?.profileName} , ${x?.location.city}`}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'location-outline'}
                        as={Ionicons}
                        size={moderateScale(12, 0.6)}
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
                      onPress={async () => {
                        // console.log("🚀 ~ file: SpotLight.js:647 ~ onPress={ ~ item:", item)

                        const url = 'swap/disliked';
                        const response = await Post(
                          url,
                          { targetsUid: x?.id },
                          apiHeader(token),
                        );
                        // console.log("🚀 ~ file: SpotLight.js:655 ~ onPress={ ~ response:", response?.data)

                        if (response?.data?.status) {
                          const filteredData2 = YourAreThereType.filter(
                            (data, index) =>
                              response?.data?.peoples?.match_id != data?.id,
                          );

                          setYourAreThereType(filteredData2);
                        } else {
                          console.log('in else');
                          Platform.OS == 'android'
                            ? ToastAndroid.show(
                              response?.data?.error,
                              ToastAndroid.SHORT,
                            )
                            : Alert.alert(response?.data?.error);
                        }
                      }}
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
                      onPress={async () => {
                        const url = 'swap/liked';
                        // console.log({targetsUid: selectedId});
                        const response = await Post(
                          url,
                          { targetsUid: x?.id },
                          apiHeader(token),
                        );
                        if (response?.data?.status) {

                          setYourAreThereType(
                            YourAreThereType.filter(
                              (data, index) =>
                                response?.data?.peoples?.match_id != data?.id,
                            ),
                          );
                        } else {
                          Platform.OS == 'android'
                            ? ToastAndroid.show(
                              response?.data?.error,
                              ToastAndroid.SHORT,
                            )
                            : Alert.alert(response?.data?.error);
                        }
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }) : <NullDataComponent
            style={{
              width: windowWidth * 0.15,
              height: windowWidth * 0.15,
              fontSize: moderateScale(15, 0.6),
              borderWidth: 2,
              borderColor: Color.themeColor,
              marginTop: moderateScale(30, 0.3)
            }}
          />}
          </View>
        </ScrollView>
      )}
      <SuperLikeModal
        isVisible={isSuperLikeVisible}
        setIsVisible={setSuperLikeVisible}
      />
    </>
  );
};

export default SpotLight;

const styles = ScaledSheet.create({
  subcontainer: {
    backgroundColor: 'white',
    height: windowHeight * 0.5,

    overflow: 'hidden',
  },

  mainContainer: {
    // backgroundColor: 'green',
    height: windowHeight * 0.5,
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    backgroundColor: Color.veryLightGray,
    borderRadius: moderateScale(15, 0.6),
    overflow: 'hidden',
    marginTop: moderateScale(20, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  container: {
    marginTop: moderateScale(-30, 0.3),
    minHeight: windowHeight * 0.65,
    width: windowWidth,
    backgroundColor: Color.white,
    borderTopLeftRadius: moderateScale(35, 0.6),
    borderTopRightRadius: moderateScale(35, 0.6),
  },
  modalContainer: {
    borderTopLeftRadius: moderateScale(30, 0.6),
    borderBottomLeftRadius: moderateScale(30, 0.6),

    alignSelf: 'flex-end',
    width: windowWidth * 0.8,
    maxHeight: windowHeight,
    backgroundColor: 'white',
    marginRight: moderateScale(-20, 0.3),
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20, 0.3),
  },
  heading: {
    fontSize: moderateScale(17, 0.6),
    color: Color.veryLightGray,
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    textShadowColor: Color.black,
    // textShadowRadius: moderateScale(30, 0.6),
  },
  text1: {
    fontSize: moderateScale(16, 0.6),
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
  absoluteContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: moderateScale(5, 0.6),
  },
});
