import { StyleSheet, Text, TouchableOpacity, View , ScrollView } from 'react-native'
import React, { useState } from 'react'
import TextInputWithTitle from './TextInputWithTitle'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CustomText from './CustomText';
import { Icon } from 'native-base';

const BottomSheetSelect = ({title , data , setData , array}) => {
    const [ref , setRef] = useState(null)
  return (
    <>
  <TouchableOpacity activeOpacity={0.9} onPress={()=>{
  ref.open()
  }}>
     <CustomText style={[{
        color : Color.veryLightGray,
        fontSize : moderateScale(12,0.3),
        marginBottom : moderateScale(5,0.3),
        width : windowWidth * 0.9,
        marginTop : moderateScale(10,0.3)
      }]}>{title}</CustomText>

        <View style={styles.container}>
            <CustomText style={{fontSize : moderateScale(11,0.6) , color : Color.black , width : '95%'}}>{data}</CustomText>
            <Icon 
            name={'angle-down'}
            as={FontAwesome}
            color={Color.themeColor}
            size={moderateScale(17,0.6)}
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
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: Color.white,
          height: windowHeight * 0.43,
            }}
            contentContainerStyle={{

              paddingBottom: moderateScale(50, 0.6),
            }}>
                  {array.map((item , index)=>{
            return(
                
                <TouchableOpacity style={{
                    flexDirection : 'row',
                    justifyContent : 'space-between' , 
                    marginTop : moderateScale(15,0.3) ,

                }}
                activeOpacity={0.9}
                onPress={()=>{
                    setData(item)
                    ref.close()
                }}
                key={index}
                >
                    <CustomText  
                    style={{
                        color : Color.black ,
                        fontSize : moderateScale(15,0.6) ,
                        width : '100%',
                        textAlign : 'center'
                    }}
                    >{item}</CustomText>
                </TouchableOpacity>
                    )
                })}
              

            </ScrollView>
        </RBSheet>
          </>
  )
}

export default BottomSheetSelect

const styles = ScaledSheet.create({
    container : {
        width : windowWidth * 0.9 , 
        height : windowHeight * 0.05,
        borderWidth : 1,
        borderColor : Color.veryLightGray ,
        flexDirection : 'row' ,
        paddingHorizontal : moderateScale(10,0.6),
        alignItems : 'center',
         borderRadius : moderateScale(5,0.6)

    },
})