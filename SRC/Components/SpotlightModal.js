import {StyleSheet, Text, View, TouchableOpacity, FlatList , ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {
  moderateScale,
  moderateVerticalScale,
  ScaledSheet,
} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import CustomModal from './CustomModal';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';

const SpotLightModal = ({isVisible, setIsVisible}) => {
  const [selectedIndex, setSelecetedIndex] = useState(0);
  const token = useSelector(state => state.authReducer.token);
  const [packages, setPackages] = useState([])
  const [arrayForDeck, setArrayForDeck] = useState([1]);
  // console.log("🚀 ~ file: SpotlightModal.js:27 ~ SpotLightModal ~ arrayForDeck:", arrayForDeck)
  
  const getSubscriptionPlan = async () => {
    const url = 'packages';
    const response = await Get(url, token);
    if (response != undefined) {
      // console.log(JSON.stringify(response?.data, null, 2));
      const newData = response?.data?.packages;
      // console.log(
      //   '🚀 ~ file: GetSuperLike.js:43 ~ getSubscriptionPlan ~ newData:',
      //   newData?.premium,
      //   );
        setPackages(newData?.premium)
      }
    };
    const dummyData = [
      {boost: '1', cash: packages[0]?.price, savingPercent: '10%', slogon: null},
      {boost: '5', cash: packages[1]?.price, savingPercent: '21%', slogon: 'popular'},
      {boost: '10', cash: packages[2]?.price, savingPercent: '25%', slogon: 'best value'},
    ];
    
    useEffect(() => {
      getSubscriptionPlan()
      
    }, [])
  






  const onViewableItemsChanged = ({viewableItems}) => {
    // console.log(
    //   '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
    //   viewableItems[0]?.index,
    // );
    setSelecetedIndex(viewableItems[0]?.index);
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
  useEffect(() => {
    if (selectedIndex == 0) {
      setArrayForDeck([1]);
    } else if (selectedIndex == 1) {
      setArrayForDeck([1, 2, 3, 4]);
    } else {
      setArrayForDeck([1, 2, 3, 4, 5, 6, 7]);
    }
  }, [selectedIndex]);

  return (
    // <Modal
    //   isVisible={isVisible}
    //   onBackdropPress={() => {
    //     setIsVisible(false);
    //   }}
    //   style={{
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    //   <ScrollView style={styles.container}
    //   showsVerticalScrollIndicator={false}
    //   contentContainerStyle={{
    //     alignItems: 'center',
    //     // paddingBottom : moderateScale(120,0.6),
    // minHeight: windowHeight,

    //   }}
    //   >
    <CustomModal
    isVisible={isVisible}
    setIsVisible={setIsVisible}
    container={{
      width: windowWidth,
      minHeight: windowHeight,
      backgroundColor: Color.white,
    }}
    contentContainerStyle={{
      paddingBottom: moderateScale(50, 0.6),
      alignItems: 'center',
    }}
    >
        <TouchableOpacity style={styles.closeContainer}>
        <Icon
          name={'close'}
          as={AntDesign}
          size={moderateScale(15, 0.6)}
          color={Color.black}
          style={{
            // position: 'absolute',
            // left: moderateScale(10, 0.3),
            // top: moderateScale(10, 0.6),
            // zIndex: 1,
          }}
          onPress={() => {
            setIsVisible(false);
          }}
        />
        </TouchableOpacity>
        <View style={styles.image}>
          <CustomImage
            source={require('../Assets/Images/spotlight_cover.jpg')}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="stretch"
          />
        </View>
        <CustomText isBold style={{fontSize: moderateScale(15, 0.6)}}>
          Be Seen
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            textAlign: 'center',
            width: '90%',
            marginTop: moderateScale(10, 0.3),
          }}>
          Be a top profile in your area for 30 minutes to get more matches!
        </CustomText>
        <FlatList
          data={dummyData}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            // paddingVertical: moderateScale(5, 0.6),
            // alignItems: 'center',
          }}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          style={{
            flexGrow: 0,
            // backgroundColor : 'red'
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.containerMOdal}>
                <View
                  style={[
                    styles.mainContainer,
                    {
                      borderWidth: moderateScale(3, 0.6),
                      borderColor: Color.themeColor,
                    },
                  ]}>
                  {item?.slogon && (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: moderateScale(10, 0.6),
                        backgroundColor: Color.themeColor,
                      }}>
                      <CustomText
                        isBold
                        style={{
                          color: Color.white,
                          fontSize: moderateScale(11, 0.6),
                          textTransform: 'uppercase',
                        }}>
                        {item?.slogon}
                      </CustomText>
                    </View>
                  )}
                  <CustomText
                    isBold
                    style={{marginTop: moderateScale(10, 0.3)}}>
                    {item?.boost} Boosts
                  </CustomText>
                  <View
                    style={{
                      marginTop: moderateScale(10, 0.3),
                    }}>
                    {selectedIndex > 0 && arrayForDeck.map((item, index) => {
                      return (
                        <View
                          style={[
                            {
                              position: 'absolute',
                              zIndex: -1,
                              bottom: -5,

                              height: moderateScale(50, 0.6),
                              width: moderateScale(50, 0.6),
                              borderRadius: moderateScale(25, 0.6),
                              backgroundColor: 'white',
                              shadowColor: 'black',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowRadius: 6,
                              shadowOpacity: 0.3,
                              elevation: 2,
                            },
                          ]}
                        />
                      );
                    })}
                   
                  
                    <View style={[styles.singleButton]}>
                      <Icon
                        name={'lightning-bolt'}
                        as={MaterialCommunityIcons}
                        size={moderateScale(25, 0.6)}
                        color={Color.themeColor}
                      />
                    </View>
                  </View>
                  <CustomText style={{marginTop: moderateScale(10, 0.3)}}>
                    $ {item?.cash}
                  </CustomText>
                  <CustomText
                    isBold
                    style={{
                      backgroundColor: 'rgba(	196, 164, 132 , 0.5)',
                      paddingVertical: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(10, 0.6),
                      fontSize: moderateScale(11, 0.6),
                      marginTop: moderateScale(10, 0.3),
                      borderRadius: moderateScale(15, 0.6),
                      color: Color.themeColor,
                    }}>
                    Save {item?.savingPercent}
                  </CustomText>
                  <CustomButton
                    text={'Select'}
                    textColor={Color.white}
                    width={windowWidth * 0.35}
                    height={windowHeight * 0.06}
                    fontSize={moderateScale(12, 0.6)}
                    onPress={()=>{
                      navigationService.navigate('GetSuperLike',{item: packages[index], text:'Add-ons'}),setIsVisible(false)
                    }}
                    bgColor={Color.themeBgColor}
                    borderRadius={moderateScale(25, 0.3)}
                    marginTop={moderateScale(20, 0.3)}
                    elevation
                    isGradient
                    isBold
                  />
                </View>
              </View>
            );
          }}
        />
        <View style={{flexDirection : 'row' , alignItems : 'center'}}>

          {dummyData.map((x , index)=>{
            return(
            <View style={{
              width : selectedIndex == index ? moderateScale(9,0.6) : moderateScale(7,0.6),
              height : selectedIndex == index ? moderateScale(9,0.6) : moderateScale(7,0.6),
              borderRadius : selectedIndex == index ? moderateScale(4.5,0.6) : moderateScale(3.5,0.6),
              backgroundColor : selectedIndex == index ? Color.themeColor : Color.themeLightGray,
              marginRight : moderateScale(8,0.3),
              
              
            }}></View>
            )
          })}
          </View>
          <View
          style={{
            width: windowWidth * 0.85,
            flexDirection: 'row',
            marginTop: moderateScale(10, 0.3),
            alignItems : 'center',
            justifyContent : 'center'
          }}>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: Color.veryLightGray,width : windowWidth * 0.4
            }}
          />
          <CustomText style={{
            textTransform : 'lowercase' , 
            color :  Color.veryLightGray , 
            marginTop : -moderateScale(5,0.3)
          }}>  or  </CustomText>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: Color.veryLightGray,width : windowWidth * 0.4
            }}
          />

        </View>
            <View style={styles.goldContainer}>
            <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: moderateScale(10, 0.6),
                        backgroundColor: '#EEEEEE',
                      }}>
                      <CustomText
                        isBold
                        style={{
                          color: Color.black,
                          fontSize: moderateScale(8, 0.6),
                          textTransform: 'uppercase',
                        }}>
                        1 boost free per month
                      </CustomText>
                    </View>
                    <View style={[styles.row,{
    width : windowWidth * 0.9 , 
    marginTop : moderateScale(10,0.3)

                    }]}>
                      <View style={[styles.row ]}>
                        <Icon 
                        name={'fire'}
                        as={Fontisto}
                   size={moderateScale(18, 0.6)}
                        color={'#E25822'}

                        />
                        <CustomText isBold >Get Qavah Gold</CustomText>
                      </View>
                      <CustomText style={{
                        borderWidth : 1 ,
                        paddingVertical: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(10, 0.6),
                      fontSize: moderateScale(11, 0.6),
                      borderColor : Color.veryLightGray ,
                      borderRadius : moderateScale(25,0,6),
                      marginRight : moderateScale(10,0.3)
                      }}>Select</CustomText>
                    </View>
            </View>
    </CustomModal>
  );
};
export default SpotLightModal;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: Color.white,
    // maxHeight : windowHeight * 1.1
    // borderRadius: moderateScale(10, 0.6),
    // overflow: 'hidden',
  },
  containerMOdal: {
    width: windowWidth,
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: Color.red,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row : { 
    flexDirection : 'row',
    justifyContent : 'space-between' ,
    paddingLeft : moderateScale(20,0.6),
    alignItems : 'center'

  },
  circle: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(30, 0.6),
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  goldContainer : { 
    width : windowWidth * 0.9 ,
    height : windowHeight * 0.12 ,
    borderRadius : moderateScale(10,0.6),
    borderWidth : 1, 
    borderColor : Color.themeLightGray ,
    overflow : 'hidden',
    marginTop : moderateScale(5,0.3)


  },
  singleButton: {
    height: moderateScale(50, 0.6),
    width: moderateScale(50, 0.6),
    borderRadius: moderateScale(25, 0.6),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    zIndex: 1,
  },
  container2: {
    height: windowHeight * 0.13,
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
  },
  closeContainer: {
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    // borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    position: 'absolute',
    left: moderateScale(10, 0.3),
    top: moderateScale(20, 0.6),
    zIndex: 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.25,
    // backgroundColor: Color.veryLightGray,
    // alignItems : 'center',
  },
  mainContainer: {
    width: windowWidth * 0.8,
    paddingBottom: moderateScale(20, 0.6),
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
