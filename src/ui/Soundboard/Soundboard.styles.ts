import { Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';

const Button = styled(TouchableOpacity)`
  background-color: ${Colors.darker};
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
`;

const Emoji = styled(Text)`
  color: ${Colors.white};
  font-size: 20px;
`;

export const Styles = { Button, Emoji };
