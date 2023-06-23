import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import ImageView from 'react-native-image-viewing';

import Color from '../Assets/Utilities/Color';
import ViewPost from '../Components/ViewPost';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomModal from '../Components/CustomModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setUserData } from '../Store/slices/common';

const Profile = props => {
  const data = props?.route?.params?.data;
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: Profile.js:36 ~ Profile ~ user:", user)
  // console.log("🚀 ~ file: Profile.js:33 ~ Profile ~ data:", data)
  const token = useSelector(state => state.authReducer.token)
  const fromSearch = props?.route?.params?.fromSearch ;
  console.log("🚀 ~ file: Profile.js:26 ~ Profile ~ fromSearch:", fromSearch)
  const [type, setType] = useState('photos');
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setuserData] = useState(fromSearch ? data : user);
  console.log("🚀 ~ file: Profile.js:45 ~ Profile ~ userData:", userData)
  const [postRef , setPostRef] = useState(null
  )
  const [images , setImages] = useState(userData ? userData?.gallery_images :  [
    require('../Assets/Images/image1.jpeg'),
    require('../Assets/Images/image2.jpeg'),
    require('../Assets/Images/image3.jpeg'),
    require('../Assets/Images/image4.jpeg'),
    require('../Assets/Images/image5.jpeg'),
    require('../Assets/Images/woman1.jpeg'),
    require('../Assets/Images/woman2.jpeg'),
    require('../Assets/Images/woman3.jpeg'),
    require('../Assets/Images/woman4.jpeg'),
    require('../Assets/Images/woman5.jpeg'),
    require('../Assets/Images/woman1.jpeg'),
    require('../Assets/Images/woman2.jpeg'),
    require('../Assets/Images/woman3.jpeg'),
    require('../Assets/Images/woman4.jpeg'),
    require('../Assets/Images/woman5.jpeg'),
  ],)
  console.log("🚀 ~ file: Profile.js:64 ~ Profile ~ images:", images)

  const dispatch = useDispatch()

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage , setSelectedImage] = useState(null)
  console.log("🚀 ~ file: Profile.js:70 ~ Profile ~ selectedImage:", selectedImage)
  const [image, setImage] = useState({});
  console.log("🚀 ~ file: Profile.js:70 ~ Profile ~ image:", image)
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postImage , setPostImage] = useState({});
  console.log("🚀 ~ file: Profile.js:76 ~ Profile ~ postImage:", postImage)
  const [postImageModal , setPostImageModal] = useState(false);
  const [pickPostImage , setPickPostImage] = useState(false)
  const [description , setDescription] = useState('')
  
  
  
  const updateProfile =async ()=>{
    const url = 'user/update-my-profile-image';
    const formData = new FormData()
    // const body = {profileImages:image}

    formData.append('profileImages',image)
    const response = await Post(url, formData, apiHeader(token))
    console.log("🚀 ~ file: Profile.js:78 ~ updateProfile ~ body:", formData)
    
    if(response!= undefined){
      console.log("🚀 ~ file: Profile.js:77 ~ updateProfile ~ response:", response?.data?.user)

      console.log("🚀 ~ file: Profile.js:77 ~ updateProfile ~ response:", response?.data?.user?.profile_image[0]?.uri)

      dispatch(setUserData(response?.data?.user))
      
    }

  }

  const sendPost = async()=>{

    const formData = new FormData();
    // formData.append('description',description);
    formData.append('image', postImage);
    setPostImage(null)
    const url = 'send-post';
    const response = await Post(url, {formData}, apiHeader(token))
    
    if(response != undefined){

      console.log("🚀 ~ file: Profile.js:103 ~ sendPost ~ response:", response?.data)
      
    }
  }



  useEffect(() => {
    if(Object.keys(postImage).length > 0){
      setPostImageModal(!postImageModal)
    }
  }, [postImage])

  useEffect(() => {
    if(Object.keys(image).length > 0){

      updateProfile()
    }

  }, [image])
  

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        title={`${userData?.profileName} Gallery`}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(20, 0.6),
          paddingTop: moderateScale(30, 0.6),
          paddingBottom: moderateScale(10, 0.6),
          alignItems: 'center',
        }}>
          {
           fromSearch ?
            <CustomImage
              style={styles.image}
              source={{uri : userData?.profile_images[0]?.url}}
            />
            :
            <View>
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image?.url}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={userData?.profile_images?.length > 0 ? {uri:userData?.profile_images[0]?.url} : require('../Assets/Images/dummyman6.png')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={[
                styles.edit,
                {
                  backgroundColor: '#EEEEEE',
                },
              ]}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>
          }
        <CustomText style={styles.heading}>
         {`${ userData?.profileName},${userData?.age}`}
        </CustomText>
        <CustomText
          style={[
            {
              color: Color.veryLightGray,
              fontSize: moderateScale(11, 0.6),
              marginTop: moderateScale(6, 0.3),
            },
          ]}>
      {userData?.spiritualBackground}
        </CustomText>
        <CustomText
          style={[
            {
              color: Color.veryLightGray,
              fontSize: moderateScale(11, 0.6),
              marginTop: moderateScale(2, 0.3),
            },
          ]}>
      {userData?.spiritualValue}
        </CustomText>
        
        <View style={styles.row}>
          {/* <View
            style={{
              width: windowWidth * 0.48,
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(28, 0.6),
                color: Color.themeBlack,
                textAlign: 'center',
              }}>
              {images?.length}
            </CustomText>
            <CustomText
              style={{
                color: Color.veryLightGray,
                fontSize: moderateScale(12, 0.6),
                // textAlign : 'center'
              }}>
              {images?.length < 1 ? 'Photo' : 'Photos'}
            </CustomText>
          </View> */}
          {/* <View
            style={{
              width: windowWidth * 0.48,
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(28, 0.6),
                color: Color.themeBlack,
                textAlign: 'center',
              }}>
              20
            </CustomText>
            <CustomText
              style={{
                color: Color.veryLightGray,
                fontSize: moderateScale(12, 0.6),
                // textAlign : 'center'
              }}>
              Video
            </CustomText>
          </View> */}
        </View>
        {/* <View style={[styles.row,{width : windowWidth * 0.9}]}> */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setType('photos');
            }}
            style={[
              styles.slider,
              type == 'photos' && {
                borderBottomWidth: 2,
                borderColor: Color.themeColor,
              },
            ]}>
            <Icon
              name={'appstore-o'}
              as={AntDesign}
              color={type == 'photos' ? Color.themeColor : Color.veryLightGray}
              size={moderateScale(20,0.6)}
              style={{
                width : moderateScale(25,0.6)
              }}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setType('video');
            }}
            style={[
              styles.slider,
              type == 'video' && {
                borderBottomWidth: 2,
                borderColor: Color.themeColor,
              },
            ]}>
            <Icon
              name={'video'}
              as={FontAwesome5}
              color={type == 'video' ? Color.themeColor : Color.veryLightGray}
              size={moderateScale(20,0.6)}
              style={{
                width : moderateScale(25,0.6)
              }}
            />
          </TouchableOpacity> */}
        {/* </View> */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: windowWidth * 0.9,
              marginTop : moderateScale(20,0.3)
            }}>
            {images?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    setSelectedImage(item)
                    // setIsVisible(true);
                    postRef.open()
                  }}
                  activeOpacity={0.8}
                  key={index}
                  style={{
                    borderRadius: moderateScale(10, 0.6),
                    width: windowWidth * 0.86 / 3,
                    height:windowHeight * 0.15,
                    overflow: 'hidden',
                    marginTop: moderateScale(10, 0.3),
                  }}>
                  <CustomImage
                    onPress={() => {
                      setSelectedIndex(index);
                    setSelectedImage(item)

                      // setIsVisible(true);
                      postRef.open()
                    }}
                    source={{uri:item?.url}}
                    // resizeMode={'contain'}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                
                
                </TouchableOpacity>
              );
            })}
          </View>
      </ScrollView>
      {!fromSearch &&

        <TouchableOpacity style={styles.absoluteContainer} activeOpacity={0.8}
        onPress={()=>{
          setPickPostImage(true)
        }}
        >
          <Icon 
          name={'camera-plus-outline'}
          as={MaterialCommunityIcons}
          size={moderateScale(40,0.6)}
          color={Color.white}
          style={{
            width : '100%',
            textAlign : 'center',
            zIndex : 1
          }}
          onPress={()=>{
            setPickPostImage(true)
          }}
          
          />
    </TouchableOpacity>
    }
         
         <ViewPost 
      setRef={setPostRef}
      item={ userData}
      image={selectedImage}
      />
         <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
         <ImagePickerModal
          show={pickPostImage}
          setShow={setPickPostImage}
          setFileObject={setPostImage}
        />
         <CustomModal
      isVisible={postImageModal}
      setIsVisible={setPostImageModal}
      container={{
        width : windowWidth * 0.9 ,
        maxHeight : windowHeight * 0.7 , 
        borderRadius : moderateScale(15,0.6),
        backgroundColor : 'white',
        overflow : 'hidden',
      }}
      contentContainerStyle={{
        // paddingVertical : moderateScale(20,0.6) ,
        alignItems : 'center',
        overflow : 'hidden',

    }}
      >
         <View style={styles.image1}>
          {/* <SharedElement id={`item.${item.key}.image_url`}>  */}
          <CustomImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={postImage}
            resizeMode={'stretch'}
          />
          </View>
          <TextInputWithTitle
          titleText={`Write a caption`}
       
          placeholder={`Write a caption`}
          setText={setDescription}
          value={description}
          viewHeight={0.15}
          viewWidth={0.75}
          inputWidth={0.72}
          borderColor={Color.veryLightGray}
          backgroundColor={'transparent'}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(5, 0.3)}
          marginTop ={ moderateScale(20, 0.3)}
          border={1}
          color={Color.veryLightGray}
          multiline
        />
       <CustomButton
          text={'Upload'}
          textColor={Color.white}
          width={windowWidth * 0.75}
          height={windowHeight * 0.07}
         marginTop={moderateScale(20,0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          elevation
          onPress ={ () => 
            {
              setImages(prev=>[...prev , postImage])
              setPostImageModal(false)
            
            }
          }
        />


      </CustomModal>
    </>
  );
};

export default Profile;

const styles = ScaledSheet.create({
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    alignSelf: 'center',
  },
  image1: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    backgroundColor: Color.veryLightGray,
    overflow : 'hidden' , 
    backgroundColor : 'red',
    borderRadius : moderateScale(15,0.6)
  },
  heading: {
    fontSize: moderateScale(18, 0.6),
    color: Color.themeBlack,

    marginTop: moderateScale(20, 0.3),
  },
  row: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
    paddingTop: moderateScale(20, 0.6),
  },
  slider: {
    width: windowWidth * 0.36,
    alignSelf: 'center',
    alignItems : 'center',
    paddingBottom : moderateScale(10,0.6)
  },
  edit: {
    padding : 5,
    backgroundColor: Color.blue,
    // width: moderateScale(25, 0.3),
    // height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteContainer : { 
    width : moderateScale(70,0.6),
    height : moderateScale(70,0.6),
    borderRadius : moderateScale(35,0.6),
    backgroundColor : Color.themeColor,
    position : 'absolute' ,
    bottom : moderateScale(20,0.3),
    alignSelf : 'center',
    justifyContent :'center',
    // zIndex : -1
    // alignItems : 'center'

  },
});

