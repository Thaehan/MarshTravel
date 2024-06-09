import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import moment from 'moment';

import {ITrip} from '@Types/index';
import {COLORS} from '@Themes/Colors';
import {translate} from '@Languages/index';

export default function TripAddItem({
  data,
  onPressTrip,
}: {
  data: ITrip;
  onPressTrip: Function;
}) {
  const {name, startAt, daysLength} = data;

  return (
    <TouchableOpacity
      row
      flex
      padding-12
      marginV-6
      style={{borderRadius: 12, backgroundColor: COLORS.secondary}}
      onPress={() => {
        if (onPressTrip) {
          onPressTrip(data);
        }
      }}>
      <View centerV width={'70%'}>
        <Text xl medium white>
          {name}
        </Text>
        <View centerV>
          <Text regular md white>{`${translate(
            'scheduleList.startDate',
          )} ${moment(startAt).format('DD/MM/YYYY')}`}</Text>
          <Text regular md white>{`${translate(
            'scheduleList.endDate',
          )} ${moment(startAt)
            .add('day', daysLength ?? 0)
            .format('DD/MM/YYYY')}`}</Text>
        </View>
      </View>
      <View width={'30%'} center>
        <Text xl regular white>{`${daysLength} ${translate(
          'scheduleList.dayLength',
        )}`}</Text>
      </View>
    </TouchableOpacity>
  );
}
