import {ImageBackground, StyleSheet, Text, View , ScrollView} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Passions from './Passions';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {FlatList} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Israeliteinfo = (props) => {

  const userData = props?.route?.params?.user;
  console.log("🚀 ~ file: Israeliteinfo.js:17 ~ Israeliteinfo ~ userData:", userData)
  // console.log("🚀 ~ file: Israeliteinfo.js:16 ~ Israeliteinfo ~ userData:", userData)

  const navigation = useNavigation();

  const LifeStyleArray = [
    {heading: 'i believe i am', title: userData?.iBelieveIAM},
    {heading: 'years in truth', title: userData?.yearsInTruth},
    {heading: 'Spiritual value', title: userData?.spiritualValue},
    {heading: 'maritial belief system', title: userData?.maritalBeliefSystem},
    {heading: 'Any affiliation', title: userData?.anyAffiliation},
    {heading: 'Study bible', title: userData?.studyBible},
    {heading: 'Study Habits', title: userData?.studyHabits},
    {
      heading: 'Spiritual background',
      title: userData?.spiritualBackground,
    },
  ];
  // const practiceKeeping = 
  // const SelectedPassions = [
  //   'Lorem Ipsum',
  //   'Lorem Ipsum',
  //   'Lorem Ipsum',
  //   'Lorem Ipsum dolor',
  //   'Lorem Ipsum',
    
  // ];
  const SelectedPassions = userData?.passions ? userData?.passions?.map((item,index)=>{
    return item?.options
  }) : ['Not available']

  const SelectedKingdom = userData?.kingdom_gifts ? userData?.kingdom_gifts?.map((item,index)=>{
    return item?.options
  }) : ['Not available']
  // console.log("🚀 ~ file: Israeliteinfo.js:50 ~ SelectedKingdom ~ SelectedKingdom:", SelectedKingdom)

  const practiceKeeping = userData?.isrealite_practice_keeping ? userData?.isrealite_practice_keeping.map((item,index)=>{
    return item?.options
  }) :['Not available']
  // console.log("🚀 ~ file: Israeliteinfo.js:55 ~ practiceKeeping ~ practiceKeeping:", practiceKeeping)

  // console.log("🚀 ~ file: Israeliteinfo.js:45 ~ SelectedPassions ~ SelectedPassions:", SelectedPassions)
  
  // const practiceKeeping = [
  //   'Lorem Ipsum',
  //   'Lorem Ipsum',
  //   'Lorem Ipsum',
  //   'Lorem Ipsum dolor',
  //   'Lorem Ipsum',
    
  // ];

  return (
    <ImageBackground
      style={styles.container}
      source={require('../Assets/Images/Israelite_info.jpg')}>
        {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingTop: moderateScale(20, 0.6),
            paddingBottom : moderateScale(30,0.6)

        }}
       
        > */}

      <CustomText
        style={{
          color: Color.black,
          fontSize: moderateScale(20, 0.6),
          width: windowWidth,
          textAlign: 'center',
        }}>
        Israelite LifeStyle & Values
      </CustomText>
      <CustomText isBold style={[styles.heading]}>
        LifeStyle
      </CustomText>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={LifeStyleArray}
        contentContainerStyle={{
          paddingLeft: moderateScale(10, 0.6),
        }}
        style={{
          flexGrow: 0,
        }}
        renderItem={({item, index}) => {
            return (
                <View style={styles.textContainer}>
              <CustomText style={styles.text}>{item?.heading}</CustomText>
              <CustomText
                isBold
                style={[styles.text, {color: Color.themeColor}]}>
                {item?.title}
              </CustomText>
            </View>
          );
        }}
        />
      <View style={styles.bar} />
      <CustomText isBold style={[styles.heading]}>
        Values
      </CustomText>
      <View>

   
<CustomText
  style={[
      styles.text,
      {
          marginLeft: moderateScale(10, 0.3),
          marginTop: moderateScale(20, 0.3),
      },
  ]}>
  israelite Practise keeping
