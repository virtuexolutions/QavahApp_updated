import React from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ImageBackground} from 'react-native';
import {View} from 'native-base';

const SplashScreen = () => {
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}
    >
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <CustomImage
          resizeMode={'stretch'}
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../Assets/Images/splash2.jpg')}
        />
        {/* <View
          style={{
            width: windowWidth * 0.38,
            height: windowHeight * 0.18,
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            // alignItems : 'center',
            bottom: moderateScale(30, 0.3),
            // backgroundColor : 'red'
          }}
        >
          <CustomImage
            resizeMode={'contain'}
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../Assets/Images/splashLogo.png')}
          />
        </View> */}
      </View>
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
  // textContainer: {
  //   flexDirection: "row",
  //   alignSelf :'center',
  //   width : windowWidth * 0.4,
  //   height :windowWidth * 0.4,
  //   borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   // backgroundColor : Color.white,

  // },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
