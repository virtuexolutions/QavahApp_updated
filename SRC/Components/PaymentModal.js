import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
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
import {createToken, CardField} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';

const PaymentModal = ({isVisible, setIsVisible, price}) => {
  const [selectedIndex, setSelecetedIndex] = useState(1);
  const token = useSelector(state => state.authReducer.token);
  const [stripeToken, setstripeToken] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [cardDetails, setCardDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(
    '🚀 ~ file: PaymentModal.js:20 ~ PaymentModal ~ stripetoken:',
    stripeToken,
  );

  const stripePayment = async () => {
    const url = 'api/subscription/buy';
    body = {
      stripe_token: stripeToken,
      price: price,
      type: 'stripe',
      title: 'Subscription',
    };
    const response = await Post(url, body, apiHeader(token));
    if (response.status.true) {
      console.log(
        '🚀 ~ file: PaymentModal.js:28 ~ stripePayment ~ response:',
        response,
      );
    }
  };

  const AddCard = async () => {
    setIsLoading(true);
    const responseData = await createToken({
      type: 'Card',
      // name: cardData.name,
      // address: {
      //   city: cardData?.city,
      // },

      // paymentMethodData : {
      //   billingDetails,
      // }
    });
    console.log(
      '🚀 ~ file: AddCard.js:90 ~ addCard ~ responseData',
      JSON.stringify(responseData, null, 2),
    );

    if (responseData.error) {
      setIsLoading(false);
      console.log(responseData.error);
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
              bgColor={['#CD4D7B', '#D9AABB']}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              isGradient
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {
                AddCard();
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
              bgColor={['#CD4D7B', '#D9AABB']}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              isGradient
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {
                setPaymentType('stripe')
              }}
            />
            <CustomButton
              text={'pay through Paypal'}
              textColor={Color.white}
              width={windowWidth * 0.65}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              bgColor={['#CD4D7B', '#D9AABB']}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              isGradient
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
    paddingVertical: moderateScale(20, 0.6),
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
