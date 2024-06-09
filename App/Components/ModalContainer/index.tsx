import {View, Text} from 'react-native-ui-lib';
import React, {ReactNode} from 'react';
import {COLORS} from '@Themes/Colors';

export default function ModalContainer({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <View
      paddingV-12
      backgroundColor={COLORS.backgroundMain}
      style={[
        {
          alignSelf: 'center',
          minWidth: '80%',
          borderRadius: 8,
          minHeight: '15%',
        },
        center ? {justifyContent: 'center', alignItems: 'center'} : {},
      ]}>
      {children}
    </View>
  );
}
