// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import {
  requestAudioPermission,
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator, {DrawerRoot} from './SRC/appNavigation';

import {AppState} from 'react-native';
import {setIsLocationEnabled} from './SRC/Store/slices/auth';
import RNSettings from 'react-native-settings';

import {
  CometChatConversationsWithMessages,
  CometChatUIKit,
  UIKitSettings,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {ConversationTypeConstants} from '@cometchat/chat-uikit-react-native/src/shared/constants/UIKitConstants';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  console.reportErrorsAsExceptions = false;
  return (
    // 'pk_test_51NVdg5B4BhSb7ee19fHAwxa1HGilNbVP0oPB5xpGwyoT8ovw8S6xMGzm1ncxlO0N2oUwyuI4G3I4KDtbJvpagmSR00GQ7j5B7A'
    <StripeProvider
      publishableKey={
        'pk_live_51KqgoBIvyDpn13UA0fmEN4aeq4ifL2zGkbY6IVw1wonpnIqLXFFBRTyMC9O23JwmFFet4Qc7yf1xLyMmdUMBRt4K00c1C2vv4r'
      }
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();
  const authKey = '07ba629476752645dbce6a6c4aad7b2fc680b511';
  const appID = '2092182aee051e28';
  const region = 'US';
  // const appSetting = new CometChat.AppSettingsBuilder()
  //   .subscribePresenceForAllUsers()
  //   .setRegion(region)
  //   .build();

  // fcm
  //  useEffect(() => {
  //    Notifications.registerRemoteNotifications();
  //    // app opened
  //    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //      Notifications.postLocalNotification({
  //        title: remoteMessage.notification.title,
  //        body: remoteMessage.notification.body,
  //      });

  //      Notifications.events().registerNotificationOpened(
  //        (notification: Notification, completion) => {
  //          if (remoteMessage?.data?.flag == "Chat") {
  //            navigationService.navigate("ChatScreen", {
  //              roomId: remoteMessage?.data?.roomId,
  //            });
  //          }
  //          completion();
  //        }
  //      );
  //    });

  //    // app opened from background
  //    messaging().onNotificationOpenedApp((remoteMessage) => {
  //      if (remoteMessage?.data?.flag == "Chat") {
  //        navigationService.navigate("ChatScreen", {
  //          roomId: remoteMessage?.data?.roomId,
  //        });
  //      }
  //    });

  //    // when app is in quite state
  //    messaging()
  //      .getInitialNotification()
  //      .then((remoteMessage) => {
  //        if (remoteMessage) {
  //          if (remoteMessage?.data?.flag == "Chat") {
  //            navigationService.navigate("ChatScreen", {
  //              roomId: remoteMessage?.data?.roomId,
  //            });
  //          }
  //        }
  //      });

  //    // Register background handler
  //    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //      console.log("Message handled in the background!", remoteMessage);
  //    });

  //    return unsubscribe;
  //  }, []);
  // fcm ends

  // const requestVibratePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.VIBRATE,
  //       {
  //         title: 'Vibrate Permission',
  //         message:
  //           'Qavah App needs access to your vibration sensor '

  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the vibration');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
        if (result == RNSettings.ENABLED) {
          // console.log('location is enabled');
          dispatch(setIsLocationEnabled(true));
        } else {
          // console.log('location is not enabled');
          dispatch(setIsLocationEnabled(false));
        }
      });
    } else {
      console.log('App has come to the background!');
    }

    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      await requestAudioPermission();
      // await requestVibratePermission();
    }
    GetPermission();
    // configureCometChat()
  }, []);

  // useEffect(() => {
  //   console.log('useEffect runs');
  //   async function connectPusher() {
  //     try {
  //       await pusher.init({
  //         apiKey: '5fe9676993f3dc44fc82',
  //         cluster: 'mt1',
  //       });

  //       myChannel = await pusher.subscribe({
  //         channelName: `match-popup-${userData?.id}`,
  //         // channelName: 'my-notificatio+n-channel',
  //         onSubscriptionSucceeded: (channelName, data) => {
  //           // console.log("🚀 ~ file: SelectedChat.js:77 ~ connectPusher ~ myChannel:", myChannel)
  //           console.log('Subscribed to ', channelName);
  //           // console.log(`And here are the channel members: ${myChannel.members}`)
  //         },
  //         onEvent: event => {
  //           // console.log(
  //           //   '🚀 ~ file: SelectedChat.js:127 ~ connectPusher ~ event:',
  //           //   event,
  //           // );
  //           dispatch(setIsMatched(true))
  //           setotherData(JSON.parse(event.data))
  //           console.log('Got channel event:', event.data);
  //           const dataString = JSON.parse(event.data);
  //           // console.log(
  //           //   '🚀 ~ file: SelectedChat.js:116 ~ connectPusher ~ dataString:',
  //           //   dataString?.response,
  //           //   dataString?.target_id,
  //           //   user?.id,
  //           // );
  //           // if (dataString.target_id == user?.id) {
  //           //   //  alert('here' , user?._id)
  //           //   // setMessages(previousMessages =>
  //           //   //   GiftedChat.append(previousMessages, dataString?.response),
  //           //   // );
  //           //   // return
  //           // }
  //         },
  //       });
  //       // await pusher.subscribe({ channelName });
  //       await pusher.connect();
  //     } catch (e) {
  //       console.log(`ERROR: ${e}`);
  //     }
  //   }
  //   connectPusher();

  //   return async () => {
  //     await pusher.unsubscribe({
  //       channelName: `match-popup-${userData?.id}`,
  //     });
  //   };
  // }, [focused]);
  const configureCometChat = async () => {
    // console.log('here is the chat configuration');

    let uikitSettings: UIKitSettings = {
      appId: appID,
      authKey: authKey,
      region: 'US',
      disableCalling: false,
    };

    CometChatUIKit.init(uikitSettings).then(
      () => {
        console.log('Initialization completed successfully');
      },
      error => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  };

  useEffect(() => {
    configureCometChat();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(2000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;

// import {View, Text} from 'react-native';
// import React, {useEffect} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import {Platform} from 'react-native';
// import {
//   CometChatConversationsWithMessages,
//   CometChatUIKit,
// } from '@cometchat/chat-uikit-react-native';
// import {CometChat} from '@cometchat/chat-sdk-react-native';
// import {ConversationTypeConstants} from '@cometchat/chat-uikit-react-native/src/shared/constants/UIKitConstants';

// const getPermissions = () => {
//   if (Platform.OS === 'android') {
//     PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     ]);
//   }
// };

// // You can create ConversationRequestBuilder as per your requirement
// let conversationsRequestBuilder = new CometChat.ConversationsRequestBuilder()
//   .setLimit(20)
//   .setConversationType(ConversationTypeConstants.both);

// const App = () => {
//   useEffect(() => {
//     getPermissions();
//     setTimeout(() => {
//       CometChatUIKit.login({uid: 'superhero1'})
//         .then(user => {
//           console.log('User logged in successfully', user.getName());
//         })
//         .catch(error => {
//           console.log('Login failed with exception:', error.stack);
//         });
//     }, 100);
//   }, []);
//   return (
//     <View style={{flex: 1}}>
//       <CometChatConversationsWithMessages
//         conversationsConfiguration={{
//           conversationsRequestBuilder: conversationsRequestBuilder,
//         }}
//       />
//     </View>
//   );
// };

// export default App;
