import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import SuperLikeModal from '../Components/SuperLikeModal';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import NotificationComponent from '../Components/NotificationComponent';
import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout, setUserLogoutAuth} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import DrawerOptions from './DrawerOptions';
import Entypo from 'react-native-vector-icons/Entypo';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData, setUserLogOut} from '../Store/slices/common';
import LoveNotesModal from './LoveNotesModal';
import SpotLightModal from './SpotlightModal';
import CustomButton from './CustomButton';
import DiscreteModal from './DiscreteModal';
import NullDataComponent from './NullDataComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SubscriptionListing from './SubscriptionListing';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import MatchModal from './MatchModal';
import { setIsMatched, setIsSubscribed, setPusherInstance } from '../Store/slices/socket';

const Header = props => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
const match = useSelector(state => state.socketReducer.matched);
console.log("🚀 ~ file: Header.js:54 ~ Header ~ match:", match)
const user = useSelector(state => state.commonReducer.userData);
const userRole = useSelector(state => state.commonReducer.selectedRole);
const pusherInstance = useSelector(state => state.socketReducer.pusherInstance);
console.log("🚀 ~ file: Header.js:320 ~ Header ~ pusherInstance:", pusherInstance)

  const [isLoveNotesVisible, setLoveNotesVisible] = useState(false);
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [drawerModal, setDrawerModal] = useState(false);
  const [discreteModal, setDiscreteModal] = useState(false);
  const userData = useSelector(state => state.commonReducer.userData);
  const [otherData , setotherData] = useState({})
  const DrawerArray = [
    {
      key: 1,
      title: 'My Accounts',
      onPress: null,
      nestedMenu: [
        // {
        //   key: 2,
        //   title: 'Personal info',
        //   onPress: () => {
        //     navigationService.navigate('PersonalInfo'), setDrawerModal(false);
        //   },
        // },
        {
          key: 3,
          title: 'Change Password',
          onPress: () => {
            navigationService.navigate('ChangePassword'), setDrawerModal(false);
          },
        },
        {
          key: 4,
          title: 'Profile',
          onPress: () => {
            navigationService.navigate('UserDetail'), setDrawerModal(false);
          },
        },
        {
          key: 11,
          title: 'Israelite Info',
          onPress: () => {
            navigationService.navigate('IsraeliteFilters', {edit: true}),
              setDrawerModal(false);
          },
        },
        {
          key: 12,
          title: 'More About Me',
          onPress: () => {
            navigationService.navigate('MoreAboutme', {edit: true}),
              setDrawerModal(false);
          },
        },
      ],
    },
    // {key: 4, title: 'Legal', onPress: () => alert('Action needed')},
    {
      key: 5,
      title: 'Subscribe Now',
      onPress: () => {
        navigationService.navigate('Subscription'), setDrawerModal(false);
        // alert('Action needed')
      },
    },
    {
      key: 6,
      title: 'Privacy Policy',
      onPress: () => {
        navigationService.navigate('Privacy'), setDrawerModal(false);
        // alert('Action needed')
      },
    },
    {
      key: 7,
      title: 'terms & conditions',
      onPress: () => {
        navigationService.navigate('TermsAndConditions'), setDrawerModal(false);
        // alert('Action needed')
      },
    },
    {
      key: 8,
      title: 'Help',
      onPress: () => {
        navigationService.navigate('Support'), setDrawerModal(false);
        // alert('Action needed')
      },
    },
    {
      key: 9,
      title: 'Who Viewed Me?',
      onPress: () => {
        navigationService.navigate('WhoViewedMe'), setDrawerModal(false);
        // alert('Action needed')
      },
    },
    {
      key: 10,
      title: 'set Account visibility to global',
      onPress: () => {
        // setSwitchEnabled(!switchEnabled)
        // console.log('switchEnables value=======>>>>',switchEnabled)
        setAccountVisible();
      },
      switch: true,
      data: 'visibility',
    },
    {
      key: 13,
      title: 'set Account Private',
      onPress: () => {
        // setSwitchEnabled(!switchEnabled)
        // console.log('switchEnables value=======>>>>',switchEnabled)
        setAccountPrivacy();
      },
      switch: true,
      data: 'privacy',
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [isBoostModalvisible, setBoostModalvisible] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [heartHand, setHeartHand] = useState(false);
  const [subscription, setSubscription] = useState(
    userData?.subscription?.map(item => {
      return item?.pkg_name;
    }),
  );
  // console.log("🚀 ~ file: Header.js:180 ~ Header ~ subscription:", subscription)

  const setAccountVisible = async () => {
    const url = 'user/update-my-profile-app';
    const response = await Post(url, {}, apiHeader(token));
    // console.log(
    //   '🚀 ~ file: Header.js:157 ~ setAccountVisible ~ response:',
    //   response?.data,
    // );
    if (response != undefined) {
      // return console.log('data ======= = = = = = ' , response?.data?.user)
      dispatch(setUserData(response?.data?.user));
    }
  };
  const setAccountPrivacy = async () => {
    if (
      userData?.subscription
        ?.map(item => {
          return item?.pkg_name;
        })
        .includes('Discrete Mode')
    ) {
      const url = 'user/profile-settings';
      const response = await Post(
        url,
        {
          uid: userData?.id,
          option: ['public', null, undefined, ''].includes(
            userData?.user_privacy?.value,
          )
            ? 'private'
            : 'public',
        },
        apiHeader(token),
      );
      // console.log(
      //   '🚀 ~ file: Header.js:157 ~ setAccountVisible ~ response:',
      //   response?.data,
      // );
      if (response != undefined) {
        // return console.log('data ======= = = = = = ' , response?.data?.user_privacy)
        dispatch(setUserData(response?.data?.user));
      }
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show('Subscription needed', ToastAndroid.SHORT)
        : alert('Subscription needed');
    }
  };

  const getNotifications = async () => {
    const url = 'settings/notification';
    const response = await Get(url, token);

    if (response?.data?.status) {
      // console.log(
      //   '🚀 ~ file: Header.js:171 ~ getNotifications ~ response:',
      //   JSON.stringify(response?.data, null, 2),
      // );
      setNotificationData(response?.data?.notification);
    }
  };

 
  const notification2 = [
    {
      image: require('../Assets/Images/woman1.jpeg'),
      time: '9:00 AM',
      name: 'Clara',
      message: 'Hey!! There',
    },
    {
      image: require('../Assets/Images/woman2.jpeg'),
      time: 'yesterday',
      name: 'Clara',
      message: 'Omg, that was so much fun',
    },
    {
      image: require('../Assets/Images/woman1.jpeg'),
      time: 'just Now',
      name: 'Clara',
      message: 'invites you for a match',
    },
  ];

  const {
    title,
    textStyle,
    showLeft,
    leftName,
    leftPress,
    showRight,
    rightName,
    rightPress,
    leftType,
    alignRight,
    rightType,
  } = props;






  useEffect(() => {
    rightName == 'bell' && getNotifications();
  }, [focused]);


  const unsubscribePusher = async()=>{
    await pusherInstance.unsubscribe({
      channelName: `match-popup-${userData?.id}`,
    });
    dispatch(setIsSubscribed(false))
    dispatch(setPusherInstance(null))
  }

  return (
    <View style={styles.header2}>
      {title && (
        <CustomText
          style={[
            styles.text,
            textStyle,
            alignRight && {textAlign: 'right', width: windowWidth * 0.9},
          ]}>
          {title}
        </CustomText>
      )}
      {showLeft && (
        <Icon
          name={leftName}
          as={leftType ? leftType : AntDesign}
          size={moderateScale(25, 0.3)}
          color={Color.themeLightGray}
          onPress={
            leftName == 'menufold'
              ? () => {
                  setDrawerModal(true);
                }
              : leftPress
              ? leftPress
              : () => {
                  navigationN.goBack();
                }
          }
          style={{
            position: 'absolute',
            left: moderateScale(10, 0.3),
          }}
        />
      )}
      {showRight &&
        (rightName ? (
          <Icon
            name={rightName}
            as={rightType ? rightType : FontAwesome}
            size={moderateScale(22, 0.3)}
            color={Color.themeLightGray}
            onPress={
              rightName == 'bell'
                ? () => {
                    setIsVisible(true);
                  }
                : rightPress
            }
            style={{
              position: 'absolute',
              right: moderateScale(10, 0.3),
              zIndex: 1,
            }}
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              right: moderateScale(15, 0.3),
              width: windowWidth * 0.1,
              height: windowHeight * 0.055,
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/headerLogo.png')}
              resizeMode={'stretch'}
              style={{
                width: '100%',
                height: '100%',
                // justifyContent: 'center',
                // alignSelf:'center',
              }}
            />
          </View>
        ))}
      <Modal
        isVisible={drawerModal}
        hasBackdrop={true}
        onBackdropPress={() => {
          setDrawerModal(false);
        }}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}>
        <ScrollView
          style={styles.modalContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: moderateScale(20, 0.6),
            // backgroundColor : 'red' ,
            height: windowHeight * 0.9,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.7,
              position: 'absolute',
              bottom: 0,
            }}
            activeOpacity={0.8}
            onPress={() => {
              unsubscribePusher()
              dispatch(setUserLogoutAuth());
              dispatch(setUserLogOut());
            }}>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(14, 0.6),
              }}>
              log out
            </CustomText>
            <Icon
              name={'log-out'}
              as={Entypo}
              color={Color.themeColor}
              size={moderateScale(17, 0.6)}
            />
          </TouchableOpacity>
          <View style={styles.row}>
            <CustomText style={styles.heading}>Settings</CustomText>
            <Icon
              name={'settings-sharp'}
              as={Ionicons}
              size={moderateScale(18, 0.3)}
              color={Color.veryLightGray}
              // onPress={()=}
              // style={{
              // }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {DrawerArray?.map((item, index) => {
              return <DrawerOptions item={item} />;
            })}

            <View
              style={{
                width: '93%',
                alignSelf: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: moderateScale(25, 0.3),
              }}>
              <Addones
                icon={require('../Assets/Images/spotlight.png')}
                title={'My Boosts'}
                text={'GET MOre'}
                textColor={'purple'}
                onPress={() => {
                  navigationService.navigate('GetSuperLike', {
                    text: 'premium features',
                  });
                  // setSpotLightVisible(true);
                  setDrawerModal(false);
                }}
              />
              <Addones
                icon={require('../Assets/Images/note.png')}
                title={'Love Notes'}
                text={'GET MOre'}
                textColor={'#AA336A'}
                onPress={() => {
                  navigationService.navigate('GetSuperLike', {
                    text: 'premium features',
                  });
                  // setLoveNotesVisible(true);
                  setDrawerModal(false);
                }}
              />

              <Addones
                icon={require('../Assets/Images/secret.png')}
                title={'Discrete'}
                text={'GET More'}
                textColor={'#286086'}
                onPress={() => {
                  navigationService.navigate('GetSuperLike', {
                    text: 'premium features',
                  });
                  // setDiscreteModal(true);
                  setDrawerModal(false);
                }}
              />
            </View>
            <CustomButton
              onPress={() => {
                navigationService.navigate('GetSuperLike', {text: 'Gold'});
                setDrawerModal(false);
              }}
              text={'Get Qavah gold* \n 5 free super likes every 1 week'}
              width={windowWidth * 0.65}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              bgColor={'white'}
              borderRadius={moderateScale(25, 0.3)}
              fontSize={moderateScale(10, 0.6)}
              marginBottom={moderateScale(20, 0.3)}
              borderColor={Color.themeColor}
              textColor={Color.themeColor}
              borderWidth={1}
              elevation
              isBold
            />
          </ScrollView>
        </ScrollView>
      </Modal>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}>
        <ScrollView
          style={[styles.modalContainer1]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: moderateScale(20, 0.6),
          }}>
          <View style={styles.row}>
            <CustomText style={styles.heading}>
              {heartHand ? 'Love Notes' : 'Notification'}
            </CustomText>

            <Icon
              name={'hand-heart'}
              as={MaterialCommunityIcons}
              size={moderateScale(25, 0.6)}
              color={heartHand ? Color.themeColor : Color.veryLightGray}
              style={{right: moderateScale(30, 0.6), position: 'absolute'}}
              onPress={() => {
                setHeartHand(true);
                if (user?.subscription?.length > 0) {
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
            <Icon
              name={'bell'}
              as={FontAwesome}
              size={moderateScale(18, 0.3)}
              color={!heartHand ? Color.themeColor : Color.veryLightGray}
              onPress={() => {
                setHeartHand(false);
              }}
              // style={{
              // }}
            />
          </View>
          {!heartHand ? (
            notificationData.length > 0 ? (
              notificationData.map((item, index) => {
                return (
                  <NotificationComponent
                    commented={item?.commented}
                    invitation={item?.invitation}
                    item={item}
                    messaged={item?.messaged}
                    onPress={() => {
                      alert('No action yet');
                    }}
                  />
                );
              })
            ) : (
              <View
                style={{
                  // width: windowWidth * 0.5,
                  height: windowHeight * 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NullDataComponent width={windowWidth * 0.7} />
              </View>
            )
          ) : (
            notification2.map((item, index) => {
              return (
                <SubscriptionListing
                  item={item}
                  onPress={() => {
                    alert('No action yet');
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </Modal>
      <LoveNotesModal
        isVisible={isLoveNotesVisible}
        setIsVisible={setLoveNotesVisible}
      />
      <DiscreteModal
        isVisible={discreteModal}
        setIsVisible={setDiscreteModal}
      />
      <MatchModal
        isVisible={match}
        // otherUserData={otherData}
        profileImage={Object.keys(user).length > 0 ? {uri :  user?.profile_images && user?.profile_images[0]?.url} : require('../Assets/Images/banner3.jpg')}
        // setIsVisible={setMatchModalVisible}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  header2: {
    width: windowWidth,
    height: windowHeight * 0.06,
    // paddingTop: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  modalContainer: {
    borderTopRightRadius: moderateScale(30, 0.6),
    borderBottomRightRadius: moderateScale(30, 0.6),

    alignSelf: 'flex-start',
    width: windowWidth * 0.8,
    maxHeight: windowHeight,
    backgroundColor: 'white',
    marginLeft: moderateScale(-20, 0.3),
  },
  modalContainer1: {
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
  containerMini: {
    width: '29%',
    // height: windowHeight * 0.1,
    paddingVertical: moderateScale(5, 0.6),
    backgroundColor: 'white',
    borderRadius: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 9,
    marginRight: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
});
export default Header;

const Addones = ({icon, title, text, onPress, textColor}) => {
  return (
    <View style={styles.containerMini}>
      <CustomImage
        source={icon}
        style={{
          width: moderateScale(30, 0.6),
          height: moderateScale(30, 0.6),
        }}
      />
      <CustomText
        isBold
        style={{
          fontSize: moderateScale(10, 0.6),
          color: Color.veryLightGray,
        }}>
        {title}
      </CustomText>
      <CustomText
        isBold
        style={{
          fontSize: moderateScale(12, 0.6),
          color: textColor,
          textTransform: 'uppercase',
        }}>
        {text}
      </CustomText>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          width: moderateScale(20, 0.6),
          height: moderateScale(20, 0.6),
          borderRadius: moderateScale(10, 0.6),
          borderWidth: 1,
          borderColor: Color.veryLightGray,
          justifyContent: 'center',
          backgroundColor: 'white',
          // alignItems : 'center',
        }}>
        <Icon
          name={'plus'}
          as={Entypo}
          color={Color.themeDarkGray}
          size={moderateScale(12, 0.6)}
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
