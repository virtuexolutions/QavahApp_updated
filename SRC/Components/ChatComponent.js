import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters';
import {FlatList} from 'native-base';

const ChatComponent = ({Chat, user}) => {
  
    return (
    <>
    <FlatList
        numColumns={1}
        showsVerticalScrollIndicator={false}
        data={Chat}
        contentContainerStyle={{
          paddingLeft: moderateScale(10, 0.6),
          marginTop:moderateScale(20,0.3),
        }}
        style={{
          flexGrow: 0,
        }}
        renderItem={({item, index}) => {
            return (
                <View style={styles.Container}>
              <CustomText style={styles.text}>{item?.heading}</CustomText>
              <CustomText
               
                style={item?.msg?.name== user?.name ? styles.leftMsg : styles.rightMsg}>
                {item?.msg ? item?.msg : 'Hello'}
              </CustomText>
            </View>
          );
        }}
        />

    </>
  )
}



export default ChatComponent

const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },
    leftMsg:{
        alignText:'left',
        fontSize: moderateScale(15,0.6),
    },
    rightMsg:{
        alignText:'right',
        fontSize: moderateScale(15,0.6),
    }
})