</CustomText>
<View style={{
    flexDirection : 'row',
    width : windowWidth * 0.9 ,
    paddingLeft : moderateScale(10,.6),
    flexWrap : 'wrap'
  }}>

{practiceKeeping?.map((item, index) => {
    return (
        
        
        <CustomText
        isBold
        style={[
          styles.text,
          {color: Color.themeColor, marginLeft: moderateScale(10, 0.3)},
        ]}>
        {item}
      </CustomText>

      );
  })}
  </View>
  </View>
      {/* <CustomText
        style={[
          styles.text,
          {
            marginLeft: moderateScale(10, 0.3),
            marginTop: moderateScale(20, 0.3),
          },
        ]}>
        israelite Practise keeping
      </CustomText>
      <CustomText
        isBold
        style={[
          styles.text,
          {color: Color.themeColor, marginLeft: moderateScale(10, 0.3)},
        ]}>
        Eating Clean
      </CustomText> */}
      <View style={styles.row}>
      <View>

   
      <CustomText
        style={[
            styles.text,
            {
                marginLeft: moderateScale(10, 0.3),
                marginTop: moderateScale(20, 0.3),
            },
        ]}>
        Passions
      </CustomText>
      <View style={{
          flexDirection : 'row',
          width : windowWidth * 0.46 ,
          paddingLeft : moderateScale(10,.6),
          flexWrap : 'wrap'
        }}>

      {SelectedPassions?.map((item, index) => {
          return (
              <View
              key={index}
              style={{
                  marginRight: moderateScale(5, 0.3),
                  marginTop : moderateScale(8,0.3),
                  paddingVertical : moderateScale(5,0.6),
                  paddingHorizontal : moderateScale(5,0.6),
                  borderWidth : 1,
                  borderColor : Color.themeColor,
                  borderRadius : moderateScale(25,0.6),
                  
                }}>
              
                <CustomText style={{
                    fontSize : moderateScale(9,0.6),
                    color : Color.themeColor
                }} >{item}</CustomText>
              </View>
            );
        })}
        </View>
        </View>
        <View>

   
      <CustomText
        style={[
            styles.text,
            {
                marginLeft: moderateScale(10, 0.3),
                marginTop: moderateScale(20, 0.3),
            },
        ]}>
        kingdom Gifts
      </CustomText>
      <View style={{
          flexDirection : 'row',
          width : windowWidth * 0.46 ,
          paddingLeft : moderateScale(10,.6),
          flexWrap : 'wrap'
        }}>

      {SelectedKingdom?.map((item, index) => {
          return (
              <View
              key={index}
              style={{
                  marginRight: moderateScale(5, 0.3),
                  marginTop : moderateScale(8,0.3),
                  paddingVertical : moderateScale(5,0.6),
                  paddingHorizontal : moderateScale(5,0.6),
                  borderWidth : 1,
                  borderColor : Color.themeColor,
                  borderRadius : moderateScale(25,0.6),
                  
                }}>
              
                <CustomText style={{
                    fontSize : moderateScale(9,0.6),
                    color : Color.themeColor
                }} >{item}</CustomText>
              </View>
            );
        })}
        </View>
        </View>
        </View>
        <CustomButton
          text={'Close'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
           navigation.goBack();
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(40, 0.3)}
          elevation
          isBold
        />

{/* </ScrollView> */}
    </ImageBackground>
  );
};

export default Israeliteinfo;

const styles = ScaledSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
    },
    heading: {
        marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(17, 0.6),
    color: Color.black,
    marginLeft: moderateScale(10, 0.3),
  },
  textContainer: {
    width: windowWidth * 0.47,
    marginTop: moderateScale(15, 0.3),
  },
  row :  {
    flexDirection : 'row' , 
    justifyContent : 'space-between',
    // alignSelf : 'center',
    width : windowWidth ,
    // alignItems : 'center',
    // backgroundColor : 'red'
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textTransform: 'none',
    // backgroundColor : 'red' , 
    // width : windowWidth * 0.42
  },
  bar: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    marginTop: moderateScale(10, 0.3),
  },
});
