import {LogBox} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppNavigator} from './src/app';
import {configureDesignSystem} from './src/utils/designSystem';
import {hydrateStores, StoresProvider} from './src/stores';
import {initServices, ServicesProvider} from './src/services';

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  '`new NativeEventEmitter()`',
  '[react-native-gesture-handler] Seems like', // https://github.com/software-mansion/react-native-gesture-handler/issues/1831
]);

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoresProvider>
        <ServicesProvider>{ready ? <AppNavigator /> : null}</ServicesProvider>
      </StoresProvider>
    </GestureHandlerRootView>
  );
};
