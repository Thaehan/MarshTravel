import {Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';

export type ITripDayMenuOptionItem = {
  title: string;
  icon: Element;
  onPress: (data?: any) => void;
};

export default function TripDayMenuOptionsItem({
  data,
}: {
  data: ITripDayMenuOptionItem;
}) {
  const {title, icon, onPress} = data;

  return (
    <TouchableOpacity onPress={onPress} row paddingH-8 paddingV-12 centerV>
      {icon}
      <Text marginL-8 regular lg>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
