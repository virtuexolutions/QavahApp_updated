import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
import React, {useState, useEffect} from 'react';
// import {View} from 'react-native';
// import {Icon, Button} from 'native-base';
// import FastImage from 'react-native-fast-image';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {CometChat} from '@cometchat-pro/react-native-chat';

const CallScreen = (props) => {

//   const [incommingCall, setIncommingCall] = useState(false);
//   const {reciverInfo, type, method} = props.route.params;
//   console.log("🚀 ~ file: CallScreen.js:14 ~ CallScreen ~ type:", type)

//   const callSettings = new CometChat.CallSettingsBuilder()
//   .setSessionID(reciverInfo?.uid)
//   .enableDefaultLayout(true)
// //   .ShowSwitchCameraButton(true)
//   .showEndCallButton(true)
//   .showAudioModeButton(true)
// //   .showPauseVideoButton(true)
//   .build()


// const onDisconnect =()=>{
//     props?.navigation?.goBack()
// }

// const initCall =()=>{
//     var recieverId = reciverInfo?.uid;
//     var callType = type == 'audio' ? CometChat.CALL_TYPE.AUDIO : CometChat.CALL_TYPE.VIDEO
//     var recieverType = CometChat.RECEIVER_TYPE.USER 
//     var call = new CometChat.Call(recieverId, callType, recieverType)
//     CometChat.initiateCall(call).then(
//         outGointCall =>{
//             console.log('Call initiated Successfully')
//         },
//         error =>{
//             console.log('Call initialization failed with exception', error)
//         }
//     )
// }

// const recieveCall =()=>{
//     const listnerId = reciverInfo?.uid;
//     CometChat.addCallListener(listnerId,new CometChat.CallListener({
//         onIncomingCallRecieved(call) {
//             console.log('Incoming call')
//         },
//         onOutgoingCallAccepted(call){
//             console.log('outgoing call accepted')
//             onStartCall()
//         },
//         onOutgoingCallRejected(call){
//             console.log('out Going call rejected')
//         },
//         onIncomingCallCancelled(call){
//             console.log('Incoming call Cancelled')
//         }

//     })) 
// }

// const acceptIncomingCall = ()=>{
//     var sessionId = reciverInfo?.uid
//     CometChat.acceptCall(sessionId).then(
//         call=>{
//             console.log('Call accepted successfully')
//         },
//         error=>{
//             console.log('Call failed with error', error)
//         }
//     )    
// }

// const onCancelCall = ()=>{
//     onDisconnect();
// }

// const rejectCall =()=>{
//     var sessionId = reciverInfo?.uid;
//     var status = CometChat.CALL_STATUS.REJECTED
//     CometChat.rejectCall(sessionId, status).then(
//         call=>{
//             console.log('Call rejected')
//         },
//         error=>{
//             console.log('Error occured', error)
//         }
//     )
// }

// const onStartCall =()=>{
//     var sessionId = reciverInfo?.uid;
//     let CallListener = new CometChat.OngoingCallListener({
//         onUserJoined:user=>{
//             console.log('User Joined call')
//         },
//         onUserLeft:user=>{
//             console.log('User Left Call')
//         },
//         onCallEnded:user=>{
//             console.log("Call Ended")
//         }
//     })

//     callSettings = new CometChat.CallSettingsBuilder()
//     .setSessionID(sessionId)
//     .setCallEventListener(CallListener)
//     .build()
// }




//   useEffect(() => {
//     if(method == 'init'){
//         initCall()
//     }else{
//         recieveCall()
//     }
  
    
//   }, [])
  

  return (
    // <View style={{height: '100%', width: '100%', position: 'relative'}}>
    //   {console.log(callSettings)}
    //   {callSettings && (
    //     <CometChat.CallingComponent callsettings={callSettings} />
    //   )}
    // </View>
    // <CometChatOutgoingCall />
    <View>
      <Text>Hello</Text>
    </View>
    
  );
};

export default CallScreen;

const styles = StyleSheet.create({});
