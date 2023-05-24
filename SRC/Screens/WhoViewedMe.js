import {Text, View , FlatList , TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import UserCard from '../Components/UserCard';
import CustomModal from '../Components/CustomModal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const WhoViewedMe = () => {
const [isVisible , setIsVisible] = useState(false);  
const [seekingType , setSeekingType] = useState('Seeking')
const [search , setSearch] = useState('')
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
        rightName={'menufold'}
        title={'Who Viewed Me?'}
        leftName={'left'}
        textStyle={{
          color: Color.veryLightGray,
        }}
      
      />



       <FlatList 
      data={photoCards}
      numColumns = {2}
      showsVerticalScrollIndicator = {false}
      style={{
        width : windowWidth ,
        backgroundColor : 'white'

      }}
      contentContainerStyle={{
        alignItems : 'center',
        paddingTop : moderateScale(20,0.6)
      }}
      renderItem={({item , index})=>{
        return(
          <UserCard 
          item={item}
          style={[
            index % 2 == 0 ?{
            marginRight :   moderateScale(10,0.3) 

          }
        : {
            marginLeft : moderateScale(10,0.3)

        },{


        }
        ]}
          />
        )
      }}
      ListHeaderComponent={()=>{
        return(
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
