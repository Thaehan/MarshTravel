import {TouchableOpacity} from 'react-native';
import React from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';

import {ITripDay} from '@Types/index';
import {translate} from '@Languages/index';
import ShadowBox from '@Utils/ShadowBox';

export default function EditingTripdayItem({
  renderParams,
  onPressDeleteTripDay,
  startAt,
}: {
  renderParams: RenderItemParams<ITripDay>;
  onPressDeleteTripDay: () => Promise<void>;
  startAt: string;
}) {
  const {drag, isActive, item, getIndex} = renderParams;

  const nowTripday = moment(new Date(startAt))
    .add('days', item.position)
    .format('DD/MM/YYYY');

  return (
    <ScaleDecorator>
      <View
        spread
        padding-12
        marginH-12
        marginV-4
        bg-white
        style={[{borderRadius: 8}, ShadowBox.boxShadow]}
        flex>
        <View row>
          <View width={'80%'}>
            <Text regular lg>{`${translate('detailSchedule.day')} ${
              item.position + 1
            } - ${nowTripday}`}</Text>
            <View marginL-8 row marginT-8>
              <Text regular md>
                ·{' '}
                {item.firstDestinationName ??
                  translate('detailSchedule.noFirstDestination')}{' '}
                ...
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onLongPress={drag}
            delayLongPress={0}
            style={{
              paddingVertical: 8,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={onPressDeleteTripDay}
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Octicons
                name="trash"
                size={20}
                color={Colors.red1}
                style={{padding: 8}}
              />
            </TouchableOpacity>
            <SimpleLineIcons name="menu" size={20} style={{padding: 8}} />
          </TouchableOpacity>
        </View>
      </View>
    </ScaleDecorator>
  );
}
