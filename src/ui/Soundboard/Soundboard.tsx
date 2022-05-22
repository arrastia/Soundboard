import { useHapticFeedback } from 'hooks/useHapticFeedback';
import React from 'react';
import { SafeAreaView, StatusBar, StyleProp, useColorScheme, ViewStyle } from 'react-native';
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

  const onFeedback = useHapticFeedback('impactHeavy');

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.black : Colors.lighter,
    height: '100%'
  };

  const renderItem = (item: ISound) => (
    <Styles.Button key={item.id} onLongPress={() => console.log('hey')} onPress={() => 'hey otro'}>
      <Styles.Emoji>{item.label}</Styles.Emoji>
    </Styles.Button>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Styles.Board contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        {sounds.map((sound: ISound) => renderItem(sound))}
      </Styles.Board>
    </SafeAreaView>
  );
};
