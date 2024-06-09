import React, {ReactNode, useEffect} from 'react';
import Animated, {StyleProps} from 'react-native-reanimated';
import {Dimensions, RefreshControl} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {useSpringAnimation} from '@Hooks/animations';

const {height, width} = Dimensions.get('window');

export default function AnimationScreenContainer({
  children,
  customStyle,
  onScroll,
  disableBounce = false,
  disableScroll,
  refreshControl,
}: {
  children: ReactNode;
  customStyle?: StyleProps;
  onScroll?: Function;
  disableBounce?: boolean;
  disableScroll?: boolean;
  refreshControl?: RefreshControl;
}) {
  const navigation = useNavigation();
  const {animationOffset, animationStyle, handleShow, handleHide} =
    useSpringAnimation(100, 'vertical');

  useFocusEffect(() => {
    handleShow();
  });

  useEffect(() => {
    const onBlur = navigation.addListener('blur', () => {
      handleHide();
    });

    return onBlur;
  }, [navigation]);

  if (disableScroll) {
    return (
      <Animated.View // Special animatable View
        style={[
          customStyle ? [animationStyle, customStyle] : animationStyle,
          {flex: 1, flexGrow: 1},
        ]}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.ScrollView // Special animatable View
      overScrollMode={disableBounce ? 'never' : 'auto'}
      scrollEventThrottle={16}
      onScroll={onScroll ?? null}
      showsVerticalScrollIndicator={false}
      style={customStyle ? [animationStyle, customStyle] : animationStyle}>
      {children}
    </Animated.ScrollView>
  );
}
