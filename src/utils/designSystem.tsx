import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {Appearance} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';
import {stores} from '../stores';

const colors: DesignSystemColors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  blackish: Colors.rgba(20, 20, 20, 1),
  blackish2: Colors.rgba(50, 50, 50, 1),
  whitish: Colors.rgba(250, 250, 250, 1),
  whitish2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<AppearanceMode, ThemeColors> = {
  light: {
    textColor: colors.blackish,
    bgColor: colors.whitish,
    bg2Color: colors.whitish2,
  },
  dark: {
    textColor: colors.whitish,
    bgColor: colors.blackish,
    bg2Color: colors.blackish2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = (): void => {
  const {ui} = stores;

  if (ui.isSystemAppearance) {
    Colors.loadColors(colors);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({...colors, ...themes[ui.appearance]});
    Colors.loadSchemes({dark: {}, light: {}});
  }

  Typography.loadTypographies({
    section: {fontSize: 26, fontWeight: '600'},
  });
};

// export const getThemeColor = (c: keyof ThemeColors): Color => {
//   const {ui} = stores;

//   if (ui.isSystemAppearance) {
//     return {
//       dark: themes.dark[c],
//       light: themes.light[c],
//     };
//   } else {
//     return themes[ui.appearance][c];
//   }
// };

export const getThemeStatusBarStyle = (ca?: CurrentAppearance): StatusBarStyle => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  console.log(current);

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return 'light-content';
    case 'light':
      return 'dark-content';
  }
};

export const getNavigationTheme = (ca?: CurrentAppearance): Theme => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  console.log(current);

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return DarkTheme;
    case 'light':
      return DefaultTheme;
  }

  return DefaultTheme;
};
