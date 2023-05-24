import { StyleSheet, Text, View , FlatList  , TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import LinearGradient from 'react-native-linear-gradient'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { Icon, ScaleFade } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import NegotiatorCard from '../Components/NegotiatorCard'
import CustomText from '../Components/CustomText'
import { useNavigation } from '@react-navigation/native'
import SearchContainer from '../Components/SearchContainer'

const SeeAllScreen = () => {
  const navigationN = useNavigation()
  const [searchData , setSearchData] = useState('')
    const negotiatorsArray = [
        {
          name: 'Walter A. Jones',
          description:
            'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          image: require('../Assets/Images/man1.jpg'),
          sent : true,
          address : 'street # 32 , blue avenue Timesquare newyork '
        },
        {
          name: 'jpsephine A. Suarez',
          sent : false,
          address : 'street # 32 , blue avenue Timesquare newyork ',
          description:
            'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          image: require('../Assets/Images/man2.jpg'),
        },
        {
          name: 'Ronald N. Voegele',
          sent : true,
          address : 'street # 32 , blue avenue Timesquare newyork ',
          description:
            'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          image: require('../Assets/Images/man3.jpg'),
        },
        {
          name: 'Walter A. Jones',
          sent : false,
          address : 'street # 32 , blue avenue Timesquare newyork ',
          description:
            'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          image: require('../Assets/Images/man1.jpg'),
        },
        {
            name: 'jpsephine A. Suarez',
            sent : false,
            address : 'street # 32 , blue avenue Timesquare newyork ',
            description:
              'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
            image: require('../Assets/Images/man2.jpg'),
          },
          {
            name: 'Ronald N. Voegele',
            sent : true,
            address : 'street # 32 , blue avenue Timesquare newyork ',
            description:
              'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
            image: require('../Assets/Images/man3.jpg'),
          },
          {
            name: 'Walter A. Jones',
            sent : false,
            address : 'street # 32 , blue avenue Timesquare newyork ',
            description:
              'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
            image: require('../Assets/Images/man1.jpg'),
          },
      ];
  return (
    <>
    <CustomStatusBar
     backgroundColor={
      Color.white
    }
      barStyle={'dark-content'}
    />
       <LinearGradient
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y:1}}
      colors={Color.themeBgColor}
      // locations ={[0, 0.5, 0.6]}
      >
          <TouchableOpacity
          activeOpacity={0.8}
        style={{
        //   position : 'absolute',
          marginTop : moderateScale(20,0.3),
          marginLeft : moderateScale(20,0.3),
          height: moderateScale(30, 0.6),
          width: moderateScale(30, 0.6),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'white',
        //   zIndex : 1
        }}>
       
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.themeColor}
            onPress={()=>{
              navigationN.goBack()
            }}
          />
          </TouchableOpacity>
          <FlatList
        data={negotiatorsArray}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width : windowWidth,
          alignItems : 'center',
          // paddingHorizontal: moderateScale(15, 0.3),
          paddingVertical: moderateScale(20, 0.3),
          paddingTop : moderateScale(40,0.6),
        }}
        renderItem={({item, index}) => {
          return(
            <NegotiatorCard
              item={item}
              containerStyle={{
                width: windowWidth * 0.45,
                height: windowHeight * 0.28,
                marginRight : index %2 == 0 ? moderateScale(7,0.3) : 0,
              }}
              fromSeeAll={true}
            />
          ) 
        }}
        ListHeaderComponent={()=>{
          return(
            <>
            <CustomText
              isBold
              style={[
                styles.header,
                {  color: Color.black}
              ]}>
              Friends
            </CustomText>
            <SearchContainer
          width={windowWidth * 0.9}
          input
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginVertical: moderateScale(20, 0.3),
            borderRadius: moderateScale(5, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          setData={setSearchData}
          placeHolder={'Enter UserName'}
        />
                  </>
          )
                  
        }}
      />
      </LinearGradient></>
  )
}

export default SeeAllScreen

const styles = ScaledSheet.create({
    header: {
        color: Color.black,
        fontSize: moderateScale(18, 0.3),
        width: windowWidth * 0.9,
    },})