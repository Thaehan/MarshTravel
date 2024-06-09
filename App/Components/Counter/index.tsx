import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function Counter({
  value,
  onAdd,
  onMinus,
}: {
  value: number;
  onAdd: Function;
  onMinus: Function;
}) {
  return (
    <View flexG row>
      <TouchableOpacity onPress={onMinus}>
        <EntypoIcon name="minus" />
      </TouchableOpacity>
      <Text>{value}</Text>
      <TouchableOpacity onPress={onAdd}>
        <EntypoIcon name="plus" />
      </TouchableOpacity>
    </View>
  );
}
