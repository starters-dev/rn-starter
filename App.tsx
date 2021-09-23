import React, {useCallback, useEffect, useState} from 'react';
import {LogBox, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './src/screens';
import {
  configureDesignSystem,
  getNavigationTheme,
  getThemeStatusBarStyle,
} from './src/utils/designSystem';
import {hydrateStores, StoresProvider, useStores} from './src/stores';
import {initServices, useServices} from './src/services';

LogBox.ignoreLogs(['EventEmitter.removeListener', '`new NativeEventEmitter()`']);

const AppNavigator = () => {
  useColorScheme();

  const {nav} = useServices();
  const {ui} = useStores();

  console.log('isSystemAppearance', ui.isSystemAppearance);

  return (
    <>
      <StatusBar barStyle={getThemeStatusBarStyle()} />
      <NavigationContainer
        ref={nav.n}
        onReady={nav.onReady}
        onStateChange={nav.onStateChange}
        theme={getNavigationTheme()}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

export default (): JSX.Element => {
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    configureDesignSystem();

    setReady(true);
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);
  console.log('huy');

  return (
    <StoresProvider>
      <StoresProvider>{ready ? <AppNavigator /> : null}</StoresProvider>
    </StoresProvider>
  );
};
