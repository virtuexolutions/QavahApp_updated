import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
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
import {Icon, useStyledSystemPropsResolver} from 'native-base';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {parse} from 'react-native-svg';
import UserCard from '../Components/UserCard';
import { useIsFocused } from '@react-navigation/native';

const SearchFilterScreen = () => {
  const token = useSelector(state => state.authReducer.token);
  // console.log('🚀 ~ file: SearchFilterScreen.js:31 ~ token:', token);
  const user = useSelector(state => state.commonReducer.userData);
  const isFocused = useIsFocused()
  console.log("🚀 ~ file: SearchFilterScreen.js:36 ~ user:", user?.id)

  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [distance, setDistance] = useState(20);
  console.log("🚀 ~ file: SearchFilterScreen.js:40 ~ distance:", Array.isArray(distance))

  const [age1, setAge] = useState(20);
  const [age2, setAge2] = useState(40);
  const [option, setOption] = useState('shortcuts');
  const [isLoading, setIsLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [people, setPeople] = useState([]);
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
  const [step, setSteps] = useState(1);
  const [selectedIndex, setIndex] = useState(0);
  const [summary, setSummary] = useState('');
  const [filtersOn, setFiltersOn] = useState([]);

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
      text: 'Exercise',
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
      text: 'does have children',
      array: [
        `yes - they don't live at home`,
        'yes - they sometimes live at home',
        'yes - they live at home',
        'No',
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
        'dogs',
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
        `sister's wife`,
        'friendship',
        'study partner',
        'My Poly Family Is Available For Courtship',
        'Concubine',
        'non-working wife to manage home affairs',
        'working wife',
        'husband - allows me to run business',
      ],
    },
  ];

  //step 4
  const livingArray = [
    {
      text: 'Living Situation',
      array:[
        'None',
        'Live alone',
        'Live with friends',
        'Live with family',
        'Live with kids',
        'Live with spouse',
        'Live as a sister wife',
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
      text: 'Marital status',
      array: [
        'Never Married',
        'currently seperated',
        'widowed',
        'divorced',
        'put away',
        'its complicated',
        'Poly Marriage',
      ],
    },
  ];
  const relocationArray = [
    {
      text: 'Willing to relocate',
      array: [
        'willing to relocate within my state',
        'Willing To Relocate Out Of State',
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
      text: 'Marital belief system',
      array: [
        'none',
        'monogamy',
        'polygyny',
        'still on the fence',
        `i believe in polygyny but don't practice it`,
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
        '1611 King James W/Apocrypha',
        'Cepher Bible',
        'Scriptures',
        'I Have A Library',
        'Book Of Remembrance',
        'Ask Me When We Talk',
        'Other',
      ],
    },
    {
      text: 'Affiliation',
      array: [
        'None',
        'No, I Study Alone',
        'i am a member of an online org',
        'i am a member of a camp or group',
        'i go to an assembley',
        'I Follow A Social I Attend An Assembly',
        'i follow a ministry on social media',
        'ask me when we talk',
        'i am  seeking a fellowship',
      ],
    },
    {
      text: 'years spent in truth',
      array: [
        'None',
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
        'i came out of the christian church',
        'i came out of islam',
        'I Came Out Of The Nation Of Islam',
        'i did not believe in anything',
        'I Came Out Of Pan - Africanism',
        'i was an orthodox jew',
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
        'Women Don’t Wear Pants',
        'Lunar sabbath keeper',
        'Friday sundown to Sat sundown 24 hr sabbath',
        'Sat sun up to Sat sun down 12 hr sabbath',
        'I Submit To My Spouse In Yah As Head',
        'I Service And Provide For My Household Buck Stops With Me',
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
        'effective communication',
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
        'I Can Home School Children',
        'Money Management Skills',
        'Avoid/Get Out Of Debt',
        'How To Use Coupons',
        'How To Balancing A Bank Account',
        'Money/Management Investing',
        'Prepare Taxes',
        'Effective Negotiation',
        'Self-Awareness Skills',
        'Relationship Skills',
        'Listening And Communicating',
        'Expressing Love',
        'Expressing Respect',
        'Emotional Intelligence',
        'Critical Thinking & Problem Solving',
        'Self- Discipline',
        'Exercise & Nutrition',
        'Self-Care Sleep & Hygiene',
        'Family Protection',
        'Community Law Enforcement',
        'I Know Gun Safety',
        'I Can Shoot And Teach Shooting',
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

  const heightArray = [{text: 'Height measurment', array: ['feets', 'inches']}];

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

  const getSearchResult = async () => {
    const url = 'seeking/seeking';
    setPeople([]);
  

    const dataBody = {
      uid: user?.id,
      filters: [
        ...body,
        {key: 'miles', values: Array.isArray(distance) ?  distance : [distance]},
        {key: 'age', values: [age1, age2]},
        {key: 'zipcode', values: ['11230']},
        {key: 'seeking', values: [user?.seeking]},
      ],
      from: 1,
      lat: user?.location?.latitude,
      lng: user?.location?.longitude,
    };

    // dataBody?.filters.find((item , index)=>item?.key == 'miles')
    // !user?.prefrences?.global && dataBody?.filters.push({key: 'miles', values: Array.isArray(distance) ?  distance : [distance]})

    // console.log(
    //   '🚀 ~ file: SearchFilterScreen.js:546 ~ getSearchResult ~ dataBody:',
    //   JSON.stringify(dataBody, null, 2),
    // );
    console.log('Databosy filters===========????', dataBody.filters);

    setIsLoading(true);
    const response = await Post(url, dataBody, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('Search result Response', response?.data?.peoples);
      console.log('Search result Response', response?.data);

      // console.log('Search result Response', response?.data?.peoples);
      setPeople(response?.data?.peoples);
    }
  };

  useEffect(() => {
    getSearchResult()
  }, [isFocused])
  

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
        {/* <TextInputWithTitle
          iconName={'location'}
          iconType={Ionicons}
          titleText={'location'}
          secureText={false}
          placeholder={'location'}
    value={location}
          viewHeight={0.06}
          viewWidth={0.9}
          inputWidth={0.86}
          border={1}
          borderColor={Color.veryLightGray}
          disable
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(5, 0.3)}
        /> */}
        {
          !user?.prefrences?.global &&
          
          <Silder
          single={true}
          setState1={setDistance}
          state1={distance}
          title={'Distance'}
          min={0}
          max={200}
          multi={false}
          setScrollEnabled={setScrollEnabled}
          />
        }
        <Silder
          single={false}
          multi={true}
          setState1={setAge}
          state1={age1}
          setState2={setAge2}
          state2={age2}
          title={'Age'}
          min={0}
          max={120}
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
                          // console.log('map index i=====>>>>',i)
                          const index = filtersOn.indexOf(item?.text);
                          console.log(
                            '🚀 ~ file: SearchFilterScreen.js:1209 ~ {item?.array.map ~ index:',
                            index,
                          );
                          console.log(
                            '🚀 ~ file: SearchFilterScreen.js:1203 ~ x:',
                            x,
                          );

                          let tempData = [];
                          console.log(
                            '🚀 ~ file: SearchFilterScreen.js:1220 ~ {item?.array.map ~ index:',
                            index,
                          );
                          if (index > -1) {
                            if (!body[index].values.includes(x)) {
                              setBody(
                                prev => [...prev],
                                body[index].values.push(x),
                              );
                            } else {
                              if (body[index].values.length > 1) {
                                tempData = body[index].values.filter(
                                  (d, i) => d != x,
                                );
                                console.log(
                                  '🚀 ~ file: SearchFilterScreen.js:1312 ~ {item?.array.map ~ tempData:',
                                  tempData,
                                );
                                setBody(
                                  prev => [...prev],
                                  (body[index].values = tempData),
                                );
                              } else {
                                const updated = [...body];
                                updated.splice(index, 1);

                                setBody(updated);
                                const newData = filtersOn.filter(
                                  (filterItem, index) => {
                                    return filterItem != item?.text;
                                  },
                                );
                                setFiltersOn(newData);
                              }
                            }
                          } else {
                            setBody(prev => [
                              ...prev,
                              {key: item.text, values: [x]},
                            ]);
                            setFiltersOn(prev => [...prev, item.text]);
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
                          name={
                            filtersOn.indexOf(item?.text) > -1
                              ? body[
                                  filtersOn.indexOf(item?.text)
                                ]?.values.includes(x)
                                ? 'square'
                                : 'square-o'
                              : 'square-o'
                          }
                          as={FontAwesome}
                          size={moderateScale(12, 0.6)}
                          color={
                            filtersOn.indexOf(item?.text) > -1
                              ? body[
                                  filtersOn.indexOf(item?.text)
                                ]?.values.includes(x)
                                ? Color.themeColor
                                : Color.veryLightGray
                              : Color.veryLightGray
                          }
                          disabled={true}
                          onPress={() => {
                            console.log(
                              'data index jey --------------------    ',
                              item.text,
                            );
                            const index = body.findIndex((data, index) =>
                              data.hasOwnProperty(item.text),
                            );
                            console.log(
                              '🚀 ~ file: SearchFilterScreen.js:1220 ~ {item?.array.map ~ index:',
                              index,
                            );
                            if (index > -1) {
                              setBody(
                                prev => [...prev],
                                body[index].values.push(x),
                              );
                              // setFiltersOn(prev=>[...prev] ,(item.text)])
                            } else {
                              setBody(prev => [
                                ...prev,
                                {key: item.text, values: [x]},
                              ]);
                              setFiltersOn(prev => [...prev, item.text]);
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
              getSearchResult();
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
              // justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
              // backgroundColor : 'red'
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
          <View style={{width: windowWidth * 0.6}}>
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 10,
                // width: windowWidth * 0.4,
              }}
              style={{}}>
              {filtersOn.map((item, index) => {
                return (
                  <CustomText
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: 'white',
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      backgroundColor: '#ACACAC',
                      borderRadius: moderateScale(10, 0.6),
                      marginRight: moderateScale(5, 0.3),
                    }}>
                    {item}
                  </CustomText>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              right: 5,
              // top : 1
            }}>
            <CustomText
              onPress={() => {
                setBody([]), setFiltersOn([]);
              }}
              style={{
                fontSize: moderateScale(11, 0.6),
                color: Color.themeColor,
              }}>
              clear all
            </CustomText>
          </TouchableOpacity>
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
            {`${people?.length} matches`}
          </CustomText>
          {/* <CustomText
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
          </CustomText> */}
        </View>

        {people?.length > 0 && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingHorizontal: moderateScale(10, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            activeOpacity={0.8}
            onPress={() => {
              navigationService.navigate('Seeking', {data: people});
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
        )}
        <FlatList
          data={people.slice(0,3)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{
            width: windowWidth,
            backgroundColor: 'white',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: moderateScale(20, 0.6),
          }}
          renderItem={({item, index}) => {
            return (
              <UserCard
                favoredYouPost={people}
                setFavoredYouPost={setPeople}
                item={item}
                style={[
                  index % 2 == 0
                    ? {
                        marginRight: moderateScale(10, 0.3),
                      }
                    : {
                        marginLeft: moderateScale(10, 0.3),
                      },
                  {},
                ]}
              />
            );
          }}
          // ListHeaderComponent={() => {
          //   return (
          //     people?.length > 0 && (
          //       <TextInputWithTitle
          //         iconName={'search'}
          //         iconType={FontAwesome}
          //         titleText={`Search Match Request`}
          //         secureText={false}
          //         placeholder={`Search Match Request`}
          //         setText={setSearch}
          //         value={search}
          //         viewHeight={0.06}
          //         viewWidth={0.85}
          //         inputWidth={0.83}
          //         borderColor={Color.veryLightGray}
          //         backgroundColor={'transparent'}
          //         placeholderColor={Color.themeLightGray}
          //         borderRadius={moderateScale(0, 0.3)}
          //         marginTop={moderateScale(20, 0.3)}
          //         marginBottom={moderateScale(20, 0.3)}
          //         border={1}
          //         color={Color.veryLightGray}
          //       />
          //     )
          //   );
          // }}
          ListEmptyComponent={() => {
            return (
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
            );
          }}
        />
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
            console.log(low);
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
