import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {ScrollView} from 'native-base';
import PlanCard from '../Components/PlanCard';
import {PointsComponent} from './Subscription';
import CustomButton from '../Components/CustomButton';
import { Get } from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

const GetSuperLike = ({route}) => {
  const token = useSelector(State => State.authReducer.token);

  const [selected, setSelected] = useState('');
  const [packages, setPackages] = useState([])
  const {text} = route.params ;

  const pointsArray = [
    {lock: false, text: 'Unlimited Likes'},
    {lock: false, text: 'See who likes you'},
    {lock: true, text: 'Priority Likes'},
  ];

//   const packages = [
//     {title: 'Monthly', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', price: '4,274.93'},
//     {title: 'Weekly', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', price: '4,274.93'},
//     {title: 'yearly', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', price: '4,274.93'},
    
// ]; 

const getSubscriptionPlan = async () => {
  const url = 'packages';
  const response = await Get(url, token);
  if (response != undefined) {
    console.log(JSON.stringify(response?.data, null, 2));
    setPackages(response?.data?.packages)
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
            {'Lorem Ipsum Dol Consectetur Adipiscing Elit.'}
          </CustomText>
          <CustomText
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
          style={{marginHorizontal: moderateScale(10, 0.3)}}>
            {(text == 'gold' ? packages?.gold : packages?.platinum)?.map((item,index)=>(
                <TouchableOpacity onPress={()=>{ setSelected(item?.title)}}>
                    <PlanCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    selected={selected}
                    item={item}
                />
              </TouchableOpacity>
            ))}
          
        </ScrollView>

        <PointsComponent array={pointsArray} title={'Upgrade your likes'} />
      </ScrollView>
      <CustomButton
        text={'Continue'}
        textColor={Color.white}
        width={width * 0.8}
        height={height * 0.07}
        onPress={() => {}}
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
    </>
  );
};

export default GetSuperLike;

const styles = StyleSheet.create({});
