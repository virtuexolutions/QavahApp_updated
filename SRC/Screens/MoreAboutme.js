import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import CustomModal from '../Components/CustomModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetSelect from '../Components/BottomSheetSelect';
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setMoreAboutMeRegister, setUserData } from '../Store/slices/common';
import { useNavigation } from '@react-navigation/native';

const MoreAboutme = (props) => {
  const edit = props?.route?.params?.edit ;
  // const profileImages = props?.route?.params?.profileImages ;
  // console.log("🚀 ~ file: MoreAboutme.js:24 ~ MoreAboutme ~ profileImages:", [profileImages])
  const data = props?.route?.params?.data ;
  const steps = props?.route?.params?.steps;
  // const signup = props?.route?.params?.signup;
  // const galleryImages = props?.route?.params?.galleryImages ;
  // console.log("🚀 ~ file: MoreAboutme.js:27 ~ MoreAboutme ~ galleryImages:", galleryImages)
  const user = useSelector(state=>state.commonReducer?.userData)
  const token = useSelector(state => state.authReducer.token)
  const moreAboutme = useSelector(state => state?.commonReducer?.moreAboutMeRegister)
  console.log("🚀 ~ file: MoreAboutme.js:34 ~ MoreAboutme ~ moreAboutme:", moreAboutme)



  const dispatch = useDispatch();


  // console.log("🚀 ~ file: MoreAboutme.js:26 ~ MoreAboutme ~ user:", JSON.stringify(user , null ,2 ))
  // console.log("🚀 ~ file: MoreAboutme.js:23 ~ MoreAboutme ~ galleryImages:", galleryImages)
  // console.log("🚀 ~ file: MoreAboutme.js:21 ~ MoreAboutme ~ profileImages:", profileImages , data , galleryImages)

  // console.log("🚀 ~ file: MoreAboutme.js:19 ~ MoreAboutme ~ edit:", edit)
  const [description, setDescription] = useState(edit ? user?.aboutMe : moreAboutme?.step2 ?moreAboutme?.step2?.aboutMe : '' );
  const [maritialStatus, setMaritialStatus] = useState(edit ? user?.maritalStatus : moreAboutme?.step2 ?moreAboutme?.step2?.maritalStatus :'');
  const [livingSituation, setLivingSituation] = useState(edit ? user?.livingSituation:moreAboutme?.step2 ?moreAboutme?.step2?.livingSituation :'');
  const [doYouHaveChildren, setDoYouHaveChildren] = useState(edit ? user?.doYouHaveChildren:moreAboutme?.step2 ?moreAboutme?.step2?.doYouHaveChildren :'');
  const [doYouwantChildren, setdoYouWantChildren] = useState(edit ? user?.doYouWantMoreChildren:moreAboutme?.step2 ?moreAboutme?.step2?.doYouWantMoreChildren  :'');
  const [seeking, setSeeking] = useState(edit ? user?.relationshipIAmSeeking : moreAboutme?.step2 ?moreAboutme?.step2?.relationshipIAmSeeking : '');
  const [bodyType, setBodyType] = useState(edit ? user?.bodyType: moreAboutme?.step2 ?moreAboutme?.step2?.bodyType  : '');
  const [oftenExersice , setOftenExersice] = useState(edit ? user?.howOftenDoYouExercise: moreAboutme?.step2 ?moreAboutme?.step2?.howOftenDoYouExercise  : '');
  const [havePets , setHavePets] = useState(edit ? user?.havePets : moreAboutme?.step2 ?moreAboutme?.step2?.havePets :'');
  const [doYouDrink , setDoYouDrink] = useState(edit ? user?.doYouDrink: moreAboutme?.step2 ?moreAboutme?.step2?.doYouDrink  :'');
  const [doYouSmoke , setDoYouSmoke] = useState(edit ? user?.doYouSmoke : moreAboutme?.step2 ?moreAboutme?.step2?.doYouSmoke :'');
  const [employmentStatus , setEmploymentStatus] = useState(edit ? user?.employmentStatus: moreAboutme?.step2 ?moreAboutme?.step2?.employmentStatus  : '');
  const [relocate , setRelocate] = useState(edit ? user?.willingToRelocate: moreAboutme?.step2 ?moreAboutme?.step2?.willingToRelocate  : '');

  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [isVisible, setIsVisible] = useState(edit ? false : true);
  const [ref, setRef] = useState(null);
  const navigation = useNavigation()
  // const formData = new FormData()
  // formData.append('profileImages',profileImages)
  // formData.append('galleryImages', JSON.stringify(galleryImages));
  
  // for(let key of galleryImages){
  // }
  // galleryImages.map((item,index)=>{
  //   Object.keys(item).length>0 && formData.append(`galleryImages[${index}]`,item)
   
  // })
  
  
  // console.log("🚀 ~ file: MoreAboutme.js:58 ~ MoreAboutme ~ formData:", JSON.stringify(formData,null, 2))

  const body = {
    ...data , 
    step2 : {
      // profileImages  : JSON.stringify(profileImages,null,2),
      // galleryImages : JSON.stringify(galleryImages,null,2),
      
      aboutMe : description,
      maritalStatus : maritialStatus ,
      livingSituation : livingSituation ,
      doYouHaveChildren : doYouHaveChildren ,
      doYouWantMoreChildren : doYouwantChildren,
      relationshipIAmSeeking : seeking,
      bodyType : bodyType,
      doYouDrink : doYouDrink,
      doYouSmoke : doYouSmoke ,
      employmentStatus : employmentStatus,
      willingToRelocate : relocate ,
      havePets : havePets ,
      howOftenDoYouExercise : oftenExersice ,
      // havePetsOthers :  'xyz'
    }
  }
  // console.log("🚀 ~ file: MoreAboutme.js:46 ~ MoreAboutme ~ body:", body)



  const updateMoreAboutMe = async ()=>{
    const url = 'more_about_me';
    const body ={
      targetsUid:user?.id,
      AboutMe : description,
      MaritialStatus: maritialStatus,
      LivingSituation: livingSituation,
      DoyouhaveChildren: doYouHaveChildren,
      DoyouWantMoreChildren: doYouwantChildren,
      RelationshipYouAreSeeking: seeking,
      BodyType: bodyType,
      HowOftenDoyouExercise: oftenExersice,
      HavePets: havePets,
      DoYouDrink: doYouDrink,
      DoYouSmoke: doYouSmoke,
      EmploymentStatus: employmentStatus ,
      WillingToRelocate: relocate,
      
      }
    // console.log("🚀 ~ file: MoreAboutme.js:96 ~ updateMoreAboutMe ~ body:", body)
    
      const response = await Post(url,body, apiHeader(token));

    if(response?.data?.status){

      // console.log("🚀 ~ file: MoreAboutme.js:95 ~ updateMoreAboutMe ~ response:", response?.data?.user)
      dispatch(setUserData(response?.data?.user))
      Platform.OS == 'android' ? ToastAndroid.show('Profile Updated Successfully',ToastAndroid.SHORT) :
      Alert('Profile Updated Successfully')
      
    }

  }

  const leftPress =()=>{
    dispatch(setMoreAboutMeRegister(body))
    navigation.goBack();
  }




  useEffect(() => {
   !edit &&  setIsVisible(true);
  }, []);

  const MaritialArray = [
    'Never Married',
    'currently seperated',
    'widowed',
    'divorced',
    'put away',
    'its complicated',
    'biblical ploygyny marriage',
  ];
  const LivingSituation = [
    'None',
    'Live alone',
    'live with friends',
    'live with family',
    'live with spouse',
    'live as sister wife',
    'live with kids',
    'Others',
    'prefer not to say',
  ];
  const childrenArray = [
    'yes, they dont live at home',
    'yes, they sometime live at home',
    'yes, they  live at home',
    'none',
  ];

  const moreChildArray = ['no', 'yes', 'not sure'];
  const seekingArray = [
    'spouse',
    'community',
    'sister wife',
    'friendship',
    'study partner',
    'my polygyny family is availble for courtship',
    'biblical concubine',
  ];

  const bodyTypeArray = [
    'petite',
    'slim',
    'athelitic',
    'average',
    'few extra pound',
    'full figured',
    'large and lovely',
    'big teddy bear',
  ];
  const ExersiceArray = [
    'i dont exersice regularly',
    'i exersice 1-2 times per week',
    'i exersice 3-4 times per week',
    'i exersice 5 or more times per week',
    'no answer',
  ];
  const HavePetsArray = [
    'birds',
    'cats',
    'exotic pets',
    'dog',
    'fish',
    'horses',
    'no',
    'i am allergic',
    'others',
  ];
  const doyouDrinkArray = [
    'dont drink',
    'i drink socially',
    'on special occasions',
    'i will drink by myself',
  ];
  const doyouSmokeArray = [
    'i dont',
    'occasionally smoke',
    'on special occasions',
    'i will drink by myself',
  ];

  const employmentArray = [
    'none',
    'full time',
    'part time',
    'retired',
    'self employed',
    'homemaker',
    'not employed',
    'prefer not to say',
  ];

  const willingToRelocateArray = [
    'willing to relocate within state',
    'willing to relocate outside the state',
    'not willing to relocate',
    'not sure about relocating',
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showLeft={true} leftName={'left'} title={!edit? `Step ${steps}`: 'More About Me' }  leftPress={leftPress}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}>
        <CustomText
          isBold
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          About Me
        </CustomText>
        <TextInputWithTitle
          maxLength={2000}
          titleText={'You can express your thoughts and requests in this area.'}
          secureText={false}
          placeholder={
            'You can express your thoughts and requests in this area.'
          }
          setText={setDescription}
          value={description}
          viewHeight={0.22}
          viewWidth={0.9}
          inputWidth={0.86}
          border={1}
          borderColor={Color.veryLightGray}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(5, 0.3)}
          color={Color.red}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(5, 0.3)}
          multiline
        />
        <CustomText
          style={[
            styles.text,
            description?.length == 2000 && {color: Color.green},
          ]}>
          {`Characters : ${description?.length}/2000`}
        </CustomText>
        <CustomText style={[styles.text, {marginTop: moderateScale(15, 0.3)}]}>
          {
            <CustomText
              isBold
              style={{fontSize: moderateScale(13, 0.3), color: Color.red}}>
              *Attention:
            </CustomText>
          }{' '}
          These inquiries are intended to foster inclusivity within the entire Israelite family and not to cause offense.
          The purpose is to identify the doctrinal differences that may exist among the scattered members of the Israelite
          family. By naming these questions, you have the opportunity to screen out any doctrines that you do not adhere 
          to, promoting a more aligned and harmonious engagement among like-minded Israelites.
        </CustomText>
        
        <BottomSheetSelect 
          title={'maritial status'}
          setData={setMaritialStatus}
          data={maritialStatus}
          array={MaritialArray}
        />
         <BottomSheetSelect 
          title={'Living Situation'}
          setData={setLivingSituation}
          data={livingSituation}
          array={LivingSituation}
        />
        
          <BottomSheetSelect 
          title={'Do you have children'}
          setData={setDoYouHaveChildren}
          data={doYouHaveChildren}
          array={childrenArray}
        />
        
        <BottomSheetSelect 
          title={'do you want more children'}
          setData={setdoYouWantChildren}
          data={doYouwantChildren}
          array={moreChildArray}
        />
        
         <BottomSheetSelect 
          title={'relationship you are seeking'}
          setData={setSeeking}
          data={seeking}
          array={seekingArray}
        />
        
         <BottomSheetSelect 
          title={'Body Type'}
          setData={setBodyType}
          data={bodyType}
          array={bodyTypeArray}
        />
       
        <BottomSheetSelect 
          title={'how often do you exersice'}
          setData={setOftenExersice}
          data={oftenExersice}
          array={ExersiceArray}
        />
          
         <BottomSheetSelect 
          title={'Have pets'}
          setData={setHavePets}
          data={havePets}
          array={HavePetsArray}
        />
          
           <BottomSheetSelect 
          title={'Do you drink'}
          setData={setDoYouDrink}
          data={doYouDrink}
          array={doyouDrinkArray}
        />
          
          <BottomSheetSelect 
          title={'Do you smoke'}
          setData={setDoYouSmoke}
          data={doYouSmoke}
          array={doyouSmokeArray}
        />
         
          <BottomSheetSelect 
          title={'Employment status'}
          setData={setEmploymentStatus}
          data={employmentStatus}
          array={employmentArray}
        />
         
         <BottomSheetSelect 
          title={'Willing to relocate'}
          setData={setRelocate}
          data={relocate}
          array={willingToRelocateArray}
        />
         
       
       
       
       
       
       {
        console.log(body.step2)
       }
       
        <CustomButton
          text={ edit ?  'Save' : 'Next'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
            if(edit){
            updateMoreAboutMe()}
            else{
              console.log('in the else ')
              for(let key in body.step2){
                if(body.step2[key] == ''){
                  console.log(body.step2[key])
                  return alert("Please fill all the fields")
                  
                }
              } 
              dispatch(setMoreAboutMeRegister(body))
              navigationService.navigate('IsraeliteFilters', {twoStepsData : body, steps: steps});
          }}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(30, 0.3)}
          elevation
        />
         <Modal  
      isVisible={isVisible}
      hasBackdrop={true}
      // onBackdropPress={()=>{
      //   setIsVisible(false)
      // }}
      style={{
        justifyContent :  'center',
        alignItems : 'center',
      }}
      >
        <View style={{
            width: windowWidth * 0.8,
            // minHeight: windowHeight * 0.3,
            borderRadius: moderateScale(20, 0.6),
            backgroundColor: 'white',
            paddingBottom: moderateScale(20, 0.6),
            alignItems: 'center',
            overflow: 'hidden',
            paddingTop : moderateScale(10,0.6)
        }}>

     
          <CustomText
            isBold
            style={{fontSize: moderateScale(23, 0.3), color: Color.red}}>
            *Attention
          </CustomText>
          <CustomText
          // isBold
            style={[
              styles.text,
              {
                textAlign : 'center',
                marginTop: moderateScale(15, 0.3),
                width: windowWidth * 0.7,
                fontSize: moderateScale(12, 0.6),
                lineHeight: moderateScale(20, 0.3),
              },
            ]}>
            These inquiries are intended to foster inclusivity within the entire Israelite 
            family and not to cause offense. The purpose is to identify the doctrinal differences 
            that may exist among the scattered members of the Israelite family. By naming these 
            questions, you have the opportunity to screen out any doctrines that you do not 
            adhere to, promoting a more aligned and harmonious engagement among like-minded Israelites.
          </CustomText>
          <CustomButton
          text={ 'i agree'}
          textColor={Color.white}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          onPress={() => {
            setIsVisible(false)
          }}
          bgColor={Color.themeColor}
          // borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(20, 0.3)}
          elevation
        />
              </View>
        </Modal>
        
      </ScrollView>
    </>
  );
};

export default MoreAboutme;

const styles = ScaledSheet.create({
  heading: {
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(15, 0.6),
    color: Color.black,
    width: windowWidth * 0.9,
  },
  text: {
    fontSize: moderateScale(9, 0.6),
    color: Color.black,
    width: windowWidth * 0.9,
    lineHeight: moderateScale(15, 0.6),
  },
});


