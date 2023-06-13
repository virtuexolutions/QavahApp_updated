import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from 'native-base';

const { height, width } = Dimensions.get('window');

const PlanCard = ({ title, description, price,selected,item }) => {
  const splitedItem = title.split(' '); 
  console.log("🚀 ~ file: PlanCard.js:13 ~ PlanCard ~ splitedItem:", splitedItem)
  return (
    <View style={[styles.container, { borderColor: selected === item?.title ? Color.themeColor : Color.veryLightGray }]}>
      <View style={styles.iconContainer}>
        
        <CustomText
        numberOfLines={2}
          style={[
            styles.Txt1,
            { fontSize: moderateScale(22, 0.6) ,
              color : selected == item?.title ? Color.themeColor : 'black'},

          ]}
          bold>
          {splitedItem[0] == 'Qavah' ? 'Month To Month' : title}
        </CustomText>{selected == item?.title ?
        ( <Icon
          name={'checkcircleo'}
          as={AntDesign}
          size={moderateScale(22, 0.3)}
          color={Color.themeColor }
          style={{top:-5}}
          onPress={() => {
            //   navigationN.goBack()
          }}
        />):<></>}
       
      </View>
      <CustomText
      numberOfLines={7}
        style={[
          styles.Txt1,
          { fontSize: moderateScale(10, 0.6), color: Color.veryLightGray , marginTop : moderateScale(20,0.3) },
        ]}
      >
        {description}
      </CustomText>
      <CustomText
        style={[
          styles.Txt1,
          {
            fontSize: moderateScale(15, 0.6),
            marginTop: moderateScale(5, 0.3),
            color : selected == item?.title ? Color.themeColor : 'black',
            position : 'absolute' ,
            bottom : 10 , 
            left : 10
          },
        ]}
        bold>
        ${price}
      </CustomText>
    </View>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.55,
    height: height * 0.3,
    borderRadius: 5,
   
    borderWidth: 1,
    margin: moderateScale(10, 0.3),
    padding: moderateScale(10, 0.6),
    // marginLeft: moderateScale(20, 0.3),
  },
  iconContainer: {
    flexDirection: 'row',

    justifyContent:'space-between',
  
  },
});
