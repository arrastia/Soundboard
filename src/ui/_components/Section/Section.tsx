import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { styles } from './Section.styles';

import type { ReactNode } from 'react';

interface ISection {
  children?: ReactNode;
  title: string;
}

export const Section = ({ children, title }: ISection) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>{title}</Text>
      <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark }]}>{children}</Text>
    </View>
  );
};
