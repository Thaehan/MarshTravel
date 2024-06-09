import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import styles from './styles';

export default function Screen(nav: NativeStackScreenProps<any>) {
  return (
    <MainContainer>
      <View></View>
    </MainContainer>
  );
}
