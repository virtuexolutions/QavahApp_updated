import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const SearchFilterScreen = () => {
  const token = useSelector((state)=> state.authReducer.token)
  console.log("🚀 ~ file: SearchFilterScreen.js:31 ~ token:", token)
  const user = useSelector((state)=>state.commonReducer.userData)
  console.log("🚀 ~ file: SearchFilterScreen.js:32 ~ user:", user)
  
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [distance, setDistance] = useState(0);
  console.log(
    '🚀 ~ file: SearchFilterScreen.js:16 ~ SearchFilterScreen ~ distance:',
    distance,
  );
  const [age1, setAge] = useState(0);
  console.log("🚀 ~ file: SearchFilterScreen.js:38 ~ age1:", age1)
  const [age2, setAge2] = useState(0);
  const [option, setOption] = useState('shortcuts');
  console.log("🚀 ~ file: SearchFilterScreen.js:41 ~ option:", option)
  const [isLoading, setIsLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  // const [visibility , setVisibility] = useState('');
  // const [keywords , setKeywords] = useState('');
  // const [routine , setRoutine] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');
  // const [visibility , setVisibility] = useState('');

  const [body, setBody] = useState([]);
  console.log(
    '🚀 ~ file: SearchFilterScreen.js:61 ~ SearchFilterScreen ~ body:',
    body,
  );

  const [nestedOptions, setNestedOptions] = useState([
    (Visibility = true),
    (Keywords = false),
    (Routine = true),
    (Drink = false),
    (Children = false),
    (Pets = false),
    (Seeking = false),
    (Bodytype = true),
    (Height = false),
    (Living = true),
    (employment = false),
    (Martial = false),
    (Relocation = false),
    (LifeStyle = true),
    (Values = false),
  ]);
  const [innerOptions, setInnerOptions] = useState([]);
  // console.log(
  //   '🚀 ~ file: SearchFilterScreen.js:57 ~ SearchFilterScreen ~ innerOptions:',
  //   innerOptions,
  // );
  const [step, setSteps] = useState(1);
  // console.log(
  //   '🚀 ~ file: SearchFilterScreen.js:55 ~ SearchFilterScreen ~ step:',
  //   step,
  // );
  const [selectedIndex, setIndex] = useState(0);
  // console.log(
  //   '🚀 ~ file: SearchFilterScreen.js:64 ~ SearchFilterScreen ~ selectedIndex:',
  //   selectedIndex,
  // );
  const [summary, setSummary] = useState('');

  //step 1
  const VisibilityArray = [
    {
      text: 'Visibility',
      array: [
        'Have Photos',
        'Are Online Now',
        'Within last 24 hours',
        'Within last 30 days',
      ],
    },
  ];
  const KeywordsArray = ['search by summary'];

  //step2
  const RoutineArray = [
    {
      text: 'Routine',
      array: [
        'I don’t exercise regularly',
        'I exercise 1-2 times per week',
        'I exercise 3-4 times per week',
        'I exercise 5 or more times per week',
        'No answer',
      ],
    },
  ];
  const DrinkArray = [
    {
      text: 'Drink',
      array: [
        'dont drink',
        'i drink socially',
        'on special occasions',
        'i will drink by myself',
      ],
    },
    {
      text: 'Smoke',
      array: [
        'i dont smoke',
        'occasionally smoke',
        'only cannabis',
        'only cigars',
      ],
    },
  ];
  const ChildrenArray = [
    {
      text: 'want children',
      array: ['yes', 'not sure', 'no'],
    },
    {
      text: 'have children',
      array: [
        'yes-they dont live at home',
        'yes-they sometimes live at home',
        'yes-they live at home',
      ],
    },
  ];
  const PetsArray = [
    {
      text: 'Pets',
      array: [
        'birds',
        'cats',
        'exotic pets',
        'dog',
        'fish',
        'horses',
        'no',
        'i am allergic',
        'others',
      ],
    },
  ];
  const seekingArray = [
    {
      text: 'Seeking',
      array: [
        'spouse',
        'community',
        'sister wife',
        'friendship',
        'study partner',
        'my polygyny family is availble for courtship',
        'biblical concubine',
        'non-working wife to manage home affairs',
        'working wife',
        'husband allows me to run business',
      ],
    },
  ];

  //step 4
  const livingArray = [
    {
      text: 'Living',
      array: [
        'None',
        'Live alone',
        'Live with friends',
        'Live with family',
        'Live with kids',
        'Live with spouse',
        'Live as sister wife',
        'Other',
        'Prefer not to say',
      ],
    },
  ];
  const employmentArray = [
    {
      text: 'Employment',
      array: [
        'None',
        'Full time',
        'Part time',
        'Self employed',
        'Retired',
        'Homemaker',
        'Not employed',
        'Prefer not to say',
      ],
    },
  ];
  const maritialArray = [
    {
      text: 'Maritial status',
      array: [
        'Never Married',
        'currently seperated',
        'widowed',
        'divorced',
        'put away',
        'its complicated',
        'biblical ploygyny marriage',
      ],
    },
  ];
  const relocationArray = [
    {
      text: 'Willing to relocate',
      array: [
        'willing to relocate within state',
        'willing to relocate outside the state',
        'not willing to relocate',
        'not sure about relocating',
      ],
    },
  ];

  //step 5

  const lifestyleArray = [
    {
      text: 'Believe',
      array: [
        'none',
        'I am a diaspora israelite',
        'Grafted in',
        'I believe i am of the 12 tribes',
        'Of the northern tribe',
        'Of the southern tribe',
      ],
    },
    {
      text: 'Maritial belief system',
      array: [
        'none',
        'monogamy',
        'polygyny',
        'still on the fence',
        'i believe in polygyny but dont practice it',
      ],
    },
    {
      text: 'Spiritual value',
      array: ['none', 'messianic', 'non-messianic'],
    },
    {
      text: 'study habits',
      array: [
        'none',
        'torah only',
        'torah and tanakh',
        '66 only',
        '66 and apocrypha',
        '66 , apocrypha and any other considered (lost books)',
      ],
    },
    {
      text: 'study bible',
      array: [
        'none',
        'king james version',
        '1611 king james a/Apocrypha',
        'ceapher',
        'scriptures',
        'i have a library',
        'book of rememberance',
        'ask me when we talk',
        'other',
      ],
    },
    {
      text: 'Affiliation',
      array: [
        'no',
        'i study alone',
        'i am a member of an online org',
        'i am a member of a camp or group',
        'i go to an assembley',
        'i follow social i attend assembley',
        'i follow a ministry on social media',
        'ask me when we talk',
        'i am  seeking a fellowship',
      ],
    },
    {
      text: 'years spent in truth',
      array: [
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
      ],
    },
    {
      text: 'spiritual background',
      array: [
        'none',
        'i came out of the chiristian church',
        'i came out of islam',
        'i came out out the nation of islam',
        'i didnot believe in anything',
        'i came out of the pan-africanism',
        'i was orthodox jew',
        'ask me later',
      ],
    },
  ];

  const valuesArray = [
    {
      text: 'Practice keeping',
      array: [
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
      ],
    },
    {
      text: 'Have kingdom gifts',
      array: [
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
      ],
    },
    {
      text: 'Have Passions',
      array: [
        'Singing',
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
      ],
    },
  ];

  //step3

  const bodytype = [
    {
      text: 'Body type',
      array: [
        'Petite',
        'Slim',
        'Athletic',
        'Average',
        'Few extra pounds',
        'Full Figured',
        'Large and lovely',
        'Big teddy bear',
      ],
    },
  ];

  const heightArray = [{text: 'Height measurment', array: ['foots', 'inches']}];

  useEffect(() => {
    if (nestedOptions[0] && step == 1) {
      setInnerOptions(VisibilityArray);
    }
    if (nestedOptions[1] && step == 1) {
      setInnerOptions(KeywordsArray);
    }
    if (nestedOptions[2] && step == 2) {
      setInnerOptions(RoutineArray);
    }
    if (nestedOptions[3] && step == 2) {
      setInnerOptions(DrinkArray);
    }
    if (nestedOptions[4] && step == 2) {
      setInnerOptions(ChildrenArray);
    }
    if (nestedOptions[5] && step == 2) {
      setInnerOptions(PetsArray);
    }
    if (nestedOptions[6] && step == 2) {
      setInnerOptions(seekingArray);
    }
    if (nestedOptions[7] && step == 3) {
      setInnerOptions(bodytype);
    }
    if (nestedOptions[8] && step == 3) {
      setInnerOptions(heightArray);
    }
    if (nestedOptions[9] && step == 4) {
      setInnerOptions(livingArray);
    }
    if (nestedOptions[10] && step == 4) {
      setInnerOptions(employmentArray);
    }
    if (nestedOptions[11] && step == 4) {
      setInnerOptions(maritialArray);
    }
    if (nestedOptions[12] && step == 4) {
      setInnerOptions(relocationArray);
    }
    if (nestedOptions[13] && step == 5) {
      setInnerOptions(lifestyleArray);
    }
    if (nestedOptions[14] && step == 5) {
      setInnerOptions(valuesArray);
    }
  }, [nestedOptions, step]);

  
  const getSearchResult =async()=>{
    const url = 'seeking/seeking';
    // console.log('submit clicked')
    // return console.log("location in the search screen",location);

    body.push(
      {age:[age1,age2]},
      {miles:distance},
      {zipcode:'11230'})

    const dataBody = {
      uid : user?.uid,
      filters:[...body],
      from: 1,
      lat:user?.latitude,
      lng:user?.longitude,
    }
    console.log('Databosy filters===========????',dataBody.filters)
    // const oldBody = {
    //   uid :'',
    //   filters:[{ 
    //     seeking:'woman'
    //   },{
    //     age:[20,30]
    //   },
    //   {
    //     miles:15
    //   },
    //   { 
    //     zipcode:'12121'
    //   },
    //   {
    //     doYouWantMoreChildren:'No'
    //   },
    //   {
    //      doYouHaveChildren: 'Yes- they live at home'
    //   },
    //   {
    //     doYouDrink : `Don't drink`
    //   },
    //   {
    //     doYouSmoke: `I don't smoke`
    //   },
    //   {
    //     howOftenDoYouExercise : 'no answer'
    //   },
    //   {
    //     havePets:'Fish'
    //   },
    //   {
    //     relationshipIAmSeeking:'Frienship'
    //   },
    //   {
    //     bodyType : 'Average'
    //   },
    //   {
    //     height : ['6','10']
    //   },
    //   {
    //     maritalStatus : 'Never married'
    //   },
    //   {
    //     livingSituation : 'Live with friends'
    //   },
    //   {
    //     willingToRelocate : 'Not sure about relocating'
    //   },
    //   {
    //     iBelieveIAM : 'Grafted in'
    //   },
    //   {
    //     studyBible : 'King james Version'
    //   },
    //   {
    //     studyHabits : '66 only'
    //   },
    //   {
    //     spiritualValue : 'Non-Messianic'
    //   },
    //   {
    //     maritalBeliefSystem : 'Polygyny'
    //   },
    //   {
    //     yearsInTruth : '3 year'
    //   },
    //   {
    //     anyAffiliation : 'i am a member of an online org'
    //   },
    //   {
    //     spiritualBackground : 'i did not believe in anything'
    //   },

    //   ],
    //   from : 1,
    //   lat : '40.5689',
    //   lag : '-73.96',


    // }
    const response = await Post(url, dataBody,apiHeader(token));
    if(response != undefined){

      console.log('Search result Response', response);
      
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
        showRight={true}
        rightName={'bell'}
        title={'Seeking Filter'}
        leftName={'menufold'}
        leftType={AntDesign}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight,
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}>
        <TextInputWithTitle
          iconName={'location'}
          iconType={Ionicons}
          titleText={'location'}
          secureText={false}
          placeholder={'location'}
          // setText={setComment}
          // rightIcon
          value={location}
          viewHeight={0.06}
          viewWidth={0.9}
          inputWidth={0.86}
          border={1}
          borderColor={Color.veryLightGray}
          disable
          // backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(5, 0.3)}
        />
        <Silder
          single={true}
          setState1={setDistance}
          state1={distance}
          title={'Distance'}
          min={0}
          max={50}
          multi={false}
          setScrollEnabled={setScrollEnabled}
        />
        <Silder
          single={false}
          multi={true}
          setState1={setAge}
          state1={age1}
          setState2={setAge2}
          state2={age2}
          title={'Age'}
          min={0}
          max={50}
          setScrollEnabled={setScrollEnabled}
        />
        <View style={styles.container}>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {[
              {
                name: 'arrow-top-right-bold-box-outline',
                type: MaterialCommunityIcons,
                text: 'shortcuts',
              },
              {
                name: 'like1',
                type: AntDesign,
                text: 'interests',
              },
              {name: 'search1', type: AntDesign, text: 'Looks'},
              {name: 'user-circle-o', type: FontAwesome, text: 'Personal'},
              {
                name: 'border-style',
                type: MaterialCommunityIcons,
                text: 'Israelite Lifestyle',
              },
            ].map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSteps(index + 1);
                    setOption(item?.text);
                  }}
                  key={index}
                  activeOpacity={0.9}
                  style={[
                    styles.options,
                    item?.text == option && {backgroundColor: Color.themeColor},
                  ]}>
                  <Icon
                    name={item?.name}
                    as={item?.type}
                    color={
                      item?.text == option ? Color.white : Color.themeColor
                    }
                    size={moderateScale(15, 0.6)}
                  />
                  <CustomText
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color:
                        item?.text == option ? Color.white : Color.themeColor,
                    }}>
                    {item?.text}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderColor: Color.themeColor,
              borderWidth: 0.6,
              borderRadius: moderateScale(20, 0.6),
              marginTop: moderateScale(30, 0.3),
            }}>
            {option == 'shortcuts' ? (
              <>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[0] = true), (nestedOptions[1] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[0] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[0] == true && {color: Color.white},
                    ]}>
                    Visibility
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[1] = true), (nestedOptions[0] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[1] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[1] == true && {color: Color.white},
                    ]}>
                    Keywords
                  </CustomText>
                </TouchableOpacity>
              </>
            ) : option == 'interests' ? (
              <>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[2] = true),
                      (nestedOptions[3] = false),
                      (nestedOptions[4] = false),
                      (nestedOptions[5] = false),
                      (nestedOptions[6] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[2] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[2] == true && {color: Color.white},
                    ]}>
                    Routine
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[3] = true),
                      (nestedOptions[2] = false),
                      (nestedOptions[4] = false),
                      (nestedOptions[5] = false),
                      (nestedOptions[6] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[3] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[3] == true && {color: Color.white},
                    ]}>
                    Drink/Smoke
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[4] = true),
                      (nestedOptions[2] = false),
                      (nestedOptions[3] = false),
                      (nestedOptions[5] = false),
                      (nestedOptions[6] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[4] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[4] == true && {color: Color.white},
                    ]}>
                    Children
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[5] = true),
                      (nestedOptions[2] = false),
                      (nestedOptions[4] = false),
                      (nestedOptions[3] = false),
                      (nestedOptions[6] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[5] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[5] == true && {color: Color.white},
                    ]}>
                    Pets
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[6] = true),
                      (nestedOptions[2] = false),
                      (nestedOptions[4] = false),
                      (nestedOptions[5] = false),
                      (nestedOptions[3] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[6] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[6] == true && {color: Color.white},
                    ]}>
                    Seeking
                  </CustomText>
                </TouchableOpacity>
              </>
            ) : option == 'Looks' ? (
              <>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[7] = true), (nestedOptions[8] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[7] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[7] == true && {color: Color.white},
                    ]}>
                    Body Types
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[8] = true), (nestedOptions[7] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[8] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[8] == true && {color: Color.white},
                    ]}>
                    Height
                  </CustomText>
                </TouchableOpacity>
              </>
            ) : option == 'Personal' ? (
              <>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[9] = true),
                      (nestedOptions[10] = false),
                      (nestedOptions[11] = false),
                      (nestedOptions[12] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[9] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[9] == true && {color: Color.white},
                    ]}>
                    Living
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[10] = true),
                      (nestedOptions[9] = false),
                      (nestedOptions[11] = false),
                      (nestedOptions[12] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[10] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[10] == true && {color: Color.white},
                    ]}>
                    Employment
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[11] = true),
                      (nestedOptions[9] = false),
                      (nestedOptions[10] = false),
                      (nestedOptions[12] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[11] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[11] == true && {color: Color.white},
                    ]}>
                    Maritial
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[12] = true),
                      (nestedOptions[9] = false),
                      (nestedOptions[10] = false),
                      (nestedOptions[11] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[12] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[12] == true && {color: Color.white},
                    ]}>
                    Relocation
                  </CustomText>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[13] = true), (nestedOptions[14] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[13] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[13] == true && {color: Color.white},
                    ]}>
                    Lifestyle
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => {
                    setNestedOptions(
                      prev => [...prev],
                      ((nestedOptions[14] = true), (nestedOptions[13] = false)),
                    );
                  }}
                  style={[
                    {
                      // marginTop : moderateScale(20,0.3),
                      width: windowWidth * 0.17,
                      height: windowHeight * 0.04,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor : 'green'
                    },
                    nestedOptions[14] == true && {
                      borderRadius: moderateScale(20, 0.6),
                      backgroundColor: Color.themeColor,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <CustomText
                    style={[
                      styles.text,
                      nestedOptions[14] == true && {color: Color.white},
                    ]}>
                    Values
                  </CustomText>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.row}>
            {innerOptions.map((item, index) => {
              return item == 'search by summary' ? (
                <TextInputWithTitle
                  titleText={item}
                  secureText={false}
                  placeholder={item}
                  setText={setSummary}
                  rightIcon
                  value={summary}
                  viewHeight={0.06}
                  viewWidth={0.9}
                  inputWidth={0.86}
                  border={1}
                  borderColor={Color.veryLightGray}
                  // backgroundColor={'#FFFFFF'}
                  marginTop={moderateScale(15, 0.3)}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(5, 0.3)}
                />
              ) : (
                <>
                  <CustomText
                    style={{
                      width: windowWidth * 0.95,
                      marginVertical: moderateScale(10, 0.3),
                    }}>
                    {item?.text}
                  </CustomText>
                  {item?.array.map((x, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                        
                          console.log( 'data index jey --------------------    ',item.text)
                          const index = body.findIndex((data , index)=>data.hasOwnProperty(item.text));
                          console.log("🚀 ~ file: SearchFilterScreen.js:1220 ~ {item?.array.map ~ index:", index)
                          if (index > -1) {
                            setBody(prev => [...prev],(body[index] = {[item.text]: x}));
                          } else {
                            setBody(prev => [...prev, {[item.text]: x}]);
                          }
                        }}
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: moderateScale(30, 0.3),
                          marginTop: moderateScale(8, 0.3),
                        }}>
                        <Icon
                          name={body.findIndex((data , index)=>data[item.text] == x) > -1  ? 'square' : 'square-o'}
                          as={FontAwesome}
                          size={moderateScale(12, 0.6)}
                          color={
                            body.findIndex((data , index)=>data[item.text] == x) > -1 
                              ? Color.themeColor
                              : Color.veryLightGray
                          }
                          onPress={() => {
                            console.log( 'data index jey --------------------    ',item.text)
                          const index = body.findIndex((data , index)=>data.hasOwnProperty(item.text));
                          console.log("🚀 ~ file: SearchFilterScreen.js:1220 ~ {item?.array.map ~ index:", index)
                          if (index > -1) {
                            setBody(prev => [...prev],(body[index] = {[item.text]: x}));
                          } else {
                            setBody(prev => [...prev, {[item.text]: x}]);
                          }
                          }}
                        />
                        <CustomText style={styles.text}>{x}</CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </>
              );
            })}
          </View>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.25}
            height={windowHeight * 0.05}
            marginTop={moderateScale(40, 0.3)}
            onPress={() => {
              setIsLoading(true);
              getSearchResult()
              setIsLoading(false)
            }}
            fontSize={moderateScale(12, 0.6)}
            bgColor={Color.themeColor}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(5, 0.3)}
          />
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
            },
          ]}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            Filters on:
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.themeColor,
            }}>
            clear all
          </CustomText>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
            },
          ]}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            0 Matches
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.themeColor,
              borderWidth: 1,
              borderColor: Color.themeColor,
              borderRadius: moderateScale(5, 0.6),
              paddingHorizontal: moderateScale(10, 0.6),
              paddingVertical: moderateScale(4, 0.6),
            }}>
            infinite scroll
          </CustomText>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            paddingHorizontal: moderateScale(10, 0.6),
            marginTop: moderateScale(10, 0.3),
          }}
          activeOpacity={0.8}
          onPress={() => {
            navigationService.navigate('Seeking');
          }}>
          <CustomText
            style={{
              color: Color.themeColor,
              fontSize: moderateScale(10, 0.6),
            }}>
            See All
          </CustomText>
          <Icon
            name={'arrow-forward'}
            as={Ionicons}
            size={moderateScale(15, 0.6)}
            color={Color.themeColor}
            style={{
              marginLeft: moderateScale(5, 0.3),
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: windowWidth * 0.95,
            paddingVertical: moderateScale(20, 0.6),
            // backgroundColor : 'red',
            alignItems: 'center',
          }}>
          <Icon
            name={'heart'}
            as={AntDesign}
            size={moderateScale(35, 0.6)}
            color={Color.black}
          />
          <CustomText
            // isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              color: Color.black,
            }}>
            Could Not Found Users
          </CustomText>
          <CustomText
            // isBold
            style={{
              fontSize: moderateScale(10, 0.6),
              color: Color.black,
            }}>
            Try using different settings and filters
          </CustomText>
        </View>
      </ScrollView>
    </>
  );
};

