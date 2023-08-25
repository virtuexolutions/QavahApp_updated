import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import LandingPage from './Screens/LandingPage';
import CreatePortfolio from './Screens/CreatePortfolio';
import ProfilePictures from './Screens/ProfilePictures';
import MoreAboutme from './Screens/MoreAboutme';
import IsraeliteFilters from './Screens/IsraeliteFilters';
import Passions from './Screens/Passions';
import ProfileCreated from './Screens/ProfileCreated';
import Israeliteinfo from './Screens/Israeliteinfo';
import HomeScreen from './Screens/HomeScreen';
import Color from './Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import babelConfig from '../babel.config';
import UserDetail from './Screens/UserDetail';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {windowHeight} from './Utillity/utils';
import Profile from './Screens/Profile';
import SearchFilterScreen from './Screens/SearchFilterScreen';
import Wishlist from './Screens/Wishlist';
import ChatScreen from './Screens/ChatScreen';
import MyAccount from './Screens/MyAccount';
import Seeking from './Screens/Seeking';
import PersonalInfo from './Screens/PersonalInfo';
import ChangePassword from './Screens/ChangePassword';
import WhoViewedMe from './Screens/WhoViewedMe';
import Subscription from './Screens/Subscription';
import SpotLight from './Screens/SpotLight';
import CustomImage from './Components/CustomImage';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import TermsAndConditions from './Screens/TermsAndConditions';
import Support from './Screens/Support';
import GetSuperLike from './Screens/GetSuperLike';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import PaymentModal from './Components/PaymentModal';
import {
  CometChatConversationListWithMessages,
  CometChatUserListWithMessages,
} from './cometchat-chat-uikit-react-native-3/CometChatWorkspace/src';
import SelectedChat from './Screens/SelectedChat';
import CallScreen from './Screens/CallScreen';
import LocationEnabler from './Screens/LocationEnabler';
// import LocationEnabler from './Screens/LocationEnabler';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const locationEnabled = useSelector(
    state => state.authReducer.locationEnabled,
  );
  console.log("🚀 ~ file: appNavigation.js:67 ~ AppNavigator ~ locationEnabled:", locationEnabled)
  console.log(
    '🚀 ~ file: appNavigation.js:55 ~ AppNavigator ~ isLoggedIn:',
    isLoggedIn,
  );

  const RootNav = createSharedElementStackNavigator();
  const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };

  const AppNavigatorContainer = () => {
    const firstScreen = 
      !locationEnabled
      ? 'LocationEnabler'
      : token != null && isLoggedIn
      ? 'TabNavigation'
      : 'LandingPage';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          headerMode="none"
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="LandingPage" component={LandingPage} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="CreatePortfolio" component={CreatePortfolio} />

          <RootNav.Screen name="MoreAboutme" component={MoreAboutme} />
          <RootNav.Screen name="ProfilePictures" component={ProfilePictures} />
          <RootNav.Screen name="ProfileCreated" component={ProfileCreated} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="SelectedChat" component={SelectedChat} />

          <RootNav.Screen
            name="IsraeliteFilters"
            component={IsraeliteFilters}
          />
          <RootNav.Screen name="Passions" component={Passions} />
          <RootNav.Screen name="Israeliteinfo" component={Israeliteinfo} />
          <RootNav.Screen name="LocationEnabler" component={LocationEnabler} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="UserDetail" component={UserDetail} />
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="Seeking" component={Seeking} />
          <RootNav.Screen name="PersonalInfo" component={PersonalInfo} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="WhoViewedMe" component={WhoViewedMe} />
          <RootNav.Screen name="Subscription" component={Subscription} />
          <RootNav.Screen name="CallScreen" component={CallScreen} />

          <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <RootNav.Screen name="Support" component={Support} />
          <RootNav.Screen name="GetSuperLike" component={GetSuperLike} />
          <RootNav.Screen name="Privacy" component={PrivacyPolicy} />

          {/* // options={()=>{
          //   options
          // }} /> */}
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log(
    '🚀 ~ file: appNavigation.js:83 ~ TabNavigation ~ userRole:',
    userRole,
  );
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (
            route.name === 'HomeScreen' ||
            route.name === 'NegotiatorHomeScreen'
          ) {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'ChatScreen') {
            iconName = focused
              ? 'ios-chatbubble-ellipses-sharp'
              : 'ios-chatbubble-ellipses-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'SearchFilterScreen') {
            type = AntDesign;
            iconName = 'search1';

            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'Wishlist') {
            type = AntDesign;
            iconName = focused ? 'heart' : 'hearto';

            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'settings-outline' : 'settings-sharp';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(25, 0.3) : moderateScale(20, 0.3);
          }
          return route.name === 'SpotLight' ? (
            <Image
              source={require('./Assets/Images/setting.png')}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ) : (
            <Icon name={iconName} as={type} color={color} size={size} />
          );
        },
        tabBarShowLabel: false,

        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 11,
          // borderTopRightRadius : moderateScale(15,0.6),
          // borderTopLeftRadius : moderateScale(15,0.6),
          height: windowHeight * 0.07,
        },
      })}>
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen name={'SearchFilterScreen'} component={SearchFilterScreen} />
      <Tabs.Screen name={'Wishlist'} component={Wishlist} />
      <Tabs.Screen name={'ChatScreen'} component={ChatScreen} />
      {/* <Tabs.Screen name="UserListWithMessages" component={CometChatUserListWithMessages} /> */}
      {/* <Tabs.Screen name="ConversationListWithMessages" component={CometChatConversationListWithMessages} /> */}

      <Tabs.Screen
        name={'SpotLight'}
        component={SpotLight}
        // options={{
        //   // Pass data as a parameter to the component
        //   data: { fromSpotLight: true },
        // }}
      />
    </Tabs.Navigator>
  );
};
// export const DrawerNavigation = () => {
//   const RootDrawer = createDrawerNavigator();
//   const firstScreen = 'HomeScreen';

//   return (
//     <RootDrawer.Navigator
//       initialRouteName={firstScreen}
//       screenOptions={{
//         headerShown: false,

//       }}>
//       <RootDrawer.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           title: 'Home',
//           drawerActiveBackgroundColor: Color.secondaryColor,
//           drawerActiveTintColor : Color.themeColor
//         }}
//       />
//     </RootDrawer.Navigator>
//   );
// };

export default AppNavigator;
