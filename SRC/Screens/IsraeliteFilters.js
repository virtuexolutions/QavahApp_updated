import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ToastAndroid
} from 'react-native';
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
import {Alert, Icon, useDisclose} from 'native-base';
import navigationService from '../navigationService';
import CustomModal from '../Components/CustomModal';
import BottomSheetSelect from '../Components/BottomSheetSelect';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { setUserData } from '../Store/slices/common';

const IsraeliteFilters = props => {
  const edit = props?.route?.params?.edit;
  const twoStepsData = props?.route?.params?.twoStepsData
  const user = useSelector(state => state.commonReducer.userData)
  const token = useSelector(state => state.authReducer.token)
  console.log("🚀 ~ file: IsraeliteFilters.js:31 ~ IsraeliteFilters ~ user:", user)
  // console.log("🚀 ~ file: IsraeliteFilters.js:26 ~ IsraeliteFilters ~ twoStepsData:", twoStepsData?.step2?.galleryImages)
  // console.log(
  //   '🚀 ~ file: IsraeliteFilters.js:25 ~ IsraeliteFilters ~ edit:',
  //   edit,
  // );
  const focused = useIsFocused()
  const dispatch = useDispatch()
  const [believe, setBelieve] = useState(edit ? user?.iBelieveIAM : '');
  // console.log("🚀 ~ file: IsraeliteFilters.js:40 ~ IsraeliteFilters ~ believe:", believe)
  const [yearsInTruth, setYearsInTruth] = useState(edit ? user?.yearsInTruth : '');
  const [studyHabits, setStudyHabits] = useState(edit ? user?.studyHabits : '');
  const [spiritualValues, setSpiritualValues] = useState(
    edit ? user?.spiritualValue : '',
  );
  const [maritialBelief, setMaritialBelief] = useState(edit ? user?.maritalBeliefSystem : '');
  const [studyBible, setStudyBible] = useState(
    edit ? user?.studyBible : '',
  );
  const [spiritualBgc, setSpiritualBgc] = useState(
    edit ? user?.spiritualBackground : '',
  );
  const [anyAffiliation, setAnyAffiliation] = useState(edit ? user?.anyAffiliation : '');
  const [selectedIndex, setIndex] = useState('');
  const [israelitePractise , setIsraelitePractise] = useState(edit? user?.isrealite_practice_keeping == undefined ? [] : user?.isrealite_practice_keeping.map(item=>item?.options) :[]);
  // console.log("🚀 ~ file: IsraeliteFilters.js:55 ~ IsraeliteFilters ~ israelitePractise:", israelitePractise)
  const [modalVisible, setModalVisible] = useState(false);
  // const [type, setType] = useState('');
  const [passionModalVisible, setPassionModalVisible] = useState(false);
  const [passions, setPassions] = useState(edit? user?.passions == undefined ? [] : user?.passions.map(item=>item?.options) : []);
  console.log("🚀 ~ file: IsraeliteFilters.js:61 ~ IsraeliteFilters ~ passions:", passions)
  const [kingdomGifts, setKingDomGifts] = useState(edit? user?.kingdom_gifts == undefined ? [] : user?.kingdom_gifts.map(item=>item?.options) : []);
  console.log("🚀 ~ file: IsraeliteFilters.js:63 ~ IsraeliteFilters ~ kingdomGifts:", kingdomGifts)
  // console.log("🚀 ~ file: IsraeliteFilters.js:69 ~ checkPassion ~ kingdomGifts:", kingdomGifts)

  const [arrayForModal, setArrayForModal] = useState([]);
  const [type, setType] = useState('passions');
  const [isLoading , setIsLoading] = useState(false);


  


  const updateIsraelLiteInfo = async () => {
    const url = 'isralite_info';
    const body = {
      targetsUid: user?.id , 
      iBelieveIAm: believe,
      yearsInTruth:yearsInTruth ,
      StudyHabits: studyHabits,
      SpiritualValues: spiritualValues,
      MaritalBeliefSystem: maritialBelief,
      studyBible:studyBible,
      SpiritualBg: spiritualBgc,
      anyAffiliation:anyAffiliation,
      isrealite_practice_keeping:israelitePractise,
      Passions: passions,
      KingomGifts: kingdomGifts,
    };
    console.log("🚀 ~ file: IsraeliteFilters.js:91 ~ updateIsraelLiteInfo ~ body:", body)
    const response = await Post(url, body, apiHeader(token));
    console.log("🚀 ~ file: Israeliteinfo.js:58 ~ updateIsraelLiteInfo ~ response:", response?.data)

    if(response?.data?.status){
      

      dispatch(setUserData(response?.data?.user))
      Platform.OS == 'android' ? ToastAndroid.show('Profile Updated Successfully',ToastAndroid.SHORT) :
      Alert('Profile Updated Successfully')
      
    }
  };



  const checkPassion = ()=>{
    
    if(type == 'passions' ? passions.length>6 : kingdomGifts.length > 10){
      Platform.OS == 'android' ? 
      ToastAndroid.show(type == 'passions'? `Select atmost 6 ${type}`:`Select atmost 10 ${type}` ,ToastAndroid.SHORT) : 
      Alert.Alert(type == 'passions'? `Select atmost 6 ${type}`:`Select atmost 10 ${type}`)

    }
    else{
      setPassionModalVisible(false);
      
    }
  }
  
  const PassionsArray = [
    'singing',
    'Music',
    'Riding Horses',
    'Fitness /Exercising',
    'Bike Riding',
    'Boating',
    'Canoeing',
    'Camping',
    'Snowboarding',
    'Mountain Climbing',
    'Fishing',
    'Sports',
    'Traveling',
    'Road Trips',
    'RVing',
    'Exercise',
    'Going to the theater',
    'Dancing',
    'Cooking',
    'Doing Stuff Outdoors',
    'Hanging out with Family/Friends',
    'Hosting Cookouts',
    'Pets',
    'Dog Parks',
    'Photography',
    'DIY Projects',
    'Gardening',
    'Interior Design',
    'Fashion',
    'Home Improvement',
    'Jewellery Making',
    'Knitting',
    'Sewing',
    'Graphic Design',
    'Photo editing',
    'Couponing',
    'Meditation',
    'Swimming',
    'Skating',
    'Reading',
    'History Buff',
    'Jazz',
  ];
  const kingdomArray = [
    'House keeping',
    'cooking',
    'wellness planning',
    'i can teach meditation',
    'i am a herbalist',
    'sewing',
    'home repairs',
    'i can decorate',
    'technical skills',
    'how to start a business',
    'business skills',
    'effective communications',
    'how to use a computer',
    'emergency preparedness',
    'basic first aid',
    'i can deliver a baby',
    'i can stitch a wound',
    'survival skills',
    'sustainability efforts',
    'how to read a map',
    'basic car repair',
    'how to make fire',
    'land husbandry',
    'animal husbandry',
    'i can homestead',
    'i can build a house',
    'i know carpentry',
    'i am a handyman',
    'i know constructon',
    'i know how to grow stuff',
    'i can maintain a garden',
    'i am a good hunter',
    'i can catch fish',
  ];

  const IsraelitesPractise = [
    'None',
    'Sabbath days',
    'Holy Days',
    'Feast Days',
    'New moons',
    'Eating clean',
    'Set apart living',
    'Wearing fringes',
    'Lunar sabbath keeper',
    'Friday sundown to Sat sundown 24 hr sabbath',
    'Sat sun up to Sat sun down 12 hr sabbath',
  ];

  const believeArray = [
    'none',
    'i am a diaspora israelite',
    'grafted in',
    'i believe i am of the 12 tribes',
    'of the northern tribe',
    'of the southern tribe',
  ];

  const yearsInTruthArray = [
    '1 years',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    '6 years',
    '7 years',
    '8 years',
    '9 years',
    '10+ years',
  ];

  const spritualArray = ['none', 'messianic', 'non-messianic'];
  const maritialBeliefArray = [
    'none',
    'monogamy',
    'ploygyny',
    'still on the fence',
    'i believe in the ploygyny but dont practice it',
  ];

  const affiliationArray = [
    'no',
    'i study alone',
    'i am a member of an online org',
    'i am a member of a camp or group',
    'i go to an assembley',
    'i follow social i attend assembley',
    'i follow a ministry on social media',
    'ask me when we talk',
    'i am  seeking a fellowship',
  ];

  const studyHabitsArray = [
    'none',
    'torah only',
    'torah and tanakh',
    '66 only',
    '66 and apocrypha',
    '66 , apocrypha and any other considered (lost books)',
  ];

  const studyBibleArray = [
    'none',
    'king james version',
    '1611 king james a/Apocrypha',
    'ceapher',
    'scriptures',
    'i have a library',
    'book of rememberance',
    'ask me when we talk',
    'other',
  ];

  const SpiritualbackgroundArray = [
    'none',
    'i came out of the chiristian church',
    'i came out of islam',
    'i came out out the nation of islam',
    'i didnot believe in anything',
    'i came out of the pan-africanism',
    'i was orthodox jew',
    'ask me later',
  ];


  const completeBody ={
    ...twoStepsData ,
    step3 : {
     iBelieveIAM : believe ,
     maritalBeliefSystem : maritialBelief ,
     spiritualValue : spiritualValues , 
     studyHabits : studyHabits ,
     studyBible : studyBible ,
     anyAffiliation : anyAffiliation ,
     yearsInTruth : yearsInTruth ,
     isrealitePracticeKeeping : israelitePractise,
     spiritualBackground : spiritualBgc ,
     selectedkingdomGiftsTags : kingdomGifts ,
     selectedPassions : passions ,
    
    }
  }
    console.log("🚀 ~ file: IsraeliteFilters.js:236 ~ IsraeliteFilters ~ completeBody:", completeBody)

    const Registration =async()=>{
      const url = 'auth/register'
      // console.log( ' body ================== ? ? ?? ',completeBody)
      setIsLoading(true);
      const response = await Post(url , completeBody , apiHeader())
      setIsLoading(false);
      if(response != undefined){
        // console.log('User registered =-======>' , response?.data)
        Platform.OS == 'android' ?
        ToastAndroid.show('User Registered Successfully',ToastAndroid.SHORT) :
        alert('User Registered Successfully')
        
        navigationService.navigate('ProfileCreated',{
          token : response?.data?.token ,
          userData : response?.data?.user,
        })
      }
    }

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showLeft={true} leftName={'left'} title={'Israelite Filters'} />

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
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          Lifestyle
        </CustomText>

        <BottomSheetSelect
          title={'I Believe I Am*'}
          setData={setBelieve}
          data={believe}
          array={believeArray}
        />

        <BottomSheetSelect
          title={'Years In Truth?*'}
          setData={setYearsInTruth}
          data={yearsInTruth}
          array={yearsInTruthArray}
        />

        <BottomSheetSelect
          title={'Study Habits'}
          setData={setStudyHabits}
          data={studyHabits}
          array={studyHabitsArray}
        />

        <BottomSheetSelect
          title={'Spiritual Values*'}
          setData={setSpiritualValues}
          data={spiritualValues}
          array={spritualArray}
        />

        <BottomSheetSelect
          title={'Marital Belief System*'}
          setData={setMaritialBelief}
          data={maritialBelief}
          array={maritialBeliefArray}
        />

        <BottomSheetSelect
          title={'Study Bible'}
          setData={setStudyBible}
          data={studyBible}
          array={studyBibleArray}
        />

        <BottomSheetSelect
          title={'Spiritual Background'}
          setData={setSpiritualBgc}
          data={spiritualBgc}
          array={SpiritualbackgroundArray}
        />
        <BottomSheetSelect
          title={'Any Affiliations'}
          setData={setAnyAffiliation}
          data={anyAffiliation}
          array={affiliationArray}
        />

        <CustomText
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          Values
        </CustomText>
        <CustomText
          isBold
          style={[
            styles.heading,
            {
              marginTop: moderateScale(15, 0.3),
              width: windowWidth * 0.9,
              fontSize: moderateScale(12, 0.6),
            },
          ]}>
          Israelites Practice Keeping*
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.9,
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: moderateScale(20, 0.3),
            // justifyContent : 'space-between',
          }}>
          {IsraelitesPractise?.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  const data =[...israelitePractise]
                  !israelitePractise?.includes(item) ? setIsraelitePractise(prev=>[...prev ,item]): setIsraelitePractise(data.filter(value=> value != item)) 
                  // setIndex(index);
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: moderateScale(30, 0.3),
                  marginTop: moderateScale(8, 0.3),
                }}>
                <Icon
                  name={israelitePractise?.includes(item) ? 'square' : 'square-o'}
                  as={FontAwesome}
                  size={moderateScale(12, 0.6)}
                  color={
                    israelitePractise?.includes(item)
                      ? Color.themeColor
                      : Color.veryLightGray
                  }
                  onPress={() => {
                    !israelitePractise?.includes(item) && setIsraelitePractise(prev=>[...prev ,item])
                    // setIndex(index);
                  }}
                />
                <CustomText style={styles.text}>{item}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.row}>
          <View>
            <CustomText
              isBold
              style={[
                styles.heading,
                {
                  marginTop: moderateScale(35, 0.3),
                  // width: windowWidth * 0.9,
                  fontSize: moderateScale(12, 0.6),
                },
              ]}>
              Passions
            </CustomText>
            <CustomButton
              text={'Add Passions'}
              textColor={Color.white}
              width={windowWidth * 0.35}
              height={windowHeight * 0.05}
              fontSize={moderateScale(12, 0.6)}
              onPress={() => {
                setType('passions');
                setArrayForModal(PassionsArray);
                setPassionModalVisible(true);
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.3)}
              marginTop={moderateScale(10, 0.3)}
              elevation
            />
          </View>
          <View>
            <CustomText
              isBold
              style={[
                styles.heading,
                {
                  marginTop: moderateScale(35, 0.3),
                  // width: windowWidth * 0.9,
                  fontSize: moderateScale(12, 0.6),
                },
              ]}>
              kingdom Gifts
            </CustomText>
            <CustomButton
              text={'Add Kingdom gifts'}
              textColor={Color.white}
              fontSize={moderateScale(12, 0.6)}
              width={windowWidth * 0.35}
              height={windowHeight * 0.05}
              onPress={() => {
                setType('kingdom');
                setArrayForModal(kingdomArray);
                setPassionModalVisible(true);
                // navigationService.navigate('Passions');
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.3)}
              marginTop={moderateScale(10, 0.3)}
              elevation
            />
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.46,
                paddingLeft: moderateScale(10, 0.6),
                flexWrap: 'wrap',
              }}>
              {passions?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginRight: moderateScale(5, 0.3),
                      marginTop: moderateScale(8, 0.3),
                      paddingVertical: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(5, 0.6),
                      borderWidth: 1,
                      borderColor: Color.themeColor,
                      borderRadius: moderateScale(25, 0.6),
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        color: Color.themeColor,
                      }}>
                      {item}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.46,
                paddingLeft: moderateScale(10, 0.6),
                flexWrap: 'wrap',
              }}>
              {kingdomGifts?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginRight: moderateScale(5, 0.3),
                      marginTop: moderateScale(8, 0.3),
                      paddingVertical: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(5, 0.6),
                      borderWidth: 1,
                      borderColor: Color.themeColor,
                      borderRadius: moderateScale(25, 0.6),
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        color: Color.themeColor,
                      }}>
                      {item}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <CustomButton
          text={edit ? 'Save' : 'Submit'}
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.09}
          onPress={() => {
           edit ? updateIsraelLiteInfo()  : Registration() ;
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(30, 0.3)}
          elevation
          disabled={isLoading}
        />
      </ScrollView>
      <CustomModal
        isVisible={passionModalVisible}
        setIsVisible={setPassionModalVisible}
        container={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.9,
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}>
        <CustomText
          isBold
          style={[styles.heading, {marginTop: moderateScale(15, 0.3)}]}>
          {type == 'kingdom' ? 'Kingdom gifts' : 'Passions'}
        </CustomText>
        <CustomText
          style={[
            styles.text,
            {width: windowWidth * 0.7, marginTop: moderateScale(10, 0.3)},
          ]}>
          Let everyone know what you're passionate about by adding it to your
          profile.
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.8,
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: moderateScale(20, 0.3),
            // justifyContent : 'space-between',
          }}>
          {arrayForModal?.map((item, index) => {
            // console.log(
            //   type == 'kingdom'
            //     ? kingdomGifts?.includes(item)
            //     : passions?.includes(item),
            // );
            return (
              <TouchableOpacity
                onPress={() => {
                  var tempPassion = null;
                  var tempKingdom = null;
                  var index1 = null;
                  var index2 = null;

                  type == 'kingdom'
                    ? kingdomGifts?.includes(item)
                      ? ((tempKingdom = [...kingdomGifts]),
                        (index1 = kingdomGifts?.indexOf(item)),
                        tempKingdom?.splice(index1, 1),
                        setKingDomGifts(tempKingdom))
                      : kingdomGifts.length < 10 ? setKingDomGifts(prev => [...prev, item]) : alert('you can only select 10 passions')
                    : passions?.includes(item) 
                    ? ((tempPassion = [...passions]),
                      (index2 = passions?.indexOf(item)),
                      tempPassion?.splice(index2, 1),
                      setPassions(tempPassion))
                    : passions.length < 6 ? setPassions(prev => [...prev, item]) : alert('you can select only 6 passions!!');
                }}
                activeOpacity={0.8}
                key={index}
                style={{
                  marginRight: moderateScale(10, 0.3),
                  marginTop: moderateScale(8, 0.3),
                  paddingVertical: moderateScale(6, 0.6),
                  paddingHorizontal: moderateScale(11, 0.6),
                  borderWidth: 1,
                  borderColor: Color.themeColor,
                  borderRadius: moderateScale(25, 0.6),
                  backgroundColor:
                    kingdomGifts?.includes(item) || passions?.includes(item)
                      ? Color.themeColor
                      : Color.white,
                }}>
                <CustomText
                  style={[
                    styles.text,
                    {
                      color:
                        kingdomGifts?.includes(item) || passions?.includes(item)
                          ? Color.white
                          : Color.black,
                    },
                  ]}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <CustomButton
          text={'Finish'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          onPress={() => {
            checkPassion()
            
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(15, 0.3)}
          marginTop={moderateScale(30, 0.3)}
          elevation
        />
      </CustomModal>
    </>
  );
};

export default IsraeliteFilters;

const styles = ScaledSheet.create({
  heading: {
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(15, 0.6),
    color: Color.black,
  },
  text: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
    lineHeight: moderateScale(15, 0.6),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf : 'center',
    width: windowWidth * 0.9,
    // alignItems : 'center',
    // backgroundColor : 'red'
  },
});
