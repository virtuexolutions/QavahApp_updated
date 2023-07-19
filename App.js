/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator, {DrawerRoot} from './SRC/appNavigation';
import { CometChat } from "@cometchat-pro/react-native-chat";


const App = () => {
  const [publishableKey, setPublishableKey] = useState('');
   
  

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  console.reportErrorsAsExceptions = false;
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51McSueJ0WRwehn2Uuf4rm6WNHPQvaJY9NGU235gUEqPA3AJuc9Mq1x98Y8B8uE5eMfivo5l2xK4Vau21zau7ZBDp00g7qWfkx3'
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
  const appID = "2092182aee051e28";
  const region = "US";
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  
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

  const configureCometChat = async()=>{
    console.log('here is the chat configuration')
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();}
    GetPermission();
    configureCometChat()
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
