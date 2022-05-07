import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Styles } from './Soundboard.styles';

import { sounds } from './sounds';

interface ISound {
  id: number;
  label: string;
  sound: string;
}

export const Soundboard = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.lighter
  };

  const renderItem = (item: ISound) => (
    <Styles.Button key={item.id}>
      <Styles.Emoji>{item.label}</Styles.Emoji>
    </Styles.Button>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        {sounds.map((sound: ISound) => renderItem(sound))}
      </ScrollView>
    </SafeAreaView>
  );
};
