import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StatusBar, useColorScheme} from 'react-native';
import {Button, View, Text, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import merge from 'lodash/merge';

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

type TabScreenName = 'Main' | 'WIP' | 'Settings';
type ScreenName = 'Main' | 'Example' | 'Settings';
type Screen = {
  name: string;
  component: React.FC;
  options: () => NativeStackNavigationOptions;
};
type TabScreen = Screen & {
  options: () => BottomTabNavigationOptions;
};
type GenStackNavigatorProps = {
  screens: Screen[];
};
type GenTabNavigatorProps = {
  screens: TabScreen[];
};
const genStackNavigator = ({screens}: GenStackNavigatorProps) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {screens.map(it => (
        <Stack.Screen
          key={it.name}
          name={it.name}
          component={it.component}
          options={merge(screenDefaultOptions(), it.options)}
        />
      ))}
    </Stack.Navigator>
  );
};
const genTabNavigator = ({screens}: GenTabNavigatorProps) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        ...tabBarDefaultOptions(route.name),
      })}
    >
      {screens.map(it => (
        <Tab.Screen key={it.name} name={it.name} component={it.component} options={it.options} />
      ))}
    </Tab.Navigator>
  );
};

const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerLargeTitle: true,
  headerTintColor: Colors.primary,
});

const tabBarDefaultOptions = (routeName: string): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
  tabBarIcon: ({focused, color, size}) => (
    <Icon name={getIconName(routeName, focused)} size={size} color={color} />
  ),
});

const getIconName = (routeName: string, focused: boolean): string => {
  if (routeName === 'MainNavigator') {
    return focused ? 'newspaper' : 'newspaper-outline';
  }
  if (routeName === 'ExampleNavigator') {
    return focused ? 'construct' : 'construct-outline';
  }
  if (routeName === 'SettingsNavigator') {
    return focused ? 'cog' : 'cog-outline';
  }

  return 'list';
};

const screens: {[key in ScreenName]: Screen} = {
  Main: {
    name: 'Home',
    component: Home,
    options: () => ({
      title: 'Home',
    }),
  },
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      title: 'Example',
    }),
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      title: 'Settings',
    }),
  },
};

const HomeStack = () => genStackNavigator({screens: [screens.Main, screens.Example]});
const ExampleStack = () => genStackNavigator({screens: [screens.Example]});
const SettingsStack = () => genStackNavigator({screens: [screens.Settings]});

const tabScreens: {[key in TabScreenName]: TabScreen} = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
    }),
  },
  WIP: {
    name: 'ExampleNavigator',
    component: ExampleStack,
    options: () => ({
      title: 'WIP',
    }),
  },
  Settings: {
    name: 'SettingsNavigator',
    component: SettingsStack,
    options: () => ({
      title: 'Settings',
    }),
  },
};

const MainNavigator = () =>
  genTabNavigator({screens: [tabScreens.Main, tabScreens.WIP, tabScreens.Settings]});

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
