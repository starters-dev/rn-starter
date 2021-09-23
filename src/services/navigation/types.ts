import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {Modal, Screen, TabScreen} from '../../screens';

type ScreenInfo = {
  name: string;
  // component: React.FC<NativeStackScreenProps<ScreenProps, Screen>>; // idk why it doesn't work
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
  options: () => NativeStackNavigationOptions;
};
export type ScreenLayouts = {
  [key in Screen]: ScreenInfo;
};
export type GenStackNavigatorProps = {
  screens: ScreenInfo[];
};

export type TabScreenInfo = ScreenInfo & {
  options: () => BottomTabNavigationOptions;
};
export type TabScreenLayouts = {
  [key in TabScreen]: TabScreenInfo;
};
export type GenTabNavigatorProps = {
  screens: TabScreenInfo[];
};

export type ModalScreenInfo = ScreenInfo;
export type ModalScreenLayouts = {
  [key in Modal]: ScreenInfo;
};
