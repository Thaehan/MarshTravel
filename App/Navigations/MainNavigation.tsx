import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import TabNavigator from './TabNavigation';
import ScreenNames from '@Constants/ScreenNames';
import LoginScreen from '@Screens/LoginScreen';
import HomeScreen from '@Screens/HomeScreen';
import IntroScreen from '@Screens/IntroScreen';
import ListTripScreen from '@Screens/ListTripScreen';
import ExploreScreen from '@Screens/ExploreScreen';
import PersonalScreen from '@Screens/PersonalScreen';
import {setMode} from '@Store/Slices/SystemSlice';
import DestinationScreen from '@Screens/DestinationScreen';
import RegisterScreen from '@Screens/RegisterScreen';
import CreateScheduleScreen from '@Screens/CreateScheduleScreen';
import DetailScheduleScreen from '@Screens/DetailScheduleScreen';
import MapViewScreen from '@Screens/MapViewScreen';
import UpdatePersonal from '@Screens/UpdatePersonalScreen';
import MyWalletScreen from '@Screens/MyWalletScreen';
import PostedReviewScreen from '@Screens/PostedReviewScreen';
import SettingsScreen from '@Screens/SettingsScreen';
import AboutScreen from '@Screens/AboutScreen';
import EditScheduleScreen from '@Screens/EditScheduleScreen';
import SavedReviewScreen from '@Screens/SavedReviewScreen';
import DetailReviewScreen from '@Screens/DetailReviewScreen';
import CreateReviewScreen from '@Screens/CreateReviewScreen';
import SearchScreen from '@Screens/SearchScreen';
import EditDestinationScreen from '@Screens/EditDestination';

const MainStack = createNativeStackNavigator();

const MainScreenStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        dispatch(setMode('online'));
      } else {
        dispatch(setMode('offline'));
      }
    });

    unsubscribe();
  }, []);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name={ScreenNames.Intro} component={IntroScreen} />
      <MainStack.Screen name={ScreenNames.Login} component={LoginScreen} />
      {/**@ts-expect-errors */}
      <MainStack.Screen name={ScreenNames.MainTab} component={TabNavigator} />
      <MainStack.Screen name={ScreenNames.Home} component={HomeScreen} />
      <MainStack.Screen
        name={ScreenNames.ListSchedule}
        component={ListTripScreen}
      />
      <MainStack.Screen name={ScreenNames.Explore} component={ExploreScreen} />
      <MainStack.Screen
        name={ScreenNames.Personal}
        component={PersonalScreen}
      />
      <MainStack.Screen
        name={ScreenNames.Destination}
        component={DestinationScreen}
      />
      <MainStack.Screen
        name={ScreenNames.Register}
        component={RegisterScreen}
      />
      <MainStack.Screen
        name={ScreenNames.CreateSchedule}
        component={CreateScheduleScreen}
      />
      <MainStack.Screen
        name={ScreenNames.DetailSchedule}
        component={DetailScheduleScreen}
      />
      <MainStack.Screen name={ScreenNames.MapView} component={MapViewScreen} />
      <MainStack.Screen
        name={ScreenNames.MyWallet}
        component={MyWalletScreen}
      />
      <MainStack.Screen
        name={ScreenNames.PostedReview}
        component={PostedReviewScreen}
      />
      <MainStack.Screen name={ScreenNames.Setting} component={SettingsScreen} />
      <MainStack.Screen name={ScreenNames.About} component={AboutScreen} />
      <MainStack.Screen
        name={ScreenNames.UpdatePersonal}
        component={UpdatePersonal}
      />
      <MainStack.Screen
        name={ScreenNames.EditSchedule}
        component={EditScheduleScreen}
      />
      <MainStack.Screen
        name={ScreenNames.SavedReview}
        component={SavedReviewScreen}
      />
      <MainStack.Screen
        name={ScreenNames.DetailReview}
        component={DetailReviewScreen}
      />
      <MainStack.Screen
        name={ScreenNames.CreateReview}
        component={CreateReviewScreen}
      />
      <MainStack.Screen name={ScreenNames.Search} component={SearchScreen} />
      <MainStack.Screen
        name={ScreenNames.EditDestination}
        component={EditDestinationScreen}
      />
    </MainStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide({duration: 500, fade: true})}>
      <BottomSheetModalProvider>
        <MainScreenStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
