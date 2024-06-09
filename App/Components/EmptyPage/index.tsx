import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';

import {translate} from '@Languages/index';
import Dimensions from '@Utils/Dimensions';

export default function EmptyPage() {
  return (
    <View
      height={(Dimensions.height * 2) / 3}
      center
      style={{position: 'relative'}}>
      <LottieView
        style={styles.heartLottie}
        source={require('@Assets/Animations/empty2.json')}
        autoPlay
        loop
        resizeMode="cover"
      />
      <Text style={{position: 'absolute', bottom: 12}} regular lg>
        {translate('util.noData')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heartLottie: {
    width: '40%',
    height: '40%',
  },
});
