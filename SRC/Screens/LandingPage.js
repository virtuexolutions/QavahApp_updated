import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, ImageBackground, BackHandler} from 'react-native';
import {View} from 'native-base';
import CustomButton from '../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      {/* <View
        style={{
          backgroundColor: Color.white,
          height: windowHeight,
        }}
      > */}
      <ImageBackground
        style={{
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'flex-end',
        }}
        source={require('../Assets/Images/LandingPage1.png')}
        resizeMode={'stretch'}>
        <CustomButton
          iconName={'envelope'}
          iconType={FontAwesome}
          iconStyle={{
            width: moderateScale(40, 0.6),
            color: Color.black,
            // height : '100%'
          }}
          isBold
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Login With email'
            )
          }
          textColor={Color.black}
          width={windowWidth * 0.85}
          height={windowHeight * 0.08}
          marginBottom={moderateScale(10, 0.3)}
          onPress={() => {
            navigationService.navigate('LoginScreen', {text: 'Email'});
          }}
          bgColor={Color.white}
          borderRadius={moderateScale(10, 0.3)}
          elevation
        />
        <View style={styles.container2}>
          <CustomText style={styles.txt5}>
            {"Don't have an account? "}
          </CustomText>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: windowWidth * 0.01}}
            onPress={() => navigationService.navigate('CreatePortfolio')}>
            <CustomText
              onPress={() => {
                navigationService.navigate('CreatePortfolio');
              }}
              style={[styles.txt4]}>
              {'Sign Up'}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },

  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    marginBottom: moderateScale(20, 0.3),
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(13, 0.6),
  },
  txt5: {
    color: Color.veryLightGray,
    fontSize: moderateScale(12, 0.6),
  },
});

export default LandingPage;
