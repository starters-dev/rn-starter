import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {MainNavigator} from './src/screens';
import {
  configureDesignSystem,
  getNavigationTheme,
  getThemeStatusBarStyle,
} from './src/utils/designSystem';
import {hydrateStores, StoresProvider, useStores} from './src/stores';
import {initServices} from './src/services';

const AppNavigator = () => {
  useColorScheme(); // needs to be here to correctly change tab bar appearance
  const {ui} = useStores();

  console.log('isSystemAppearance', ui.isSystemAppearance);

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
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await hydrateStores();
    configureDesignSystem();
    await initServices();

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
