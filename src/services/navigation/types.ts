import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {StackNavigationOptions} from '@react-navigation/stack';
import {SharedElementsComponentConfig} from 'react-navigation-shared-element';

import {Modal, Screen, SharedScreen, SharedTransitionScreen, Tabs} from '../../screens';

type BaseScreenInfo = {
  name: string;
  component: React.FC<any>;
  // component: React.FC<NativeStackScreenProps<ScreenProps, Screen>>; // idk why it doesn't work
};

type ScreenInfo = BaseScreenInfo & {
  options: () => NativeStackNavigationOptions;
};
export type ScreenLayouts = {
  [key in Screen]: ScreenInfo;
};
export type GenStackNavigatorProps = ScreenInfo[];

export type TabScreenInfo = BaseScreenInfo & {
  options: () => BottomTabNavigationOptions;
};
export type TabScreenLayouts = {
  [key in Tabs]: TabScreenInfo;
};
export type GenTabNavigatorProps = TabScreenInfo[];

export type ModalScreenInfo = ScreenInfo;
export type ModalScreenLayouts = {
  [key in Modal]: ScreenInfo;
};

export type SharedScreenLayouts = {
  [key in SharedScreen]: ScreenInfo;
};
export type SharedTransitionScreenInfo = ScreenInfo & {
  sharedElements?: SharedElementsComponentConfig | undefined;
  options: () => StackNavigationOptions;
};
export type SharedTransitionScreenLayouts = {
  [key in SharedTransitionScreen]: SharedTransitionScreenInfo;
};
export type GenSharedStackNavigatorProps = SharedTransitionScreenInfo[];
