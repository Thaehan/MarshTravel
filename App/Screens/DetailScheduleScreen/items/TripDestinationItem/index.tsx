import {View, Text, Colors, SkeletonView} from 'react-native-ui-lib';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ITripDestination} from '@Types/index';

export default function TripDestinationItem({
  renderItemParams,
  nextItem,
  deleteItem,
  addItem,
}: {
  renderItemParams: RenderItemParams<ITripDestination>;
  nextItem?: ITripDestination;
  deleteItem?: Function;
  addItem?: Function;
}) {
  const {item, isActive, drag, getIndex} = renderItemParams;

  const renderAddButton = () => {
    if (isActive) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (addItem) {
            addItem(getIndex());
          }
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          borderRadius: 8,
          borderWidth: 0.6,
          marginVertical: 4,
          borderColor: Colors.grey50,
        }}>
        <SimpleLineIcons name="plus" size={22} color={Colors.grey40} />
      </TouchableOpacity>
    );
  };

  if (!item.name) {
    return <SkeletonView template={SkeletonView.templates.LIST_ITEM} />;
  }

  return (
    <ScaleDecorator key={item.id}>
      <View
        style={{
          borderColor: Colors.grey50,
          borderWidth: 0.5,
          marginVertical: 4,
          borderRadius: 10,
          paddingHorizontal: 8,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{paddingVertical: 8, flex: 4}}>
          <Text regular lg>{`${item.name}`}</Text>
        </View>
        <View row centerV flex>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            delayLongPress={100}
            onLongPress={drag}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <SimpleLineIcons name="menu" size={20} style={{padding: 8}} />
          </TouchableOpacity>
        </View>
      </View>
      {renderAddButton()}
    </ScaleDecorator>
  );
}
