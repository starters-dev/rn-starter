import {ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {genStackNavigator, genTabNavigator} from '../services/navigation/help';

// Describe your screens here
export type TabScreen = 'Main' | 'WIP' | 'Settings';
export type Screen = 'Main' | 'Settings' | 'Example';

const screens: ScreenLayouts = {
  Main: {
    name: 'Home',
    component: Main,
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

const tabScreens: TabScreenLayouts = {
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

export const MainNavigator = (): JSX.Element =>
  genTabNavigator({screens: [tabScreens.Main, tabScreens.WIP, tabScreens.Settings]});
