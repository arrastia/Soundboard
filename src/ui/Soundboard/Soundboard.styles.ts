import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';

const { height, width } = Dimensions.get('screen');

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

const Board = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.95
  }
}))``;

export const Styles = { Button, Emoji, Board };

// align-self: 'center';
//     background-color: ${Colors.darker};
//     border-radius: 10;
//     flex-direction: 'row';
//     flex-wrap: 'wrap';
//     margin-top: 20;
//     padding: 10;
//     width: ${width * 0.9};
