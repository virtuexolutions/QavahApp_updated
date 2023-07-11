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
  const completeBody = props?.route?.params?.twoStepsData;

  const navigation = useNavigation();

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
          paddingBottom: moderateScale(130, 0.6),
        }}>
        <CustomText
          style={[
            {
              marginTop: moderateScale(8, 0.3),
              color: Color.themeColor,
              fontWeight: 'bold',
            },
          ]}>{`Effective Date : ${moment().format(
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
          experience with the Services. {'\n\n'}5. Indemnification: Users agree
          to indemnify and hold harmless Qavah.us, its directors, employees, and
          agents from any and all claims, liabilities, damages, losses, costs,
          expenses, or fees (including reasonable attorneys' fees) that arise
          from violation of this Disclaimer or misuse of the Services. {'\n\n'}{' '}
          6. Resolution of Disputes: Any disputes arising out of or relating to
          the use of the Services must be resolved in accordance with the
          dispute resolution provisions in our Terms of Service. {'\n\n'}This
          Disclaimer is governed by and construed in accordance with the laws of
          [Jurisdiction]. If any provision of this Disclaimer is deemed
          unenforceable or invalid under any applicable law, such
          unenforceability or invalidity shall not render this Disclaimer
          unenforceable or invalid as a whole. {'\n\n'}By using the Services,
          you acknowledge that you understand and accept all terms and
          conditions outlined in this Disclaimer. If you have any questions or
          concerns about this Disclaimer, please contact us at info@qavah.us.
        </CustomText>
      </ScrollView>

      {fromRegisteration && 
        <>
          <CustomButton
            text={'Accept'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            onPress={() => {
              fromRegisteration
                ? navigation.navigate('IsraeliteFilters', {
                    check: true,
                    twoStepsData: completeBody,
                  })
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
          <CustomButton
            text={'Decline'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            onPress={() => {
              navigation.navigate('IsraeliteFilters', {
                check: false,
                twoStepsData: completeBody,
              });
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
        </>
      }
    </>
  );
};



export default TermsAndConditions;
