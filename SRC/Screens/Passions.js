import {ScrollView,View  , TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const Passions = () => {
    const [passions , setPassions] = useState([]);
  const PassionsArray = [
    'Singing',
    'Music',
    'Riding Horses',
    'Fitness /Exercising',
    'Bike Riding',
    'Boating',
    'Canoeing',
    'Camping',
    'Snowboarding',
    'Mountain Climbing',
    'Fishing',
    'Sports',
    'Traveling',
    'Road Trips',
    'RVing',
    'Exercise',
    'Going to the theater',
    'Dancing',
    'Cooking',
    'Doing Stuff Outdoors',
    'Hanging out with Family/Friends',
    'Hosting Cookouts',
    'Pets',
    'Dog Parks',
    'Photography',
    'DIY Projects',
    'Gardening',
    'Interior Design',
    'Fashion',
    'Home Improvement',
    'Jewellery Making',
    'Knitting',
    'Sewing',
    'Graphic Design',
    'Photo editing',
    'Couponing',
    'Meditation',
    'Swimming',
    'Skating',
    'Reading',
    'History Buff',
    'Jazz',
  ];
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showLeft={true} leftName={'left'} title={'Israelite Filters'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}>
        <CustomText
        isBold
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          Passions
        </CustomText>
        <CustomText style={[styles.text,{ width: windowWidth * 0.7 , 
    marginTop : moderateScale(10,0.3),
        
        }]}>
          Let everyone know what you're passionate about by adding it to your
          profile.
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.9,
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop : moderateScale(20,0.3)
            // justifyContent : 'space-between',
          }}>
          {PassionsArray.map((item, index) => {
            return (
              <TouchableOpacity
              onPress={()=>{
                setPassions(prev=>[item , ...prev])
              }}
              activeOpacity={0.8}
                key={index}
                style={{
                  marginRight: moderateScale(10, 0.3),
                    marginTop : moderateScale(8,0.3),
                    paddingVertical : moderateScale(6,0.6),
                    paddingHorizontal : moderateScale(11,0.6),
                    borderWidth : 1,
                    borderColor : Color.themeColor,
                    borderRadius : moderateScale(25,0.6),
                    backgroundColor : passions?.includes(item) ? Color.themeColor : Color.white

                }}>
              
                <CustomText style={[styles.text,{
                   color : passions?.includes(item) ? Color.white : Color.black
                }]}>{item}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <CustomButton
          text={'Finish'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
            navigationService.navigate('Israeliteinfo');
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(30, 0.3)}
          elevation
        />
      </ScrollView>
    </>
  );
};

export default Passions;

const styles = ScaledSheet.create({
  heading: {
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(15, 0.6),
    color: Color.black,
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
    lineHeight: moderateScale(15, 0.6),
   
    textAlign: 'center',
  },
});
