import React, {useState} from 'react';
import {Icon} from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
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
import { Post } from '../Axios/AxiosInterceptorFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../Store/slices/common';

const Header = props => {

  const dispatch = useDispatch();
  const token = useSelector(state=>state.authReducer.token);
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [drawerModal, setDrawerModal] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
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
          title: 'Portfolio',
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
    {key: 4, title: 'Legal', onPress: () => alert('Action needed')},
    {
      key: 5,
      title: 'Subscribe Now',
      onPress: () => {
        navigationService.navigate('Subscription'), setDrawerModal(false);
      },
    },
    {key: 6, title: 'Privacy Policy', onPress: () => alert('Action needed')},
    {
      key: 7,
      title: 'terms & conditions',
      onPress: () => {
        navigationService.navigate('TermsAndConditions'), setDrawerModal(false);
      },
    },
    {
      key: 8,
      title: 'Help',
      onPress: () => {
        navigationService.navigate('Support'), setDrawerModal(false);
      },
    },
    {
      key: 9,
      title: 'Who Viewed Me?',
      onPress: () => {
        navigationService.navigate('WhoViewedMe'), setDrawerModal(false);
      },
    },
    {
      key: 9,
      title: 'set Account visibility to global',
      onPress: (data) => {
        setAccountVisible()
      },
      switch: true,
      switchEnabled: switchEnabled,
      setSwitchEnabled: setSwitchEnabled,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);


  const setAccountVisible =async()=>{
    const url = 'user/update-my-profile-app';
    const response = await Post(url , {} , apiHeader(token))
    if(response != undefined){
      // return console.log('data ======= = = = = = ' , response?.data)
      dispatch(setUserData(response?.data))
    }
  }

  const notificaitonArray = [
    {
      image: require('../Assets/Images/woman1.jpeg'),
      invitation: true,
      time: '2023-03-24',
      name: 'Clara',
      age: '22',
      distance: '5',
      text: 'invites you for a match',
    },
    {
      image: require('../Assets/Images/woman2.jpeg'),
      messaged: true,
      time: '2023-03-24',
      name: 'Clara',
      age: '22',
      distance: '5',
      text: 'Patricia,23 messaged you, reply now! “Omg, that was so much fun. Let',
    },
    {
      image: require('../Assets/Images/woman1.jpeg'),
      commented: true,
      time: '2023-03-24',
      name: 'Clara',
      age: '22',
      distance: '5',
      text: 'invites you for a match',
      photo: require('../Assets/Images/woman3.jpeg'),
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

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

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
              right: moderateScale(10, 0.3),
              width: windowWidth * 0.12,
              height: windowHeight * 0.2,
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/headerLogo.png')}
              resizeMode={'contain'}
              style={{
                width: '100%',
                height: '100%',
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
              dispatch(setUserLogoutAuth());
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
          {DrawerArray.map((item, index) => {
            return <DrawerOptions item={item} />;
          })}
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
            <CustomText style={styles.heading}>Notification</CustomText>
            <Icon
              name={'bell'}
              as={FontAwesome}
              size={moderateScale(18, 0.3)}
              color={Color.veryLightGray}
              // onPress={()=}
              // style={{
              // }}
            />
          </View>
          {notificaitonArray.map((item, index) => {
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
          })}
        </ScrollView>
      </Modal>
    </View>
  );
};
const styles = ScaledSheet.create({
  header2: {
    width: windowWidth,
    height: windowHeight * 0.05,
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
});
export default Header;
