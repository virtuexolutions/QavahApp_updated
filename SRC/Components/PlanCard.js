import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from 'native-base';

const { height, width } = Dimensions.get('window');

const PlanCard = ({ title, description, price,selected,item }) => {
  console.log("🚀 ~ file: PlanCard.js:12 ~ PlanCard ~ selected:", selected)
  console.log("🚀 ~ file: PlanCard.js:12 ~ PlanCard ~ item:", item)
  return (
    <View style={[styles.container, { borderColor: selected === item?.title ? Color.themeColor : Color.veryLightGray }]}>
      <View style={styles.iconContainer}>
        
        <CustomText
          style={[
            styles.Txt1,
            { fontSize: moderateScale(25, 0.6) },

          ]}
          bold>
          {title}
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
        style={[
          styles.Txt1,
          { fontSize: moderateScale(10, 0.6), color: Color.veryLightGray },
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
          },
        ]}
        bold>
        Rs {price}/mo
      </CustomText>
    </View>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.55,
    height: height * 0.17,
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
