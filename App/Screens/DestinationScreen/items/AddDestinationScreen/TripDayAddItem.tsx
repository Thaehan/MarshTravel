import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import {ITripDay} from '@Types/index';
import {COLORS} from '@Themes/Colors';
import moment from 'moment';
import {translate} from '@Languages/index';

export default function TripDayAddItem({
  data,
  onPressTripDayItem,
  startAt,
}: {
  data: ITripDay;
  onPressTripDayItem: Function;
  startAt: string;
}) {
  const {position, firstDestinationName} = data;

  return (
    <TouchableOpacity
      flex
      padding-12
      marginH-12
      marginV-4
      style={{borderRadius: 12, backgroundColor: COLORS.secondary}}
      onPress={() => {
        if (onPressTripDayItem) {
          onPressTripDayItem(data);
        }
      }}>
      <Text white medium lg>{`${translate('detailSchedule.day')} ${
        position + 1
      } - ${moment(startAt).add(position, 'day').format('DD/MM/YYYY')}`}</Text>
      <Text white regular md>
        {firstDestinationName}...
      </Text>
    </TouchableOpacity>
  );
}
