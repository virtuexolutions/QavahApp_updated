import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, ScaleFade} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import navigationService from '../navigationService';
// import SortableGrid from 'react-native-sortable-grid';
import ImageContainer from '../Components/ImageContainer';
// import DraggableFlatList, {
//   ScaleDecorator,
// } from 'react-native-draggable-flatlist';
// import SortableGridView from 'react-native-sortable-gridview'
import {Easing} from 'react-native-reanimated';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Store/slices/common';

const ProfilePictures = props => {
  // const profileBody = props?.route?.params?.data;
  const token = useSelector(state=>state.authReducer.token)
  const user = useSelector(state=> state?.commonReducer?.userData)
  console.log("🚀 ~ file: ProfilePictures.js:37 ~ ProfilePictures ~ user:", user)
  // const token = props?.route?.params?.token;
  console.log("🚀 ~ file: ProfilePictures.js:37 ~ ProfilePictures ~ token:", token)
  // const user = props?.route?.params?.userData;
  // const steps = props?.route?.params?.steps;

  const dispatch = useDispatch();



  // console.log(
  //   '🚀 ~ file: ProfilePictures.js:31 ~ ProfilePictures ~ data:',
  //   profileBody,
  // );
  const [profilePicture, setProfilePicture] = useState({});
  // const [multiImages, setMultiImages] = useState([
  //   require('../Assets/Images/banner.jpg'),
  //   require('../Assets/Images/banner.jpg'),
  //   require('../Assets/Images/banner.jpg'),
  //   require('../Assets/Images/banner.jpg'),
  //   require('../Assets/Images/banner.jpg'),
  //   require('../Assets/Images/banner.jpg'),
  // ]);
  const [multiImages, setMultiImages] = useState([{},{},{},{},{},{}])
  // console.log("🚀 ~ file: ProfilePictures.js:54 ~ ProfilePictures ~ multiImages:", multiImages)
  // console.log(
  //   '🚀 ~ file: ProfilePictures.js:32 ~ ProfilePictures ~ multiImages:',
  //   multiImages,
  // );
  // const [updatedImages, setUpdatedImages] = useState([{}, {}, {}]);

  const [showMultiImageModal, setShowMultiImageModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [currentPattern, setCurrentPattern] = useState([]);
  const [scrollOff, setScrollOff] = useState(false);
  const [currentIndex, setIndex] = useState('');
  const [isloading, setisloading] = useState(false)

  // useEffect(() => {
  //   setUpdatedImages([]);
  //   if (multiImages) {
  //     setUpdatedImages(multiImages);
  //   }
  // }, [multiImages]);
  // const renderItem = ({ item, index, drag, isActive }) => {
  //   console.log("🚀 ~ file: ProfilePictures.js:50 ~ renderItem ~ drag:", drag)
  //   return (
  //     <ScaleDecorator>

  //     <TouchableOpacity style={{ backgroundColor: isActive ? 'gray' : 'blue' }} onLongPress={drag}>
  //       <Text style={{ padding: 20, fontSize: 18 , color : 'red' }}>{item.text}</Text>
  //     </TouchableOpacity>
  //     </ScaleDecorator>
  //   );
  // };
  const data = [
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
    {id: '4', text: 'Item 4'},
    {id: '5', text: 'Item 5'},
  ];
  const sendImages =async ()=>{
    const url = 'user/update-my-gallery-image'

    const formData = new FormData();
    formData.append('profileImages',profilePicture)
    multiImages.map((item,index)=>{

    Object.keys(item).length>0 && formData.append(`galleryImages[${index}]`,item)
   
  })
  console.log("🚀 ~ file: ProfilePictures.js:103 ~ sendImages ~ formData:", formData)
    setisloading(true)
    const response = await Post(url,formData, apiHeader(token) )
    setisloading(false)
    if(response != undefined){
      
      console.log("🚀 ~ file: ProfilePictures.js:95 ~ sendImages ~ response:", response?.data)
      
      dispatch(setUserData(response?.data?.user))
      
      navigationService.navigate('ProfileCreated')
       

      

    }
    
  }



  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showLeft={true} leftName={'left'} showRight={true} title={`step 3`} />

      <View
        // scrollEnabled={!scrollOff}
        // showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight * 0.95,
          backgroundColor: Color.white,
          alignItems: 'center',
        }}
        // contentContainerStyle={{
        //   paddingBottom: moderateScale(20, 0.6),
        //   alignItems: 'center',
        // }}
      >
        <CustomText style={styles.heading}>Profile Picture</CustomText>
        <View
          style={[
            styles.profileContainer,
            Object.keys(profilePicture).length <= 0 && {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          {Object.keys(profilePicture).length > 0 ? (
            <>
              <CustomImage
                source={{uri: profilePicture?.uri}}
                style={{width: '100%', height: '100%'}}
              />
              <TouchableOpacity
                style={styles.cross}
                onPress={() => {
                  setProfilePicture({});
                }}>
                <Icon
                  name={'close'}
                  as={AntDesign}
                  color={Color.themeBlack}
                  size={moderateScale(15, 0.3)}
                  onPress={() => {
                    setProfilePicture({});
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity activeOpacity={0.9} style={styles.circle}>
              <Icon
                name={'plus'}
                as={AntDesign}
                color={Color.white}
                size={moderateScale(20, 0.3)}
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            marginTop: moderateScale(15, 0.3),
            borderBottomWidth: 1,
            borderColor: Color.lightGrey,
            width: windowWidth * 0.85,
          }}
        />
        <CustomText
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          Add Gallery
        </CustomText>

        <View style={styles.imageView}>
          {/* <DraggableFlatList
            // horizontal={true}
            numColumns={3}
            data={multiImages}
            onDragEnd={({data}) => console.log(data)}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            // style={{
            //   maxHeight : windowHeight * 0.35,
            //   marginBottom : moderateScale(20,0.3)
            // }}
            // renderItem={renderItem}
            renderItem={({item, drag, isActive}) => {
              return (
                <ImageContainer
                  data={multiImages}
                  setData={setMultiImages}
                  item={item}
                  setIndex={setIndex}
                  index={index}
                  showMultiImageModal={showMultiImageModal}
                  setShowMultiImageModal={setShowMultiImageModal}
                  // onPress={drag}
                />
              );
            }}
          /> */}
          {/*  <CustomText onPress={drag}>hello</CustomText> */}
          {/* <ScaleDecorator> */}
          {multiImages.map((item, index) => {
            return (
              <ImageContainer
                data={multiImages}
                setData={setMultiImages}
                item={item}
                setIndex={setIndex}
                index={index}
                showMultiImageModal={showMultiImageModal}
                setShowMultiImageModal={setShowMultiImageModal}
                // onPress={drag}
              />
            );
          })}

          {/* </ScaleDecorator> */}

          {/* );
        }}

      
    /> */}
        </View>

        <CustomButton
          text={'Next'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
            sendImages()




            // navigationService.navigate('MoreAboutme', {
            //   data: profileBody,
            //   profileImages: profilePicture,
            //   galleryImages: multiImages,
            //   // profileImages: [
            //   //   {
            //   //     index: 0,
            //   //     url: 'http://127.0.0.1:8000/images/profile_images/qavah-16811261746433f31ed7383.png',
            //   //     name: 'qavah-16811261746433f31ed7383.png',
            //   //     thumbnails:
            //   //       'http://127.0.0.1:8000/images/profile_images/thumbnails/qavah-16811261746433f31ed7383.png',
            //   //     web_url: 'http://127.0.0.1:8000/images/profile_images',
            //   //   },
            //   // ],
            //   // galleryImages: [
            //   //   {
            //   //     index: 0,
            //   //     url: 'http://127.0.0.1:8000/images/gallery_Images/qavah-16811261786433f322397a5.png',
            //   //     name: 'qavah-16811261786433f322397a5.png',
            //   //     thumbnails:
            //   //       'http://127.0.0.1:8000/images/gallery_Images/thumbnails/qavah-16811261786433f322397a5.png',
            //   //     web_url: 'http://127.0.0.1:8000/images/gallery_Images',
            //   //     type: 'image',
            //   //   },
            //   //   {
            //   //     index: 1,
            //   //     url: 'http://127.0.0.1:8000/images/gallery_Images/qavah-16811261776433f321cf413.png',
            //   //     name: 'qavah-16811261776433f321cf413.png',
            //   //     thumbnails:
            //   //       'http://127.0.0.1:8000/images/gallery_Images/thumbnails/qavah-16811261776433f321cf413.png',
            //   //     web_url: 'http://127.0.0.1:8000/images/gallery_Images',
            //   //     type: 'image',
            //   //   },
            //   // ],
            // });
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(20, 0.3)}
          elevation
        />
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setProfilePicture}
        />
        <ImagePickerModal
          show={showMultiImageModal}
          setShow={setShowMultiImageModal}
          setMultiImages={setMultiImages}
          images={multiImages}
          index={currentIndex}
        />
      </View>
    </>
  );
};

export default ProfilePictures;

const styles = ScaledSheet.create({
  heading: {
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(16, 0.6),
    color: Color.themeBlack,
  },
  profileContainer: {
    marginTop: moderateScale(20, 0.3),
    width: windowWidth * 0.9,
    height: windowHeight * 0.22,
    borderRadius: moderateScale(10, 0.3),
    borderWidth: 1.5,
    borderColor: Color.themeColor,
    overflow: 'hidden',
  },
  circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    backgroundColor: Color.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: windowWidth * 0.95,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(15, 0.3),
    height: windowHeight * 0.35,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: (windowWidth * 0.85) / 3,
    height: windowHeight * 0.135,
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1.5,
    borderColor: Color.themeColor,
    marginVertical: moderateScale(10, 0.3),
    overflow: 'hidden',
    // paddingVertical : moderateScale(10,0.6)
    // backgroundColor: 'red',
  },
  touchContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.themeColor,
    borderTopLeftRadius: moderateScale(20, 0.6),
    borderBottomLeftRadius: moderateScale(20, 0.6),
    borderTopRightRadius: moderateScale(20, 0.6),
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
  },
  cross: {
    padding: moderateScale(2, 0.6),
    backgroundColor: Color.white,
    zIndex: 1,
    position: 'absolute',
    right: moderateScale(5, 0.3),
    top: moderateScale(5, 0.3),
  },
});

