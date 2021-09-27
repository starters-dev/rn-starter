import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createStackNavigator} from '@react-navigation/stack';
import merge from 'lodash/merge';

import {screenDefaultOptions, tabBarDefaultOptions} from './options';
import {
  GenSharedStackNavigatorProps,
  GenStackNavigatorProps,
  GenTabNavigatorProps,
  ModalScreenInfo,
} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {getNavigationTheme} from '../../utils/designSystem';

export const genStackNavigator = (screens: GenStackNavigatorProps): JSX.Element => {
  const Stack = createNativeStackNavigator(); // createStackNavigator();
  const stackScreens = screens.map(it => (
    <Stack.Screen
      key={it.name}
      name={it.name}
      component={it.component}
      options={merge(screenDefaultOptions(), it.options())}
    />
  ));

  return <Stack.Navigator>{stackScreens}</Stack.Navigator>;
};

export const genSharedStackNavigator = (screens: GenSharedStackNavigatorProps): JSX.Element => {
  const Stack = createSharedElementStackNavigator();
  const stackScreens = screens.map(it => (
    <Stack.Screen
      key={it.name}
      name={it.name}
      component={it.component}
      options={merge({headerShown: false}, it.options())}
      sharedElements={it.sharedElements}
    />
  ));

  return (
    <NavigationContainer independent theme={getNavigationTheme()}>
      <Stack.Navigator>{stackScreens}</Stack.Navigator>
    </NavigationContainer>
  );
};

export const genTabNavigator = (screens: GenTabNavigatorProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change tab bar appearance

  const Tab = createBottomTabNavigator();
  const tabScreens = screens.map(it => (
    <Tab.Screen key={it.name} name={it.name} component={it.component} options={it.options} />
  ));

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        ...tabBarDefaultOptions(route.name),
      })}
    >
      {tabScreens}
    </Tab.Navigator>
  );
};

export const genRootNavigator = (app: React.FC, modals: ModalScreenInfo[]): JSX.Element => {
  const RootStack = createNativeStackNavigator(); // createStackNavigator();
  const appScreen = <RootStack.Screen name="App" component={app} />;
  const modalScreens = modals.map(m => (
    <RootStack.Screen key={m.name} name={m.name} component={m.component} />
  ));

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Group>{appScreen}</RootStack.Group>

      <RootStack.Group screenOptions={{presentation: 'modal'}}>{modalScreens}</RootStack.Group>
    </RootStack.Navigator>
  );
};
