import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';

export default function TripDaySelector({
  tripDayIndex,
  onPressLeft,
  onPressRight,
  startAt,
}: {
  tripDayIndex: number;
  onPressLeft: Function;
  onPressRight: Function;
  startAt: Date;
}) {
  const currentDay: string = useMemo(() => {
    return `${translate('detailSchedule.day')} ${tripDayIndex + 1} - ${moment(
      startAt,
    )
      .add('day', tripDayIndex)
      .format('DD/MM/YYYY')}`;
  }, [tripDayIndex]);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        backgroundColor: COLORS.backgroundMain,
        borderRadius: 10,
        marginBottom: 8,
      }}>
      <TouchableOpacity
        center
        onPress={onPressLeft}
        style={{
          padding: 8,
          marginLeft: 8,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.border,
          flex: 1,
        }}>
        <Ionicons
          name={'chevron-back-outline'}
          size={26}
          color={Colors.black1}
        />
      </TouchableOpacity>
      <View
        center
        style={{
          padding: 10,
          marginLeft: 8,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.border,
          flex: 9,
        }}>
        <Text regular lg black1>
          {currentDay}
        </Text>
      </View>
      <TouchableOpacity
        center
        onPress={onPressRight}
        style={{
          padding: 8,
          marginLeft: 8,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.border,
          flex: 1,
        }}>
        <Ionicons
          name={'chevron-forward-outline'}
          size={26}
          color={Colors.black1}
        />
      </TouchableOpacity>
    </View>
  );
}
