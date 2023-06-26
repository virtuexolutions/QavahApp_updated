import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';
import PlanCard from '../Components/PlanCard';

const Subscription = () => {
  const [index, setIndex] = useState(0);
  // console.log("🚀 ~ file: Subscription.js:27 ~ Subscription ~ index:", index)
  const [itemPrice, setItemPrice] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState('Month to Month');
  const [text, setText] = useState('Platinum')
  // console.log("🚀 ~ file: Subscription.js:32 ~ Subscription ~ text:", text)

  const [itemColor, setItemColor] = useState(['#A97142', '#996633', '#A97142']);
  

  const subscriptions = [
    {
      text: 'Platinum',
      color: ['#acacac', '#e1e1e1'],
      price: 350,
    },
    {
      text: 'Gold',
      color: ['#B78628', '#FCC201', '#DBA514', '#B78628'],
      price: 450,
    },
    
    
  ];
  // const topPakages = [
  //   {
  //     title: 'Monthly',
  //     description:
  //       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
  //     price: '3,274.93',
  //   },
  //   {
  //     title: 'Weekly',
  //     description:
  //       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
  //     price: '1,274.93',
  //   },
  //   {
  //     title: 'yearly',
  //     description:
  //       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
  //     price: '4,274.93',
  //   },
  // ];

  const pointsArray = [
    {lock: false, text: 'Unlimited Likes'},
    {lock: false, text: 'See who likes you'},
    {lock: true, text: 'Priority Likes'},
  ];

  const pointsArray1 = [
    {lock: false, text: 'One free boost per month'},
    {lock: true, text: '5 free super likes per week'},
    {lock: true, text: 'message before matching'},
  ];

  const pointsArray2 = [
    {lock: false, text: 'Passport'},
    {lock: false, text: 'Top Picks'},
  ];
  const onViewableItemsChanged = ({viewableItems}) => {
    // console.log(
    //   '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
    //   viewableItems[0]?.item?.color,
    // );
    setIndex(viewableItems[0]?.index);
    setItemPrice(viewableItems[0]?.item?.price);
    setItemColor(viewableItems[0]?.item?.color);
    setText(viewableItems[0]?.item?.text)
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);


  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        title={'Subscription'}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          // height: windowHeight * 0.95,

          alignItems: 'center',
          paddingBottom: moderateScale(80, 0.6),
        }}>
        {/* <View style={styles.selector}>
          <CustomText
            onPress={() => {
              setSelectedIndex('Month to Month');
            }}
            style={[
              styles.text,
              selectedIndex == 'Month to Month' && {
                backgroundColor: Color.themeColor,
                color: Color.white,
                borderRadius: moderateScale(10, 0.6),
              },
            ]}>
            Month to Month
          </CustomText>
          <CustomText
            onPress={() => {
              setSelectedIndex('Other packages');
            }}
            style={[
              styles.text,
              selectedIndex == 'Other packages' && {
                backgroundColor: Color.themeColor,
                color: Color.white,
                borderRadius: moderateScale(10, 0.6),
              },
            ]}>
            Other packages
          </CustomText>
        </View> */}

        <FlatList
          data={ subscriptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            alignItems: 'center',
          }}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          // onViewableItemsChanged={()=>{
          //   console.log('')
          // }}
          renderItem={({item, index}) => {
            return (
              <CustomButton
                text={item?.text}
                textColor={Color.white}
                width={windowWidth * 0.9}
                height={windowHeight * 0.09}
                onPress={() => {}}
                marginLeft={windowWidth * 0.05}
                marginRight={windowWidth * 0.05}
                bgColor={item.color}
                borderRadius={moderateScale(10, 0.6)}
                marginTop={moderateScale(40, 0.6)}
                marginBottom={moderateScale(10, 0.6)}
                elevation
                isBold
                isGradient
                fontSize={moderateScale(25, 0.6)}
              />
            ) 
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // position: 'absolute',
            bottom: moderateScale(0, 0.6),
          }}>
          {(subscriptions).map((x, i) => {
            return (
              <View
                style={{
                  width:
                    index == i ? moderateScale(12, 0.6) : moderateScale(8, 0.6),
                  height:
                    index == i ? moderateScale(12, 0.6) : moderateScale(8, 0.6),
                  borderRadius:
                    index == i ? moderateScale(6, 0.6) : moderateScale(5, 0.6),
                  backgroundColor:
                    index == i ? Color.themeColor : Color.themeLightGray,
                  marginRight: moderateScale(4, 0.6),
                }}></View>
            );
          })}
        </View>
        <PointsComponent array={pointsArray} title={'Upgrade your likes'} />
        <PointsComponent
          array={pointsArray1}
          title={'Enhance your experience'}
        />
        <PointsComponent array={pointsArray2} title={'Premium discovery'} />
      </ScrollView>

      <CustomButton
       text={itemPrice == 0 ? 'Continue' : `${itemPrice}$`}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        onPress={() => {
          navigationService.navigate('GetSuperLike',{text: text});
        }}
        marginLeft={windowWidth * 0.05}
        marginRight={windowWidth * 0.05}
        bgColor={itemColor ? itemColor : [Color.themeColor,Color.themeColor ]}
        borderRadius={moderateScale(10, 0.6)}
        marginTop={moderateScale(40, 0.6)}
        marginBottom={moderateScale(10, 0.6)}
        elevation
        isBold
        fontSize={moderateScale(15, 0.6)}
        isGradient
        containerStyle={{
          position: 'absolute',
          bottom: moderateScale(5, 0.3),
        }}
      />
    </>
  );
};

export default Subscription;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    borderRadius: moderateScale(15, 0.6),
    height: windowHeight * 0.2,
    alignItems: 'center',
    marginTop: moderateScale(50, 0.3),
  },
  titleContainer: {
    backgroundColor: Color.white,
    // paddingHorizontal : moderateScale(10,0.6),
    paddingVertical: moderateScale(8, 0.6),
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    marginTop: moderateScale(-20, 0.3),
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
    paddingHorizontal: moderateScale(10, 0.6),
    // width: windowWidth * 0.32,
    borderRadius: moderateScale(20, 0.6),
    textAlign: 'center',
  },
  selector: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(30, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-around',
    borderColor: '#70707030',
    height: windowHeight * 0.05,
  },
  text: {
    width: '50%',
    textAlign: 'center',
    fontSize: moderateScale(11, 0.6),
    color: Color.themeColor,
    paddingVertical: moderateScale(10, 0.6),
  },
});

export const PointsComponent = ({array, title}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.titleContainer}>{title}</CustomText>
      {array.map((x, index) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              alignItems: 'center',
              paddingVertical: moderateScale(8, 0.6),
            }}>
            <Icon
              name={x.lock == true ? 'lock' : 'check'}
              size={moderateScale(10, 0.6)}
              color={x.lock == true ? Color.veryLightGray : Color.themeColor}
              as={AntDesign}
              style={{
                marginRight: moderateScale(10, 0.3),
              }}
            />
            <CustomText>{x.text}</CustomText>
          </View>
        );
      })}
    </View>
  );
};
