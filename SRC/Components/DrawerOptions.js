import {  Text, View , TouchableOpacity , Switch} from 'react-native'
import React, { useState } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import CustomText from './CustomText';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { useSelector } from 'react-redux';

const DrawerOptions = ({item}) => {
    const [openNested , setOpenNested] = useState(false);
    const userData = useSelector((State)=>State.commonReducer.userData);
    // console.log("🚀 ~ file: DrawerOptions.js:14 ~ DrawerOptions ~ userData:", userData?.prefrences?.global)
    // const datachane=()=>{
    //     console.log('dasdasasd')
    //   }
  
  return (<>
    <TouchableOpacity style={{
        flexDirection : 'row',
        justifyContent : 'space-between' , 
        width : windowWidth * 0.7 ,
        marginTop : moderateScale(20,0.3),
        alignItems : 'center'
  
    }}
    activeOpacity={0.8}
    onPress={item?.onPress ? item?.onPress : ()=>{setOpenNested(!openNested)}}
    key={item?.key}
    >
        <CustomText  
        style={{
            color : Color.black ,
            fontSize : moderateScale(14,0.6) ,
            // backgroundColor : 'red',
            width : '70%'
        }}
        >{item?.title}</CustomText>
        {
            item?.switch ?
            // <Switch
            // onThumbColor={Color.white}
            // onTrackColor={Color.themeColor}
            // onToggle={()=>{
            //     item?.onPress()
            //     console.log('fdfasdsdas')
            // }}
            // isChecked={userData?.prefrences?.global}
            // // onToggle={datachane}
            // // onValueChange={()=>{item?.setSwitchEnabled(prev=>!prev)}}
            // // value={item?.switchEnabled}
            // />
            <Switch
            trackColor={{true: '#EDA63d' , false : Color.veryLightGray}}
            thumbColor={userData?.prefrences?.global ? userData?.prefrences?.global == 1 ? Color.themeColor : '#EEEEEE':'#EEEEEE' }
            // thumbColor={{true:  Color.themeColor, false:'#EEEEEE' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={ item?.onPress}
            //value={userData?.prefrences?.global}
            value={userData?.prefrences?.global ? userData?.prefrences?.global==0 ? false : true : false }
          />
 :       
        <Icon 
        name={openNested ? 'down' : 'right'}
        as={AntDesign}
        color={Color.themeColor}
        size={moderateScale(17,0.6)}
        />
}
    </TouchableOpacity>
       {item?.nestedMenu && openNested == true &&
       
       item?.nestedMenu.map((x , index)=>{
           return(
            <TouchableOpacity style={{
                flexDirection : 'row',
                justifyContent : 'space-between' , 
                width : windowWidth * 0.7 ,
                marginTop : moderateScale(12,0.3)
          
            }}
            activeOpacity={0.8}
            onPress={x?.onPress}
            key={x?.key}
            >
                <CustomText  
                style={{
                    color : Color.veryLightGray ,
                    fontSize : moderateScale(12,0.6),
                    marginLeft : moderateScale(15,0.3),
                }}
                >{x?.title}</CustomText>
                <Icon 
                name={'right'}
                as={AntDesign}
                color={Color.themeColor}
                size={moderateScale(17,0.6)}
                />
            </TouchableOpacity>
               
               )
})
}
            
       
       
        </>
  )
}

export default DrawerOptions

const styles = ScaledSheet.create({})