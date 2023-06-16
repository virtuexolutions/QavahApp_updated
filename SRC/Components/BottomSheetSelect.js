import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextInputWithTitle from './TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomText from './CustomText';
import {Icon} from 'native-base';

const BottomSheetSelect = ({title, data, setData, array}) => {
  // const [flatListRef, setflatListRef] = useState(null)
   const flatListRef = useRef(null);
  // console.log("🚀 ~ file: BottomSheetSelect.js:21 ~ BottomSheetSelect ~ flatListRef:", flatListRef)

  const [highlightedIndex, setHighlightedIndex] = useState(data !='' ? array.indexOf(data): 0);
  // console.log("🚀 ~ file: BottomSheetSelect.js:22 ~ BottomSheetSelect ~ highlightedIndex:", highlightedIndex)
  const [ref, setRef] = useState(null);
  // console.log("🚀 ~ file: BottomSheetSelect.js:27 ~ BottomSheetSelect ~ ref:", ref.current)
 
  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.floor(yOffset / ITEM_HEIGHT);
    setHighlightedIndex(index);
  };

  const scrollToIndex = (index) => {
    console.log("🚀 ~ file: BottomSheetSelect.js:50 ~ scrollToIndex ~ index:", index)
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const ITEM_HEIGHT = 50; // Adjust this value based on your item's height


  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          // scrollToIndex(highlightedIndex)
          ref.open();
        }}>
        <CustomText
          style={[
            {
              color: Color.veryLightGray,
              fontSize: moderateScale(12, 0.3),
              marginBottom: moderateScale(5, 0.3),
              width: windowWidth * 0.9,
              marginTop: moderateScale(10, 0.3),
            },
          ]}>
          {title}
        </CustomText>

        <View style={styles.container}>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.black,
              width: '95%',
            }}>
            {data}
          </CustomText>
          <Icon
            name={'angle-down'}
            as={FontAwesome}
            color={Color.themeColor}
            size={moderateScale(17, 0.6)}
          />
        </View>

        {/* <TextInputWithTitle
          iconName={'angle-down'}
          iconType={FontAwesome}
          placeholder={''}
          title={title}
          setText={setData}
          value={data}
          viewHeight={0.05}
          viewWidth={0.9}
          inputWidth={0.86}
          border={1}
          borderColor={Color.veryLightGray}
          backgroundColor={'#FFFFFF'}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(5, 0.3)}
          rightIcon
          disable
          /> */}
      </TouchableOpacity>
      <RBSheet
        ref={ref => {
          setRef(ref);
        }}
        closeOnDragDown={true}
        openDuration={250}
        customStyles={{
          container: {
            borderTopEndRadius: moderateScale(30, 0.6),
            borderTopLeftRadius: moderateScale(30, 0.6),
  
            overflow: 'hidden',
          },
        }}>
        <FlatList
          ref = {flatListRef}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          // onViewableItemsChanged={() => onViewableItemsChanged()}
          // viewabilityConfigCallbackPairs={
          //   viewabilityConfigCallbackPairs.current
          // }
          // ref={ref => {
          //   setflatListRef(ref);
          // }}
          initialScrollIndex={highlightedIndex}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{
            backgroundColor: Color.white,
            height: windowHeight * 0.43,
          }}
          contentContainerStyle={{
            paddingBottom: moderateScale(100, 0.6),
            paddingTop: moderateScale(20,0.6),
            // paddingBottom: moderateScale(70,0.6),
          }}
          data={array}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(15, 0.3),
              }}
              activeOpacity={0.9}
              onPress={() => {
                setHighlightedIndex(index)
                setData(item);
                ref.close();
              }}>
              <CustomText
                style={index == highlightedIndex ? styles.selected : styles.notSelected}>
                {item}
              </CustomText>
            </TouchableOpacity>
          )}
        />
      </RBSheet>
    </>
  );
};

export default BottomSheetSelect;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    borderRadius: moderateScale(5, 0.6),
  
  },
  selected: {
    color: Color.black,
    fontSize: moderateScale(15, 0.6),
    width: '100%',
    textAlign: 'center',
    paddingVertical: moderateScale(5, 0.3),
    borderColor: Color.veryLightGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    opacity: 0.6,
    // textShadowColor: 'rgba(0, 0, 0, 0.3)',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 2,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
  
  },
  notSelected: {
    color: Color.veryLightGray,
    fontSize: moderateScale(12, 0.6),
    width: '100%',
    textAlign: 'center',
    paddingVertical: moderateScale(5, 0.3),
  }
});
