import {Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import UserCard from '../Components/UserCard';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';
import NullDataComponent from '../Components/NullDataComponent';
import navigationService from '../navigationService';

const Wishlist = () => {
  const user = useSelector(state=>state.commonReducer.userData)
  // console.log("🚀 ~ file: Wishlist.js:21 ~ Wishlist ~ user:", user)
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState('Favored You');
  const token = useSelector(state => state.authReducer.token);
  const [favoredYouPost, setFavoredYouPost] = useState([]);
  const [youFavoured, setYouFavoured] = useState([]);
  const [hideBtns, sethideBtns] = useState(false)

  const getFavouredYouPosts = async id => {
    // console.log('get favoured posts');
    const url = 'favoured/who-likes-me';
    const response = await Post(url, {}, apiHeader(token));
    if (response != undefined) {
      console.log('response data=>>>>>>>>>>>>>>', response?.data?.peoples);
      setFavoredYouPost(response?.data?.peoples);
    }
  };
  const getYouFavouredPosts = async id => {
    // console.log('get you favoured posts');
    const url = 'favoured/who-i-like';
    const response = await Post(url, {}, apiHeader(token));
    if (response != undefined) {
      console.log('response data=>>>>>>>>>>>>>>', response?.data?.peoples);
      setYouFavoured(response?.data?.peoples);
    }
  };
  useEffect(() => {
    if(selected == 'Favored You'){

      getFavouredYouPosts();
    }
    else if(selected == 'You Favored'){
      
      getYouFavouredPosts();
    }
  }, [isFocused ,selected]);

  const [photoCards, setPhotoCards] = useState([
    {
      name: 'Austin Wade',
      age: 22,
      photo: require('../Assets/Images/banner1.jpg'),
      key: 'caseex6qfO4TPMYyhorner',
      images: [
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
      ],
    },
    {
      name: 'Aleksander Borzenets',
      age: 28,
      photo: require('../Assets/Images/banner.jpg'),
      key: 'ozda-XbeP0k',
      images: [
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
      ],
    },
    {
      name: 'Don Delfin Espino',
      age: 29,
      photo: require('../Assets/Images/banner2.jpg'),
      key: 'nBywXevf_jE-',
      images: [
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
      ],
    },
    {
      name: 'Eduardo Dutra',
      age: 30,
      photo: require('../Assets/Images/banner3.jpg'),
      key: 'ZHy0efLnzVc',
      images: [
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
      ],
    },
    {
      name: 'Wesley Tingey',
      age: 21,
      photo: require('../Assets/Images/banner.jpg'),
      key: 'TvPCUHten1o',
      images: [
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
      ],
    },
    {
      name: 'Gift Habeshaw',
      age: 26,
      photo: require('../Assets/Images/banner1.jpg'),
      key: 'dlbiYGwEe9U',
      images: [
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
      ],
    },
    {
      name: 'Henri Pham',
      age: 30,
      photo: require('../Assets/Images/banner2.jpg'),
      key: 'Ml4tr2WO7JE',
      images: [
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
      ],
    },
    {
      name: 'Nico Marks',
      age: 24,
      photo: require('../Assets/Images/banner3.jpg'),
      key: 'mFcc5b_t74Q',
      images: [
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
      ],
    },
    {
      name: 'Sirio',
      age: 28,
      photo: require('../Assets/Images/banner.jpg'),
      key: "Ty4f_NOFO60'",
      images: [
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
      ],
    },
    {
      name: 'Teymi Townsend',
      age: 30,
      photo: require('../Assets/Images/banner2.jpg'),
      key: "AvLHH8qYbAI'",
      images: [
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
      ],
    },
    {
      name: 'Caique Silva',
      age: 20,
      photo: require('../Assets/Images/banner3.jpg'),
      key: "3ujVzg9i2EI'",
      images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
      ],
    },
    {
      name: 'David Yanutenama',
      age: 21,
      photo: require('../Assets/Images/banner1.jpg'),
      key: "5AoO7dBurMw'",
      images: [
        require('../Assets/Images/image1.jpeg'),
        require('../Assets/Images/image2.jpeg'),
        require('../Assets/Images/image3.jpeg'),
        require('../Assets/Images/image4.jpeg'),
        require('../Assets/Images/image5.jpeg'),
      ],
    },
  ]);

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
        title={'Favored'}
        leftName={'menufold'}
        leftType={AntDesign}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />

      <View style={styles.selector}>
        <CustomText
          onPress={() => {
            setSelected('Favored You');
            sethideBtns(false);
            // getFavouredYouPosts();
          }}
          style={[
            styles.text,
            selected == 'Favored You' && {
              backgroundColor: Color.themeColor,
              color: Color.white,
              borderRadius: moderateScale(10, 0.6),
            },
          ]}>
          Favored You
        </CustomText>
        <CustomText
          onPress={() => {
            setSelected('You Favored');
            sethideBtns(true)
          }}
          style={[
            styles.text,
            selected == 'You Favored' && {
              backgroundColor: Color.themeColor,
              color: Color.white,
              borderRadius: moderateScale(10, 0.6),
            },
          ]}>
          You Favored
        </CustomText>
      </View>
     
        <FlatList
          data={selected=='Favored You'?favoredYouPost:youFavoured}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{
            width: windowWidth,
            // backgroundColor : 'red'
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          renderItem={({item, index}) => {
            return (
              <UserCard
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
                favoredYouPost ={selected=='Favored You'?favoredYouPost:youFavoured}
                setFavoredYouPost ={setFavoredYouPost}
                onPress={() => {navigationService.navigate('UserDetail', {
                  item: item,
                  fromSearch: true,
                });
                }
              }
                hideBtns={hideBtns}
              />
            );
          }
        }
        ListEmptyComponent={() => {
          return (
          <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor : 'red'
          }}>
          <NullDataComponent />
        </View>
          )
        }}
        />
      
    </>
  );
};

export default Wishlist;

const styles = ScaledSheet.create({
  selector: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(30, 0.6),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#70707030',
  },
  text: {
    width: '50%',
    textAlign: 'center',
    fontSize: moderateScale(11, 0.6),
    color: Color.themeColor,
    paddingVertical: moderateScale(10, 0.6),
  },
});
