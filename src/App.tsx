import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import { MainStack } from 'ui/_routes/MainStack';

import { isDarkModeState } from 'ui/_tools/Stores/ThemeStore';

import type { SetRecoilState } from 'recoil';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  function initializeThemeStore({ set }: { set: SetRecoilState }) {
    set(isDarkModeState, isDarkMode);
  }

  return (
    <RecoilRoot initializeState={initializeThemeStore}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};
