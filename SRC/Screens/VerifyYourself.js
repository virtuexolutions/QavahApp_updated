import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {mode} from 'native-base/lib/typescript/theme/tools';
import {moderateScale} from 'react-native-size-matters';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import CustomImage from '../Components/CustomImage';
import { Platform } from 'react-native';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerifyYourself = () => {
  const navigation = useNavigation()
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: VerifyYourself.js:22 ~ token:", token)
  const cameraRef = useRef();
  const [file, setFile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [baseData , setBasedata] = useState('')

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: 'on',
  };

  const sentImage = async(path)=>{
    // let formData = new FormData();
    RNFetchBlob.fs.readFile(path, 'base64')
  .then(async base64Data => {
    setBasedata(base64Data)
    // formData.append('file', base64Data); 
    const url = 'user/verification_image/app';
    let formData = new FormData();
    formData.append('file' ,base64Data);
    console.log("🚀 ~ file: VerifyYourself.js:37 ~ sentImage ~ formData:", formData )
    setIsLoading(true)
    const response = await Post(url , formData , apiHeader(token))
    setIsLoading(false)
    console.log('data')
    if(response?.data?.status){
      console.log('data ========= >' , response?.data)
      navigation.goBack()
    }
    else{
      Platform.OS == 'android'
      ? ToastAndroid.show(
          response?.data?.message,
          ToastAndroid.SHORT,
        )
      : alert(response?.data?.message);
      navigation.goBack()
    }
  })

  }

  // useEffect(() => {
  //   if(Object.keys(file).length > 0){
  //     sentImage()
  //   }
  // }, [file])
  
  
  if (device == null) return <ActivityIndicator />;


  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
      }}>
      <Camera
        ref={cameraRef}
        style={{
          width: '100%',
          height: '100%',
          // alignItems : 'center'
        }}
        device={device}
        isActive={true}
        photo={true}
      />
      {/* <CustomImage 
        source={{ uri: `data:image/jpeg;base64,${baseData}` }}
        style={{
          width : 60, 
          height : 60,
        }}
      /> */}
      <View
        // onPress={async () => {
        //   const photo = await cameraRef.current.takePhoto(takePhotoOptions);
        //   console.log(
        //     '🚀 ~ file: VerifyYourself.js:41 ~ onPress={async ~ photo:',
        //     photo?.path,
        //   );
        //   sentImage(photo?.path)
        //   const type = photo?.path.split('.');
        //   console.log(type[type.length - 1]);
        //   const name = photo?.path.split('/');
        //   console.log(name[name.length - 1]);
        //   setFile({uri: photo?.path, name: name[name.length - 1], type: type[type.length - 1]});
        // }}
        style={{
          position: 'absolute',
          bottom: moderateScale(50, 0.6),
          width: moderateScale(70, 0.6),
          height: moderateScale(70, 0.6),
          borderRadius: moderateScale(35, 0.6),
          backgroundColor: 'rgba(255,255,255,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
        onPress={async () => {
          setIsLoading(true)
          const photo = await cameraRef.current.takePhoto(takePhotoOptions);
          console.log(
            '🚀 ~ file: VerifyYourself.js:41 ~ onPress={async ~ photo:',
            photo?.path,
          );
          sentImage(photo?.path)
          // const type = photo?.path.split('.');
          // console.log(type[type.length - 1]);
          // const name = photo?.path.split('/');
          // console.log(name[name.length - 1]);
          // setFile({uri: photo?.path, name: name[name.length - 1], type: type[type.length - 1]});
        }}
          style={{
            width: moderateScale(60, 0.6),
            height: moderateScale(60, 0.6),
            borderRadius: moderateScale(30, 0.6),
            backgroundColor: '#EEEEEE',
          }}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyYourself;

const styles = StyleSheet.create({});
