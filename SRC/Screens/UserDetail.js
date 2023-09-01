import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from '../Components/CustomImage';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
// import {SharedElement} from 'react-navigation-shared-element';
import {ScrollView} from 'react-native';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

import BtnContainer from '../Components/BtnContainer';
import {Icon, Toast} from 'native-base';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import IconWithName from '../Components/IconWithName';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../Components/CustomButton';
import {useSelector} from 'react-redux';
import ImageContainer from '../Components/ImageContainer';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import ReportModal from '../Components/ReportModal';
import DiscreteModal from '../Components/DiscreteModal';
import LoveNotesModal from '../Components/LoveNotesModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';

const UserDetail = props => {
  const focused = useIsFocused();
  console.log('🚀 ~ file: UserDetail.js:45 ~ UserDetail ~ focused:', focused);
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();
  const user = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ file: UserDetail.js:49 ~ UserDetail ~ user:", user)
  // console.log(
  //   '🚀 ~ file: UserDetail.js:39 ~ UserDetail ~ user:',
  //   user?.subscription,
  // );
  const item = props?.route?.params?.item;
  console.log("🚀 ~ file: UserDetail.js:55 ~ UserDetail ~ item:", item)
  const fromSearch = props?.route?.params?.fromSearch;
  console.log("🚀 ~ file: UserDetail.js:57 ~ UserDetail ~ fromSearch:", fromSearch)
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(fromSearch ? item : user);
  console.log("🚀 ~ file: UserDetail.js:58 ~ UserDetail ~ userData:",  userData?.user_profile_verified)
  const [reported, setReported] = useState(false);
  const [loveNoteModal, setLoveNoteModal] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState('');
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState(
    userData?.gallery_images?.length > 5
      ? userData?.gallery_images?.slice(0, 5)
      : userData?.gallery_images,
  );
  console.log(
    '🚀 ~ file: UserDetail.js:69 ~ UserDetail ~ galleryImages:',
    userData?.gallery_images?.length,
  );
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [loveNoteData, setLoveNoteData] = useState('');

  const [multiImages, setMultiImages] = useState([
    {id: 1, uri: require('../Assets/Images/image1.jpeg')},
    {id: 2, uri: require('../Assets/Images/image2.jpeg')},
    {id: 3, uri: require('../Assets/Images/image3.jpeg')},
    {id: 4, uri: require('../Assets/Images/image4.jpeg')},
    {id: 5, uri: require('../Assets/Images/image4.jpeg')},
    {id: 6, uri: require('../Assets/Images/image5.jpeg')},
  ]);

  const reportUser = async () => {
    const url = 'settings/report-profile';
    const response = await Post(
      url,
      {targetuid: userData?.id, reason: reason},
      apiHeader(token),
    );

    console.log('reported ======>', response?.data);
    if (response?.data?.status) {
      // console.log("🚀 ~ file: UserDetail.js:64 ~ reportUser ~ response:", response
      setReported(response?.data?.status);
      setReportModalVisible(false);
    } else {
      // console.log('reported ======>' , response?.data)
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
        : alert(response?.data?.error);
    }
  };

  const sendLoveNote = async () => {
    const url = 'send-love-note';
    const body = {
      targetUid: userData?.id,
      love_note: loveNoteData,
    };
    console.log('🚀 ~ file: UserDetail.js:123 ~ sendLoveNote ~ body:', body);
    if (loveNoteData == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please send some message', ToastAndroid.SHORT)
        : alert('Please send some message');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));

    if (response?.data?.status) {
      setIsLoading(false);
      Platform.OS == 'android'
        ? ToastAndroid.show('Lovenote has been send', ToastAndroid.SHORT)
        : alert('Lovenote has been send');

      console.log('response ===>>', response?.data);
      setLoveNoteModal(false);
    } else {
      setIsLoading(false);
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT)
        : alert(response?.data?.message);

      console.log('response ===>>', response?.data);
      setLoveNoteModal(false);
    }
  };

  


  // const images = [require('../Assets/Images/woman1.jpeg')];
  // console.log('🚀 ~ file: UserDetail.js:50 ~ UserDetail ~ images:', images);
  const [image, setImage] = useState([]);
  console.log('🚀 ~ file: UserDetail.js:65 ~ UserDetail ~ image:', image);

  const handleLike = async () => {
    const url = 'swap/liked';
    const response = await Post(
      url,
      {targetsUid: userData?.id},
      apiHeader(token),
    );
    if (response?.data?.status == true) {
      navigation.goBack();
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
        : alert(response?.data?.error);
    }
  };
  const handleDisLike = async () => {
    const url = 'swap/disliked';
    const response = await Post(
      url,
      {targetsUid: userData?.id},
      apiHeader(token),
    );
    if (response?.data?.status == true) {
      navigation.goBack();
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
        : alert(response?.data?.error);
    }
  };


  const viewSomeOneProfile = async id => {
    // console.log('get favoured posts');
    const url = 'favoured/view-someone-profile';
    const body = {
      targetName : userData?.profileName,
      targetuid : userData?.id,
      uid : user?.uid
    }
    console.log("🚀 ~ file: UserDetail.js:149 ~ viewSomeOneProfile ~ body:", body)
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
     console.log('response data for viewing profile   =>>>>>>>>>>>>>>', response?.data);
    //  ToastAndroid.show('response')
    //  setWhoViewedMe(response?.data?.peoples);
    }
  };

  useEffect(() => {
    setImage([]);
    userData?.gallery_images?.map((item, index) =>
      setImage(prev => [...prev, {uri: item?.url}]),
    );
    setUserData(fromSearch ? item : user);
    setGalleryImages(
      userData?.gallery_images?.length > 5
        ? userData?.gallery_images?.slice(0, 5)
        : userData?.gallery_images,
    );
  }, [focused]);

  useEffect(() => {
    if(fromSearch){

      viewSomeOneProfile()
    }
    
  }, [])
  

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
              userData?.profile_images[0]?.url
                ? {uri: userData?.profile_images[0]?.url}
                : require('../Assets/Images/image1.jpeg')
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
                !fromSearch
                  ? navigationService.navigate('PersonalInfo')
                  : handleDisLike();
              }}
              iconSize={moderateScale(30, 0.6)}
            />
            {/* )} */}
            {fromSearch && (
              <>
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

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (user?.subscription?.length > 0) {
                      setLoveNoteModal(true);
                    } else {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'Subscription needed',
                            ToastAndroid.SHORT,
                          )
                        : alert('Subscription needed');
                    }
                  }}
                  style={styles.likeContainer}>
                  <Icon
                    name={'hand-heart'}
                    as={MaterialCommunityIcons}
                    size={moderateScale(25, 0.6)}
                    color={Color.themeColor}
                    onPress={() => {
                      if (user?.subscription?.length > 0) {
                        setLoveNoteModal(true);
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
              </>
            )}
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
                  if (user?.subscription?.length > 0) {
                    navigationService.navigate('Israeliteinfo', {
                      user: userData,
                    });
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
                    width: windowWidth * 0.28,
                    height: windowHeight * 0.04,
                  }}
                  onPress={() => {
                    if (user?.subscription?.length > 0) {
                      navigationService.navigate('Israeliteinfo', {
                        user: userData,
                      });
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
          <View style={{
            flexDirection : 'row',
            // backgroundColor : 'red',
            alignItems : 'center',   marginTop: moderateScale(20, 0.3),
  }}>

          
          <CustomText style={styles.heading}>
            {`${userData?.profileName}`}
          </CustomText>
          {
            
              fromSearch && userData?.user_profile_verified?.status == 1 ?
              <CustomImage 
              source={require('../Assets/Images/verified.png')}
              style={[{
                width : moderateScale(15,0.6),
              height : moderateScale(15,0.6),
              marginLeft : moderateScale(5,0.3)

            }
          ]}
            />
            :
          userData?.user_profile_verified != null && userData?.user_profile_verified?.status != 0 &&
          
              <CustomImage 
              source={require('../Assets/Images/verified.png')}
              style={[{
                width : moderateScale(15,0.6),
              height : moderateScale(15,0.6),
              marginLeft : moderateScale(5,0.3)

            },
            userData?.user_profile_verified?.status == 2 && {
              tintColor : Color.veryLightGray
            }
          ]}
            />
            
          }
          </View>
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
            {galleryImages?.map((item, index) => {
              // console.log('data image =====>>>>', item?.url);
              return (
                <TouchableOpacity
                  onPress={() => {
                    // setImage(item)
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
                      // setImage(item)
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    // userData?.fetch_user_report.some(
                    //   (item, index) => item?.user_id == user?.id,
                    // ) || reported
                    //   ? Color.veryLightGray
                    //   :
                       Color.themeColor,
                },
              ]}
              onPress={() => {
                // !userData?.fetch_user_report.some(
                //   (item, index) => item?.user_id == user?.id,
                // ) &&
                  !reported &&
                  setReportModalVisible(true);
              }}>
              <CustomText
                style={{
                  color: Color.white,
                  fontSize: moderateScale(14, 0.6),
                  marginRight: moderateScale(10, 0.3),
                }}
                onPress={() => {
                  // !userData?.fetch_user_report.some(
                  //   (item, index) => item?.user_id == user?.id,
                  // ) &&
                    !reported &&
                    setReportModalVisible(true);
                }}>
                {
                // userData?.fetch_user_report.some(
                //   (item, index) => item?.user_id == user?.id,
                // ) &&
                 !reported
                  ? 'Already Reported'
                  : 'Report/Flag User'}
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
      <ReportModal
        isVisible={reportModalVisible}
        setIsVisible={setReportModalVisible}
        onPress={reportUser}
        reason={reason}
        setReason={setReason}
        userData={userData}
      />
      <ImageView
        images={image}
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
      <Modal
        isVisible={loveNoteModal}
        onBackdropPress={() => {
          setLoveNoteModal(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container1}>
          <View
            style={{
              // position: 'absolute',
              width: '100%',
              alignItems: 'center',
              marginBottom: moderateScale(10, 0.3),
              flexDirection: 'row',
              // backgroundColor: 'black',
              // height: windowHeight * 0.1,
              height: windowHeight * 0.07,
              justifyContent: 'center',
              backgroundColor: Color.themeColor,
              // marginLeft:moderateScale(10,.3),
            }}>
            <CustomText
              style={[
                {
                  color: Color.white,
                  fontSize: moderateScale(15, 0.3),
                },
              ]}
              isBold>
              Send Love Note
            </CustomText>
          </View>
          <TextInputWithTitle
            titleText={'Enter Description'}
            secureText={false}
            placeholder={'Enter Description'}
            setText={setLoveNoteData}
            value={loveNoteData}
            viewHeight={0.15}
            viewWidth={0.8}
            inputWidth={0.7}
            inputHeight={0.1}
            border={1}
            borderColor={Color.themeLightGray}
            backgroundColor={'#F5F5F5'}
            marginTop={moderateScale(20, 0.3)}
            multiline={true}
            inputStyle={{textAlign: 'vertical'}}
            borderRadius={moderateScale(10, 0.3)}
            placeholderColor={Color.black}
          />
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Send'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            onPress={sendLoveNote}
            marginLeft={windowWidth * 0.05}
            marginRight={windowWidth * 0.05}
            bgColor={[Color.themeColor, Color.themeColor]}
            borderRadius={moderateScale(10, 0.6)}
            marginTop={moderateScale(20, 0.6)}
            marginBottom={moderateScale(10, 0.6)}
            elevation
            isBold
            fontSize={moderateScale(15, 0.6)}
            isGradient
          />
        </View>
      </Modal>
    </>
  );
};

export default UserDetail;

const styles = ScaledSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight * 0.4,
    backgroundColor: '#EEEEEE',
  },
  container1: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    alignItems: 'center',
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
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.3),
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
