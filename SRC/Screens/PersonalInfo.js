import {View, Text, TouchableOpacity, ScrollView, Platform, ToastAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SortableGrid from 'react-native-sortable-grid';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import ImageContainer from '../Components/ImageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setUserData } from '../Store/slices/common';

const PersonalInfo = () => {
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: PersonalInfo.js:25 ~ PersonalInfo ~ user:", user)

  const dispatch = useDispatch();
  // console.log("🚀 ~ file: PersonalInfo.js:24 ~ PersonalInfo ~ user:", user?.gallery_images)
  const token = useSelector(state => state.authReducer.token)
  const [email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState(user?.phone);
  const [dob, setDob] = useState( new Date(user?.birthday));
  // console.log("🚀 ~ file: PersonalInfo.js:28 ~ PersonalInfo ~ Birthday:", user?.birthday)
  // console.log("🚀 ~ file: PersonalInfo.js:28 ~ PersonalInfo ~ ob:", dob)
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(user?.iAm);
  // console.log("🚀 ~ file: PersonalInfo.js:37 ~ PersonalInfo ~ gender:", gender)
  const [profileName, setProfileName] = useState(user?.profileName);
  // const [multiImages, setMultiImages] = useState([
  //   {id: 1, uri: require('../Assets/Images/image1.jpeg')},
  //   {id: 2, uri: require('../Assets/Images/image2.jpeg')},
  //   {id: 3, uri: require('../Assets/Images/image3.jpeg')},
  //   {id: 4, uri: require('../Assets/Images/image4.jpeg')},
  //   {id: 5, uri: require('../Assets/Images/image4.jpeg')},
  //   {id: 6, uri: require('../Assets/Images/image5.jpeg')},
  // ]);

  const [multiImages, setMultiImages] = useState(user?.gallery_images)

  // const [multiImages, setMultiImages] = useState(user?.gallery_images)
  // console.log("🚀 ~ file: PersonalInfo.js:50 ~ PersonalInfo ~ multiImages:", multiImages)
  const [tempMultiImages, setTempMultiImages] = useState([]);
  // console.log("🚀 ~ file: PersonalInfo.js:36 ~ PersonalInfo ~ tempMultiImages:", tempMultiImages)
  const [multiImagesEmpty, setMultiImagesEmpty] = useState([]);
  const [currentIndex, setIndex] = useState('');
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [scrollEnabled , setScrollEnabled] = useState(true)
  const [newMultiImages, setNewMultiImages] = useState([])

    // useEffect(() => {
    //   setTempMultiImages([])
    //     if(multiImages.length >0){
    //       setTempMultiImages(multiImages)
    //     }
    
    // }, [multiImages])
    
    
    const onDragRelease = (itemOrder) => {
      setScrollEnabled(true)
      // console.log(value)
      // setMultiImages([])
      // // value?.itemOrder.map((item, index) => {
        // //   return ( setMultiImages((prev)=>[...prev , tempMultiImages[item?.key] ]))
        // // });
        const newItems = value?.itemOrder.map((item) => multiImages[item.key]);
        // console.log("🚀 ~ file: PersonalInfo.js:59 ~ onDragRelease ~ newItems:", newItems)
        setMultiImages(newItems)
        // console.log("🚀 ~ file: PersonalInfo.js:35 ~ PersonalInfo ~ multiImages:", multiImages)
      };

      const updatePortfolio = async () =>{
        const url ='portfolio';
        const formData = new FormData()
        formData.append('targetsUid',user?.id)
        formData.append('profileName',profileName)
        newMultiImages.map((item,index)=>{
          
          Object.keys(item).length > 0 && formData.append(`galleryImages[${index}]`,JSON.stringify(item,null,2))
          
        })
        
        // console.log("🚀 ~ file: PersonalInfo.js:84 ~ updatePortfolio ~ formData:", formData)
        // const body = {
        //   // targetsUid: user?.id,
        //   profileName : profileName,
        //   // Birthday: moment(dob).format('YYYY-MM-DD'),
        //   // Gender:gender,
        //   galleryImages:multiImages
          
        //   };
        // console.log("🚀 ~ file: PersonalInfo.js:81 ~ updatePortfolio ~ body:", body)
        const response = await Post(url, formData,apiHeader(token))
    
        if(response?.data?.status){
          
          // console.log("🚀 ~ file: UserDetail.js:71 ~ updatePortfolio ~ response:", response?.data)
          dispatch(setUserData(response?.data?.user));
          Platform.OS == 'android' ? ToastAndroid.show('Profile Updated Successfully',ToastAndroid.SHORT) :
          Alert('Profile Updated Successfully')
          
          
        }
      }



      
  return (

    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        title={'Personal Info'}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.6),
        }}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        <CustomText
          style={{
            marginTop: moderateScale(20, 0.3),
            fontSize: moderateScale(11, 0.6),
            color: Color.themeBlack,
            width: windowWidth * 0.8,
            textAlign: 'center',
          }}>
          Provide personal information for the security of your account, do not
          give personal information to anyone.
        </CustomText>
        <TextInputWithTitle
          rightIcon
          iconName={'user'}
          iconType={FontAwesome}
          title={'Profile name'}
          titleText={`Profile name`}
          secureText={false}
          placeholder={`Profile name`}
          setText={setProfileName}
          value={profileName}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(40, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
        />
        <TextInputWithTitle
          rightIcon
          iconName={'envelope'}
          iconType={FontAwesome}
          title={'Email address'}
          titleText={`Email address`}
          secureText={false}
          placeholder={`Email address`}
          setText={setEmail}
          value={email}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
          disable
        />
        <TextInputWithTitle
          rightIcon
          iconName={'phone'}
          iconType={FontAwesome}
          title={'Number Phone'}
          titleText={`Number Phone`}
          secureText={false}
          placeholder={`Number Phone`}
          setText={setNumber}
          value={number}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'white'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
          disable
        />
        <TextInputWithTitle
          rightIcon
          iconName={'calendar'}
          iconType={FontAwesome}
          title={'Birthday'}
          titleText={`Birthday`}
          secureText={false}
          placeholder={`Birthday`}
          setText={setDob}
          value={moment(dob).format('ll')}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(0, 0.3)}
          titleStlye={{
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}
          border={1}
          color={Color.veryLightGray}
          onPressLeft={() => {
            setOpen(true);
          }}
          disable
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.85,
            marginTop: moderateScale(20, 0.3),
          }}>
          <TouchableOpacity
            onPress={() => {
              // setGender('Men');
            }}
            style={[
              styles.cont,
              gender == 'Men' && {borderColor: Color.themeColor},
            ]}
            activeOpacity={0.7}>
            <Icon
              name={'man'}
              as={Ionicons}
              color={gender == 'Men' ? Color.themeColor : Color.veryLightGray}
            />

            <CustomText
              isBold
              style={[
                styles.txt6,
                gender == 'Men' && {color: Color.themeColor},
              ]}>
              {' '}
              Man
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setGender('Woman');
            }}
            style={[
              styles.cont,
              gender == 'Woman' && {borderColor: Color.themeColor},
            ]}
            activeOpacity={0.7}>
            <Icon
              name={'woman'}
              as={Ionicons}
              color={
                gender == 'Woman' ? Color.themeColor : Color.veryLightGray
              }
            />

            <CustomText
              isBold
              style={[
                styles.txt6,
                gender == 'Woman' && {color: Color.themeColor},
              ]}>
              {' '}
              Woman
            </CustomText>
          </TouchableOpacity>
        </View>
        <CustomText
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          Media
        </CustomText>

        <View style={styles.imageView}>
          <SortableGrid
            itemsPerRow={3}
           onDragStart={() => setScrollEnabled(false)}
            onDragRelease={value => {
              setScrollEnabled(true)
              // console.log(value)
              // setMultiImages([])
              // // value?.itemOrder.map((item, index) => {
                // //   return ( setMultiImages((prev)=>[...prev , tempMultiImages[item?.key] ]))
                // // });
                // const newItems = value?.itemOrder.map((item) => {multiImages.filter((x)=> x?.id==item?.key)});
                const newItems =  value?.itemOrder?.map((item)=> {
                  return multiImages.find((x)=>x?.id == item?.key)
                })
                // console.log("🚀 ~ file: PersonalInfo.js:59 ~ onDragRelease ~ newItems:", newItems)
                // setMultiImages(newItems)
                setNewMultiImages(newItems)
                
                // console.log("🚀 ~ file: PersonalInfo.js:35 ~ PersonalInfo ~ multiImages:", multiImages)
            }}>
            {multiImages?.map((item, index) => {
              return (
                <ImageContainer
                  data={multiImages}
                  setData={setMultiImages}
                  item={item}
                  setIndex={setIndex}
                  index={Math.random}
                  showMultiImageModal={showMultiImageModal}
                  setShowMultiImageModal={setShowMultiImageModal}
                  key={item?.id}
                  edit={true}
                />
              );
            })}
          </SortableGrid>
        </View>
        <CustomButton
          text={'Save'}
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          elevation
          onPress ={
            ()=>{
              updatePortfolio()
            }
          }
        />
      </ScrollView>
      {/* <DatePicker
        maximumDate={new Date()}
        modal
        open={open}
        date={dob}
        onConfirm={date => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={'date'}
        androidVariant="iosClone"
        style={{}}
        theme={'light'}
      /> */}
      <ImagePickerModal
        show={showMultiImageModal}
        setShow={setShowMultiImageModal}
        setMultiImages={setMultiImages}
        images={multiImages}
        index={currentIndex}
      />
    </>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    // height: windowHeight,
    backgroundColor: Color.white,
  },
  cont: {
    alignSelf: 'center',
    height: windowHeight * 0.07,
    width: windowWidth * 0.35,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.veryLightGray,
    marginVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
  },
  txt6: {
    fontSize: moderateScale(14, 0.6),
    color: Color.veryLightGray,
  },
  imageView: {
    width: windowWidth * 0.9,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: moderateScale(5, 0.3),
    height: windowHeight * 0.35,
    // backgroundColor : 'red',
    // justifyContent: 'space-between',
  },
  heading: {
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(16, 0.6),
    color: Color.themeBlack,
  },
});
export default PersonalInfo;
