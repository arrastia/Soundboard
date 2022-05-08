import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from 'ui/Home/Home';
import { Soundboard } from 'ui/Soundboard';

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const largeTitleOptions: NativeStackNavigationOptions = { headerLargeTitle: true, headerLargeTitleShadowVisible: true };

  const renderActionButton = () => <Button onPress={() => alert('This is a button!')} title="UPLOAD" color="black" />;

  const blurredHeader: NativeStackNavigationOptions = {
    headerTranslucent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      blurEffect: 'systemUltraThinMaterialDark'
    },
    headerLargeStyle: {
      backgroundColor: 'black'
    },
    headerLargeTitle: true
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen component={Home} name="Home" options={{ ...largeTitleOptions }} />
      <Stack.Screen
        component={Soundboard}
        name="Soundboard"
        options={{
          ...largeTitleOptions,
          headerBlurEffect: 'systemUltraThinMaterialDark',
          headerRight: renderActionButton,
          headerTintColor: 'white',
          headerTransparent: true,
          ...blurredHeader
        }}
      />
    </Stack.Navigator>
  );
};
