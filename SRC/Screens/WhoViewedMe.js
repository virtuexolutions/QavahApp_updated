import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import UserCard from '../Components/UserCard';
import CustomModal from '../Components/CustomModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import NullDataComponent from '../Components/NullDataComponent';

const WhoViewedMe = () => {
  const token = useSelector(State => State.authReducer.token);
  // console.log("🚀 ~ file: WhoViewedMe.js:21 ~ WhoViewedMe ~ token:", token)
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [whoViewedMe, setWhoViewedMe] = useState([]);
  console.log(
    '🚀 ~ file: WhoViewedMe.js:239 ~ WhoViewedMe ~ whoViewedMe:',
    whoViewedMe,
  );

  const getFavouredYouPosts = async id => {
    // console.log('get favoured posts');
    const url = 'favoured/someone-viewed-my-profile';
    const response = await Post(url, {}, apiHeader(token));
    if (response != undefined) {
      //  console.log('response data=>>>>>>>>>>>>>>', response?.data);
      setWhoViewedMe(response?.data?.peoples);
    }
  };

  useEffect(() => {
    getFavouredYouPosts();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        showLeft={true}
        rightName={'menufold'}
        title={'Who Viewed Me?'}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      />

      <FlatList
        data={whoViewedMe}
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
              item={item}
              setFavoredYouPost={setWhoViewedMe}
              favoredYouPost={whoViewedMe}
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
        ListHeaderComponent={() => {
          return (
            whoViewedMe.length > 0 && (
              <TextInputWithTitle
                iconName={'search'}
                iconType={FontAwesome}
                titleText={`Search Match Request`}
                secureText={false}
                placeholder={`Search Match Request`}
                setText={setSearch}
                value={search}
                viewHeight={0.06}
                viewWidth={0.85}
                inputWidth={0.83}
                borderColor={Color.veryLightGray}
                backgroundColor={'transparent'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(0, 0.3)}
                marginTop={moderateScale(20, 0.3)}
                marginBottom={moderateScale(20, 0.3)}
                border={1}
                color={Color.veryLightGray}
              />
            )
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              
              }}>
              <Icon
                name={'eye'}
                as={FontAwesome}
                color={Color.black}
                size={moderateScale(30, 0.3)}
              />

              <CustomText
                style={{
                  fontSize: moderateScale(18, 0.6),
                  textAlign:'center',
                  color:Color.black
                }}>
                No Views Yet
              </CustomText>
              <CustomText
                numberOfLines={2}
                style={{
                  width:windowWidth*0.75,
                  paddingVertical:moderateScale(5,0.6),
                  fontSize: moderateScale(12, 0.6),
                  textAlign:'center',
                  color:Color.veryLightGray
                }}>
                Give a Little, get a little send some like to people who've
                caught your eye
              </CustomText>
            </View>
          );
        }}
      />
    </>
  );
};

export default WhoViewedMe;

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
