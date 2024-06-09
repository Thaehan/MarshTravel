import {View, Text} from 'react-native-ui-lib';
import React from 'react';

interface IDot {
  size: number;
  color: string;
  marginH?: number;
  marginV?: number;
}

export default function Dot({size, color, marginH, marginV}: IDot) {
  return (
    <View
      style={{
        padding: size,
        backgroundColor: color,
        borderRadius: 100,
        marginHorizontal: marginH ?? 0,
        marginVertical: marginV ?? 0,
        alignSelf: 'center',
      }}
    />
  );
}
