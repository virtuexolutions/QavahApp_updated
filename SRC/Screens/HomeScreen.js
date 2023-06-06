import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  const [leftLogData, setLeftlogData] = useState([])
  const [rightLogData, setRightLogData] = useState([])
  // console.log("🚀 ~ file: HomeScreen.js:48 ~ photoCards:", photoCards)
  const [drawerType, setDrawerType] = useState('notification');

  
  const getUsers = async () => {
    
    const url = `discover/getPeople/${user?.uid}/${user?.seeking}/${user?.location?.latitude}/${user?.location?.longitude}/${user?.location?.city}/${user?.location?.zipcode}`;
    
    
    setIsLoadingApi(true);
    const response = await Get(url, token);
    setIsLoadingApi(false);
    if (response != undefined) {
      setPhotoCards(response?.data?.peoples);
      console.log(response?.data?.peoples);
    }
  };
  const handleOnSwipedLeft = async id => {
    // console.log("🚀 ~ file: HomeScreen.js:67 ~ handleOnSwipedLeft ~ id:", id)
    const url = 'swap/disliked';
    const response = await Post(url, {targetsUid: id}, apiHeader(token));
    // console.log("🚀 ~ file: HomeScreen.js:64 ~ handleOnSwipedLeft ~ id:", id)
    // console.log({targetsUid: id});
    if (response != undefined) {
      // console.log('response ======= >', response?.data);
      setLeftlogData(
        (prev) => [...prev , ...photoCards.filter((data, index) => id == data?.id)],
        );
        
        swiperRef.swipeLeft();
      // console.log('Left Log Data=======>>>',leftLogData);
      setPhotoCards(
        photoCards.filter((data, index) => id != data?.id),
        );
        // console.log("🚀 ~ file: HomeScreen.js:81 ~ handleOnSwipedLeft ~ photoCards:", photoCards)
    }
  };
  const handleOnSwipedTop = () => {
    // swiperRef.swipeTop(),
    setSuperLikeVisible(true);
  };
  const handleOnSwipedRight = async id => {
    const url = 'swap/liked';
    const response = await Post(url, {targetsUid: id}, apiHeader(token));
    // console.log({targetsUid: id});
    if (response != undefined) {
      // console.log('response ======= >', response?.data);
      swiperRef.swipeRight();
      setRightLogData(
        (prev) => [...prev , ...photoCards.filter((data, index) => id == data?.id)],
      );
      setPhotoCards(
        photoCards.filter((data, index) => id != data?.id),
      );
    }
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
  const UndoLeft = async() => {
   setPhotoCards((prev) => [...prev, leftLogData.pop()] )
   console.log("🚀 ~ file: HomeScreen.js:136 ~ UndoLeft ~ leftLogData:", leftLogData)
   console.log('photoCards after undo', photoCards)
   
   await swiperRef.swipeBack();
  }


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
      ) : photoCards.length > 0 ? (
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
              onSwipedLeft={async(index, item) => {
                // return console.log('item in left ', item?.id)
                console.log(' hererererere  ===  >> > > ')
                const url = 'swap/disliked';
                const response = await Post(
                  url,
                  {targetsUid: item?.id},
                  apiHeader(token),
                );
                if (response != undefined) {
                  console.log('response ======= >', response?.data);
                  console.log('left', item?.id);
                  setLeftlogData(
                    (prev) => [...prev , ...photoCards.filter((data, index) => {
                      item?.id == data?.id})],
                  );
                  // swiperRef.swipe();
                  console.log('Left Log Data=======>>>',leftLogData);
                 
                  setPhotoCards(
                    photoCards.filter((data, index) => item?.id != data?.id),
                    );
                 
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
                if (response != undefined) {
                  // console.log('response ======= >', response?.data);
                  // handleOnSwipedLeft(item?.id)
                  // console.log('left', item?.id);
                  setRightLogData(
                    (prev) => [...prev , ...photoCards.filter((data, index) => {
                      item?.id == data?.id})],
                  );
                  // console.log('Left Log Data=======>>>',leftLogData);
                
                  setPhotoCards(
                    photoCards.filter((data, index) => item?.id != data?.id),
                    );
                }
              }}
              onSwipedTop={() => {
                console.log('Top');
                setSuperLikeVisible(true);
              }}
              onSwiping={(x, y) => {
                // console.log(x, y);
                setXAxis(x);
                setYAxis(y);
              }}
              dragEnd={() => {
                setXAxis(0);
                setYAxis(0);
              }}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  element: <OverlayLabel label="NOPE" color="#E5566D" />,
                  style: {
                    wrapper: {
                      alignItems: 'flex-end',
                      right: moderateScale(30, 0.3),
                    },
                  },
                },
                right: {
                  title: 'LIKE',
                  element: <OverlayLabel label="LIKE" color="#4CCC93" />,
                  style: {
                    wrapper: {
                      alignItems: 'flex-start',
                      // alignItems: 'flex-start',
                      left: moderateScale(30, 0.3),
                    },
                  },
                },
                top: {
                  element: <OverlayLabel label="SUPER LIKE" color="blue" />,
                  title: 'SUPER LIKE',
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
                setIsLoading(true);
                UndoLeft();
                setIsLoading(false);
              }}
            />
            <BtnContainer
              backgroundColor={xAxis < 0 ? Color.themeColor : 'white'}
              color={xAxis < 0 ? Color.white : Color.themeColor}
              name={'close-sharp'}
              type={Ionicons}
              onPress={() => handleOnSwipedLeft(selectedId)}
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
