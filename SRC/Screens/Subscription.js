import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';

const Subscription = () => {
  const token = useSelector((State)=>State.authReducer.token)
  const [index, setIndex] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemColor, setItemColor] = useState(['#A97142', '#996633', '#A97142'])

  const subscriptions = [
    {
      text: 'Gold',
      color: ['#B78628', '#FCC201', '#DBA514', '#B78628'],
      price: 450,
    },
    {
      text: 'Silver',
      color: ['#8E8D8D', '#BEC0C2', '#8E8D8D'],
      price: 400,
    },
    {
      text: 'Bronze',
      color: ['#A97142', '#996633', '#A97142'],
      price: 350,
    },
  ];

  const pointsArray = [
    { lock : false ,text :'Unlimited Likes'},
    { lock : false ,text :'See who likes you'},
    { lock : true ,text :'Priority Likes'},
  ];

  const pointsArray1 = [
    { lock : false ,text :'One free boost per month'},
    { lock : true ,text :'5 free super likes per week'},
    { lock : true ,text :'message before matching'},
  ];

  const pointsArray2 = [
    { lock : false ,text :'Passport'},
    { lock : false ,text :'Top Picks'},
  ];
  const onViewableItemsChanged = ({viewableItems}) => {
    console.log(
      '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
      viewableItems[0]?.item?.color,
    );
    setIndex(viewableItems[0]?.index);
    setItemPrice(viewableItems[0]?.item?.price);
    setItemColor(viewableItems[0]?.item?.color)
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);





  const getSubscriptionPlan = async()=>{
    const url = 'packages' ;
    const response = await Get(url , token)
    if(response != undefined){
      console.log(JSON.stringify(response?.data , null ,2))
    }
  }


  useEffect(() => {
    getSubscriptionPlan()
  }, [])
  
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
        <FlatList
          data={subscriptions}
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
                onPress={() => {
                  
                }}
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
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // position: 'absolute',
            bottom: moderateScale(0, 0.6),
          }}> 
          {subscriptions.map((x, i) => {
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
        <PointsComponent array={pointsArray1} title={'Enhance your experience'} />
        <PointsComponent array={pointsArray2} title={'Premium discovery'} />
      </ScrollView>
      
        <CustomButton
                text={`${itemPrice}$`}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.07}
                onPress={() => {
                  navigationService.navigate('GetSuperLike');
                }}
                marginLeft={windowWidth * 0.05}
                marginRight={windowWidth * 0.05}
                bgColor={itemColor}
                borderRadius={moderateScale(10, 0.6)}
                marginTop={moderateScale(40, 0.6)}
                marginBottom={moderateScale(10, 0.6)}
                elevation
                isBold
                fontSize={moderateScale(15, 0.6)}
                isGradient
                containerStyle ={{
                  position : 'absolute' ,
                  bottom : moderateScale(5,0.3)
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
    paddingHorizontal : moderateScale(10,0.6),
    // width: windowWidth * 0.32,
    borderRadius: moderateScale(20, 0.6),
    textAlign: 'center',
  },
});

export const PointsComponent = ({array, title}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.titleContainer}>{title}</CustomText>
      {array.map((x , index)=>{
        return(
          <View style={{
            flexDirection : 'row' , 
            width : windowWidth * 0.8 ,
            alignItems : 'center',
            paddingVertical : moderateScale(8,0.6)

          }}>
            <Icon
            name={x.lock == true ? 'lock' : 'check'}
            size={moderateScale(10,0.6)}
            color={x.lock == true ? Color.veryLightGray : Color.themeColor}
            as={AntDesign}
            style={{
              marginRight : moderateScale(10,0.3)
            }}

            />
            <CustomText>{x.text}</CustomText>
          </View>
        )
      })}

    </View>
  );
};
