import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {COLORS} from '@Themes/Colors';
import {translate} from '@Languages/index';

export default function SearchItem({
  onPress,
  size,
}: {
  onPress: Function;
  size?: number;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginHorizontal: 4,
      }}>
      <View
        style={{
          borderRadius: 100,
          backgroundColor: COLORS.white1,
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Fontisto
          name="search"
          style={{
            height: size ?? 70,
            width: size ?? 70,
            borderRadius: 100,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
          size={size ?? 40}
        />
      </View>
      <View width={size ? size + 20 : 100}>
        <Text marginT-2 light center md numberOfLines={2}>
          {translate('explore.searchButton')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