export default SearchFilterScreen;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.95,
    // height: windowHeight * 0.4,
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignItems: 'center',
    paddingVertical: moderateScale(20, 0.6),
    marginVertical: moderateScale(7, 0.3),
  },
  options: {
    width: (windowWidth * 0.8) / 5,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.themeColor,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.6),
  },
  text: {
    // width: windowWidth * 0.17,
    textAlign: 'center',
    fontSize: moderateScale(10, 0.6),
    color: Color.themeColor,
    // backgroundColor: Color.red,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '95%',
    flexWrap: 'wrap',
    marginTop: moderateScale(10, 0.3),
  },
});

const Silder = ({
  title,
  single,
  multi,
  state1,
  setState1,
  state2,
  setState2,
  min,
  max,
  setScrollEnabled,
}) => {
  // console.log(
  //   '🚀 ~ file: SearchFilterScreen.js:89 ~ Silder ~ multi:',
  //   multi,
  //   single,
  // );

  return (
    <View
      style={{
        width: windowWidth * 0.9,
        marginTop: moderateScale(10, 0.3),
        // backgroundColor : 'red'
      }}>
      <CustomText
        style={{
          fontSize: moderateScale(13, 0.6),
          color: Color.black,
        }}>
        {title}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          marginRight: moderateScale(10, 0.3),
          alignItems: 'center',
          width: windowWidth * 0.9,
          justifyContent: 'space-between',
          marginLeft: moderateScale(5, 0.3),
        }}>
        <MultiSlider
          isMarkersSeparated={true}
          enabledTwo={multi}
          trackStyle={{
            backgroundColor: Color.veryLightGray,
            height: moderateScale(5, 0.6),
            borderRadius: moderateScale(20, 0.6),
            // width: windowWidth * 0.6
          }}
          // unselectedStyle={{
          //   width : windowWidth * 0.8
          // }}
          sliderLength={windowWidth * 0.8}
          onValuesChangeStart={() => {
            setScrollEnabled(false);
          }}
          onValuesChangeFinish={() => {
            setScrollEnabled(true);
          }}
          selectedStyle={{
            backgroundColor: Color.themeColor,
          }}
          markerStyle={{
            backgroundColor: Color.themeColor,
            textAlign: 'center',
          }}
          markerContainerStyle={{
            height: moderateScale(50, 0.6),
          }}
          min={min}
          max={max}
          values={!multi ? [state1] : [state1, state2]}
          onValuesChange={low => {
            // console.log(low);
            single ? setState1(low) : (setState1(low[0]), setState2(low[1]));
          }}
          containerStyle={{
            // backgroundColor : 'red',
            width: windowWidth * 0.8,
          }}
        />
        <CustomText
          style={{
            marginLeft: moderateScale(10, 0.3),
            color: Color.veryLightGray,
            fontSize: moderateScale(11, 0.6),
          }}>
          {multi ? `${state1}-${state2}` : `${state1} ML`}
        </CustomText>
      </View>
    </View>
  );
};
