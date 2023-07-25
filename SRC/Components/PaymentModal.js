import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {
  createToken,
  CardField,
  createPaymentMethod,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import { setUserData } from '../Store/slices/common';

const PaymentModal = ({isVisible, setIsVisible, item , setpackagesName}) => {
  const dispatch = useDispatch()
  const [selectedIndex, setSelecetedIndex] = useState(1);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: PaymentModal.js:31 ~ token:", token)
  const [stripeToken, setstripeToken] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [cardDetails, setCardDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // console.log(
  //   '🚀 ~ file: PaymentModal.js:20 ~ PaymentModal ~ stripetoken:',
  //   stripeToken,
  // );



  const PayUsingStripe = async () => {
    setIsLoading(true);

    const responseData = await createPaymentMethod({
      paymentMethodType: 'Card',
      // billingDetails: {
    });
    console.log(
    '🚀 ~ file: AddCard.js:90 ~ addCard ~ responseData',
      JSON.stringify(responseData?.paymentMethod?.id, null, 2),
    );

    if (responseData.error) {
      setIsLoading(false);
      console.log(responseData.error);
    }
    if (responseData != undefined) {
      const url = 'subscribion/recurring'
      body = {
        payment_method: responseData?.paymentMethod?.id,
        package_detail: item,

        auto_renew: false,
        voucher: '',
      };
      console.log(JSON.stringify(body,null ,2));
      const responseApi = await Post(url, body, apiHeader(token));
      setIsLoading(false);
      if (responseApi?.status) {
        console.log('data ======>>' , JSON.stringify(responseApi?.data?.response,null ,2))
        dispatch(setUserData(responseApi?.data?.response))
        Platform.OS == 'android'
          ? ToastAndroid.show('payment done', ToastAndroid.SHORT)
          : alert('payment done');
          setIsVisible(false)
          setpackagesName(
            responseApi?.data?.response?.subscription?.map(item=>{
              return(item?.pkg_name)
            })
          )

      }
    }
  };

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
        <View
          style={{
            // position: 'absolute',
            width: '100%',
            alignItems: 'center',
            marginBottom: moderateScale(10, 0.3),
            flexDirection: 'row',
            // backgroundColor: 'black',
            // height: windowHeight * 0.1,
            height: windowHeight * 0.07,
            justifyContent: 'center',
            backgroundColor: Color.themeColor,
            // marginLeft:moderateScale(10,.3),
          }}>
          {paymentType == '' ? (
            <></>
          ) : (
            <Icon
              name="left"
              color={Color.white}
              as={AntDesign}
              size={5}
              style={{
                position: 'absolute',
                left: 10,
                marginLeft: moderateScale(10, 0.3),
              }}
              onPress={() => {
                setPaymentType('');
              }}
            />
          )}
          <CustomText
            style={[
              {
                color: Color.white,
                fontSize: moderateScale(15, 0.3),
               },
            ]}
            isBold>
            Payment
          </CustomText>
        </View>
        {paymentType == 'stripe' ? (
          <View>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={cardDetails => {
                console.log('cardDetails', cardDetails);
                setCardDetails(cardDetails);
              }}
              onFocus={focusedField => {
                console.log('focusField', focusedField);
              }}
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'Submit'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.65}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {
                PayUsingStripe();
              }}
            />
          </View>
        ) : paymentType == 'paypal' ? (
          <CustomText>paypal intgeration left</CustomText>
        ) : (
          <>
            <CustomButton
              text={'pay through Stripe'}
              textColor={Color.white}
              width={windowWidth * 0.65}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              // isGradient
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {
                setPaymentType('stripe');
              }}
            />
            <CustomButton
              text={'pay through Paypal'}
              textColor={Color.white}
              width={windowWidth * 0.65}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              // isGradient
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {}}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default PaymentModal;

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
    // height: windowHeight * 0.13,
    paddingVertical: moderateScale(10, 0.6),
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
