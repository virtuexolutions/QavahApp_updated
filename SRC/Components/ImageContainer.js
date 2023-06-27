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
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';

const ImageContainer = ({
  item,
  data,
  setData,
  index,
  setIndex,
  showMultiImageModal,
  setShowMultiImageModal,
  key,
  onPress,
  edit
}) => {
  // console.log("🚀 ~ file: ImageContainer.js:34 ~ key:", key)
  console.log('🚀 ~ file: ImageContainer.js:29 ~ ImageContainer ~ item:', item);
  const [remove, setRemove] = useState(false);

  return (
    <View
      style={styles.imageContainer}
      key={item?.id}
      // onLongPress={onPress}
      // activeOpacity={0.9}
      >
      {Object.keys(item).length >0 ? (
        <>
          <Image
            source={{uri: edit ? item?.url : item?.uri}}
            style={{width: '100%', height: '100%'}}
          />
          <TouchableOpacity
            style={styles.cross}
            onPress={() => {
              // setImage({});
              const tempArray = [...data];
              tempArray[index] = {};
              setData(tempArray);
            }}>
            <Icon
              name={'close'}
              as={AntDesign}
              color={Color.themeBlack}
              size={moderateScale(10, 0.3)}
              onPress={() => {
                const tempArray = [...data];
                tempArray[index] = {};
                setData(tempArray);
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => {
            setIndex(index);
            setShowMultiImageModal(true);
          }}>
          <Icon
            name={'plus'}
            as={AntDesign}
            color={Color.white}
            size={moderateScale(15, 0.3)}
            onPress={() => {
              setIndex(index);
              setShowMultiImageModal(true);
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
    paddingHorizontal: 10,
    paddingTop: 20,
    width: windowWidth,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // marginTop: moderateScale(15, 0.3),
    height: windowHeight * 0.35,
    // justifyContent: 'space-between',
  },
  imageContainer: {
    width: (windowWidth * 0.8) / 3,
    height: windowHeight * 0.135,
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1.5,
    borderColor: Color.themeColor,
    marginVertical: moderateScale(10, 0.3),
    overflow: 'hidden',
    // marginRight: moderateScale(5, 0.6),
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

export default ImageContainer;
