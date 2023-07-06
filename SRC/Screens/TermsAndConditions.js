import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, FlatList} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Header from '../Components/Header';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {ActivityIndicator} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

// import {Get} from '../Axios/AxiosInterceptorFunction';
// import DOMParser from 'react-native-html-parser';
import moment from 'moment/moment';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';

const TermsAndConditions = props => {
  const fromRegisteration = props?.route?.params?.fromRegisteration;
  console.log(
    '🚀 ~ file: TermsAndConditions.js:25 ~ TermsAndConditions ~ fromRegisteration:',
    fromRegisteration,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');
  const navigation = useNavigation();

  // const parser = new DOMParser.DOMParser();

  // const GetSupportData = async () => {
  //   const url = 'term/conditions';
  //   setIsLoading(true);
  //   const response = await Get(url);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('dasdsadsa =>', response?.data?.data);
  //     setTermsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   GetSupportData();
  // }, []);

  // useEffect(() => {
  //   console.log(termsData);
  //   // let a = parser?.parseFromString(
  //   //   "<p>Hello world <b>world</b> <i>foo</i> abc</p>",
  //   //   "text/html"
  //   // );

  //   const parsed = parser.parseFromString(termsData?.description, 'text/html');
  //   console.log('here is the data =>',  parsed);
  // }, [termsData]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        title={'Terms & Conditions'}
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
        <CustomText
          style={[
            {
              marginTop: moderateScale(8, 0.3),
              color: Color.themeColor,
              fontWeight: 'bold',
            },
          ]}>{`Effective Date : ${moment(termsData?.updated_at).format(
          'll',
        )}`}</CustomText>
        <CustomText
          style={[
            {
              // backgroundColor: 'red',
              color: Color.black,
              textAlign: 'left',
              margin: moderateScale(20, 0.3),
              lineHeight: moderateScale(18, 0.3),
              fontSize: moderateScale(15, 0.3),
            },
          ]}>
          This disclaimer ("Disclaimer") is applicable to the Qavah.us website
          ("Website") and all related services (collectively, the "Services").
          1. Acceptance of Terms: By using the Services, you ("User") agree to
          the terms of this Disclaimer. If you disagree with any part of the
          Disclaimer, you must immediately cease your use of the Services.
          {'\n\n'} 2. Limitation of Liability: Qavah.us is an online platform
          that facilitates connections between individuals. We do not perform
          background checks, verify information provided by users, or guarantee
          the behavior of users. Therefore, Qavah.us will not be held liable for
          any losses, damages, or adverse events that may occur as a result of
          interactions with other users on our platform. {'\n\n'}3. User
          Responsibility: Users are solely responsible for their interactions
          with others they connect with through the Services. This includes
          taking reasonable precautions and using good judgment when interacting
          with others, especially if deciding to meet in person.
        </CustomText>
        <CustomText
          style={[
            {
              // backgroundColor: 'red',
              color: Color.black,
              textAlign: 'left',
              margin: moderateScale(20, 0.3),
              lineHeight: moderateScale(18, 0.3),
              fontSize: moderateScale(15, 0.3),
            },
          ]}>
          4. No Endorsement: Qavah.us does not endorse any users or their
          behavior. Any testimonials or endorsements made on our Website do not
          constitute a guarantee, warranty, or prediction regarding your
          experience with the Services.  {'\n\n'}5. Indemnification: Users agree to
          indemnify and hold harmless Qavah.us, its directors, employees, and
          agents from any and all claims, liabilities, damages, losses, costs,
          expenses, or fees (including reasonable attorneys' fees) that arise
          from violation of this Disclaimer or misuse of the Services. {'\n\n'} 6.
          Resolution of Disputes: Any disputes arising out of or relating to the
          use of the Services must be resolved in accordance with the dispute
          resolution provisions in our Terms of Service.  {'\n\n'}This Disclaimer is
          governed by and construed in accordance with the laws of
          [Jurisdiction]. If any provision of this Disclaimer is deemed
          unenforceable or invalid under any applicable law, such
          unenforceability or invalidity shall not render this Disclaimer
          unenforceable or invalid as a whole.  {'\n\n'}By using the Services, you
          acknowledge that you understand and accept all terms and conditions
          outlined in this Disclaimer. If you have any questions or concerns
          about this Disclaimer, please contact us at info@qavah.us.
        </CustomText>
      </ScrollView>

      <CustomButton
        text={'Accept'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.07}
        onPress={() => {
          fromRegisteration
            ? navigation.navigate('IsraeliteFilters', {check: true})
            : navigation.goBack();
        }}
        marginLeft={windowWidth * 0.05}
        marginRight={windowWidth * 0.05}
        bgColor={Color.themeColor}
        borderRadius={moderateScale(10, 0.6)}
        marginTop={moderateScale(40, 0.6)}
        marginBottom={moderateScale(10, 0.6)}
        elevation
        isBold
        fontSize={moderateScale(15, 0.6)}
        containerStyle={{
          position: 'absolute',
          bottom: windowHeight * 0.08,
        }}
      />
      {fromRegisteration && (
        <CustomButton
          text={'Decline'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          onPress={() => {
            navigation.navigate('IsraeliteFilters', {check: false});
          }}
          marginLeft={windowWidth * 0.05}
          marginRight={windowWidth * 0.05}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(10, 0.6)}
          marginTop={moderateScale(40, 0.6)}
          marginBottom={moderateScale(10, 0.6)}
          elevation
          isBold
          fontSize={moderateScale(15, 0.6)}
          containerStyle={{
            position: 'absolute',
            bottom: moderateScale(5, 0.3),
          }}
        />
      )}
      {/* <CustomButton
              text={'Starting At $500'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.07}
              onPress={() => {}}
              marginLeft={windowWidth * 0.05}
              marginRight={windowWidth * 0.05}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.6)}
              marginTop={moderateScale(40, 0.6)}
              marginBottom={moderateScale(10, 0.6)}
              elevation
              isBold
              fontSize={moderateScale(15, 0.6)}
              containerStyle ={{
                position : 'absolute' ,
                bottom : moderateScale(5,0.3)
              }}
            /> */}
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: windowHeight * 0.9,
    width: windowWidth,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.25,
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.themeColor,
    position: 'absolute',
    bottom: 50,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: windowWidth * 0.85,
    // backgroundColor: "red",
    // marginHorizontal: moderateScale(20, 0.3),
    borderBottomWidth: 0.5,
    borderColor: Color.lightGrey,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: moderateScale(15, 0.3),
  },
  image: {
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    // marginRight: moderateScale(5, 0.3),
  },
});

export default TermsAndConditions;
