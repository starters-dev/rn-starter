import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import merge from 'lodash/merge';
import {gestureHandlerRootHOC as withGH} from 'react-native-gesture-handler';

import {screenDefaultOptions, tabBarDefaultOptions} from './options';
import {GenStackNavigatorProps, GenTabNavigatorProps} from './types';

export const genStackNavigator = ({screens}: GenStackNavigatorProps): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      {screens.map(it => (
        <Stack.Screen
          key={it.name}
          name={it.name}
          // component={withGH(it.component)}
          component={it.component}
          options={merge(screenDefaultOptions(), it.options)}
        />
      ))}
    </Stack.Navigator>
  );
};

export const genTabNavigator = ({screens}: GenTabNavigatorProps): JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        ...tabBarDefaultOptions(route.name),
      })}
    >
      {screens.map(it => (
        <Tab.Screen
          key={it.name}
          name={it.name}
          // component={withGH(it.component)}
          component={it.component}
          options={it.options}
        />
      ))}
    </Tab.Navigator>
  );
};
