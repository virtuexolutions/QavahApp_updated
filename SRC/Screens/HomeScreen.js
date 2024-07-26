import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import {
  apiHeader,
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Swiper from 'react-native-deck-swiper';
import Card from '../Components/Card';
import OverlayLabel from '../Components/OverlayLabel';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnContainer from '../Components/BtnContainer';
import {useDispatch, useSelector} from 'react-redux';
import SuperLikeModal from '../Components/SuperLikeModal';
import SpotLightModal from '../Components/SpotlightModal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import NullDataComponent from '../Components/NullDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {setCommetChatUserData, setUserData} from '../Store/slices/common';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {
  setIsMatched,
  setIsSubscribed,
  setPusherInstance,
  setotherData,
} from '../Store/slices/socket';
import {setIsProfileVerified} from '../Store/slices/auth';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const pusher = Pusher.getInstance();

  const user = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ kamal=====================", JSON.stringify(user?.subscription,null,2))
  const isSubscribed = useSelector(state => state.socketReducer.isSubscribed);

  const token = useSelector(state => state.authReducer.token);
  const [swiperRef, setSwiperRef] = useState();

  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const [isSuperLikeVisible, setSuperLikeVisible] = useState(false);
  const [isSpotLightVisible, setSpotLightVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [photoCards, setPhotoCards] = useState([]);
  const [matchModalVisible, setMatchModalVisible] = useState(false);

  const [LogData, setLogData] = useState([]);

  const [drawerType, setDrawerType] = useState('notification');

  const getUsers = async () => {
    const url = `discover/getPeople/${user?.uid}/${user?.seeking}/${user?.location?.latitude}/${user?.location?.longitude}/${user?.location?.city}/${user?.location?.zipcode}`;

    setIsLoadingApi(true);
    const response = await Get(url, token);
    setIsLoadingApi(false);
    if (response != undefined) {
      setPhotoCards(response?.data?.peoples);
    }
  };
  const getMe = async () => {
    const url = `me`;

    setIsLoadingApi(true);
    const response = await Get(url, token);
    setIsLoadingApi(false);
    if (response != undefined) {
      console.log('=================>',response?.data?.user)
      dispatch(setUserData(response?.data?.user));
      dispatch(
        setIsProfileVerified(response?.data?.user?.user_profile_verified),
      );
    }
  };

  // const unsubscribePusher = async () => {
  //   console.log('unsubscribed happend')

  //   await pusher.unsubscribe({
  //     channelName: `match-popup-${user?.id}`,
  //   });
  //   dispatch(setIsSubscribed(false));
  //   dispatch(setPusherInstance(null));
  //   console.log('unsubscribed successfully')
  // };

  useEffect(() => {
    async function connectPusher() {
      try {
        await pusher.init({
          apiKey: '5fe9676993f3dc44fc82',
          cluster: 'mt1',
        });

        myChannel = await pusher.subscribe({
          channelName: `match-popup-${user?.id}`,
          // channelName: 'my-notificatio+n-channel',
          onSubscriptionSucceeded: (channelName, data) => {
            dispatch(setPusherInstance(pusher));
            dispatch(setIsSubscribed(true));

            console.log('Subscribed to ', channelName);
            console.log(
              `And here are the channel members: ${myChannel.members}`,
            );
          },
          onEvent: event => {
            dispatch(setIsMatched(true));
            console.log('data from pusher:', event.data.message);
            // console.log('Got channel event:', JSON.parse(event.data));

            const dataString = JSON.parse(event.data);

            dispatch(setotherData(dataString?.message?.user));
          },
          onSubscriptionError: error => {
            console.log('data ------========== >', error);
          },
        });
        // await pusher.subscribe({ channelName });
        await pusher.connect();
      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    }
    const disconnectPusher = async () => {
      const result = await pusher.disconnect();
    };
    if (!isSubscribed) {
      connectPusher();
      // disconnectPusher()
      // unsubscribePusher()
    }
  }, [focused]);

  const ActiveSpotLight = async () => {
    const url = 'swap/activate_spotlight';
    setIsLoading(true);
    const response = await Post(url, {}, apiHeader(token));
    setIsLoading(false);
    if (response?.data?.status) {
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT)
        : Alert.alert(response?.data?.message);
      response?.data?.message != 'spotlight already activated' &&
        dispatch(setUserData(response?.data?.resp));
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show(response?.data?.error, ToastAndroid.SHORT)
        : Alert.alert(response?.data?.error);
    }
  };
  const handleOnSwipedLeft = async () => {
    swiperRef.swipeLeft();
  };
  const handleOnSwipedTop = () => {
    // swiperRef.swipeTop(),
    setSuperLikeVisible(true);
  };
  const handleOnSwipedRight = async () => {
    swiperRef.swipeRight();
  };

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
  const UndoLog = async () => {
    if (
      swiperRef?.state?.swipeBackXYPositions?.length > 0 &&
      LogData.length > 0
    ) {
      const url = 'swap/rewind';
      const body = {
        myName: user?.profileName,
        myUid: user?.id,
        targetsUid: LogData[LogData?.length - 1]?.targetsId,
        targetName: LogData[LogData?.length - 1]?.targetsName,
      };
      setIsLoading(true);

      const response = await Post(url, body, apiHeader(token));

      if (response?.data?.status) {
        setIsLoading(false);

        // console.log('Here');

        LogData.pop();
        // console.log('after Pop');

        await swiperRef.swipeBack();
      }
    }
  };

  const setXY = useCallback((x, y) => {
    setXAxis(x);
    setYAxis(y);
  }, []);

  useEffect(() => {
    getUsers();
    getMe();
    setLogData([]);
  }, [focused]);

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
        title={'Home'}
        leftName={'menufold'}
        leftType={AntDesign}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      {isLoadingApi ? (
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Color.themeColor} size={'large'} />
        </View>
      ) : photoCards?.length > 0 ? (
        <>
          <View
            style={{
              height: windowHeight * 0.81,
            }}>
            <Swiper
              ref={ref => {
                setSwiperRef(ref);
              }}
              animateCardOpacity
              style={styles.mainContainer}
              containerStyle={styles.container}
              cards={photoCards}
              renderCard={card => (
                <Card
                  card={card}
                  height={windowHeight * 0.72}
                  cards={selectedId}
                  setCards={setSelectedId}
                  fromSpotLight={false}
                />
              )}
              cardIndex={0}
              cardVerticalMargin={moderateScale(5, 0.6)}
              backgroundColor="white"
              stackSize={photoCards?.length > 1 ? 2 : 1}
              // infinite
              showSecondCard={true}
              animateOverlayLabelsOpacity
              swipeBackCard
              onSwipedLeft={async (index, item) => {
                const url = 'swap/disliked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );
                if (response?.data?.status) {
                  setLogData(prev => [
                    ...prev,
                    {targetsId: item?.id, targetsName: item?.profileName},
                  ]);
                }
              }}
              onSwipedTop={async (index, item) => {
                const url = 'swap/superLiked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );
                if (response?.data?.status) {
                  console.log("🚀 ~ file: HomeScreen.js:334 ~ onSwipedTop={ ~ response:", response?.data)
                  setLogData(prev => [
                    ...prev,
                    {targetsId: item?.id, targetsName: item?.profileName},
                  ]);
                }
              }}
              onSwipedRight={async (index, item) => {
                const url = 'swap/liked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );

                if (response?.data?.status) {
                  setLogData(prev => [
                    ...prev,
                    {targetsId: item?.id, targetsName: item?.profileName},
                  ]);
                }
              }}
              swipeBack={async index => {
                // console.log('index============>>>>>>>>', index);
              }}
              disableBottomSwipe={true}
              onSwipedAll={() => {
                getUsers();
              }}
              onSwiping={(x, y) => {
                setXY(x, y);
              }}
              dragEnd={() => {
                setXAxis(0);
                setYAxis(0);
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
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                },
              }}
            />
          </View>
          <View style={styles.main}>
            <BtnContainer
              backgroundColor={'white'}
              color={Color.themeColor}
              name={isLoading ? 'cloud-download' : 'undo'}
              type={FontAwesome}
              onPress={() => {
                UndoLog();
              }}
            />

            <BtnContainer
              backgroundColor={xAxis < 0 ? Color.themeColor : 'white'}
              color={xAxis < 0 ? Color.white : Color.themeColor}
              name={'close-sharp'}
              type={Ionicons}
              onPress={() => handleOnSwipedLeft()}
            />
            <BtnContainer
              backgroundColor={
                yAxis < -157 && yAxis < xAxis ? Color.themeColor : 'white'
              }
              color={
                yAxis < -157 && yAxis < xAxis ? Color.white : Color.themeColor
              }
              name={'star'}
              type={FontAwesome}
              onPress={handleOnSwipedTop}
            />
            <BtnContainer
              backgroundColor={xAxis > 0 ? Color.themeColor : 'white'}
              color={xAxis > 0 ? Color.white : Color.themeColor}
              name={'heart'}
              type={FontAwesome}
              onPress={() => handleOnSwipedRight(selectedId)}
            />
            <BtnContainer
              backgroundColor={'white'}
              color={Color.themeColor}
              name={'lightning-bolt'}
              type={MaterialCommunityIcons}
              onPress={() => {
                user?.subscription.some((item, index) => item.user_spotlights[0]?.remain_spotlights > 0)
                  ? Alert.alert(
                      'Confirmation',
                      'Are you sure you want to Active the spotlight?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Confirm',
                          onPress: () => {
                            ActiveSpotLight();
                          },
                        },
                      ],
                    )
                  :
                   setSpotLightVisible(true);
                // setMatchModalVisible(true);
              }}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.6,
            marginTop: moderateScale(30, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NullDataComponent />
          {/* {LogData.length > 0 && photoCards.length == 0 && (
            <BtnContainer
              backgroundColor={'white'}
              color={Color.themeColor}
              name={isLoading ? 'cloud-download' : 'undo'}
              type={FontAwesome}
              onPress={() => {
                setIsLoading(true);
                UndoLog();
                setIsLoading(false);
              }}
            />
          )} */}
        </View>
      )}
      <SuperLikeModal
        isVisible={isSuperLikeVisible}
        setIsVisible={setSuperLikeVisible}
      />
      <SpotLightModal
        isVisible={isSpotLightVisible}
        setIsVisible={setSpotLightVisible}
      />
      {/* <MatchModal isVisible={matchModalVisible} setIsVisible={setMatchModalVisible}/> */}
    </>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,

    overflow: 'hidden',
  },

  mainContainer: {
    backgroundColor: 'white',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth,
    paddingHorizontal: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    height: windowHeight * 0.1,
    marginTop: moderateScale(-20, 0.3),
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

// [
//   {
//     name: 'Austin Wade',
//     age: 22,
//     photo: require('../Assets/Images/banner1.jpg'),
//     key: 'caseex6qfO4TPMYyhorner',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Aleksander Borzenets',
//     age: 28,
//     photo: require('../Assets/Images/banner.jpg'),
//     key: 'ozda-XbeP0k',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Don Delfin Espino',
//     age: 29,
//     photo: require('../Assets/Images/banner2.jpg'),
//     key: 'nBywXevf_jE-',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Eduardo Dutra',
//     age: 30,
//     photo: require('../Assets/Images/banner3.jpg'),
//     key: 'ZHy0efLnzVc',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Wesley Tingey',
//     age: 21,
//     photo: require('../Assets/Images/banner.jpg'),
//     key: 'TvPCUHten1o',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Gift Habeshaw',
//     age: 26,
//     photo: require('../Assets/Images/banner1.jpg'),
//     key: 'dlbiYGwEe9U',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Henri Pham',
//     age: 30,
//     photo: require('../Assets/Images/banner2.jpg'),
//     key: 'Ml4tr2WO7JE',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Nico Marks',
//     age: 24,
//     photo: require('../Assets/Images/banner3.jpg'),
//     key: 'mFcc5b_t74Q',
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Sirio',
//     age: 28,
//     photo: require('../Assets/Images/banner.jpg'),
//     key: "Ty4f_NOFO60'",
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Teymi Townsend',
//     age: 30,
//     photo: require('../Assets/Images/banner2.jpg'),
//     key: "AvLHH8qYbAI'",
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//       require('../Assets/Images/woman1.jpeg'),
//       require('../Assets/Images/woman2.jpeg'),
//       require('../Assets/Images/woman3.jpeg'),
//       require('../Assets/Images/woman4.jpeg'),
//       require('../Assets/Images/woman5.jpeg'),
//     ],
//   },
//   {
//     name: 'Caique Silva',
//     age: 20,
//     photo: require('../Assets/Images/banner3.jpg'),
//     key: "3ujVzg9i2EI'",
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//     ],
//   },
//   {
//     name: 'David Yanutenama',
//     age: 21,
//     photo: require('../Assets/Images/banner1.jpg'),
//     key: "5AoO7dBurMw'",
//     images: [
//       require('../Assets/Images/image1.jpeg'),
//       require('../Assets/Images/image2.jpeg'),
//       require('../Assets/Images/image3.jpeg'),
//       require('../Assets/Images/image4.jpeg'),
//       require('../Assets/Images/image5.jpeg'),
//     ],
//   },
// ]
