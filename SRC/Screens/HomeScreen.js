import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Swiper from 'react-native-deck-swiper';
import Card from '../Components/Card';
import OverlayLabel from '../Components/OverlayLabel';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnContainer from '../Components/BtnContainer';
import Modal from 'react-native-modal';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import NotificationComponent from '../Components/NotificationComponent';
import {useDispatch, useSelector} from 'react-redux';
import SuperLikeModal from '../Components/SuperLikeModal';
import SpotLightModal from '../Components/SpotlightModal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import NullDataComponent from '../Components/NullDataComponent';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: HomeScreen.js:40 ~ user:", user)
  // console.log("🚀 ~ file: HomeScreen.js:35 ~ HomeScreen ~ user:", user)
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: HomeScreen.js:35 ~ token:", token)
  const [swiperRef, setSwiperRef] = useState();
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const [isSuperLikeVisible, setSuperLikeVisible] = useState(false);
  const [isSpotLightVisible, setSpotLightVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [photoCards, setPhotoCards] = useState([]);
  // console.log("🚀 ~ file: HomeScreen.js:45 ~ photoCards:", photoCards)

  const [LogData, setLogData] = useState([]);
  // console.log("🚀 ~ file: HomeScreen.js:56 ~ LogData:", LogData)

  const [drawerType, setDrawerType] = useState('notification');

  const getUsers = async () => {
    const url = `discover/getPeople/${user?.uid}/${user?.seeking}/${user?.location?.latitude}/${user?.location?.longitude}/${user?.location?.city}/${user?.location?.zipcode}`;

    setIsLoadingApi(true);
    const response = await Get(url, token);
    setIsLoadingApi(false);
    if (response != undefined) {
      setPhotoCards(response?.data?.peoples);
      // console.log(response?.data?.peoples);
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

  //  let obj = array.find(o => o.name === 'string 1');

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
  const UndoLog = async allow => {
    if (LogData.length > 0) {
      const undoData = [...LogData];
      LogData.pop();
      // console.log("🚀 ~ file: HomeScreen.js:173 ~ UndoLog ~ undoData:", undoData)

      const url = 'swap/rewind';

      const body = {
        myName: user?.profileName,
        myUid: user?.id,
        targetsUid: undoData[undoData?.length - 1]?.id,
        targetName: undoData[undoData?.length - 1]?.profileName,
      };
      // return console.log("🚀 ~ file: HomeScreen.js:127 ~ UndoLog ~ body:", body)
      setIsLoading(true);

      const response = await Post(url, body, apiHeader(token));
      setIsLoading(false);

      if (response?.data?.status) {
        // console.log("🚀 ~ file: HomeScreen.js:180 ~ UndoLog ~ response:", response?.data?.response?.target_user)
        setPhotoCards(prev => [undoData[undoData?.length - 1], ...prev]);
        // console.log(
        //   '🚀 ~ file: HomeScreen.js:136 ~ UndoLeft ~ leftLogData:',
        //   LogData,
        // );
        // console.log('photoCards after undo', photoCards);
        allow && (await swiperRef.swipeBack());
      }
    }
  };

  const setXY = useCallback((x, y) => {
    console.log(x, y);
    setXAxis(x);
    setYAxis(y);
  }, []);

  useEffect(() => {
    getUsers();
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
      ) : []?.length > 0 ? (
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
              infinite
              showSecondCard={true}
              animateOverlayLabelsOpacity
              swipeBackCard
              onSwipedLeft={async (index, item) => {
                // return console.log("🚀 ~ file: HomeScreen.js:215 ~ onSwipedLeft={ ~ item:", item)
                // return console.log('item in left ', item?.id)
                // console.log(' hererererere  ===  >> > > ');
                const url = 'swap/disliked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );
                console.log('response ======= >', response?.data);
                if (response?.data?.status == true) {
                  // console.log('left', item?.id);
                  const filteredData = [...photoCards]
                  const filteredData2 = [...photoCards]
                  // const filteredData = photoCards.filter(
                  //   (data, index) =>
                  //     response?.data?.peoples?.match_id == data?.id,
                  // );
                  setLogData(prev => [...prev, filteredData.find(
                    (data, index) =>
                      response?.data?.peoples?.match_id == data?.id,
                  )]);
                  // const filteredData2 = photoCards.filter(
                  //   (data, index) =>
                  //     response?.data?.peoples?.match_id != data?.id,
                  // );
                  setPhotoCards(filteredData2.filter(
                    (data, index) =>
                      response?.data?.peoples?.match_id != data?.id,
                  ));

                } else {
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        response?.data?.error,
                        ToastAndroid.SHORT,
                      )
                    : alert(response?.data?.error);
                }
              }}
              disableBottomSwipe={true}
              onSwipedRight={async (index, item) => {
                const url = 'swap/liked';
                // console.log({targetsUid: selectedId});
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );
                if (response?.data?.status == true) {
                  setLogData(prev => [
                    ...prev,
                    ...photoCards.filter((data, index) => {
                      return response?.data?.peoples?.match_id == data?.id;
                    }),
                  ]);

                  setPhotoCards(
                    photoCards.filter(
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
                    : alert(response?.data?.error);
                }
              }}
              onSwipedTop={async (index, item) => {
                // console.log("🚀 ~ file: HomeScreen.js:276 ~ onSwipedTop={ ~ item:", item?.id)
                const url = 'swap/superLiked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );

                if (response?.data?.status) {
                  // console.log("🚀 ~ file: SpotLight.js:464 ~ onSwipedTop={ ~ response:", response?.data)
                  const filteredData2 = photoCards.filter(
                    (data, index) =>
                      response?.data?.peoples?.only?.match_id != data?.id,
                  );

                  setPhotoCards(filteredData2);
                } else {
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        response?.data?.error,
                        ToastAndroid.SHORT,
                      )
                    : Alert.Alert(response?.data?.error);
                }
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
                UndoLog(true);
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
                // setSpotLightVisible(true);
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
          {LogData.length > 0 && photoCards.length == 0 && (
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
          )}
        </View>
      )}
      <SuperLikeModal
        isVisible={isSuperLikeVisible}
        setIsVisible={setSuperLikeVisible}
      />
      {/* <SpotLightModal
        isVisible={isSpotLightVisible}
        setIsVisible={setSpotLightVisible}
      /> */}
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
