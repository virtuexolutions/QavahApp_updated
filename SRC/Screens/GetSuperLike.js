import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {ScrollView} from 'native-base';
import PlanCard from '../Components/PlanCard';
import {PointsComponent} from './Subscription';
import CustomButton from '../Components/CustomButton';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import PaymentModal from '../Components/PaymentModal';
import {windowHeight, windowWidth} from '../Utillity/utils';

const {height, width} = Dimensions.get('window');

const GetSuperLike = ({route}) => {
  const token = useSelector(State => State.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ GetSuperLike ~ user:', user?.subscription);
  const {text} = route.params;
  // console.log('🚀 ~ GetSuperLike ~ text:', text);

  const [packages, setPackages] = useState([]);
  // console.log("🚀 ~ GetSuperLike ~ packages:", packages)

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState({});
  console.log('🚀 ~ GetSuperLike ~ selected:', selected);

  const [price, setPrice] = useState(0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [packagesName, setpackagesName] = useState(
    user?.subscription?.map(item => {
      return item?.pkg_name;
    }),
  );
  console.log('🚀 ~ GetSuperLike ~ packagesName:', packagesName);
  const pkg_category = user?.subscription.map(item => {
    return item?.pkg_catogery;
  });
  // console.log('🚀 ~ GetSuperLike ~ pkg_category:', pkg_category);

  const pointsArray = [
    {lock: false, text: 'Unlimited Likes'},
    {lock: false, text: 'See who likes you'},
    {lock: true, text: 'Priority Likes'},
  ];

  const getSubscriptionPlan = async () => {
    const url = `packages?title=${text}`;
    // console.log('🚀 ~ getSubscriptionPlan ~ url:', url);
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
       return console.log( text,JSON.stringify(response?.data, null, 2));
      const newData = response?.data?.packages;
      // console.log('🚀 ~ getSubscriptionPlan ~ newData:', newData);

      setPackages(newData);
      // user?.subscription &&
      //   newData?.map((data, index) => {
      //     return user?.subscription.map(item => {
      //       return (
      //         item?.pkg_catogery.toLowerCase() == text.toLowerCase() &&
      //         item?.pkg_name.toLowerCase() == data?.title.toLowerCase() &&
      //         setSelected(prev => [...prev, data])
      //       );
      //     });
      //   });
    }
  };

  useEffect(() => {
    getSubscriptionPlan();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        showRight={true}
        // rightName={''}
        // title={'Home'}
        leftName={'left'}
        leftType={AntDesign}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(80, 0.6),
        }}>
        <View
          style={{
            marginTop: moderateScale(20, 0.3),
            marginHorizontal: moderateScale(20, 0.3),
          }}>
          <CustomText
            style={[
              styles.Txt1,
              {
                marginBottom: moderateScale(10, 0.3),
                fontSize: moderateScale(25, 0.6),
              },
            ]}
            isBold>
            {`${text} Packages`}
          </CustomText>
        </View>

        {loading ? (
          <ActivityIndicator
            color={Color.themeColor}
            size={'large'}
            style={{marginTop: moderateScale(10, 0.3)}}
          />
        ) : (
          <>
            {packages?.length > 0 && (
              <CustomText
                isBold
                style={[
                  styles.Txt1,
                  {
                    // margin: moderateScale(20, 0.3),
                    fontSize: moderateScale(13, 0.6),
                    // left:moderateScale(-130,0.3)
                  },
                ]}>
                Select a plan
              </CustomText>
            )}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={packages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item);
                      setPrice(item?.price);
                    }}>
                    <PlanCard
                      key={index}
                      title={item?.title}
                      description={item?.description}
                      price={item?.price}
                      selected={selected}
                      item={item}
                      text={text}
                    />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.9,
                      height: windowHeight * 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      isBold
                      style={{
                        fontSize: moderateScale(20, 0.6),
                      }}>
                      No Plans available
                    </CustomText>
                  </View>
                );
              }}
            />
          </>
        )}

        <PointsComponent array={pointsArray} title={'Upgrade your likes'} />
      </ScrollView>

      <CustomButton
        text={price == 0 ? 'continue' : `$${price}`}
        textColor={Color.white}
        width={width * 0.8}
        height={height * 0.07}
        onPress={() => {
          if (Object.keys(selected).length == 0) {
            Platform.OS == 'android'
              ? ToastAndroid.show('Please select a package', ToastAndroid.SHORT)
              : alert('Please select a package');
          } else {
            if (
              (pkg_category?.includes('platinum') ||
                pkg_category?.includes('Month to Month') ||
                pkg_category?.includes('gold')) &&
              text.toLowerCase() != 'premium features'.toLowerCase()
            ) {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    `You have already subscribed to ${pkg_category}`,
                    ToastAndroid.SHORT,
                  )
                : alert(`You have already subscribed to ${text}`);
            } else if (text.toLowerCase() == 'premium features'.toLowerCase()) {
              if (packagesName.includes(selected?.title)) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show(
                      `Already subscribed to ${selected?.title}`,
                      ToastAndroid.SHORT,
                    )
                  : alert(`Already subscribed to ${selected?.title}`);
              }
              setPaymentModalVisible(true);
            } else {
              setPaymentModalVisible(true);
            }
          }
        }}
        marginLeft={width * 0.05}
        marginRight={width * 0.05}
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
      <PaymentModal
        isVisible={paymentModalVisible}
        setIsVisible={setPaymentModalVisible}
        item={selected}
        setpackagesName={setpackagesName}
      />
    </>
  );
};

export default GetSuperLike;

const styles = StyleSheet.create({});
