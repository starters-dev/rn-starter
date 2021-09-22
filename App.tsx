import React, {useCallback, useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Button, View, Text, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Section} from './src/components/section';
import {
  configureDesignSystem,
  getNavigationTheme,
  getThemeStatusBarStyle,
} from './src/utils/designSystem';
import {hydrateStores, StoresProvider, useStores} from './src/stores';

const Home = () => {
  const nav = useNavigation();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View center>
          <Icon name="infinite" size={30} color={Colors.primary} />
        </View>

        <View bg-bgColor>
          <View center>
            <Button
              marginV-s2
              label="Open Example Screen"
              onPress={() => nav.navigate('Example')}
            />
          </View>

          <Section title="Step One">
            <Text textColor>
              Edit <Text>App.tsx</Text> to change this screen and then come back to see your edits.
            </Text>
          </Section>
          <Section title="Learn More">
            <Text textColor>Read the docs to discover what to do next:</Text>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

const Example = () => {
  const nav = useNavigation();
  // const {nav, t} = useServices();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View padding-s4>
          {/* <Section title={t.do('section.navigation.title')}> */}
          <Section title="Navigation">
            <View center>
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.push')}
                label="Push"
                onPress={() => nav.push('Example')}
              />
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.show')}
                label="Show"
                onPress={() => Alert.alert('Show')}
              />
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.show')}
                label="Back"
                onPress={() => nav.goBack()}
              />
            </View>
          </Section>

          <Text textColor center>
            localized with i18n-js
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const Settings = () => {
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View padding-s4>
          {/* <Section title={t.do('section.navigation.title')}> */}
          <Section title="Settings will be here">
            <Text>Settings</Text>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

type ScreenName = 'Main' | 'Example' | 'Settings';
type Screen = {
  name: string;
  component: React.FC;
  options: () => NativeStackNavigationOptions;
};
type GenNavigatorProps = {
  screens: Screen[];
};
const genNavigator = ({screens}: GenNavigatorProps) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {screens.map(it => (
        <Stack.Screen key={it.name} name={it.name} component={it.component} options={it.options} />
      ))}
    </Stack.Navigator>
  );
};

const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerLargeTitle: true,
  headerTintColor: Colors.primary,
});

const tabBarDefaultOptions = (): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey30,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
});

const screens: {[key in ScreenName]: Screen} = {
  Main: {
    name: 'Home',
    component: Home,
    options: () => ({
      ...screenDefaultOptions(),
      title: 'Home',
    }),
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      ...screenDefaultOptions(),
      title: 'Settings',
    }),
  },
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      ...screenDefaultOptions(),
      title: 'Example',
    }),
  },
};

const HomeNavigator = () => genNavigator({screens: [screens.Main, screens.Example]});
const ExampleNavigator = () => genNavigator({screens: [screens.Example]});
const SettingsNavigator = () => genNavigator({screens: [screens.Settings]});

const getIconName = (routeName: string, focused: boolean): string => {
  if (routeName === 'HomeNavigator') {
    return focused ? 'newspaper' : 'newspaper-outline';
  }
  if (routeName === 'ExampleNavigator') {
    return focused ? 'construct' : 'construct-outline';
  }

  return 'list';
};

const Tab = createBottomTabNavigator();
const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      ...tabBarDefaultOptions(),
      tabBarIcon: ({focused, color, size}) => (
        <Icon name={getIconName(route.name, focused)} size={size} color={color} />
      ),
    })}
  >
    <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{title: 'Home'}} />
    <Tab.Screen name="ExampleNavigator" component={ExampleNavigator} options={{title: 'Example'}} />
    <Tab.Screen
      name="SettingsNavigator"
      component={SettingsNavigator}
      options={{title: 'Settings'}}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {ui} = useStores();

  console.log(ui.isSystemAppearance);

  return (
    <>
      <StatusBar barStyle={getThemeStatusBarStyle()} />
      <NavigationContainer theme={getNavigationTheme()}>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

export default (): JSX.Element => {
  useColorScheme();
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await hydrateStores();
    configureDesignSystem();

    setReady(true);
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return !ready ? (
    <View />
  ) : (
    <StoresProvider>
      <AppNavigator />
    </StoresProvider>
  );
};
