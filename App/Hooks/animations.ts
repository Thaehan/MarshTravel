import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export function useSpringAnimation(
  initOffset: number,
  direction: 'vertical' | 'horizontal',
) {
  //handle animation
  const animationOffset = useSharedValue(initOffset);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        direction == 'vertical'
          ? {
              translateY: withSpring(animationOffset.value, {
                damping: 20,
                stiffness: 90,
              }),
            }
          : {
              translateX: withSpring(animationOffset.value, {
                damping: 20,
                stiffness: 90,
              }),
            },
      ],
    };
  });

  const handleShow = () => {
    animationOffset.value = 0;
  };

  const handleHide = () => {
    animationOffset.value = initOffset;
  };

  return {
    animationOffset,
    animationStyle,
    handleShow,
    handleHide,
  };
}

export function useTimingAnimation(
  initState: number | string,
  changeState: number | string,
  direction?: 'horizontal' | 'vertical',
) {
  const currentDirection = direction ?? 'horizontal';
  const currentState = useSharedValue(initState);

  const animationStyle = useAnimatedStyle(() => {
    return currentDirection == 'horizontal'
      ? {
          width: withTiming(currentState.value, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        }
      : {
          height: withTiming(currentState.value, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        };
  });

  const handleChange = () => {
    currentState.value = changeState;
  };

  const handleReverse = () => {
    currentState.value = initState;
  };

  return {
    animationStyle,
    handleChange,
    handleReverse,
  };
}
