import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Platform,
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

const {height, width} = Dimensions.get('window');

const GetSuperLike = ({route}) => {
  const token = useSelector(State => State.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ file: GetSuperLike.js:29 ~ GetSuperLike ~ user:', user);
  const {text, item} = route.params;
  
  console.log('🚀 ~ file: GetSuperLike.js:31 ~ GetSuperLike ~ item:', text);
  // console.log('🚀 ~ file: GetSuperLike.js:31 ~ GetSuperLike ~ item:', user?.subscription);

  const [packages, setPackages] = useState([]);
  // console.log(
  //   '🚀 ~ file: GetSuperLike.js:30 ~ GetSuperLike ~ packages:',
  //   packages,
  // );


  const [selected, setSelected] = useState(
    user?.subscription
      ? user?.subscription.find(
          item => item?.pkg_catogery.toLowerCase() == (text.toLowerCase()== 'premium features' ? 'premium' : text.toLowerCase())
        )
      : ' ',
  );
  console.log(
    '🚀 ~ file: GetSuperLike.js:38 ~ GetSuperLike ~ selected:',
    selected,
  );

  const [price, setPrice] = useState(item ? item?.price : 0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [packagesName, setpackagesName] = useState(
    user?.subscription?.map(item => {
      return item?.pkg_name;
    }),
  );
  const pkg_category = user?.subscription.map(item => {
    return item?.pkg_catogery;
  });
  console.log("🚀 ~ file: GetSuperLike.js:64 ~ GetSuperLike ~ pkg_category:", pkg_category)
  console.log(
    '🚀 ~ file: GetSuperLike.js:54 ~ GetSuperLike ~ pkg_category:',
    packagesName,
  );
  // console.log(
  //   '🚀 ~ file: GetSuperLike.js:46 ~ GetSuperLike ~ packagesName:',
  //   packagesName,
  // );

  const pointsArray = [
    {lock: false, text: 'Unlimited Likes'},
    {lock: false, text: 'See who likes you'},
    {lock: true, text: 'Priority Likes'},
  ];

  const getSubscriptionPlan = async () => {
    const url = 'packages';
    const response = await Get(url, token);
    if (response != undefined) {
      console.log(JSON.stringify(response?.data, null, 2));
      const newData = response?.data?.packages;
      console.log(
        '🚀 ~ file: GetSuperLike.js:43 ~ getSubscriptionPlan ~ newData:',
        newData,
      );
      console.log(text.toLowerCase(), 'platinum'.toLowerCase());
      text.toLowerCase() == 'platinum'.toLowerCase()
        ? setPackages([newData?.month_to_month[0], ...newData?.platinum])
        : text.toLowerCase() == 'premium features'.toLowerCase()
        ? setPackages(newData?.premium)
        : setPackages([newData?.month_to_month[1], ...newData?.gold]);
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
        // textStyle={{
        //   color: Color.veryLightGray,
        // }}
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
        <View
          style={{
            marginTop: moderateScale(20, 0.3),
            // marginLeft:moderateScale(10,.3),
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
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // style={{marginHorizontal: moderateScale(10, 0.3)}}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          {packages.map((item, index) => (
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
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <PointsComponent array={pointsArray} title={'Upgrade your likes'} />
      </ScrollView>

      <CustomButton
        text={price == 0 ? 'continue' : `$${price}`}
        textColor={Color.white}
        width={width * 0.8}
        height={height * 0.07}
        onPress={() => {
          if (selected == '') {
            Platform.OS == 'android'
              ? ToastAndroid.show('Please select a package', ToastAndroid.SHORT)
              : alert('Please select a package');
          } else {
            if (
              pkg_category?.includes(text) &&
              text.toLowerCase() != 'premium features'.toLowerCase()
            ) {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    `You have already subscribed to ${text}` ,
                    ToastAndroid.SHORT,
                  )
                : alert( `You have already subscribed to ${text}`);
            } else if (
              pkg_category?.includes('platinum') &&
              text.toLowerCase() == 'gold'.toLowerCase()
            ) {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'You already have subscribed platinum so you cannot buy gold ',
                    ToastAndroid.SHORT,
                  )
                : alert(
                    'You already have subscribed platinum so you cannot buy gold',
                  );
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

            }
            else{
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
