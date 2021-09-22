import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {Screen, TabScreen} from '../../screens';

type ScreenInfo = {
  name: string;
  component: React.FC;
  options: () => NativeStackNavigationOptions;
};
export type ScreenLayouts = {
  [key in Screen]: ScreenInfo;
};
export type GenStackNavigatorProps = {
  screens: ScreenInfo[];
};

type TabScreenInfo = ScreenInfo & {
  options: () => BottomTabNavigationOptions;
};
export type TabScreenLayouts = {
  [key in TabScreen]: TabScreenInfo;
};
export type GenTabNavigatorProps = {
  screens: TabScreenInfo[];
};
