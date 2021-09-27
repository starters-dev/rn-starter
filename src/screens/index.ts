import {
  ModalScreenLayouts,
  ScreenLayouts,
  SharedScreenLayouts,
  SharedTransitionScreenLayouts,
  TabScreenLayouts,
} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {
  genRootNavigator,
  genSharedStackNavigator,
  genStackNavigator,
  genTabNavigator,
} from '../services/navigation/help';
import {Shared} from './shared';
import {SharedTo} from './sharedTo';

// Describe your screens here
export type Tabs = 'Main' | 'WIP' | 'Settings';
export type Modal = 'ExampleModal';
export type SharedTransitionScreen = 'Shared' | 'SharedTo';
export type SharedScreen = 'ExampleShared';
export type Screen = 'Main' | 'Example' | 'Settings';

export type ModalProps = {
  ExampleModal: undefined;
};
export type SharedScreenProps = {
  ExampleShared: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Settings: undefined;
  Shared: undefined;
  SharedTo: undefined;
} & ModalProps &
  SharedScreenProps;

// Screens
const screens: ScreenLayouts = {
  Main: {
    name: 'Main',
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
const sharedTransitionScreens: SharedTransitionScreenLayouts = {
  Shared: {
    name: 'Shared',
    component: Shared,
    options: () => ({
      title: 'Shared Transition',
    }),
  },
  SharedTo: {
    name: 'SharedTo',
    component: SharedTo,
    options: () => ({
      title: 'SharedTo Transition',
    }),
    sharedElements: (route, otherRoute, showing) => {
      // const {item} = route.params;
      // return [`item.${item.id}.photo`];
      console.log('showing', showing);
      return ['image', 'reanimated2'];
    },
  },
};
const ExampleSharedStack = () =>
  genSharedStackNavigator([sharedTransitionScreens.Shared, sharedTransitionScreens.SharedTo]);
const sharedScreens: SharedScreenLayouts = {
  ExampleShared: {
    name: 'ExampleShared',
    component: ExampleSharedStack,
    options: () => ({
      title: 'Shared Transition',
      headerLargeTitle: false,
      headerTransparent: false,
      headerBlurEffect: undefined,
    }),
  },
};
const HomeStack = () =>
  genStackNavigator([screens.Main, screens.Example, sharedScreens.ExampleShared]);
const ExampleStack = () => genStackNavigator([screens.Example, sharedScreens.ExampleShared]);
const SettingsStack = () => genStackNavigator([screens.Settings]);
const ExampleModalStack = () => genStackNavigator([screens.Main, screens.Example]);

// Tabs
const tabs: TabScreenLayouts = {
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
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.WIP, tabs.Settings]);

// Modals
const modals: ModalScreenLayouts = {
  ExampleModal: {
    name: 'ExampleModal',
    component: ExampleModalStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ExampleModal]);
