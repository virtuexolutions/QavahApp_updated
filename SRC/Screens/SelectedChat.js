import {View , ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import ScreenBoiler from '../Components/ScreenBoiler'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Color from '../Assets/Utilities/Color'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { GiftedChat } from 'react-native-gifted-chat'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import { useNavigation } from '@react-navigation/native'
// import { CometChatMessages } from '../cometchat-chat-uikit-react-native-3/CometChatWorkspace/src'
// import { CometChat } from '@cometchat-pro/react-native-chat'
import { useSelector } from 'react-redux'

const SelectedChat = ({route}) => {
  const navigation = useNavigation()
  const item = route?.params?.item
  console.log("🚀 ~ file: SelectedChat.js:20 ~ SelectedChat ~ item:", item)
  const userData = useSelector(State => State.commonReducer.userData);
  const [localUser, setLocalUser] = useState(null);
  // useEffect(() => {
  //   var user = CometChat.getLoggedinUser().then(
  //     (user) => {
  //       console.log('user details:', {user});
  //       setLocalUser(user);
  //     },
  //     (error) => {
  //       console.log('error getting details:', {error});
  //     },
  //   );
  //   console.log("🚀 ~ file: SelectedChat.js:32 ~ useEffect ~ user:", user)
  // }, []);
  
  return (
    <View style={{flex: 1}}>
    {/* {localUser ? (
      <CometChatMessages
        type={'user'}
        item={item}//The object will be of user or group depending on type
        loggedInUser={localUser}
        actionGenerated={(actionType) => {
          console.log(actionType);
        }}
        navigation={navigation}
        

      />
    ) : null} */}
  </View>
  ) 
}

export default SelectedChat

const styles = ScaledSheet.create({
  container :  {
    width : windowWidth,
    height : windowHeight * 0.9,
    backgroundColor : 'white'
  },
  chatHeader : { 
    width : windowWidth ,
    height : windowHeight * 0.1,
    backgroundColor : '#273443',
    alignItems : 'center',
    flexDirection : 'row',
    paddingHorizontal : moderateScale(5,0.6)
  },
  image: {
    width: moderateScale(44, 0.3),
    height: moderateScale(44, 0.3),
    borderRadius: moderateScale(22, 0.3),
    marginLeft: moderateScale(10, 0.3),
    // marginTop: moderateScale(2.5, 0.3),
  },
  name  : {
    color : Color.white
,   fontSize : moderateScale(13,0.6),
marginLeft : moderateScale(10,0.3)
  },
})