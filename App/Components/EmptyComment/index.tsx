import {View} from 'react-native-ui-lib';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function EmptyComment() {
  return (
    <View center>
      <LottieView
        autoPlay
        source={require('@Assets/Animations/NoComment.json')}
        style={{height: 100, width: 100}}
      />
    </View>
  );
}