// const ImageContaner = ({ item,data, setData, index, key , path}) => {
//   const [showMultiImageModal, setShowMultiImageModal] = useState(false);
//   const [image, setImage] = useState({});
//   console.log("🚀 ~ file: ProfilePictures.js:272 ~ ImageContaner ~ image:", item , data )
//   const [remove, setRemove] = useState(false);

//   // useEffect(() => {
//   //   if (Object.keys(image).length > 0 && !remove) {
//   //     const tempArray = [...data];
//   //     tempArray[index] = image;
//   //     setData(tempArray);
//   //   }
//   // }, [image]);

//   return (
//     <View style={styles.imageContainer} key={key}>
//       {Object.keys(item).length > 0 ? (
//         <>
//           <Image
//             source={{uri: item?.uri}}
//             style={{width: '100%', height: '100%'}}
//           />
//           <TouchableOpacity
//             style={styles.cross}
//             onPress={() => {
//               setRemove(true);
//               // setImage({});
//               const tempArray = [...data];
//               tempArray[index] = {};
//               setData(tempArray);
//               setRemove(false);
//             }}>
//             <Icon
//               name={'close'}
//               as={AntDesign}
//               color={Color.themeBlack}
//               size={moderateScale(10, 0.3)}
//               onPress={() => {
//                 setRemove(true);
//                 // setImage({});
//                 const tempArray = [...data];
//                 tempArray[index] = {};
//                 setData(tempArray);
//                 setRemove(false);
//               }}
//             />
//           </TouchableOpacity>
//         </>
//       ) : (
//         <TouchableOpacity
//           style={styles.touchContainer}
//           onPress={() => {
//             setShowMultiImageModal(true);
//           }}>
//           <Icon
//             name={'plus'}
//             as={AntDesign}
//             color={Color.white}
//             size={moderateScale(15, 0.3)}
//             onPress={() => {
//               setShowMultiImageModal(true);
//             }}
//           />
//         </TouchableOpacity>
//       )}
//       <ImagePickerModal
//         show={showMultiImageModal}
//         setShow={setShowMultiImageModal}
//         // setFileObject={setImage}
//         setMultiImages={setData}
//         images={data}
//         index={index}
//         item={item}
//       />
//     </View>
//   );
// };
