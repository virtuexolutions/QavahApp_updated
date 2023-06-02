import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const LoveNotesModal = ({isVisible, setIsVisible}) => {
  const [selectedIndex, setSelecetedIndex] = useState(1);
  const dummyData = [
    {days: '3', cash: '566.60', savingPercent: '10%'},
    {days: '15', cash: '466.60', savingPercent: '21%'},
    {days: '30', cash: '566.60', savingPercent: '25%'},
  ];
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <LinearGradient
          // start={{x : 0.35 ,y : 0.45}}
          // end={{x : 0.45 , y : 0.85}}

          colors={['#CD4D7B','#D9AABB']}
          style={{
            height: windowHeight * 0.22,
            width: windowWidth * 0.85,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.circle}>
            <Icon
              name={'heart'}
              as={AntDesign}
              size={moderateScale(30, 0.6)}
              color={'#CD4D7B'}
            />
          </View>
          <CustomText
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            Stand out with Love notes
          </CustomText>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
             you can send a message without being matched
          </CustomText>
        </LinearGradient>
        <View style={styles.container2}>
          {dummyData.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setSelecetedIndex(index);
                }}
                style={[
                  {
                    height: windowHeight * 0.13,
                    width: '33.33%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  selectedIndex == index && {
                    backgroundColor: Color.white,
                    borderWidth: 2,
                    borderColor: '#CD4D7B',
                    height: windowHeight * 0.14,
                    marginTop: moderateScale(-5, 0.3),
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                  },
                ]}>
                {selectedIndex == index && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      backgroundColor: '',
                      paddingVertical: moderateScale(3, 0.6),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        color: Color.white,
                      }}>
                      save {item.savingPercent}
                    </CustomText>
                  </View>
                )}
                <CustomText
                  isBold
                  style={{
                    color:
                      selectedIndex == index ? '#CD4D7B' : Color.themeBlack,
                    fontSize: moderateScale(20, 0.6),
                  }}>
                  {item.days}
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    color:
                      selectedIndex == index ?'#CD4D7B' : Color.themeBlack,
                    fontSize: moderateScale(11, 0.6),
                  }}>
                  Super likes
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    color:
                      selectedIndex == index ? '#CD4D7B' : Color.themeBlack,
                    fontSize: moderateScale(11, 0.6),
                  }}>{`PKR${item.cash}/ea`}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <CustomButton
          text={'Get Super Likes'}
          textColor={Color.white}
          width={windowWidth * 0.65}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          bgColor={['#CD4D7B','#D9AABB']}
          borderRadius={moderateScale(25, 0.3)}
          elevation
          isGradient
          fontSize={moderateScale(12, 0.6)}
        />
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
              borderColor: Color.veryLightGray,width : windowWidth * 0.3
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
              borderColor: Color.veryLightGray,width : windowWidth * 0.3
            }}
          />
        </View>
        <CustomButton
          text={'Get Qavah gold* \n 5 free super likes every 1 week'}
          width={windowWidth * 0.65}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          bgColor={'white'}
          borderRadius={moderateScale(25, 0.3)}
          fontSize={moderateScale(10, 0.6)}
          borderColor={'#CD4D7B'}
          textColor={'#CD4D7B'}
          borderWidth={1}
          elevation
          isBold
        />
      </View>
    </Modal>
  );
};

export default LoveNotesModal;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
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
  container2: {
    height: windowHeight * 0.13,
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
  },
});
