import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import moment from 'moment';
import {FlatList} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import NotificationCard from '../Components/NotificationCard';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';
import {useState} from 'react';
import ChatCard from '../Components/ChatCard';
import {useSelector} from 'react-redux';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomImage from '../Components/CustomImage';
import {CometChatUI} from '../cometchat-chat-uikit-react-native-3/CometChatWorkspace/src';
import {CometChat} from '@cometchat-pro/react-native-chat';

// import { CometChatUI } from '../../SRC/cometchat-chat-uikit-react-native-3';

const ChatScreen = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ file: ChatScreen.js:27 ~ ChatScreen ~ userData:", userData?.uid)
  const [searchData, setSearchData] = useState('');

  const chatListingData = [
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/image1.jpeg'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/image2.jpeg'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/image3.jpeg'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/image4.jpeg'),
      lastMessage: 'Loved to work with you thanks',
      unread: true,
      unreadCount: 6,
      time: moment('2023-02-20').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/image5.jpeg'),
      lastMessage: 'there?',
      unread: false,
      // unreadCount : 1,
      time: moment('2023-02-16').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/woman1.jpeg'),
      lastMessage: 'please update me about my money',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
    },
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/woman2.jpeg'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/woman3.jpeg'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/woman4.jpeg'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/image1.jpeg'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
  ];
  const authKey = '07ba629476752645dbce6a6c4aad7b2fc680b511';
  const uid = 'SUPERHERO2';

  const LoginUser = () => {
    CometChat.login(userData?.uid, authKey).then(
      user => {
        console.log('Login Successful:', {user});
      },
      error => {
        console.log('Login failed with exception:', {error});
      },
    );
  };

  useEffect(() => {
    LoginUser();
  }, []);

  return (
    <View style={{flex: 1}}>
      <CometChatUI  isGroupListEnabled={false} />
      {/* <CometChat  isGroupListEnabled={false}/> */}
    </View>

    // <>
    //   <CustomStatusBar
    //     backgroundColor={Color.white}
    //     barStyle={'dark-content'}
    //   />
    //   <Header
    //     showLeft={true}
    //     showRight={true}
    //     rightName={'bell'}
    //     title={'SpotLight'}
    //     leftName={'menufold'}
    //     leftType={AntDesign}
    //     textStyle={{
    //       color: Color.veryLightGray,
    //     }}
    //   />
    //   <LinearGradient
    //     style={
    //       {
    //         // width: windowWidth,
    //         // height: windowHeight,
    //       }
    //     }
    //     start={{x: 0, y: 0}}
    //     end={{x: 1, y: 0}}
    //     colors={[Color.white, Color.white]}>
    //     <SearchContainer
    //       width={windowWidth * 0.9}
    //       input
    //       inputStyle={{
    //         height: windowHeight * 0.05,
    //       }}
    //       style={{
    //         height: windowHeight * 0.06,
    //         marginTop: moderateScale(20, 0.3),
    //         borderRadius: moderateScale(5, 0.3),
    //         alignSelf: 'center',
    //       }}
    //       data={searchData}
    //       setData={setSearchData}
    //     />
    //     <CustomText
    //       style={[
    //         styles.header,
    //         {
    //           marginLeft: moderateScale(20, 0.3),
    //           marginVertical: moderateScale(15, 0.3),
    //         },
    //       ]}>
    //       New Matches
    //     </CustomText>
    //     <FlatList
    //       data={chatListingData}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{
    //         paddingHorizontal: moderateScale(20, 0.3),
    //         paddingVertical : moderateScale(5,0.6)
    //         // alignItems: 'center',
    //       }}
    //       style={{
    //         flexGrow: 0,
    //         marginBottom : moderateScale(20,0.3)
    //         // height: windowHeight * 0.4,
    //         // backgroundColor : Color.themeColor
    //       }}
    //       renderItem={({item, index}) => {
    //         return (
    //           <CustomImage
    //             source={item?.image}
    //             style={{
    //               width: moderateScale(50, 0.6),
    //               height: moderateScale(50, 0.6),
    //               borderRadius: moderateScale(25, 0.6),
    //               marginRight: moderateScale(10, 0.3),
    //             }}
    //           />
    //         );
    //       }}
    //     />
    //       <CustomText  style={[styles.header ,  {
    //           marginLeft: moderateScale(20, 0.3),
    //         },]}>
    //             Messages
    //           </CustomText>
    //     <FlatList
    //       data={chatListingData}
    //       showsVerticalScrollIndicator={false}
    //       contentContainerStyle={{
    //         paddingBottom: moderateScale(100, 0.3),
    //         paddingTop: moderateScale(20, 0.3),
    //         alignItems: 'center',
    //       }}
    //       style={{
    //         height: windowHeight * 0.65,
    //         // backgroundColor : Color.themeColor
    //       }}
    //       renderItem={({item, index}) => {
    //         return (
    //           <ChatCard
    //             date={item?.time}
    //             image={item?.image}
    //             lastmessage={item?.lastMessage}
    //             name={item?.name}
    //             // unread={item?.unread}
    //             // unreadCount={item?.unreadCount}
    //           />
    //         );
    //       }}

    //     />
    //   </LinearGradient>
    // </>
  );
};

export default ChatScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
    width: windowWidth * 0.9,
  },
});
