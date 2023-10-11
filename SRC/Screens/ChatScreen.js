import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomImage from '../Components/CustomImage';
import {
  CometChatConversationListWithMessages,
  CometChatUI,
} from '../cometchat-chat-uikit-react-native-3/CometChatWorkspace/src';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {setCommetChatUserData} from '../Store/slices/common';

const ChatScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(
    '🚀 ~ file: ChatScreen.js:27 ~ ChatScreen ~ userData:',
    userData?.uid,
  );
  const [searchData, setSearchData] = useState('');
  const commetChatUser = useSelector(
    state => state.commonReducer.commetChatUserData,
  );
  console.log(
    '🚀 ~ file: ChatScreen.js:32 ~ ChatScreen ~ commetChatUser:',
    commetChatUser,
  );
  // console.log("🚀 ~ file: ChatScreen.js:31 ~ ChatScreen ~ userinfo:", userinfo)
  const [userLoggedIn, setUserLogin] = useState(false);

  const appID = '2092182aee051e28';
  const region = 'US';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

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

  const configureCometChat = async () => {
    console.log('here is the chat configuration');
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');

        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  };

  const LoginUser = () => {
    console.log('In login commet chat==============????');
    CometChat.login(
      userData?.uid,
      '07ba629476752645dbce6a6c4aad7b2fc680b511',
    ).then(
      user => {
        console.log('Login Successful:', {user});
        dispatch(setCommetChatUserData(true));
        setUserLogin(true);
      },
      error => {
        console.log('Login failed with exception:', {error});
      },
    );
  };

  useEffect(() => {
    LoginUser();
  }, []);

  return !userLoggedIn ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight,
      }}>
      <ActivityIndicator
        color={Color.themeColor}
        size={moderateScale(60, 0.6)}
      />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <CometChatUI />
    </View>
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
