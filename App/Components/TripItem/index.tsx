import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React, {useCallback} from 'react';
import moment from 'moment';

import {ITrip} from '@Types/index';
import {translate} from '@Languages/index';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames from '@Constants/ScreenNames';
import {COLORS} from '@Themes/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TripItem({
  data,
  nav,
  settingAction,
}: {
  data: ITrip;
  nav: NativeStackScreenProps<any>;
  settingAction?: Function;
}) {
  const {navigation} = nav;
  const {id, name, userId, startAt, days, isArchived, description, daysLength} =
    data;

  const handlePressItem = () => {
    navigation.push(ScreenNames.DetailSchedule, data);
  };

  const handlePressSetting = () => {
    if (settingAction) {
      settingAction();
    }
  };

  return (
    <TouchableOpacity
      row
      flex
      padding-12
      margin-12
      onPress={handlePressItem}
      style={{borderRadius: 12, backgroundColor: COLORS.secondary}}>
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
        <TouchableOpacity
          onPress={handlePressSetting}
          padding-4
          style={{position: 'absolute', top: -6, right: -6}}>
          <MaterialIcons
            name={'settings'}
            size={22}
            color={COLORS.backgroundMain}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
