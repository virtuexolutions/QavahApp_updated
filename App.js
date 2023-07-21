/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
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
        'pk_test_51NVdg5B4BhSb7ee19fHAwxa1HGilNbVP0oPB5xpGwyoT8ovw8S6xMGzm1ncxlO0N2oUwyuI4G3I4KDtbJvpagmSR00GQ7j5B7A'
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

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      // await requestVibratePermission();
    }
    GetPermission();
    // configureCometChat()
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
