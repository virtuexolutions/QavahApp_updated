import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
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

const MoreAboutme = (props) => {
  const edit = props?.route?.params?.edit ;
  const profileImages = props?.route?.params?.profileImages ;
  const data = props?.route?.params?.data ;
  const galleryImages = props?.route?.params?.galleryImages ;
  console.log("🚀 ~ file: MoreAboutme.js:23 ~ MoreAboutme ~ galleryImages:", galleryImages)
  // console.log("🚀 ~ file: MoreAboutme.js:21 ~ MoreAboutme ~ profileImages:", profileImages , data , galleryImages)

  console.log("🚀 ~ file: MoreAboutme.js:19 ~ MoreAboutme ~ edit:", edit)
  const [description, setDescription] = useState(edit ? 'lorem ipsum dolor is a dummy text ' : '');
  const [maritialStatus, setMaritialStatus] = useState(edit ? 'currently seperated' :'');
  const [livingSituation, setLivingSituation] = useState(edit ? 'live with friends' :'');
  const [doYouHaveChildren, setDoYouHaveChildren] = useState(edit ? 'yes, they sometime live at home' :'');
  const [doYouwantChildren, setdoYouWantChildren] = useState(edit ? 'not sure' :'');
  const [seeking, setSeeking] = useState(edit ? 'community' : '');
  const [bodyType, setBodyType] = useState(edit ? 'athelitic' : '');
  const [oftenExersice , setOftenExersice] = useState(edit ? 'i exersice 1-2 times per week' : '');
  const [havePets , setHavePets] = useState(edit ? 'cats' :'');
  const [doYouDrink , setDoYouDrink] = useState(edit ? 'dont drink' :'');
  const [doYouSmoke , setDoYouSmoke] = useState(edit ? 'occasionally smoke' :'');
  const [employmentStatus , setEmploymentStatus] = useState(edit ? 'retired' : '');
  const [relocate , setRelocate] = useState(edit ? 'not willing to relocate' : '');

  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [isVisible, setIsVisible] = useState(edit ? false : true);
  const [ref, setRef] = useState(null);

  const body = {
    ...data , 
    step2 : {
      profileImages  : profileImages ,
      galleryImages : galleryImages,
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
  console.log("🚀 ~ file: MoreAboutme.js:46 ~ MoreAboutme ~ body:", body)




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
      <Header showLeft={true} leftName={'left'} title={'More About Me'} />

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
          maxLength={600}
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
            description?.length == 600 && {color: Color.green},
          ]}>
          {`Characters : ${description?.length}/600`}
        </CustomText>
        <CustomText style={[styles.text, {marginTop: moderateScale(15, 0.3)}]}>
          {
            <CustomText
              isBold
              style={{fontSize: moderateScale(13, 0.3), color: Color.red}}>
              *Attention:
            </CustomText>
          }{' '}
          These inquiries aren't designed to offend rather, they are meant to be
          inclusive of the entire Israelite family. These questions identify the
          doctrine that drive wedges between the scattered members of the
          Israelite family. They must also be named so that you may screen out
          any doctrine you don't adhere to.
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
         
       
       
       
       
       
       
       
        <CustomButton
          text={ edit ?  'Save' : 'Next'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
            edit ? props?.navigation?.goBack() : navigationService.navigate('IsraeliteFilters', {twoStepsData : body});
          }}
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
            These inquiries aren't designed to offend rather, they are meant to
            be inclusive of the entire Israelite family. These questions
            identify the doctrine that drive wedges between the scattered
            members of the Israelite family. They must also be named so that you
            may screen out any doctrine you don't adhere to.
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


