import React, {ReactElement, useEffect, useMemo, useState} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {Colors, TouchableOpacity, View, Text} from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

import ScreenNames from '@Constants/ScreenNames';
import HomeScreen from '@Screens/HomeScreen';
import ListTripScreen from '@Screens/ListTripScreen';
import ExploreScreen from '@Screens/ExploreScreen';
import PersonalScreen from '@Screens/PersonalScreen';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';
import {useLanguages} from '@Hooks/languages';

const Tab = createBottomTabNavigator();

export default function TabNavigator(nav: BottomTabBarProps) {
  const {systemLang} = useLanguages();

  const listName = useMemo(() => {
    return [
      translate('nav.home'),
      translate('nav.schedule'),
      translate('nav.explore'),
      translate('nav.personal'),
    ];
  }, [systemLang]);

  const renderTabBarItem = (
    icon: ReactElement,
    screenName: string,
    title: string,
    props: BottomTabBarProps,
  ) => {
    const {navigation, state} = props;
    return (
      <TouchableOpacity
        paddingV-8
        center
        onPress={() => navigation.navigate(screenName)}
        flex
        width={'25%'}>
        {icon}
        <Text
          xs
          light
          gray2
          style={{
            color:
              state.routeNames[state.index] == screenName
                ? Colors.primary
                : COLORS.gray2,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTabBar = (props: BottomTabBarProps) => {
    const {state} = props;

    return (
      <View
        row
        spread
        bg-white
        style={{
          borderTopWidth: 0.5,
          borderColor: COLORS.border,
        }}>
        {renderTabBarItem(
          <Ionicons
            name="home-outline"
            size={20}
            style={state.index == 0 ? styles.focus : styles.unfocus}
          />,
          state.routeNames[0],
          listName[0],
          props,
        )}
        {renderTabBarItem(
          <Ionicons
            name="clipboard-outline"
            size={20}
            style={state.index == 1 ? styles.focus : styles.unfocus}
          />,
          state.routeNames[1],
          listName[1],
          props,
        )}
        {renderTabBarItem(
          <Ionicons
            name="ios-compass-outline"
            size={24}
            style={state.index == 2 ? styles.focus : styles.unfocus}
          />,
          state.routeNames[2],
          listName[2],
          props,
        )}
        {renderTabBarItem(
          <Ionicons
            name="person-outline"
            size={20}
            style={state.index == 3 ? styles.focus : styles.unfocus}
          />,
          state.routeNames[3],
          listName[3],
          props,
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={renderTabBar}>
      <Tab.Screen name={ScreenNames.Home} component={HomeScreen} />
      <Tab.Screen name={ScreenNames.ListSchedule} component={ListTripScreen} />
      <Tab.Screen name={ScreenNames.Explore} component={ExploreScreen} />
      <Tab.Screen name={ScreenNames.Personal} component={PersonalScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focus: {
    color: COLORS.primary,
  },
  unfocus: {
    color: COLORS.gray4,
  },
});
