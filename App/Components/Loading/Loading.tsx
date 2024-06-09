import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles';
import {IRootState} from '@Store/Store';

export default function Loading({label}: {label?: string}) {
  const loading = useSelector((state: IRootState) => state.loading.value);

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      {label && <Text>{label}</Text>}
    </View>
  );
}
